import React from 'react';
import { connect } from 'react-redux';
import { Grid, Image } from 'semantic-ui-react'
import { selectNs } from '../actions'


function namespaces(props) {
  return (
    <Grid.Column width={2}>
      {props.namespaces.map(ns => {
        return (
          <Grid.Row key={ns.endpoint + ns.id}>
            <Image src={ns.img} onClick={() => props.selectNs(ns.endpoint)}></Image>
          </Grid.Row>
        )
      })}
    </Grid.Column>
  )
}

// const mapStateToProps = (state) => {
//   console.log(state, 'state')
//   return { namespaceActive: (state || {}).namespaceActive || null}
// }


export default connect(
  null,
  { selectNs }
)(namespaces)