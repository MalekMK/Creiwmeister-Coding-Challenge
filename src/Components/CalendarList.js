import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";

export default class CalendarList extends React.PureComponent {
  state = {
    currentDate: "2017-02-01",
  };
  currentDateChange = (currentDate) => {
    this.setState({ currentDate });
  };

  render() {
    const { currentDate } = this.state;
    return (
        <Paper>
          <Scheduler data={this.props.absensesList} height={700}>
            <ViewState
              currentDate={currentDate}
              onCurrentDateChange={this.currentDateChange}
            />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
            <Appointments />
          </Scheduler>
        </Paper>
    );
  }
}
