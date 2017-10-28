import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ResultCard extends Component {

  render() {
    return (
      <Card>
        <CardTitle title={this.props.result.id} subtitle="Card subtitle" />
          <CardText>
            <ul>
              <li>ID: {this.props.result.id}</li>
              <li>userId: {this.props.result.userId}</li>
              <li>Text: {this.props.result.title}</li>
            </ul>
          </CardText>
      </Card>

    );
  }
  
}

export default ResultCard;
