import React from 'react';
import { AppBar, Toolbar, IconButton, Button, TextField, Menu, MenuItem } from '@material-ui/core';
import { Home } from '@material-ui/icons';


export default class DocsAppBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginEl: null,
      signUpEl: null,
    };
  }

  handleLoginClick = (event) => {
    this.setState({ loginEl: event.currentTarget });
  };

  handleLoginClose = () => {
    this.setState({ loginEl: null});
  };

  handleSignUpClick = (event) => {
    this.setState({ signUpEl: event.currentTarget });
  };

  handleSignUpClose = () => {
    this.setState({ signUpEl: null});
  };

  render() {
    const { loginEl, signUpEl } = this.state;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit">
            <Home />
          </IconButton>
          <Button variant="outlined" color="primary" className="button" onClick={this.handleLoginClick}>
            Login
          </Button>
          <Menu
            id="login-menu"
            anchorEl={loginEl}
            open={Boolean(loginEl)}
            onClose={this.handleLoginClose}
          >
            <MenuItem onClose={this.handleLoginClose}>
              <TextField id="username" label="username" margin="normal" id="username">Username</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleLoginClose}>
              <TextField id="password" label="password" margin="normal" id="password">Password</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleLoginClose}><Button>Submit</Button></MenuItem>
          </Menu>
          <Button variant="outlined" color="secondary" className="button" onClick={this.handleSignUpClick}>
            SignUp
          </Button>
          <Menu
            id="login-menu"
            anchorEl={signUpEl}
            open={Boolean(signUpEl)}
            onClose={this.handleSignUpClose}
          >
            <MenuItem onClose={this.handleSignUpClose}>
              <TextField id="Susername" label="username" margin="normal" id="username">Username</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleSignUpClose}>
              <TextField id="Spassword" label="password" margin="normal" id="password">Password</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleSignUpClose}>
              <TextField id="Rpassword" label="password" margin="normal" id="password">Repeat Password</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleSignUpClose}><Button>Submit</Button></MenuItem>
          </Menu>
          <Button variant="outlined" disabled className="button">
            Logout
          </Button>
          <TextField label="DocID" margin="normal" id="DocId">Enter DocId</TextField>
        </Toolbar>
      </AppBar>
    );
  }

}
