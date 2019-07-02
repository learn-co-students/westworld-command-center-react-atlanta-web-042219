import React from 'react';
import '../stylesheets/Area.css'
import HostList from './HostList'

const Area = (props) => (
  <div className='area' id={props.area.name}>
    <h3 className='labels'>{props.area.name.split('_').map(word => word[0].toUpperCase()+word.slice(1)).join(' ')}</h3>
    <HostList host={props.host} hosts={props.hosts} clickHost={props.clickHost} />
  </div>
)

Area.propTypes = {
  hosts: function(props, propName, componentName){
    if(props.hosts.length > props.limit){
      throw Error(
        `HEY!! You got too many hosts in ${props.name}. The limit for that area is ${props.limit}. You gotta fix that!`
      )
    }
  }
}

export default Area;
