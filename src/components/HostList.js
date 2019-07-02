import React from 'react'
import { Card } from 'semantic-ui-react'
import Host from './Host.js'

const HostList = (props) => {
  return(
    <Card.Group itemsPerRow={6}>
    	{props.hosts.map(host => <Host key={"host-"+host.id} host={host} clickHost={props.clickHost} />)}
    </Card.Group>
  )
}

export default HostList
