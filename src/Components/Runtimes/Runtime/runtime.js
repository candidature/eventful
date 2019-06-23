import React from 'react';
import './runtime.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const runtime = (props) => {
	let dynamic_content = ""
	if(props.type === 'REMOTE') {
		dynamic_content = (
				<div>
					<p >Runtime user_name: {props.user_name}</p>
					<p >Runtime user_password: {props.user_password}</p>
					<p >Runtime user_hostname: {props.user_hostname}</p>
				</div>
			)
	} else if(props.type === 'CONTAINER') {

		dynamic_content = (	<p >Runtime dockerfile: {props.dockerfile}</p> )

	}
	return (
		<Card sm="3" style={{'backgroundColor' : '#ecf7fc' }}>

			<CardTitle>Runtime id: {props.id}</CardTitle>
			<CardText >Runtime name: {props.name}</CardText>
			
			<div id="card_text">
				<p >Runtime type: {props.type}</p>
				{dynamic_content}
			</div>

			<Button color="info" className="button" onClick={props.editClicked}>Edit </Button> 
			<Button color="info" className="button" onClick={props.copyClicked} >Copy/Create New</Button>
			<Button color="danger" className="button" onClick={props.deleteClicked} >Delete </Button>

		</Card>


		)
};

export default runtime;