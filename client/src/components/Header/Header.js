import React from 'react';
import {
  NavDropdown,
  MenuItem
} from 'react-bootstrap';
import Navbar, {Brand} from 'react-bootstrap/lib/Navbar';
import history from '../../core/history';
import Sidebar from '../Sidebar';


function Header() {
  return (
    <div id="wrapper" className="content">
      <Navbar fluid={true}  style={ {margin: 0} }>
          <Brand>
            <span>Admin panel</span>
          </Brand>
          <ul className="nav navbar-top-links navbar-right">

           <NavDropdown title={<i className="fa fa-user fa-fw"></i> } id = 'navDropdown4'>
                  <MenuItem eventKey = "4" onClick = {() => {
                      localStorage.removeItem('Auth');
                      history.push('/login');
                  }}>
                    <span> <i className = "fa fa-sign-out fa-fw" /> Logout </span>
                  </MenuItem>
            </NavDropdown>

          </ul>
          <Sidebar />
    </Navbar>
    </div>
  );
}

export default Header;
