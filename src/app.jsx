import React from 'react';
import { Button, Grid, Paper } from '@material-ui/core';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';

import styles from './styles';
import DocsAppBar from './Components/DocsAppBar';
import FormatToolbar from './Components/FormatToolbar';
import { colorPickerPlugin } from './Components/ColorPicker';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = {
      editorState: EditorState.createEmpty(),
      styling: styles.mainEditor,
    };
    this.updateEditorState = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;
    this.picker = colorPickerPlugin(this.updateEditorState, this.getEditorState);
    this.setDomEditorRef = (ref) => {
      this.domEditor = ref;
    };
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  saveToDB = () => {
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

    postData('http://192.168.7.132:8080/api/v1/Document', {
      owner: '5b6a2349e091a31ebb4bffeb',
      password: 'hocho',
      content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent())),
    })
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error));
  }

  loadFromDB = () => {
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

    getData('http://192.168.7.132:8080/api/v1/Document/5b6ab41327610623374dcfdf')
      .then((data) => {
        console.log(data.content);
        this.setState({ editorState:
          EditorState.createWithContent(convertFromRaw(JSON.parse(data.content))) });
      }) // JSON from `response.json()` call
      .catch(error => console.error(error));
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
    console.count('RENDER-APP');

    const clickHandlers = {
      bold: this.onBoldClick,
      italic: this.onItalicClick,
      underline: this.onUnderlineClick,
    };

    return (<div>
      <DocsAppBar />

      <div style={{ marginTop: 30 }}>
        <Grid container justify="center" spacing={8}>
          <FormatToolbar clickHandlers={clickHandlers} updateES={this.updateEditorState} getES={this.getEditorState} picker={this.picker} />
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
                onChange={this.updateEditorState}
                ref={this.setDomEditorRef}
                customStyleFn={this.picker.customStyleFn}
              />
            </Paper>
            <Button variant="raised" color="primary" onClick={this.saveToDB}>Save</Button>
            <Button variant="raised" color="primary" onClick={this.loadFromDB}>Load</Button>
          </Grid>
        </Grid>
      </div>

    </div>);
  }
}
