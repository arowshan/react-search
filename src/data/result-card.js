import React, { Component } from 'react';

class ResultCard extends Component {

  render() {
    return (
      <ul>
        <li>ID: {this.props.result.userId}</li>
        <li>userId: {this.props.result.id}</li>
        <li>Text: {this.props.result.title}</li>
      </ul>
    );
  }
  
}

export default ResultCard;
