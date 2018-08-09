import React from 'react';
import { Button, Grid, List, ListItem, FormControl, Select, MenuItem, Input, InputAdornment } from '@material-ui/core';
import { FormatBold, FormatItalic, FormatUnderlined, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import ColorPicker from './ColorPicker';
import styles from '../styles';

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
                  input={<Input startAdornment={<InputAdornment position="start"><FormatSize color="primary" /></InputAdornment>} />}
                  autoWidth
                  onClick={this.props.f}
                >
                  <MenuItem value={12} onMouseDown={this.props.clickHandlers.fontSize}>12</MenuItem>
                  <MenuItem value={14} onMouseDown={this.props.clickHandlers.fontSize}>14</MenuItem>
                  <MenuItem value={16} onMouseDown={this.props.clickHandlers.fontSize}>16</MenuItem>
                  <MenuItem value={18} onMouseDown={this.props.clickHandlers.fontSize}>18</MenuItem>
                  <MenuItem value={20} onMouseDown={this.props.clickHandlers.fontSize}>20</MenuItem>
                  <MenuItem value={24} onMouseDown={this.props.clickHandlers.fontSize}>24</MenuItem>
                  <MenuItem value={36} onMouseDown={this.props.clickHandlers.fontSize}>36</MenuItem>
                </Select>
              </FormControl>
            </form>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.alignLeft}
            >
              <FormatAlignLeft /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.alignCenter}
            >
              <FormatAlignCenter /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.alignRight}
            >
              <FormatAlignRight /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.alignJustify}
            >
              <FormatAlignJustify /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.bulletPoint}
            >
              <FormatListBulleted /></Button>
          </ListItem>
          <ListItem style={this.styles.horizFlex0}>
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              onMouseDown={this.props.clickHandlers.numbered}
            >
              <FormatListNumbered /></Button>
          </ListItem>
        </List>
      </Grid>
    );
  }
}
