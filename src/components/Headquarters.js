import React from 'react';
import { Grid } from 'semantic-ui-react';
import Details from './Details'
import LogPanel from './LogPanel.js'
import ColdStorage from './ColdStorage.js'
import '../stylesheets/Headquarters.css';


const Headquarters = props => {
  return(
    <Grid celled='internally'>
      <Grid.Column width={7}>
        <ColdStorage
          hosts={props.hosts}
          host={props.host}
          getCSHosts={props.getCSHosts}
          clickHost={props.clickHost} />
      </Grid.Column>

      <Grid.Column width={5}>
        <Details
          host={props.host}
          areas={props.areas}
          changeHostAttribute={props.changeHostAttribute} />
      </Grid.Column>

      <Grid.Column width={4}>
        <LogPanel
          hosts={props.hosts}
          logs={props.logs}
          changeEveryActive={props.changeEveryActive} />
      </Grid.Column>
    </Grid>
  )
}

export default Headquarters;
