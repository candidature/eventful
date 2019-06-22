import React from 'react';
import Endpoints from './Endpoints/endpoints'
import { Route , Link} from 'react-router-dom';
import { Button, Nav, Form, FormControl, Navbar } from 'react-bootstrap';

class Home extends React.Component {
	
	render() {
    	return (
    		<div>
    			<header>
			    	<Navbar bg="light" expand="lg">
					  <Navbar.Brand> <Link to="/" style={{'margin-right' : '20px' }}> Broadcom </Link></Navbar.Brand>
					  <Navbar.Toggle aria-controls="basic-navbar-nav" />
					  <Navbar.Collapse id="basic-navbar-nav">
					    <Nav className="mr-auto">
					      <Link to="/endpoints" style={{'margin-right' : '20px' }} > Endpoint </Link>
					      <Link to="/runtimes" style={{'margin-right' : '20px' }}>  Runtime </Link>
					      <Link to="/codes" style={{'margin-right' : '20px' }}>  Code </Link>
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
  						<Endpoints  key={Date.now()} /> )}/>
				
		</div>)
    }
}

export default Home;



