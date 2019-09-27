import React, { Component } from 'react';

import { Form, Alert, Button, InputGroup } from 'react-bootstrap';

export default class CertifiedQuery extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', output: '', success: false };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ address: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    //alert('An address was submitted: ' + this.state.address);
    const success = this.props.certs.includes(this.state.address);
    const output = success
      ? `${this.state.address} is certifiably certified!`
      : `${this.state.address} is not certified yet.`;
    this.setState({ output, success });
  }

  render() {
    return (
      <>
        <Form onSubmit={this.handleSubmit}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="basic-addon1">ꜩ</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control
              placeholder="Address"
              aria-label="Address"
              aria-describedby="basic-addon1"
              onChange={this.handleChange}
              className="form-control form-control-lg"
            />
            <Button
              variant="primary"
              type="submit"
              style={{ marginLeft: '1rem' }}
            >
              Submit
            </Button>
          </InputGroup>
        </Form>

        {this.state.output ? (
          <Alert variant={this.state.success ? 'success' : 'danger'}>
            {this.state.output}
          </Alert>
        ) : (
          ''
        )}
      </>
    );
  }
}
