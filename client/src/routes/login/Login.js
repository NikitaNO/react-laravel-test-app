
import React, { PropTypes } from 'react';
import http from '../../core/http';
import { apiPrefix } from '../../../conf.json';
import Button from 'react-bootstrap/lib/Button';
import Panel from 'react-bootstrap/lib/Panel';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Login.css';
import history from '../../core/history';

class Login extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      password: '',
    }
  }

  submitHandler(e) {
      e.preventDefault();

      let { firstName, password } = this.state;

      http.post(`${apiPrefix}/login`, {
          first_name: firstName,
          password
      })
          .then(({data: { api_token: key }}) => {

              localStorage.setItem('Auth', key);
              history.push('/');
          })
          .catch(err => {
              alert('Authorization failed');
          });
  }

  toRegister = () => {
      history.push('/register');
  };

  render() {
      return (
          <div className="col-md-4 col-md-offset-4">
            <div className="text-center">
              <h1 className="login-brand-text">Admin panel</h1>
            </div>

            <Panel header={<h3>Please Sign In or <b><a onClick={this.toRegister}>Register</a></b>
                           </h3>} className="login-panel">

              <form role="form" onSubmit={(e) => { this.submitHandler(e); }}>
                <fieldset>
                  <div className="form-group">
                      <FormGroup controlId="formBasicText">
                            <ControlLabel>User name</ControlLabel>
                            <FormControl
                                type="text"
                                className="form-control"
                                placeholder="User name"
                                name="first_name"
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
                          <ControlLabel>Password</ControlLabel>
                            <FormControl
                                className="form-control"
                                placeholder="Password"
                                type="password"
                                name="password"
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
                  <Button type="submit" bsSize="large" bsStyle="success" block>Login</Button>
                </fieldset>
              </form>

            </Panel>
          </div>
      );
  }
}


Login.contextTypes = { setTitle: PropTypes.func.isRequired };

export default withStyles(s)(Login);
