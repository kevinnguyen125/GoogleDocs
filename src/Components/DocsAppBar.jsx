import React from 'react';
import { Menu as MenuIcon } from '@material-ui/icons';
import { AppBar, Toolbar, IconButton, Button, TextField, Menu, MenuItem } from '@material-ui/core';

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
    this.setState({ loginEl: null });
  };

  handleLoginSubmit = () => {
    console.log('LoginSubmit');

    const postData = (url = '', data = {}) => {
      // Default options are marked with *
      return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, same-origin, *omit
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
                // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data), // body data type must match "Content-Type" header
      })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error('Fetch Error =\n', error));
    };

    postData('http://192.168.7.132:8080/login', {
      username: 'hocho',
      password: 'hocho',
    })
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error));
  }

  handleSignUpClick = (event) => {
    this.setState({ signUpEl: event.currentTarget });
  };

  handleSignUpClose = () => {
    this.setState({ signUpEl: null });
  };

  render() {
    const { loginEl, signUpEl } = this.state;
    return (
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon />
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
              <TextField id="username" label="username" margin="normal">Username</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleLoginClose}>
              <TextField id="password" label="password" margin="normal">Password</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleLoginClose}><Button onClick={this.handleLoginSubmit}>Submit</Button></MenuItem>
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
              <TextField id="Susername" label="username" margin="normal">Username</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleSignUpClose}>
              <TextField id="Spassword" label="password" margin="normal">Password</TextField>
            </MenuItem>
            <MenuItem onClose={this.handleSignUpClose}>
              <TextField id="Rpassword" label="password" margin="normal">Repeat Password</TextField>
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
