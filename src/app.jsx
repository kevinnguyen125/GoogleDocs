import React from 'react';
import { Button, Grid, Paper, AppBar, Toolbar, IconButton, List, ListItem,
         FormControl, Select, MenuItem } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
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
          </Grid>
        </Grid>
      </div>

    </div>);
  }
}
