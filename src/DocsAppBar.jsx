import React from 'react';

import { AppBar, Toolbar, IconButton, Button, TextField } from '@material-ui/core';
import { Menu } from '@material-ui/icons/';

export default class DocsAppBar extends React.Component {

  render() {
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit">
            <Menu />
          </IconButton>
          <Button
            variant="outlined"
            color="primary"
            className="button"
            onClick={() => this.handleLogin()}
          >
            Login
          </Button>
          <Button variant="outlined" color="secondary" className="button">
            SignUp
          </Button>
          <Button variant="outlined" disabled className="button">
            Logout
          </Button>
          <TextField label="DocID" margin="normal" id="DocId">
            Logout
          </TextField>
        </Toolbar>
      </AppBar>
    );
  }

}
