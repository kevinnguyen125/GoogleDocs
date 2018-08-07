import React from 'react';
import { Button, Grid, Paper, AppBar, Toolbar, IconButton, List, ListItem,
         FormControl, Select, MenuItem } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Menu, FormatBold, FormatItalic, FormatUnderlined, FormatColorText, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import styles from './styles';

window.tunnelIntoEditorState = EditorState;
window.tunnelIntoRichUtils = RichUtils;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styles;
    this.state = {
      editorState: EditorState.createEmpty(),
      styling: styles.mainEditor,
    };
    window.trickyState=this.state;
    window.trickyThis = this;
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
      <AppBar position="sticky">
        <Toolbar>
          <IconButton color="inherit">
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ marginTop: 30 }}>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={8}>
            <List style={flexContainer}>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onBoldClick(e)}
                >
                  <FormatBold /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onItalicClick(e)}
                >
                  <FormatItalic /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onUnderlineClick(e)}
                >
                  <FormatUnderlined /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onColorClick(e)}
                >
                  <FormatColorText /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onSizeClick(e)}
                >
                  <FormatSize /></IconButton>
                <form>
                  <FormControl style={this.styles.formControl}>
                    <Select
                      value={12}
                      // onChange={this.handleChange}
                      name="age"
                      displayEmpty
                      style={this.styles.selectEmpty}
                      autoWidth
                    >
                      <MenuItem value={12}>12</MenuItem>
                      <MenuItem value={14}>14</MenuItem>
                      <MenuItem value={16}>16</MenuItem>
                    </Select>
                  </FormControl>
                </form>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onAlignLeftClick(e)}
                >
                  <FormatAlignLeft /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onAlignCenterClick(e)}
                >
                  <FormatAlignCenter /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onAlignRightClick(e)}
                >
                  <FormatAlignRight /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onAlignBaselineClick(e)}
                >
                  <FormatAlignJustify /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onListBulletedClick(e)}
                >
                  <FormatListBulleted /></IconButton>
              </ListItem>
              <ListItem style={this.styles.horizFlex0}>
                <IconButton
                  color="primary"
                  style={this.styles.iconButton}
                  onMouseDown={e => this.onListNumberedClick(e)}
                >
                  <FormatListNumbered /></IconButton>
              </ListItem>
            </List>
          </Grid>
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
