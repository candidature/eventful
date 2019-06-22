import React from 'react';
import Endpoint from './Endpoint/endpoint' 

import EditEndpoint from './Endpoint/editendpoint'

import NewEndpoint from './Endpoint/newendpoint'

import { Row , Button} from 'react-bootstrap';
import axios from 'axios';
import { Form } from 'react-bootstrap';

class Endpoints extends React.Component {

state = {
    endpoints: [],
    selectedEndpoint : false,
    modal : false,
    endpoint: null,
    id: null,
    filteredEndpoints: false,
    displayAddNewEndpoint: false

  }

  
  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount () {
  	console.log("props on componentDidMount of Endpoints ==")
  	console.log(this.props)

      axios.get('http://localhost:5000/endpoint/dev/v1')
         .then(response=>{
          this.setState({endpoints: response.data.endpoints })
      })
	}

	clickedAddNewEndpoint = () => {			
		this.setState({displayAddNewEndpoint: !this.state.displayAddNewEndpoint})
	}

	endpointCopydHandler = (id) => {

	}
	endpointSelectedHandler = (id, state) => {

		this.setState({selectedEndpoint: id})

		axios.get('/endpoint/dev/v1/' + id)
			.then(response=> {
				if(state === "copy") {
					//this is for copy&Edit
					this.setState({displayAddNewEndpoint: response.data})

				} else{
				this.setState({endpoint: response.data})
				}
		})
	}

	endpointDeletedHandler = (id) => {
		axios.delete('/endpoint/dev/v1/'+id)
			 .then(response=>{

			 	this.setState({
        			endpoints: this.state.endpoints.filter(el => el.id !== id)
    			})
		 })
	}

	methodCheckbox = (method, checked) => {
			console.log("clicked "+ method)
			if(checked) {
				this.setState({endpoints :  this.state.endpoints.filter((item) => item.method === method) })
			} else {
				axios.get('http://localhost:5000/endpoint/dev/v1')
         			.then(response=>{
          			this.setState({endpoints: response.data.endpoints })
      			})
			}
	}
	


	render() {

		console.log("Rending endpoints, displayAddNewEndpoint is " + this.state.displayAddNewEndpoint)

		let endpoints_jsx = null;

	if(this.state.selectedEndpoint) {
		endpoints_jsx = (<p style={{textAlign : 'center'}} > Loading... </p>)
	}

	if(this.state.endpoint) {

		console.log("Invoking single endpoint " + JSON.stringify(this.state.endpoint))
		endpoints_jsx = (
				<div>
					<section>
  						<EditEndpoint selectedEndpoint={this.state.endpoint}/>
  					</section>
	  			</div>
		)

	} else if(this.state.displayAddNewEndpoint) {
				endpoints_jsx = (
				<div>
					<section>
  						<NewEndpoint displayAddNewEndpoint={this.state.displayAddNewEndpoint}/>
  					</section>
	  			</div>
				)
	} 
	else {
	endpoints_jsx = (<div> 
						<Form.Group inline>
							<row>
								<Button style={{margin: '10px' }} inline variant="primary" size="md" active  
									onClick={this.clickedAddNewEndpoint}>
										Add New
								</Button>

								<Form.Check inline type='checkbox' label='Active' />
								<Form.Check inline type='checkbox' label='Owner By Me' />
								<Form.Check inline type='checkbox' label='POST Method'

									onClick={ (event) => this.methodCheckbox('POST' , event.target.checked) }
								/>
								<Form.Check inline type='checkbox' label='GET Method' 
									onClick={ (event) => this.methodCheckbox('GET' , event.target.checked) }
								/>

								<Form.Control inline type="text" placeholder="Search URI" />

					      
		      				</row>
	      				</Form.Group>
      			
			<Row> {this.state.endpoints.map( (endpoint, index)  => {
				return <Endpoint 
							key={index} 
							id={endpoint.id} 
							name={endpoint.endpoint_name} 
							path={endpoint.path} 
							method={endpoint.method} 
							data={endpoint.data}
							editClicked={ () => this.endpointSelectedHandler(endpoint.id, "edit") } 
							copyClicked={ () => this.endpointSelectedHandler(endpoint.id , "copy") }
							deleteClicked={ () => this.endpointDeletedHandler(endpoint.id) } 
							/> } ) }
			</Row>
			
			</div>
					 )
		}

    	return (<div>
    				<section>
    						{endpoints_jsx}
					</section>
				</div>)

    }


}

export default Endpoints;



