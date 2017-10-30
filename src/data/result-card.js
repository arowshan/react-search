import React, { Component } from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';

import './result-card.css';

class ResultCard extends Component {

  render() {
    return (
      <Card>
        <CardTitle title={this.props.result.MatchedObjectDescriptor.PositionTitle} 
        subtitle={this.props.result.MatchedObjectDescriptor.PositionSchedule[0].Name} />
          <CardText>
            <ul>
              <li><span className="list__title">Job ID: </span>{this.props.result.MatchedObjectId}</li>
              <li><span className="list__title">Organization: </span>{this.props.result.MatchedObjectDescriptor.OrganizationName}</li> 
              <li><span className="list__title">Department: </span>{this.props.result.MatchedObjectDescriptor.DepartmentName}</li>
              <li><span className="list__title">Location: </span>{this.props.result.MatchedObjectDescriptor.PositionLocationDisplay}</li>
              <hr/>
              <li><span className="list__title">Qualification Summary: </span>{this.props.result.MatchedObjectDescriptor.QualificationSummary}</li>
            </ul>
          </CardText>
      </Card>

    );
  }
  
}

export default ResultCard;
