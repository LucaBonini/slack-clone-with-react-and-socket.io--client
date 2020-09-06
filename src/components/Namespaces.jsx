import React from 'react';
import { Grid, Image } from 'semantic-ui-react'


function namespaces(props) {
  return (
    <Grid.Column width={2}>
      {props.namespaces.map(ns => {
        return (
          <Grid.Row key={ns.endpoint + ns.id}>
            <Image src={ns.img} bordered={true} style={{height: '100px'}} onClick={() => props.selectNs(ns.endpoint)}></Image>
          </Grid.Row>
        )
      })}
    </Grid.Column>
  )
}
export default namespaces