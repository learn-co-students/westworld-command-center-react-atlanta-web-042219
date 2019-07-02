import React, { Component } from 'react';
import './stylesheets/App.css'
import { Segment } from 'semantic-ui-react';
import WestworldMap from './components/WestworldMap.js'
import Headquarters from './components/Headquarters'
import { Log } from './services/Log'


class App extends Component {

  state = {
    host: {},
    hosts: [],
    areas: [],
    logs: []
  }

  addLog = (newLog)=> this.setState({ logs: {...this.state.logs, newLog} })

  clickHost = (host)=> {
    if( this.state.host.id !== host.id )
      this.setState({ host: host })
  }

  changeHostAttribute = (attr, value)=> {
    let newHost = { ...this.state.host, [attr]: value}
    let newHosts = this.state.hosts.map(host => {
      if(host.id === newHost.id) return newHost
      return host
    })

    // ...

    let name = newHost.firstName+' '+newHost.lastName
    let newLog = null

    if(attr === 'active')
      newLog = value ? Log.warn(name+' has been activated!') : Log.notify(name+' has been decomissioned.')
    else if(attr === 'area')
      newLog = Log.notify(`${name} has moved from ${this.state.host.area} to ${newHost.area}.`)

    // ... 

    this.setState({
      host: newHost,
      hosts: newHosts,
      logs: [newLog, ...this.state.logs]
    })
  }

  changeEveryActive = (bool)=> {
    let newHost = { ...this.state.host, active: bool}
    let newHosts = this.state.hosts.map(host => {
      host.active = bool
      return host
    })
    this.setState({
      host: newHost,
      hosts: newHosts
    })
  }

  // patchHost = (updatedHost?)=> {
  //   fetch('http://localhost:3000/hosts/'+host.id,{
  //     method: 'POST/PATCH/DELETE',
  //     headers: {Accept: 'application/json', 'Content-Type':'application/json'},
  //     body: JSON.stringify( host )
  //   })
  // }

  getAreaHosts = (areaName)=> this.state.hosts.filter(host => host.active && host.area === areaName)

  getCSHosts = ()=> this.state.hosts.filter(host => !host.active)

  componentDidMount() {
    fetch('http://localhost:3000/hosts')
    .then(resp => resp.json())
    .then(hosts => this.setState({ hosts: hosts }))

    fetch('http://localhost:3000/areas')
    .then(resp => resp.json())
    .then(areas => this.setState({ areas: areas }))
  }

  render(){
    // console.log('main host = ', this.state.host)
    // console.log('main hosts =',this.state.hosts)
    return (
      <Segment id='app'>
        <WestworldMap
          areas={this.state.areas}
          getAreaHosts={this.getAreaHosts}
          clickHost={this.clickHost} />

        <Headquarters
          host={this.state.host}
          hosts={this.state.hosts}
          logs={this.state.logs}
          changeEveryActive={this.changeEveryActive}
          getCSHosts={this.getCSHosts}
          areas={this.state.areas}
          clickHost={this.clickHost}
          changeHostAttribute={this.changeHostAttribute} />
      </Segment>
    )
  }
}

export default App;
