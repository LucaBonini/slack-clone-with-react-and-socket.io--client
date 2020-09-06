import React from 'react';
import { Grid, Image } from 'semantic-ui-react'


function namespaces({ namespaces, selectNs, nsActive }) {
  return (
    <Grid.Column width={1} className="namespaces-container">
      {namespaces.map(ns => {
        let activeClass = nsActive === ns.endpoint ? 'ns-active' : ''
        return (
          <Grid.Row key={ns.endpoint + ns.id} className="namespace">
            <Image className={activeClass} src={ns.img} fluid={true} circular={true} bordered={true} onClick={() => selectNs(ns.endpoint)}></Image>
          </Grid.Row>
        )
      })}
    </Grid.Column>
  )
}
export default namespaces