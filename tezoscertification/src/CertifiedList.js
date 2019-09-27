import React, { Component } from 'react';
import { eztz } from 'eztz';

import { ListGroup } from 'react-bootstrap';

const REGISTRY = 'KT19r51xXfFoXiJXjjA6CDaMdmcHqtyCHRVx';

export default class CertifiedList extends Component {
  state = { certs: [] };

  logCerts = storage => {
    console.log(JSON.stringify(storage));
    const certs = storage.map(s => s.string);
    console.log(certs);
    this.setState({ certs });
    this.props.update(certs);
  };

  componentDidMount() {
    eztz.node.setProvider('http://zeronet-tezos.chainaccelerator.academy:8732');
    eztz.contract.watch(REGISTRY, 5, this.logCerts);
  }

  render() {
    return (
      <>
        <ListGroup variant="flush">
          {this.state.certs.map((cert, index) => (
            <ListGroup.Item key={index} style={{ listStyle: 'none' }}>
              Certified address: {cert}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </>
    );
  }
}
