import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItemIcon, ListItem, ListItemText,
         Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Slide, ListSubheader,
         Grid, Paper, Tooltip, Snackbar, CircularProgress } from '@material-ui/core/';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, Menu as MenuIcon, Description as DescriptionIcon,
         Cancel as CancelIcon, AccountBox as AccountBoxIcon, Save as SaveIcon, NoteAdd as NoteAddIcon, Delete as DeleteIcon,
         Close as CloseIcon } from '@material-ui/icons/';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import createStyles from 'draft-js-custom-styles';
import FormatToolbar from './Components/FormatToolbar';
import { colorPickerPlugin } from './Components/ColorPicker';

function DocsLogo() {
  return (
    <IconButton disabled>
      <img
        alt="GoogleDocsLogo"
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0
        iMHB4IgogICAgIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIKICAgICB2aWV3Qm94PSIwIDAgNDggNDgiCiAgICAgc3R5bGU9ImZpbGw6Iz
        AwMDAwMDsiPjxnIGlkPSJzdXJmYWNlMSI+PHBhdGggc3R5bGU9IiBmaWxsOiMyMTk2RjM7IiBkPSJNIDM3IDQ1IEwgMTEgNDUgQyA5L
        jM0Mzc1IDQ1IDggNDMuNjU2MjUgOCA0MiBMIDggNiBDIDggNC4zNDM3NSA5LjM0Mzc1IDMgMTEgMyBMIDMwIDMgTCA0MCAxMyBMIDQw
        IDQyIEMgNDAgNDMuNjU2MjUgMzguNjU2MjUgNDUgMzcgNDUgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6I0JCREVGQjsiIGQ
        9Ik0gNDAgMTMgTCAzMCAxMyBMIDMwIDMgWiAiPjwvcGF0aD48cGF0aCBzdHlsZT0iIGZpbGw6IzE1NjVDMDsiIGQ9Ik0gMzAgMTMgTC
        A0MCAyMyBMIDQwIDEzIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFM0YyRkQ7IiBkPSJNIDE1IDIzIEwgMzMgMjMgTCAzM
        yAyNSBMIDE1IDI1IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFM0YyRkQ7IiBkPSJNIDE1IDI3IEwgMzMgMjcgTCAzMyAy
        OSBMIDE1IDI5IFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFM0YyRkQ7IiBkPSJNIDE1IDMxIEwgMzMgMzEgTCAzMyAzMyB
        MIDE1IDMzIFogIj48L3BhdGg+PHBhdGggc3R5bGU9IiBmaWxsOiNFM0YyRkQ7IiBkPSJNIDE1IDM1IEwgMjUgMzUgTCAyNSAzNyBMID
        E1IDM3IFogIj48L3BhdGg+PC9nPjwvc3ZnPg=="
        height={40}
        width={40}
      />
    </IconButton>
  );
}

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
    .then(response => (response.status !== 401 ? response.json() : 401)) // parses response to JSON
    .catch(error => console.error('Fetch Error =\n', error));
};

const patchData = (url = '', data = {}) => {
  // Default options are marked with *
  return fetch(url, {
    method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
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

const deleteData = (url = '') => {
  // Default options are marked with *
  return fetch(url, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
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
    .catch(error => console.error('Fetch Error =\n', error));
};

const drawerWidth = 300;

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
  setDocInfoButton: {
    marginTop: '1em',
    marginLeft: '1em',
  },
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4,
  },
});

function TransitionRight(props) {
  return <Slide direction="right" {...props} />;
}

function TransitionUp(props) {
  return <Slide direction="up" {...props} />;
}

const customStyleMap = {}; // Don't need anymore if not doing anything fancy!
// [12, 14, 16, 18, 20, 24, 36].forEach((x) => { customStyleMap[`text${x}`] = { fontSize: x }; });
// this.updateEditorState(RichUtils.toggleInlineStyle(this.state.editorState, `text${size}`));

/* draft-js-custom-styles builds functions for toggling css properties */
const { styles: formatStyles, customStyleFn: editorCustomStyleFn } = createStyles(['font-size', 'color', 'background-color'], customStyleMap);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerOpen: false,
      loginOpen: false,
      signupOpen: false,
      docInfoOpen: false,
      invalidLogin: false,
      isLoggedIn: false,
      notifyMsgOpen: false,
      documentsLoading: false,
      initialDocsLoad: false,
      notifyMsg: '',
      loginUsername: '',
      loginPassword: '',
      signupUsername: '',
      signupPassword: '',
      signupPasswordRepeat: '',
      loggedInAs: '',
      currUserId: '',
      documentTitle: 'Untitled (Not Saved)',
      documentPassword: '',
      documentId: '',
      editorFocused: null,
      editorState: EditorState.createEmpty(),
      editorFontSize: 16,
      documents: [],
      sharedDocuments: [],
    };
    this.setDomEditorRef = (ref) => {
      this.domEditor = ref;
    };
    this.updateEditorState = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.updateEditorState, this.getEditorState);
    this.joinedCustomStyleFn = (x) => {
      return editorCustomStyleFn(x) || this.picker.customStyleFn(x);
    };
  }

  componentDidUpdate() {
    console.count('DID UPDATE');
  }

  handleLoginClose = () => {
    this.setState({ loginOpen: false, loginUsername: '', loginPassword: '', invalidLogin: false });
  };

  handleLoginSubmit = () => {
    postData('http://172.16.1.178:8080/login', {
      username: this.state.loginUsername,
      password: this.state.loginPassword,
    })
    .then((data) => {
      if (data !== 401) {
        this.setState({ loggedInAs: this.state.loginUsername, currUserId: data.id, notifyMsgOpen: true, notifyMsg: 'Successfully Logged In!' },
          () => { this.handleLoginClose(); this.loadDocList(); });
      } else {
        this.setState({ invalidLogin: true });
      }
    })
    .catch(error => console.error(error));
  };

  handleSignupClose = () => {
    this.setState({ signupOpen: false, signupUsername: '', signupPassword: '', signupPasswordRepeat: '' });
  };

  handleSignupSubmit = () => {
    postData('http://172.16.1.178:8080/signup', {
      username: this.state.signupUsername,
      password: this.state.signupPassword,
      passwordRepeat: this.state.signupPasswordRepeat,
    })
    .then((data) => { console.log(data); this.handleSignupClose(); this.setState({ notifyMsgOpen: true, notifyMsg: 'Succesfully signed up!' }); })
    .catch(error => console.error(error));
  }

  handleLogoutSubmit = () => {
    getData('http://172.16.1.178:8080/logout')
    .then(() => {
      this.setState({
        loggedInAs: false,
        currUserId: '',
        documents: [],
        documentTitle: 'Untitled (Not Saved)',
        documentPassword: '',
        documentId: '',
        editorState: EditorState.createEmpty(),
        initialDocsLoad: false,
        notifyMsgOpen: true,
        notifyMsg: 'Successfully logged out!',
      });
    })
    .catch(error => console.error(error));
  }

  loadDocList = () => {
    if (!this.state.initialDocsLoad) {
      this.setState({ documentsLoading: true, initialDocsLoad: true });
    }
    getData('http://172.16.1.178:8080/getDocuments')
      .then((docs) => {
        setTimeout(() => this.setState({ documents: docs, documentsLoading: false }), this.state.documentsLoading ? 3000 : 0);
      })
      .catch(err => console.log(err));
  }

  handleLoadDoc = (id) => {
    console.log('ID:', id);
    getData(`http://172.16.1.178:8080/api/v1/Document/${id}`)
      .then(({ content, title, password, _id }) => {
        this.setState({
          documentId: _id,
          documentTitle: title,
          documentPassword: password,
          editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(content))),
        });
      })
      .catch(err => console.log(err));
  }

  handleSaveDoc = () => {
    if (!this.state.documentId) {
      postData('http://172.16.1.178:8080/api/v1/Document', {
        owner: this.state.currUserId,
        title: this.state.documentTitle,
        password: this.state.documentPassword,
        content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
        collaborators: [],
      })
      .then((data) => { console.log(data); this.setState({ documentId: data._id }, this.loadDocList); })
      .catch(error => console.error(error));
    } else {
      patchData(`http://172.16.1.178:8080/api/v1/Document/${this.state.documentId}`, {
        title: this.state.documentTitle,
        password: this.state.documentPassword,
        content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
      })
      .then(data => console.log(data))
      .catch(error => console.error(error));
    }
  }

  handleNewDoc = () => {
    this.setState({
      documentTitle: 'Untitled (Not Saved)',
      documentPassword: '',
      documentId: '',
      editorState: EditorState.createEmpty(),
      notifyMsgOpen: true,
      notifyMsg: 'Successfully created new document!',
    });
  }

  handleDeleteDoc = () => {
    if (this.state.documentId) {
      deleteData(`http://172.16.1.178:8080/api/v1/Document/${this.state.documentId}`)
        .then((data) => {
          console.log(data);
          this.setState({
            documentTitle: 'Untitled (Not Saved)',
            documentPassword: '',
            documentId: '',
            editorState: EditorState.createEmpty(),
            notifyMsgOpen: true,
            notifyMsg: 'Successfully deleted document!',
            documents: this.state.documents.filter(d => d._id !== this.state.documentId),
          });
        })
        .catch(err => console.log(err));
    }
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

  onAlignCenterClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, 'text-align-center'));
  }

  onAlignLeftClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, 'text-align-left'));
  }

  onAlignRightClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, 'text-align-right'));
  }

  onAlignJustifyClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, 'text-align-justify'));
  }

  onFontSizeClick = (e) => {
    e.preventDefault();
    const fontSize = Number(e.target.getAttribute('data-value'));
    this.updateEditorState(formatStyles.fontSize.toggle(this.state.editorState, `${fontSize}px`));
    this.setState({ editorFontSize: fontSize });
  }

  onBulletPointClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item'));
  }

  onNumberedClick = (e) => {
    e.preventDefault();
    this.updateEditorState(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item'));
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
          <Typography variant="title" style={{ marginRight: '1em', fontWeight: 'bold' }}>Documents List</Typography>
          <IconButton onClick={() => this.setState({ drawerOpen: false })}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        {this.state.loggedInAs ? null :
        <Button variant="contained" color="primary" onClick={() => this.setState({ loginOpen: true })} style={{ margin: '5px 10px 5px 10px' }}>
          Login <ChevronRightIcon /></Button>}
        {this.state.loggedInAs ? null : <Divider />}
        {this.state.loggedInAs ? null :
        <Button variant="contained" color="primary" onClick={() => this.setState({ signupOpen: true })} style={{ margin: '5px 10px 5px 10px' }}>
          Sign Up <AccountBoxIcon /></Button>}
        {this.state.loggedInAs ?
          <Button variant="contained" color="secondary" onClick={this.handleLogoutSubmit} style={{ margin: '5px 10px 5px 10px' }}>
            Logout <AccountBoxIcon /></Button> : null}
        <Divider />
        <List subheader={<div><ListSubheader style={{ fontSize: 16, color: 'black', borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)' }}>
          {this.state.loggedInAs ? `Logged In As: ${this.state.loggedInAs}` : 'Not Logged In.'}</ListSubheader>
          <ListSubheader style={{ fontSize: 16 }}>Your Documents ({this.state.documents.length})</ListSubheader><Divider /></div>}
        >
          <div style={{ height: 310, overflow: 'auto', borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)' }}>
            { this.state.documentsLoading ?
              <CircularProgress size={50} style={{ color: '#00b0ff', marginLeft: '7.5em', marginTop: '7.5em', marginBottom: '1em' }} /> :
            this.state.documents.map((doc) => {
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
        <List subheader={<div><ListSubheader style={{ fontSize: 16 }}>Documents Shared to You ({this.state.sharedDocuments.length})</ListSubheader><Divider /></div>}>
          <div style={{ maxHeight: 310, overflow: 'auto', borderBottom: 'solid 1px rgba(0, 0, 0, 0.12)' }}>
            <ListItem>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Work in Progress" />
            </ListItem>
          </div>
        </List>
      </Drawer>
    );

    const loginDialog = (
      <Dialog
        TransitionComponent={TransitionRight}
        open={this.state.loginOpen}
        onClose={this.handleLoginClose}
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please login to view and edit your documents.
          </DialogContentText>
          {this.state.invalidLogin ? <DialogContentText style={{ color: 'red' }}>
            Invalid username or password.
          </DialogContentText> : null}
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
        TransitionComponent={TransitionRight}
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

    const docInfoDialog = (
      <Dialog
        TransitionComponent={TransitionUp}
        open={this.state.docInfoOpen}
      >
        <DialogTitle>Document Information</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edit the following fields and press the save button to save.
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="normal"
            label="Document Title"
            value={this.state.documentTitle}
            onChange={e => this.setState({ documentTitle: e.target.value })}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Document Password"
            value={this.state.documentPassword}
            onChange={e => this.setState({ documentPassword: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({ docInfoOpen: false })} color="primary">
            Done <ChevronRightIcon />
          </Button>
        </DialogActions>
      </Dialog>
    );

    const clickHandlers = {
      bold: this.onBoldClick,
      italic: this.onItalicClick,
      underline: this.onUnderlineClick,
      alignCenter: this.onAlignCenterClick,
      alignLeft: this.onAlignLeftClick,
      alignRight: this.onAlignRightClick,
      alignJustify: this.onAlignJustifyClick,
      fontSize: this.onFontSizeClick,
      bulletPoint: this.onBulletPointClick,
      numbered: this.onNumberedClick,
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
                onClick={() => this.setState({ drawerOpen: true })}
                className={classNames(classes.menuButton, drawerOpen && classes.hide)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="title" color="inherit" noWrap>
                <DocsLogo />
                Google Docs
              </Typography>
            </Toolbar>
          </AppBar>
          {drawer}
          {loginDialog}
          {signupDialog}
          {docInfoDialog}
          <main
            className={classNames(classes.content, classes['content-left'], {
              [classes.contentShift]: drawerOpen,
              [classes['contentShift-left']]: drawerOpen,
            })}
          >
            <div className={classes.drawerHeader} />

            <div id="editorContainer" style={{ marginTop: '2em' }}>
              <Grid container justify="center" spacing={8}>
                <Grid item xs={8} style={{ borderBottom: 'black solid 0.05em', marginBottom: '0.5em' }}>
                  <Grid container justify="center">
                    <Typography variant="title" style={{ fontSize: 30 }}>{this.state.documentTitle}</Typography>
                  </Grid>
                </Grid>
                <FormatToolbar
                  clickHandlers={clickHandlers}
                  updateES={this.updateEditorState}
                  getES={this.getEditorState}
                  picker={this.picker}
                  focus={() => setTimeout(this.domEditor.focus, 0)}
                  currFontSize={this.state.editorFontSize}
                />
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
                      customStyleMap={customStyleMap}
                      customStyleFn={this.joinedCustomStyleFn}
                      blockStyleFn={block => block.getType()}
                    />
                  </Paper>
                  <Tooltip title="New" placement="bottom">
                    <Button variant="fab" color="secondary" onClick={this.handleNewDoc} style={{ marginTop: '1em', backgroundColor: '#00c853' }}>
                      <NoteAddIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Delete" placement="bottom">
                    <Button variant="fab" color="secondary" onClick={this.handleDeleteDoc} style={{ marginTop: '1em', marginLeft: '1em' }}>
                      <DeleteIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="Save" placement="bottom">
                    <Button variant="fab" color="primary" onClick={this.handleSaveDoc} style={{ marginTop: '1em', marginLeft: '1em' }}>
                      <SaveIcon />
                    </Button>
                  </Tooltip>
                  <Button
                    variant="raised"
                    color="primary"
                    onClick={() => this.setState({ docInfoOpen: true })}
                    className={classes.setDocInfoButton}
                  >Set Document Information
                  </Button>
                  <Snackbar
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    open={this.state.notifyMsgOpen}
                    autoHideDuration={5000}
                    onClose={() => this.setState({ notifyMsgOpen: false, notifyMsg: '' })}
                    message={<span>{this.state.notifyMsg}</span>}
                    action={[
                      <Button key="ok" color="secondary" size="small" onClick={() => this.setState({ notifyMsgOpen: false, notifyMsg: '' })}>
                        OK
                      </Button>,
                      <IconButton
                        key="close"
                        color="inherit"
                        className={classes.close}
                        onClick={() => this.setState({ notifyMsgOpen: false, notifyMsg: '' })}
                      >
                        <CloseIcon key="closeIcon" />
                      </IconButton>,
                    ]}
                  />
                </Grid>
              </Grid>
            </div>

          </main>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(App);
