import React from 'react';
import './endpoint.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';
const endpoint = (props) => {
	return (
		<Card sm="3" >
			<CardTitle>Endpoint id: {props.id}</CardTitle>
			<CardText >Endpoint name: {props.name}</CardText>
			<div id="card_text">
			<p >Endpoint path: {props.path}</p>
			<p >Endpoint method: {props.method}</p>
			<p 	>Endpoint data: {props.data}</p>
			</div>
			<Button color="info" className="button" onClick={props.editClicked}>Edit </Button> 
			<Button color="info" className="button" onClick={props.copyClicked} >Copy/Create New</Button>
			<Button color="danger" className="button" onClick={props.deleteClicked} >Delete </Button> 
		</Card>


		)
};

export default endpoint;