import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../core/history';
import http, { setHeader } from '../../core/http';
import { apiPrefix } from '../../../conf.json';

import s from './Home.css';

import {
    Button,
    PageHeader,
    ControlLabel,
    FormControl,
    FormGroup,
    Form,
   } from 'react-bootstrap';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            surname: '',
            age: 0,
            coins: 0,
            password: '',
            confirm_password: ''
        };
    }

    componentDidMount() {
        const key = localStorage.getItem('Auth');

        if (key) {
            setHeader(key);
            http.get(`${apiPrefix}/me`)
                .then( ({ data }) => {
                    this.setState({
                        first_name: data.first_name,
                        surname: data.surname,
                        age: data.age,
                        coins: data.coins
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            history.push('/login');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if(this.state.password !== this.state.confirm_password) return alert('Passwords don\'t match');

        http.post(`${apiPrefix}/edit`, {
            first_name: this.state.first_name,
            surname: this.state.surname,
            age: this.state.age,
            password: this.state.password
        })
            .then(req => {
                this.setState({
                    password: '',
                    confirm_password: ''
                });
                alert('Data updated');
            })
            .catch(err => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-lg-12">
                        <PageHeader>User info</PageHeader>
                    </div>
                </div>
                <Form style={{ margin: '0 auto 60px auto' }} onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>First name</ControlLabel>
                                <FormControl type="text"
                                             onChange={(e) => {this.setState({first_name: e.target.value})}}
                                             value={this.state.first_name}
                                             required />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Surname</ControlLabel>
                                <FormControl type="text"
                                             onChange={(e) => {this.setState({surname: e.target.value})}}
                                             value={this.state.surname}
                                             required/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Age</ControlLabel>
                                <FormControl type="number"
                                             onChange={(e) => {this.setState({age: e.target.value})}}
                                             value={this.state.age}
                                             required/>
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Coins</ControlLabel>
                                <FormControl type="text"
                                             value={this.state.coins}
                                             disabled />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>New password</ControlLabel>
                                <FormControl type="password"
                                             onChange={(e) => {this.setState({password: e.target.value})}}
                                             value={this.state.password}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <FormGroup controlId="formBasicText">
                                <ControlLabel>Confirm new password</ControlLabel>
                                <FormControl type="password"
                                             onChange={(e) => {this.setState({confirm_password: e.target.value})}}
                                             value={this.state.confirm_password}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                            <Button type="submit"
                                    className="btn btn-primary btn-md">
                                    Update info
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }

}


export default withStyles(s)(Home);
