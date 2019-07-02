import React from 'react';
import { Segment } from 'semantic-ui-react'
import HostList from './HostList.js'

const ColdStorage = (props) => (
  <Segment.Group className="HQComps">
    <Segment compact>
      <h3 className="labels">ColdStorage</h3>
    </Segment>

    <Segment compact>
    	<HostList hosts={props.getCSHosts()} host={props.host} clickHost={props.clickHost} />
    </Segment>
  </Segment.Group>
)

export default ColdStorage
