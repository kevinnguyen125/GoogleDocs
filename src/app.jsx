import React from 'react';
import { Button, Grid, Paper, AppBar, Toolbar, IconButton, List, ListItem,
         FormControl, Select, MenuItem } from '@material-ui/core';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { Menu, FormatBold, FormatItalic, FormatUnderlined, FormatColorText, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import styles from './styles';

import DocsAppBar from './DocsAppBar';
import FormatToolbar from './FormatToolbar';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = {
      editorState: EditorState.createEmpty(),
      styling: styles.mainEditor,
    };
    this.onChange = editorState => this.setState({ editorState });
    this.setDomEditorRef = (ref) => {
      this.domEditor = ref;
    };
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  saveToDB = () => {
    const postData = (url = ``, data = {}) => {
      // Default options are marked with *
        return fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    postData(`http://192.168.7.132:8080/api/v1/Document`, {
      owner: '5b6a2349e091a31ebb4bffeb',
      password: "hocho",
      content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    })
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error));
  }

  loadFromDB = () => {
    const getData = (url = ``, data = {}) => {
      // Default options are marked with *
        return fetch(url, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        })
        .then(response => response.json()) // parses response to JSON
        .catch(error => console.error(`Fetch Error =\n`, error));
    };

    getData(`http://192.168.7.132:8080/api/v1/Document/5b6a43bab4177520716f04b7`)
      .then(data => {
        console.log(data.content);
        this.setState({ editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))) });
      }) // JSON from `response.json()` call
      .catch(error => console.error(error));
  }

  roundTrip = ()=>{
    let a= JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()));
    console.log(JSON.parse(a));
    let b=EditorState.createWithContent(convertFromRaw(JSON.parse(a)));
    console.log("BNBBBBBBB", b);
    this.setState( {editorState : b});
  }

  onBoldClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  onItalicClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  onUnderlineClick(e) {
    e.preventDefault();
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }

  onColorClick(e) {
    e.preventDefault();
  }

  onSizeClick(e) {
    e.preventDefault();
  }

  onAlignLeftClick(e) {
    e.preventDefault();
  }

  onAlignCenterClick(e) {
    e.preventDefault();
  }

  onAlignRightClick(e) {
    e.preventDefault();
  }

  onAlignJustifyClick(e) {
    e.preventDefault();
  }

  onListBulletedClick(e) {
    e.preventDefault();
  }

  onListNumberedClick(e) {
    e.preventDefault();
  }

  render() {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
    };
    console.count('RENDER-APP');
    return (<div>
      <DocsAppBar />

      <div style={{ marginTop: 30 }}>
        <Grid container justify="center" spacing={8}>
          <FormatToolbar />
          <Grid item xs={8}>
            <Paper
              elevation={5}
              style={this.state.styling}
              onClick={() => this.domEditor.focus()}
              onFocus={() => this.setState({ styling: this.styles.mainEditorSelected })}
              onBlur={() => this.setState({ styling: this.styles.mainEditor })}
            >
              <Editor
                editorState={this.state.editorState}
                onChange={this.onChange}
                ref={this.setDomEditorRef}
              />
            </Paper>
            <Button onClick={this.saveToDB}>Save</Button>
            <Button onClick={this.loadFromDB}>Load</Button>
            <Button onClick={this.roundTrip}>RoundTrip</Button>
          </Grid>
        </Grid>
      </div>

    </div>);
  }
}
