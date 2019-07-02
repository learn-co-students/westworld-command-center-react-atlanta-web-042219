import '../stylesheets/HostInfo.css'
import React, { Component } from 'react'
import { Radio, Icon, Card, Grid, Image, Dropdown, Divider } from 'semantic-ui-react'


class HostInfo extends Component {

  areaOptions = ()=> this.props.areas.map(area => {
    return {
      key: area.name,
      text: area.name.split('_').map(word => word[0].toUpperCase()+word.slice(1)).join(' '),
      value: area.name
    }
  })

  toggle = () => {
    console.log("The radio button fired");
  }

  render(){
    return (
      <Grid>
        <Grid.Column width={6}>
          <Image
            src={this.props.host.imageUrl}
            floated='left'
            size='small'
            className="hostImg"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card>
            <Card.Content>
              <Card.Header>{this.props.host.firstName+' '+this.props.host.lastName} | { this.props.host.gender === 'Male' ? <Icon name='man' /> : <Icon name='woman' />}</Card.Header>
              <Card.Meta>
                <Radio
                  onChange={(e)=> this.props.changeHostAttribute('active', !this.props.host.active)}
                  label={this.props.host.active ? 'Active' : 'Decommissioned'}
                  checked={this.props.host.active}
                  slider
                />
              </Card.Meta>

              <Divider />
              Current Area:
              <Dropdown
                onChange={(e, {value})=> this.props.changeHostAttribute('area', value) }
                value={this.props.host.area}
                options={this.areaOptions()}
                selection
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    )
  }
}

export default HostInfo
