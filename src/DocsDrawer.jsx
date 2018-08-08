import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItemIcon, ListItem, ListItemText,
         Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide, ListSubheader,
         Grid, Paper } from '@material-ui/core/';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon, Description as DescriptionIcon,
         Cancel as CancelIcon, AccountBox as AccountBoxIcon } from '@material-ui/icons/';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import FormatToolbar from './Components/FormatToolbar';
import { colorPickerPlugin } from './Components/ColorPicker';

const getData = (url = '') => {
  // Default options are marked with *
  return fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
            // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  })
    .then(response => response.json()) // parses response to JSON
    .catch(error => console.error('Fetch Error =\n', error));
};

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

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appFrame: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'absolute',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'appBarShift-left': {
    marginLeft: drawerWidth,
  },
  'appBarShift-right': {
    marginRight: drawerWidth,
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  'content-left': {
    marginLeft: -drawerWidth,
  },
  'content-right': {
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  'contentShift-left': {
    marginLeft: 0,
  },
  'contentShift-right': {
    marginRight: 0,
  },
  mainEditor: {
    padding: 20,
    height: 800,
    overflow: 'auto',
    border: 'grey solid 4px',
  },
  mainEditorSelected: {
    padding: 20,
    height: 800,
    overflow: 'auto',
    border: '3px solid #87CEFA',
    WebkitTransition: 'all 0.30s ease-in-out',
    MozTransition: 'all 0.30s ease-in-out',
    MsTransition: 'all 0.30s ease-in-out',
    OTransition: 'all 0.30s ease-in-out',
    outline: 'none',
  },
  formatButton: {
    minWidth: 0,
    minHeight: 0,
    width: '1em',
    height: '3em',
  },
  horizFlex0: {
    flex: 0,
    padding: '0.1em',
    height: '100%',
  },
  formControl: {
    margin: '0.2em',
    minWidth: 10,
  },
});

function Transition(props) {
  return <Slide direction="right" {...props} />;
}

class DocsDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      loginOpen: false,
      signupOpen: false,
      isLoggedIn: false,
      loginUsername: '',
      loginPassword: '',
      signupUsername: '',
      signupPassword: '',
      signupPasswordRepeat: '',
      loggedInAs: '',
      editorFocused: null,
      editorState: EditorState.createEmpty(),
      documents: [],
    };
    this.setDomEditorRef = (ref) => {
      this.domEditor = ref;
    };
    this.updateEditorState = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.updateEditorState, this.getEditorState);
  }

  componentDidMount() {
    // if (localStorage.getItem('LoggedIn'))
    getData('http://192.168.7.132:8080/getDocuments')
    .then((data) => {
      console.log('Got Documents Owned by User!');
      this.setState({ documents: data });
    })
    .catch(error => console.error(error));
  }

  componentDidUpdate() {
    console.count('DID UPDATE');
  }

  handleDrawerOpen = () => {
    this.setState({ drawerOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerOpen: false });
  };

  handleLoginOpen = () => {
    this.setState({ loginOpen: true });
  };

  handleLoginClose = () => {
    this.setState({ loginOpen: false, loginUsername: '', loginPassword: '' });
  };

  handleLoginSubmit = () => {
    // localStorage.setItem('LoggedIn', true);
    postData('http://192.168.7.132:8080/login', {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    })
    .then((data) => { console.log(data); this.setState({ loggedInAs: this.state.loginUsername }, this.handleLoginClose); })
    .catch(error => console.error(error));
  };

  handleSignupOpen = () => {
    this.setState({ signupOpen: true });
  };

  handleSignupClose = () => {
    this.setState({ signupOpen: false, signupUsername: '', signupPassword: '', signupPasswordRepeat: '' });
  };

  handleSignupSubmit = () => {
    postData('http://192.168.7.132:8080/signup', {
      username: this.state.signupUsername,
      password: this.state.signupPassword,
      passwordRepeat: this.state.signupPasswordRepeat,
    })
    .then((data) => { console.log(data); this.handleSignupClose(); })
    .catch(error => console.error(error));
  }

  handleLogoutSubmit = () => {
    getData('http://192.168.7.132:8080/logout')
    .then((data) => {
      console.log(data);
      this.setState({ loggedInAs: false, documents: [] });
    })
    .catch(error => console.error(error));
  }

  handleLoadDoc = (id) => {
    console.log('ID:', id);
  }

  onBoldClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  onUnderlineClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  render() {
    const { classes } = this.props;
    const { drawerOpen } = this.state;
    const drawer = (
      <Drawer
        variant="persistent"
        anchor="left"
        open={drawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {this.state.loggedInAs ? null :
        <Button variant="contained" color="primary" onClick={this.handleLoginOpen} style={{ marginBottom: 4 }}>Login <ChevronRightIcon /></Button>}
        {this.state.loggedInAs ? null :
        <Button variant="contained" color="primary" onClick={this.handleSignupOpen}>Sign Up <AccountBoxIcon /></Button>}
        {this.state.loggedInAs ?
          <Button variant="contained" color="secondary" onClick={this.handleLogoutSubmit}>Logout <AccountBoxIcon /></Button> : null}
        <Divider />
        <List subheader={<div><ListSubheader>{this.state.loggedInAs ? `Logged In As: ${this.state.loggedInAs}` : 'Not Logged In.'}</ListSubheader>
          <Divider /><ListSubheader>Your Documents</ListSubheader><Divider /></div>}
        >
          <div style={{ maxHeight: 300, overflow: 'auto' }}>
            {this.state.documents.map((doc) => {
              return (
                <ListItem key={doc._id} button onClick={() => this.handleLoadDoc(doc._id)}>
                  <ListItemIcon>
                    <DescriptionIcon />
                  </ListItemIcon>
                  <ListItemText primary={doc.title} />
                </ListItem>
              );
            })}
          </div>
        </List>
      </Drawer>
    );

    const loginDialog = (
      <Dialog
        TransitionComponent={Transition}
        open={this.state.loginOpen}
        onClose={this.handleLoginClose}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please login to view and edit your documents.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            label="Username"
            value={this.state.loginUsername}
            onChange={e => this.setState({ loginUsername: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            value={this.state.loginPassword}
            type="password"
            onChange={e => this.setState({ loginPassword: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleLoginClose} color="secondary">
            Cancel <CancelIcon />
          </Button>
          <Button onClick={this.handleLoginSubmit} color="primary">
            Login <ChevronRightIcon />
          </Button>
        </DialogActions>
      </Dialog>
    );

    const signupDialog = (
      <Dialog
        TransitionComponent={Transition}
        open={this.state.signupOpen}
        onClose={this.handleSignupClose}
      >
        <DialogTitle>Signup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sign up to save documents, edit them later, and collaborate with others.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            label="Username"
            value={this.state.signupUsername}
            onChange={e => this.setState({ signupUsername: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            value={this.state.signupPassword}
            type="password"
            onChange={e => this.setState({ signupPassword: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Repeat Password"
            value={this.state.signupPasswordRepeat}
            type="password"
            onChange={e => this.setState({ signupPasswordRepeat: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSignupClose} color="secondary">
            Cancel <CancelIcon />
          </Button>
          <Button onClick={this.handleSignupSubmit} color="primary">
            Sign Up <ChevronRightIcon />
          </Button>
        </DialogActions>
      </Dialog>
    );

    const clickHandlers = {
      bold: this.onBoldClick,
      italic: this.onItalicClick,
      underline: this.onUnderlineClick,
    };

    return (
      <div className={classes.root}>
        <div className={classes.appFrame}>
          <AppBar
            className={classNames(classes.appBar, {
              [classes.appBarShift]: drawerOpen,
              [classes['appBarShift-left']]: drawerOpen,
            })}
          >
            <Toolbar disableGutters={!drawerOpen}>
              <IconButton
                color="inherit"
                onClick={this.handleDrawerOpen}
                className={classNames(classes.menuButton, drawerOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                Google Docs
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          {loginDialog}
          {signupDialog}
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: drawerOpen,
              [classes['contentShift-left']]: drawerOpen,
            })}
          >
            <div className={classes.drawerHeader} />

            <div id="editorContainer" style={{ marginTop: 30 }}>
              <Grid container justify="center" spacing={8}>
                <FormatToolbar clickHandlers={clickHandlers} updateES={this.updateEditorState} getES={this.getEditorState} picker={this.picker} />
                <Grid item xs={8}>
                  <Paper
                    elevation={5}
                    className={this.state.editorFocused ? classes.mainEditorSelected : classes.mainEditor}
                    onClick={() => this.domEditor.focus()}
                    onFocus={() => this.setState({ editorFocused: true })}
                    onBlur={() => this.setState({ editorFocused: false })}
                  >
                    <Editor
                      editorState={this.state.editorState}
                      onChange={this.updateEditorState}
                      ref={this.setDomEditorRef}
                      customStyleFn={this.picker.customStyleFn}
                    />
                  </Paper>
                  <Button variant="raised" color="primary">Save</Button>
                </Grid>
              </Grid>
            </div>

          </main>
        </div>
      </div>
    );
  }
}

DocsDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DocsDrawer);
