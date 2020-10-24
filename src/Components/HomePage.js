import React from "react";
import Header from "./Header";
import AbsensesList from "./FullAbsenceList";
import CalendarList from "./CalendarList";
import Pickers from "./Pickers";
import IcalGenerator from "./IcalGenerator";
import { Box, Container } from "@material-ui/core";
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
  };
  fetchAbsenses = (userId, startDate, endDate) => {
    axios
      .get(`http://localhost:3001/`, {
        params: { userId: userId, startDate: startDate, endDate: endDate },
      })
      .then((res) => {
        const data = res.data;
        let gridList = [];
        let calendarList = [];
        let icalList = [];
        data.forEach((elt) => {
          gridList.push({
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
            id: elt.id,
            title:
              elt.type === "sickness"
                ? `${elt.name} is sick`
                : `${elt.name} is on vacation`,
            startDate: new Date(elt.startDate),
            endDate: new Date(elt.endDate).setHours(23),
          });
          if (elt.rejectedAt == null) {
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
          };
        });
        this.setState({ gridList, calendarList, icalList });
      });
  };
  fetchMembers = () => {
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
    const values = queryString.parse(this.props.location.search);
    const userId = parseInt(values.userId);
    const { startDate, endDate } = values;
    this.setState({ userId, startDate, endDate });
    this.fetchMembers();
    this.fetchAbsenses(userId, startDate, endDate);
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
