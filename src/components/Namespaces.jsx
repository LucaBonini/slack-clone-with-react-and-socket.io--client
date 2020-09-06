import React from 'react';
import { Grid, Image } from 'semantic-ui-react'


function namespaces(props) {
  return (
    <Grid.Column width={1} className="namespaces-container">
      {props.namespaces.map(ns => {
        return (
          <Grid.Row key={ns.endpoint + ns.id} className="namespace">
            <Image src={ns.img} fluid={true} circular={true} bordered={true} onClick={() => props.selectNs(ns.endpoint)}></Image>
          </Grid.Row>
        )
      })}
    </Grid.Column>
  )
}
export default namespaces