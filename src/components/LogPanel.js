import React from 'react'
import { Segment, Button } from 'semantic-ui-react';

const LogPanel = (props) => {

  const getLogs = ()=> props.logs.map((log, index) => <p key={index} className={log.type}>{log.msg}</p> )

  const renderAllButton = ()=> {
    let color = 'red'
    let content = 'ACTIVATE ALL'
    let bool = true
    if(props.hosts.filter(host => host.active).length === props.hosts.length) {
      color = 'blue'
      content = 'DECOMISSION ALL'
      bool = false
    }
    return (<Button fluid color={color} content={content} onClick={(e)=> props.changeEveryActive(bool)} />)
  }

  return(
    <Segment className="HQComps" id="logPanel">
      <pre>{getLogs()}</pre>
      {renderAllButton()}
    </Segment>
  )
}

export default LogPanel
