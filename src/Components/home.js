import React from 'react';
import Endpoints from './Endpoints/endpoints';
import Runtimes from './Runtimes/runtimes';
import Codes from './Codes/codes';

import Associations from './Associations/associations';
import { Redirect } from 'react-router-dom'

import { Route , Link} from 'react-router-dom';
import { Button, Nav, Form, FormControl, Navbar } from 'react-bootstrap';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

class Home extends React.Component {
	
	render() {
    	return (
    			<div>

    			<ToastContainer  autoClose = {"10000"}
						className={css({
    						padding: "32px",
    						minWidth: "75%",
    						minHeight: "75%"
  						})}
    				/>

    			<header>
			    	<Navbar bg="light" expand="lg">
					  <Navbar.Brand> <Link to="/homepage" style={{'marginRight' : '20px' }}> Broadcom </Link></Navbar.Brand>
					  <Navbar.Toggle aria-controls="basic-navbar-nav" />
					  <Navbar.Collapse id="basic-navbar-nav">
					    <Nav className="mr-auto">
					      <Link to="/endpoints" style={{'marginRight' : '20px' }} > Endpoint </Link>
					      <Link to="/runtimes" style={{'marginRight' : '20px' }}>  Runtime </Link>
					      <Link to="/codes" style={{'marginRight' : '20px' }}>  Code </Link>
					    </Nav>

					    <Form inline>
					      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
					      <Button variant="outline-success">Search</Button>
					    </Form>
					  </Navbar.Collapse>
					</Navbar>		
				</header>

				<Route path="/endpoints" 
					render={() => (
  						<Endpoints  key={Date.now()} /> )}
				/>
				
				<Route path="/runtimes" 
					render={() => (
  						<Runtimes  key={Date.now()} /> )}
				/>


				<Route path="/codes" 
					render={() => (
  						<Codes  key={Date.now()} /> )}
				/>

				<Route path="/homepage" 
					render={() => (
  						<Associations  key={Date.now()} /> )}
				/>
				
				<Redirect to="/homepage" push={true} />

				

				</div>
			)
    }
}

export default Home;



