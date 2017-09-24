import React, { Component } from 'react';

export default class Field extends Component {
  render() {
    const { type, value, name, placeholder, onChange } = this.props;
    const styles = {
      padding: '10px',
      width: '75%'
    };

    return (
      <input
        onChange={onChange}
        style={styles}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
      />
    );
  }
}