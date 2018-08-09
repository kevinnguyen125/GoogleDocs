import React from 'react';
import { Button, Grid, List, ListItem, FormControl, Select, MenuItem, Input, InputAdornment } from '@material-ui/core';
import { FormatBold, FormatItalic, FormatUnderlined, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import ColorPicker from './ColorPicker';
import styles from '../styles';

// ZZZZZZ - uncomment onMouseDown, pass all as Props in an object. key=eventname, value=callback.

export default class FormatToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styles;
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
      <Grid item xs={8}>
        <List style={flexContainer}>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.bold}
            >
              <FormatBold /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.italic}
            >
              <FormatItalic /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.underline}
            >
              <FormatUnderlined /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <ColorPicker
              toggleColor={color => this.props.picker.addColor(color)}
              color={this.props.picker.currentColor(this.props.getES())}
            />
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <form style={{ height: '2.5em' }}>
              <FormControl style={this.styles.formControl}>
                <Select
                  value={12}
                  // onChange={this.handleChange}
                  name="size"
                  input={<Input startAdornment={<InputAdornment position="start"><FormatSize color="primary" /></InputAdornment>} />}
                  autoWidth
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={14}>14</MenuItem>
                  <MenuItem value={16}>16</MenuItem>
                  <MenuItem value={18}>18</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                </Select>
              </FormControl>
            </form>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              // onMouseDown={e => this.onAlignLeftClick(e)}
            >
              <FormatAlignLeft /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              // onMouseDown={e => this.onAlignCenterClick(e)}
            >
              <FormatAlignCenter /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              // onMouseDown={e => this.onAlignRightClick(e)}
            >
              <FormatAlignRight /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              // onMouseDown={e => this.onListBulletedClick(e)}
            >
              <FormatListBulleted /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              // onMouseDown={e => this.onListNumberedClick(e)}
            >
              <FormatListNumbered /></Button>
          </ListItem>
        </List>
      </Grid>
    );
  }
}