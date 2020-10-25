import React from "react";
import Header from "./Header";
import AbsensesList from "./FullAbsenceList";
import CalendarList from "./CalendarList";
import Pickers from "./Pickers";
import IcalGenerator from "./IcalGenerator";
import { Box, Container, Collapse } from "@material-ui/core";
import queryString from "query-string";
import axios from "axios";

export default class HompePage extends React.Component {
  state = {
    gridList: [],
    calendarList: [],
    employeesList: [],
    icalList: [],
    userId: NaN,
    startDate: "",
    endDate: "",
    collapseOpen: false,
    filters: "",
  };
  fetchAbsenses = (userId, startDate, endDate) => {
    axios
      .get(`http://localhost:3001/`, {
        params: { userId: userId, startDate: startDate, endDate: endDate },
      })
      .then((res) => {
        const data = res.data;
        let collapseOpen = false;
        let gridList = [];
        let calendarList = [];
        let icalList = [];
        data.forEach((elt) => {
          gridList.push({
            //filling the table of absenses data
            id: elt.id,
            type: elt.type,
            start: elt.startDate,
            end: elt.endDate,
            name: elt.name,
            createdAt:
              elt.createdAt == null
                ? null
                : new Date(elt.createdAt).toISOString().split("T")[0],
            confirmedAt:
              elt.confirmedAt == null
                ? null
                : new Date(elt.confirmedAt).toISOString().split("T")[0],
            rejectedAt:
              elt.rejectedAt == null
                ? null
                : new Date(elt.rejectedAt).toISOString().split("T")[0],
            desc: elt.memberNote,
          });
          calendarList.push({
            //filling the calendar data
            id: elt.id,
            title:
              elt.type === "sickness"
                ? `${elt.name} is sick`
                : `${elt.name} is on vacation`,
            startDate: new Date(elt.startDate),
            endDate: new Date(elt.endDate).setHours(23),
          });
          if (elt.rejectedAt == null) {
            // generating the event of ical file to download
            icalList.push({
              start: elt.startDate,
              end: elt.endDate,
              summary:
                elt.type === "sickness"
                  ? `${elt.name} is sick`
                  : `${elt.name} is on vacation`,
              description: elt.memberNote,
              organizer: "Crewmeister <challenge@crewmeister.com>",
              url: "https://crewmeister.com/",
              location: "ATOSS Aloud GmbH",
            });
          }
        });
        if (userId || startDate || endDate) collapseOpen = true;
        let filters = "";
        if (userId) filters += " UserId = " + userId.toString() + " | ";
        if (startDate) filters += " From = " + startDate;
        if (endDate) filters += " | To = " + endDate;
        this.setState({
          gridList,
          calendarList,
          icalList,
          collapseOpen,
          filters,
        });
      });
  };
  fetchMembers = () => {
    // fetching the names of employees for the autocomplete to select specific id
    axios.get(`http://localhost:3001/`).then((res) => {
      const data = res.data;
      let employeesList = [];
      data.forEach((elt) => {
        const found = employeesList.some((el) => el.userId === elt.userId);
        if (!found) employeesList.push({ userId: elt.userId, name: elt.name });
      });
      this.setState({ employeesList });
    });
  };
  componentDidMount() {
    const values = queryString.parse(this.props.location.search); //getting the parameters of url if exist
    const userId = parseInt(values.userId);
    const { startDate, endDate } = values;
    this.setState({ userId, startDate, endDate });
    this.fetchMembers(); // calling for filling the state
    this.fetchAbsenses(userId, startDate, endDate); // calling for filling the state
  }
  render() {
    return (
      <div>
        <Header />
        <Container maxWidth="xl">
          <Pickers employeesList={this.state.employeesList} />
          <Box p={3}>
            <h2>List Of Absenses</h2>
            <IcalGenerator icalList={this.state.icalList} />
          </Box>
          <Box p={2}>
            <Collapse in={this.state.collapseOpen}>
              <strong>Filters : {this.state.filters}</strong>
            </Collapse>
          </Box>
          <AbsensesList absensesList={this.state.gridList} />
          <Box p={3}>
            <h2>Calendar Of Absenses</h2>
          </Box>
          <Box py={3}>
            <CalendarList m={5} absensesList={this.state.calendarList} />
          </Box>
        </Container>
      </div>
    );
  }
}
