import React from 'react';
import Endpoint from './Endpoint/endpoint' 
import { Row } from 'reactstrap';
import axios from 'axios';
class single_endpoint extends React.Component {

state = {
    endpoint: null,
    selectedEndpointId : null
  }

  handleClose() {
    this.setState({ selectedEndpointId: false });
  }


	componentDidUpdate() {
		axios.get('/endpoint/dev/v1/' + this.selectedEndpointId)
				.then(response=> {
					this.setState({endpoint: response.data})
					console.log(response.data)
				})
	}

	endpointSelectedHandler = (id) => {

	}

	render() {
		console.log("Inside single endpoint ")
		let endpoint_jsx = null;

		endpoint_jsx = <Endpoint 
						key={index} 
							id={this.endpoint.id} 
							name={this.endpoint.name} 
							path={this.endpoint.path} 
							method={this.endpoint.method} 
							data={this.endpoint.data}

							/> } ) }
							</Row> )

    	return (<div>{endpoint_jsx}</div>)
    }
}

export default single_endpoint;

