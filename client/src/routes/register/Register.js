/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import history from '../../core/history';
import http from '../../core/http';
import { apiPrefix } from '../../../conf.json';

class Register extends React.Component {

  constructor(props) {
    super(props);

      this.state = {
          firstName: '',
          surname: '',
          age: 0,
          password: '',
          passwordConfirm: '',
      }
  }

  submitHandler(e) {
      e.preventDefault();

      let { firstName, password, passwordConfirm, surname, age } = this.state;

      if(password !== passwordConfirm) return alert('Passwords don\'t match');

      http.post(`${apiPrefix}/register`, {
          first_name: firstName,
          surname,
          age,
          password
      })
          .then(({data: {user}}) => {
              const key = user.api_token;

              localStorage.setItem('Auth', key);
              history.push('/');
          })
          .catch(err => {
              alert('Registration failed');
          });
  }

    toLogin = () => {
        history.push('/login');
    };

  render() {
      return (
          <div className="col-md-4 col-md-offset-4">
            <div className="text-center">
              <h1 className="login-brand-text">Admin panel</h1>
            </div>

            <Panel header={<h3>Registration</h3>} className="login-panel">

              <form role="form" onSubmit={(e) => { this.submitHandler(e); }}>
                <fieldset>
                  <div className="form-group">
                      <FormGroup controlId="formBasicText">
                            <ControlLabel>User name</ControlLabel>
                            <FormControl
                                type="text"
                                className="form-control"
                                placeholder="User name"
                                value={ this.state.firstName }
                                onChange={(e) => {
                                    this.setState({
                                        firstName: e.target.value
                                    });
                                }}
                                required
                            />
                          </FormGroup>
                  </div>

                    <div className="form-group">
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Surname</ControlLabel>
                            <FormControl
                                type="text"
                                className="form-control"
                                placeholder="Surname"
                                value={ this.state.surname }
                                onChange={(e) => {
                                    this.setState({
                                        surname: e.target.value
                                    });
                                }}
                                required
                            />
                            </FormGroup>
                    </div>

                    <div className="form-group">
                        <FormGroup controlId="formBasicText">
                            <ControlLabel>Age</ControlLabel>
                            <FormControl
                                type="number"
                                className="form-control"
                                placeholder="Age"
                                value={ this.state.age }
                                onChange={(e) => {
                                    this.setState({
                                        age: e.target.value
                                    });
                                }}
                                required
                            />
                        </FormGroup>
                    </div>

                  <div className="form-group">
                      <FormGroup controlId="formBasicText">
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                value={ this.state.password }
                                onChange={(e) => {
                                    this.setState({
                                        password: e.target.value
                                    });
                                }}
                                required
                            />
                      </FormGroup>
                  </div>

                  <div className="form-group">
                      <FormGroup controlId="formBasicText">
                            <ControlLabel>Confirm your password</ControlLabel>
                            <FormControl
                                className="form-control"
                                placeholder="Confirm your password"
                                type="password"
                                value={ this.state.passwordConfirm }
                                onChange={(e) => {
                                    this.setState({
                                        passwordConfirm: e.target.value
                                    });
                                }}
                                required
                            />
                      </FormGroup>
                  </div>
                    <Button type="submit" bsSize="large" bsStyle="success" block>Register</Button>
                    <div className="row text-center" style={{ marginTop: '10px' }}>
                        <b>or&nbsp;<a onClick={this.toLogin}>Login</a></b>
                    </div>
                </fieldset>
              </form>

            </Panel>

          </div>

      );
  }
}


Register.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Register);
