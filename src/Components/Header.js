import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";

export default class Header extends React.Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar variant="regular">
          <Container>
            <Typography variant="h4" color="inherit">
              Welcome To Crewmeister Absense Manager App
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    );
  }
}
