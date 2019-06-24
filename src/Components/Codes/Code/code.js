import React from 'react';
import './code.css';
import { Card, Button, CardTitle, CardText } from 'reactstrap';

const code = (props) => {
	
	
	return (
		<Card sm="3" style={{'backgroundColor' : '#DCDCDC' }}>

			<CardTitle>Code id: {props.id}</CardTitle>
			<CardText >Code name: {props.name}</CardText>

			<p >Environment Variables: {props.environment_variables}</p>
			<p >Package Install Command: {props.packages_install_commands}</p>
			<p >Exposed Port: {props.exposed_port}</p>

			<div id="card_text">
				<p >Content:  {props.code}</p>
			</div>

			<Button color="info" className="button" onClick={props.editClicked}>Edit </Button> 
			<Button color="info" className="button" onClick={props.copyClicked} >Copy/Create New</Button>
			<Button color="danger" className="button" onClick={props.deleteClicked} >Delete </Button>

		</Card>


		)
};

export default code;