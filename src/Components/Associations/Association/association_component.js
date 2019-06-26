import React from 'react';
import './association.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
import axios from 'axios';

class Association_Component extends React.Component {
  
  state = {
  	association_id : '',
    endpoint_id : '',
    runtime_id : '',
    code_id : '',
    metadata : [],

    endpointmetadata : '',
    runtimemetadata : '',
    codemetadata : ''

  }
 
  constructor(props) {
    super(props);
    this.state.association_id = this.props.id;

    this.state.name = this.props.name;

    this.state.endpoint_id = this.props.endpoint_id;
    this.state.runtime_id = this.props.runtime_id;
    this.state.code_id = this.props.code_id;

    this.endpointmetadata =  this.props.endpoint_metadata;
    this.runtimemetadata = this.props.runtime_metadata;
    this.codemetadata = this.props.code_metadata;

    this.state.trigger = this.props.trigger;
  }


  componentDidMount () {
  	console.log(this.props)

  	  if(this.state.endpoint_id) {
	      axios.get('http://localhost:5000/endpoint/dev/v1/' + this.state.endpoint_id)
	         .then(response=>{
	          this.setState({endpointmetadata: response.data })
	      })
      }

      
      if(this.state.runtime_id) {
	      axios.get('http://localhost:5000/runtime/dev/v1/'+ this.state.runtime_id)
	         .then(response=>{
	          this.setState({runtimemetadata: response.data })
	      })
      }

      if(this.state.code_id) {
	       axios.get('http://localhost:5000/code/dev/v1/'+ this.state.code_id)
	         .then(response=>{
	          this.setState({codemetadata: response.data })
	      })
      }
   

	}

	render() {
		return (

			<Card sm="3" style={{'backgroundColor' : '#BDEDFF' }}>

			<CardTitle>Association id: {this.props.id}</CardTitle>
			<CardText >Association name: {this.props.name}</CardText>

			
			<p >Endpoint : Id: {this.props.endpoint_id}, Name: {this.state.endpointmetadata.endpoint_name}
				, Path: {this.state.endpointmetadata.path}, Method:  {this.state.endpointmetadata.method}
			</p>
			
			

			<p >Runtime : Id: {this.props.runtime_id}, Name: {this.state.runtimemetadata.name}
				, Type: {this.state.runtimemetadata.type}
			</p>


			<p >Code : Id: {this.props.code_id}, Name: {this.state.codemetadata.name}
				, Exposed_port: {this.state.codemetadata.exposed_port}
			</p>


			<Button color="info" className="button" onClick={this.props.editClicked}>Edit </Button> 
			<Button color="info" className="button" onClick={this.props.copyClicked} >Copy/Create New</Button>
			<Button color="danger" className="button" onClick={this.props.deleteClicked} >Delete </Button>

		</Card>
			)

	}
}


export default Association_Component;