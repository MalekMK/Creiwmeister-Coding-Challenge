import React from "react";
import { DataGrid } from "@material-ui/data-grid";

const columns = [
  { field: "name", headerName: "Name", type: "string", width: 150 },
  { field: "type", headerName: "Type", type: "string", width: 150 },
  { field: "start", headerName: "Start Date", type: "date", width: 150 },
  { field: "end", headerName: "End Date", type: "date", width: 150 },
  { field: "createdAt", headerName: "Created At", type: "date", width: 150 },
  {
    field: "confirmedAt",
    headerName: "Confirmed At",
    type: "date",
    width: 150,
  },
  { field: "rejectedAt", headerName: "Rejected At", type: "date", width: 150 },
  {
    field: "desc",
    headerName: "Member Description",
    type: "string",
    width: 600,
  },
];

export default class AbsensesList extends React.Component {
  render() {
    return (
      <div>
        <div style={{ height: 660, width: "100%" }}>
          <DataGrid
            classnName="text-center"
            showCellRightBorder
            hideFooterSelectedRowCount
            rows={this.props.absensesList}
            columns={columns}
            pageSize={10}
          />
        </div>
      </div>
    );
  }
}
