import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import { SvgIcon, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

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

class PickerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      color: {
        r: '0',
        g: '0',
        b: '0',
        a: '255',
      },
    };
  }

  handleButtonMouseDown = (e) => {
    e.preventDefault();
    this.setState({ displayColorPicker: !this.state.displayColorPicker });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    const { r, g, b, a } = color.rgb;
    this.props.toggleColor(`rgba(${r},${g},${b},${a})`);
  };

  render() {
    const pickerStyles = {
      popover: {
        position: 'absolute',
        zIndex: '2',
        marginTop: 4,
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px',
      },
      formatButton: {
        minWidth: 0,
        minHeight: 0,
        width: '1em',
        height: '3em',
      },
    };

    const picker = (
      <div style={pickerStyles.popover} onMouseDown={(e) => { e.preventDefault(); }}>
        <div
          style={pickerStyles.cover}
          onClick={this.handleClose}
        />
        <GithubPicker
          color={this.props.color || this.state.color}
          colors={['#B80000', '#FF6900', '#FCCB00', '#008B02', '#006B76', '#1273DE', '#004DCF',
            '#5300EB', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#000000']}
          triangle="hide"
          onChange={this.handleChange}
        />
      </div>
    );

    return (
      <div>
        <Button
          color="primary"
          variant="outlined"
          style={pickerStyles.formatButton}
          onMouseDown={this.handleButtonMouseDown}
        >
          <TextColorIcon color={this.props.color
            || `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`}
          /></Button>
        { this.state.displayColorPicker ? picker : null }
      </div>
    );
  }
}

export default PickerComponent;
