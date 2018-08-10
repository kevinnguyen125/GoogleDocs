import React from 'react';
import { Button, Grid, List, ListItem, FormControl, Select, MenuItem, Input, InputAdornment, Tooltip } from '@material-ui/core';
import { FormatBold, FormatItalic, FormatUnderlined, FormatSize,
         FormatAlignLeft, FormatAlignCenter, FormatAlignRight, FormatAlignJustify, FormatListBulleted, FormatListNumbered } from '@material-ui/icons/';
import ColorPicker from './ColorPicker';

const styles = {
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
  flexContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 0,
  },
};

export default class FormatToolbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFontSizeTooltip: false,
    };
  }

  render() {
    return (
      <Grid item xs={8}>
        <List style={styles.flexContainer}>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Bold" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.bold}
              >
                <FormatBold /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Italic" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.italic}
              >
                <FormatItalic /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Underline" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.underline}
              >
                <FormatUnderlined /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <ColorPicker
              toggleColor={color => this.props.picker.addColor(color)}
              color={this.props.picker.currentColor(this.props.getES())}
            />
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <form style={{ height: '2.5em' }}>
              <FormControl style={styles.formControl}>
                <Tooltip title="Font Size" placement="bottom" enterDelay={400} leaveDelay={200} open={this.state.showFontSizeTooltip}>
                  <Select
                    value={this.props.currFontSize}
                    input={<Input startAdornment={<InputAdornment position="start"><FormatSize color="primary" /></InputAdornment>} />}
                    autoWidth
                    onClick={this.props.focus}
                    onMouseEnter={() => this.setState({ showFontSizeTooltip: true })}
                    onMouseLeave={() => this.setState({ showFontSizeTooltip: false })}
                  >
                    <MenuItem value={16} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>16</MenuItem>
                    <MenuItem value={20} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>20</MenuItem>
                    <MenuItem value={24} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>24</MenuItem>
                    <MenuItem value={28} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>28</MenuItem>
                    <MenuItem value={32} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>32</MenuItem>
                    <MenuItem value={36} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>36</MenuItem>
                    <MenuItem value={40} onMouseDown={this.props.clickHandlers.fontSize} onMouseOver={() => this.setState({ showFontSizeTooltip: false })}>40</MenuItem>
                  </Select>
                </Tooltip>
              </FormControl>
            </form>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Align Left" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.alignLeft}
              >
                <FormatAlignLeft /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Align Center" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.alignCenter}
              >
                <FormatAlignCenter /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Align Right" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.alignRight}
              >
                <FormatAlignRight /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Justify" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.alignJustify}
              >
                <FormatAlignJustify /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Bulleted List" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.bulletPoint}
              >
                <FormatListBulleted /></Button>
            </Tooltip>
          </ListItem>
          <ListItem style={styles.horizFlex0}>
            <Tooltip title="Numbered List" placement="bottom" enterDelay={400} leaveDelay={200}>
              <Button
                color="primary"
                variant="outlined"
                style={styles.formatButton}
                onMouseDown={this.props.clickHandlers.numbered}
              >
                <FormatListNumbered /></Button>
            </Tooltip>
          </ListItem>
        </List>
      </Grid>
    );
  }
}
