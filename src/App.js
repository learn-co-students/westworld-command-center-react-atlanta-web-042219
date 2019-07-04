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
    logs: [Log.notify('Welcome to Westworld.')]
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

    // let name = newHost.firstName+' '+newHost.lastName
    let newLog = null

    if(attr === 'active') {
      newLog = value ? Log.warn(newHost.firstName+' has been activated!') : Log.notify(newHost.firstName+' has been decommissioned.')
      newHost.area = 'cold_storage'
    }
    else if(attr === 'area' && newHost.active) {
      let newArea = this.state.areas.find(area => area.name === value)
      newLog = Log.notify(`${newHost.firstName} moved from ${this.state.host.area} to ${newHost.area}.`)

      if(newArea.auth_req && !newHost.authorized) {
        newLog = Log.error(`${newHost.firstName} tried to move from ${this.state.host.area} to ${newHost.area}, but was denied access.`)
        newHost = this.state.host
        newHosts = this.state.hosts
      }
      else if(newArea.limit <= this.getAreaHosts(newArea).length ) {
        newLog = Log.error(`${newHost.firstName} tried to move from ${this.state.host.area} to ${newHost.area}, but that area was full.`)
        newHost = this.state.host
        newHosts = this.state.hosts
      }
    }

    // ... 

    this.setState({
      host: newHost,
      hosts: newHosts,
      logs: [newLog, ...this.state.logs]
    })
  }

  changeEveryActive = (bool)=> {
    let newLog = bool ? Log.warn('Everyone has been activated!') : Log.notify('Everyone has been decommissioned!')
    let newHost = { ...this.state.host, active: bool}
    let newHosts = this.state.hosts.map(host => {
      host.active = bool
      return host
    })
    this.setState({
      host: newHost,
      hosts: newHosts,
      logs: [newLog, ...this.state.logs]
    })
  }


  getCSHosts = ()=> this.state.hosts.filter(host => !host.active || host.area === 'cold_storage')

  getAreaHosts = (area)=> {
    return this.state.hosts.filter(host => host.active && host.area === area.name)
  }

  componentDidMount() {
    fetch('http://localhost:3000/hosts')
    .then(resp => resp.json())
    .then(hosts => this.setState({ hosts: hosts }))

    fetch('http://localhost:3000/areas')
    .then(resp => resp.json())
    .then(areas => this.setState({ areas: areas }))
  }

  // patchHost = host => {
  //   fetch('http://localhost:3000/hosts/'+host.id,{
  //     method: 'POST/PATCH/DELETE',
  //     headers: {Accept: 'application/json', 'Content-Type':'application/json'},
  //     body: JSON.stringify( host )
  //   })
  // }

  render(){
    return (
      <Segment id='app'>
        <Headquarters
          host={this.state.host}
          hosts={this.state.hosts}
          logs={this.state.logs}
          changeEveryActive={this.changeEveryActive}
          getCSHosts={this.getCSHosts}
          areas={this.state.areas}
          clickHost={this.clickHost}
          changeHostAttribute={this.changeHostAttribute} />

        <WestworldMap
          host={this.state.host}
          areas={this.state.areas}
          getAreaHosts={this.getAreaHosts}
          clickHost={this.clickHost} />
      </Segment>
    )
  }
}

export default App;
