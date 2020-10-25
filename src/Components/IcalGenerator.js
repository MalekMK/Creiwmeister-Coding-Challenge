import { Box, Button } from "@material-ui/core";
import React from "react";
import ical from "ical-generator";
import download from "downloadjs";

export default class IcalGenerator extends React.Component {
  state = {
  };
  handleClickDownload = (event) => { // filling the ical file with the data displayed grid only
    const icalendar = new ical({ 
      events: this.props.icalList
    }).toString();
    download(icalendar, "Calendar.ics", "text/plain");
  }
  render() {
    return (
      <Box my={4}>
        <Button
          onClick={(event) => this.handleClickDownload(event)}
          style={{
            height: "52px",
          }}
          variant="contained"
          color="primary"
        >
          Download ical file
        </Button>
      </Box>
    );
  }
}
