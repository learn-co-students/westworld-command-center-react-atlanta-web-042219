import React from 'react';
import '../stylesheets/Host.css'
import { Card } from 'semantic-ui-react'

const Host = (props) => {

  return(
    <Card
      className={props.host.id === props.thisHost.id ? 'host selected' : 'host' }
      onClick={(e)=> props.clickHost(props.thisHost)}
      image={props.thisHost.imageUrl}
      raised
    />
  )
}

export default Host
