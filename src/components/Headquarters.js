import React, { Component } from 'react';
import '../stylesheets/Headquarters.css';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import LogPanel from './LogPanel.js'
import ColdStorage from './ColdStorage.js'


const Headquarters = function(props) {
  return(
    <Grid celled='internally'>
      <Grid.Column width={8}>
        <ColdStorage
          hosts={props.hosts}
          getCSHosts={props.getCSHosts}
          clickHost={props.clickHost} />
      </Grid.Column>

      <Grid.Column width={5}>
        <Details
          host={props.host}
          areas={props.areas}
          changeHostAttribute={props.changeHostAttribute} />
      </Grid.Column>

      <Grid.Column width={3}>
        <LogPanel
          hosts={props.hosts}
          logs={props.logs}
          changeEveryActive={props.changeEveryActive} />
      </Grid.Column>
    </Grid>
  )
}

export default Headquarters;
