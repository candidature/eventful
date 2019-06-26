import React from 'react';
import './association.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const code = (props) => {
	
	
	return (
		<Card sm="3" style={{'backgroundColor' : '#BDEDFF' }}>

			<CardTitle>Code id: {props.id}</CardTitle>
			<CardText >Code name: {props.name}</CardText>

			<p >Endpoint : {props.endpoint_id}

				<Button style={{'margion' : '10px' }} className="button"
				variant="primary" size="sm" onClick={props.moreinfoEndpointClicked}>
      				more info
    			</Button>
			</p>

			<p >Runtime : {props.runtime_id}</p>
			<p >Code: {props.code_id}</p>

			<Button color="info" className="button" onClick={props.editClicked}>Edit </Button> 
			<Button color="info" className="button" onClick={props.copyClicked} >Copy/Create New</Button>
			<Button color="danger" className="button" onClick={props.deleteClicked} >Delete </Button>

		</Card>


		)
};

export default code;