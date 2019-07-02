import React from 'react';
import { Segment } from 'semantic-ui-react';
import Area from './Area.js'


const WestworldMap = (props) => {
  return (
    <Segment id="map" >
      {props.areas.map(area => <Area key={'area'+area.id} area={area} host={props.host} hosts={props.getAreaHosts(area)} clickHost={props.clickHost} />)}
    </Segment>
  )
}

export default WestworldMap
