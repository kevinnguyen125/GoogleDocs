import React from 'react';
import { Button, Grid, List, ListItem, FormControl, Select, MenuItem, SvgIcon, Input, InputAdornment } from '@material-ui/core';
import { FormatBold, FormatItalic, FormatUnderlined, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import PropTypes from 'prop-types';
import styles from './styles';

// ZZZZZZ - uncomment onMouseDown, pass all as Props in an object. key=eventname, value=callback.

// Text Color Icon w/ Custom Color
function TextColorIcon(props) {
  return (
    <SvgIcon>
      <path d="M0 0h24v24H0z" fill="none" />
      <path fillOpacity="1" d="M0 20h24v4H0z" color={props.color} />
      <path d="M11 3L5.5 17h2.25l1.12-3h6.25l1.12 3h2.25L13 3h-2zm-1.38 9L12 5.67 14.38 12H9.62z" />
    </SvgIcon>
  );
}
TextColorIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

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
            <Button
              color="primary"
              variant="outlined"
              style={this.styles.formatButton}
              // onMouseDown={e => this.onColorClick(e)}
            >
              <TextColorIcon color="#0000FF" /></Button>
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
