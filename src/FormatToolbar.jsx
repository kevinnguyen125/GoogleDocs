import React from 'react';
import { Button, Grid, Paper, AppBar, Toolbar, IconButton, List, ListItem,
         FormControl, Select, MenuItem } from '@material-ui/core';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Menu, FormatBold, FormatItalic, FormatUnderlined, FormatColorText, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import styles from './styles';

// ZZZZZZ - uncomment onMouseDown, pass all as Props in an object. key=eventname, value=callback.

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styles;
    // this.state = {
    //   editorState: EditorState.createEmpty(),
    //   styling: styles.mainEditor,
    // };
    // this.onChange = editorState => this.setState({ editorState });
    // this.setDomEditorRef = (ref) => {
    //   this.domEditor = ref;
    // };
  }

  render() {
    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 0,
    };
    console.count('RENDER-TOOLBAR');
    return (
      <div>
        <Grid item xs={8}>
          <List style={flexContainer}>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onBoldClick(e)}
              >
                <FormatBold /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onItalicClick(e)}
              >
                <FormatItalic /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onUnderlineClick(e)}
              >
                <FormatUnderlined /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onColorClick(e)}
              >
                <FormatColorText /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onSizeClick(e)}
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
                // onMouseDown={e => this.onAlignLeftClick(e)}
              >
                <FormatAlignLeft /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onAlignCenterClick(e)}
              >
                <FormatAlignCenter /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onAlignRightClick(e)}
              >
                <FormatAlignRight /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onAlignBaselineClick(e)}
              >
                <FormatAlignJustify /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onListBulletedClick(e)}
              >
                <FormatListBulleted /></IconButton>
            </ListItem>
            <ListItem style={this.styles.horizFlex0}>
              <IconButton
                color="primary"
                style={this.styles.iconButton}
                // onMouseDown={e => this.onListNumberedClick(e)}
              >
                <FormatListNumbered /></IconButton>
            </ListItem>
          </List>
        </Grid>
      </div>
    );
  }
}
