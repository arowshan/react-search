import React, { Component } from 'react';

class ResultCard extends Component {

  render() {
    return (
      <ul>
        <li>template:</li>
        <li>Position: {this.props.result.position}</li>
        <li>State: {this.props.result.state}</li>
        <li>City: {this.props.result.city}</li>
      </ul>
    );
  }
  
}

export default ResultCard;
