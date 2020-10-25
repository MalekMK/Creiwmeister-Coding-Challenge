import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Box, Collapse } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Alert from "@material-ui/lab/Alert";

export default class Pickers extends React.Component {
  state = {
    startDate: "2017-02-01",
    endDate: "2017-02-28",
    open: false,
  };
  handleSearchClick = () => {
    // verification of the range of the date
    new Date(this.state.startDate) > new Date(this.state.endDate)
      ? this.setState({ open: true })
      : (window.location.href = `/?startDate=${this.state.startDate}&endDate=${this.state.endDate}`);
  };
  render() {
    return (
      <div>
        <Box display="flex" justifyContent="flex-start" my={4}>
          <h3>Filters</h3>
        </Box>
        <Collapse style={{ width: "400px" }} in={this.state.open}>
          <Alert
            severity="error"
            action={
              <CloseIcon
                onClick={(event) => this.setState({ open: false })}
                fontSize="inherit"
              />
            }
          >
            Wrong interval choice !
          </Alert>
        </Collapse>
        <Box my={2} display="flex" justifyContent="flex-start">
          <Box>
            <TextField
              id="date"
              label="From"
              type="date"
              defaultValue="2017-02-01"
              onChange={(event) =>
                this.setState({ startDate: event.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box px={1}>
            <TextField
              id="date"
              label="To"
              type="date"
              defaultValue="2017-02-28"
              onChange={(event) =>
                this.setState({ endDate: event.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <Box px={1}>
            <Button
              variant="contained"
              onClick={() => this.handleSearchClick()}
              color="primary"
            >
              Search
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-start" my={4}>
          <Box>
            <Autocomplete
              onChange={(event, value) =>
                (window.location.href = `/?userId=${value.userId}`)
              }
              options={this.props.employeesList}
              getOptionLabel={(option) => option.name}
              style={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select a name of an employee"
                  variant="outlined"
                />
              )}
            />
          </Box>
          <Box px={1}>
            <Button
              style={{
                height: "52px",
              }}
              variant="contained"
              onClick={() => (window.location.href = `/`)}
              color="secondary"
            >
              Clear All Filters
            </Button>
          </Box>
        </Box>
      </div>
    );
  }
}
