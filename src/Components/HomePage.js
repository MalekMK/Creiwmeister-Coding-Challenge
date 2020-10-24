import React from "react";
import Header from "./Header";
import AbsensesList from "./FullAbsenceList";
import { Box, Container } from "@material-ui/core";
import queryString from "query-string";
import axios from "axios";


export default class HompePage extends React.Component {
  state = {
    gridList: [],
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
        })
        this.setState({ gridList });
      });
  };
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);
    const userId = parseInt(values.userId);
    const { startDate, endDate } = values;
    this.setState({ userId, startDate, endDate });
    this.fetchAbsenses(userId, startDate, endDate);
  }
  render() {
    return (
      <div>
        <Header />
        <Container maxWidth="xl">
          <Box p={3}>
            <h2>List Of Absenses</h2>
          </Box>
          <AbsensesList absensesList={this.state.gridList} />
        </Container>
      </div>
    );
  }
}
