import React from 'react';

import Association_Component from './Association/association_component';

import EditAssociation from './Association/editassociation';

import NewAssociation from './Association/newassociation';

import { Row , Button} from 'react-bootstrap';
import axios from 'axios';
import { Form } from 'react-bootstrap';

class Associations extends React.Component {

state = {
    associations: [],

    
    selectedassociation : false,
    association: null,
    id: null,
    filteredcodes: false,
    displayAddNewAssociation: false,

    endpoints: [],
    codes: [],
    runtimes: [],
    message: ''
  }

  
  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount () {
  	console.log("props on componentDidMount of associations ==")
  	console.log(this.props)

      axios.get('http://localhost:5000/association/dev/v1')
         .then(response=>{
          this.setState({associations: response.data.associations })
          console.log(response.data.associations)
      })


       //Query Endpoints.
       //Query Runtimes.
       //Query Codes.

       axios.get('http://localhost:5000/endpoint/dev/v1')
         .then(response=>{
          this.setState({endpoints: response.data.endpoints })
      })

      axios.get('http://localhost:5000/runtime/dev/v1')
         .then(response=>{
          this.setState({runtimes: response.data.runtimes })
      })

      axios.get('http://localhost:5000/code/dev/v1')
         .then(response=>{
          this.setState({codes: response.data.codes })
          console.log(response.data.codes)
      })

	}

	clickedAddNewAssociation = () => {			
		
		if(this.state.endpoints.length < 1 ) {
			console.log("Message - You need to fist create endpoint")
		}

		else if(this.state.runtimes.length < 1 ) {
			console.log("Message - You need to fist create runtime")
		}

		else if(this.state.codes.length < 1 ) {
			console.log("Message - You need to fist define code")
		} else {
			this.setState({displayAddNewAssociation: !this.state.displayAddNewAssociation})
		}


	}

	runtimeCopydHandler = (id) => {

	}
	associationSelectedHandler = (id, state) => {
		console.log("Selected associationSelectedHandler with ID", id)
		this.setState({selectedassociation: id})

		axios.get('/association/dev/v1/' + id)
			.then(response=> {
				if(state === "copy") {
					//this is for copy&Edit // Boolean error from here.
					console.log(response.data)
					this.setState({displayAddNewAssociation: response.data})

				} else{
				this.setState({association: response.data})
				}
		})
	}

	associationDeletedHandler = (id) => {
		axios.delete('/association/dev/v1/'+id)
			 .then(response=>{
			 	this.setState({
        			associations: this.state.associations.filter(el => el.id !== id)
    			})
			.catch(error=>{
				console.log(error)
			})
		 })
	}

	methodCheckbox = (method, checked) => {
			console.log("clicked "+ method)
			if(checked) {
				this.setState({associations :  this.state.associations.filter((item) => item.method === method) })
			} else {
				axios.get('http://localhost:5000/code/dev/v1')
         			.then(response=>{
          			this.setState({associations: response.data.associations });
      			})
			}
	}
	

	render() {

		console.log("Rending associations, displayAddNewAssociation is ");
		console.log(this.state.displayAddNewAssociation);

		let codes_jsx = null;

	if(this.state.selectedassociation) {
		codes_jsx = (<p style={{textAlign : 'center'}} > Loading... </p>)
	}

	if(this.state.association) {

		console.log("Invoking single association " + JSON.stringify(this.state.association))
		codes_jsx = (
				<div>
					<section>
  						<EditAssociation 
						codes={this.state.codes}
  						runtimes={this.state.runtimes}
  						endpoints={this.state.endpoints} 
  						selectedassociation={this.state.association}/>
  					</section>
	  			</div>
		)

	} else if(this.state.displayAddNewAssociation) {
				codes_jsx = (
				<div>
					<section>
  						<NewAssociation 
  						codes={this.state.codes}
  						runtimes={this.state.runtimes}
  						endpoints={this.state.endpoints} displayAddNewAssociation={this.state.displayAddNewAssociation}/>
  					</section>
	  			</div>
				)
	} 
	else {
	codes_jsx = (<div>

						<h3 className="text-center"><font color="#428bca">Associations</font></h3>
						<Form.Group >


								<Row>
									<Button style={{margin: '10px' }}  variant="primary" size="md" active  
										onClick={this.clickedAddNewAssociation}>
											Add New Association
									</Button>

									<Form.Check style={{margin: '10px' }} type='checkbox' label='Active' />
									<Form.Check style={{margin: '10px' }} type='checkbox' label='Owner By Me' />
									<Form.Check style={{margin: '10px' }} type='checkbox' label='POST Method'

										onClick={ (event) => this.methodCheckbox('POST' , event.target.checked) }
									/>
									<Form.Check  style={{margin: '10px' }}  type='checkbox' label='GET Method'
										onClick={ (event) => this.methodCheckbox('GET' , event.target.checked) }
									/>

									<Form.Control style={{marginLeft: '10px', marginRight: '10px' }}  type="text" placeholder="Search URI" />
								</Row>
					      
		      				
	      				</Form.Group>
      			
			<Row> {this.state.associations.map( (association, index)  => {
				return <Association_Component 
							key={index} 
							id={association.id} 
							name={association.name} 
							endpoint_id={association.endpoint_id}
							runtime_id={association.runtime_id}
							code_id={association.code_id}
							trigger={association.trigger}
							
							editClicked={ () => this.associationSelectedHandler(association.id, "edit") } 
							copyClicked={ () => this.associationSelectedHandler(association.id , "copy") }
							deleteClicked={ () => this.associationDeletedHandler(association.id) } 
							/> } ) }
			</Row>
			
			</div>
					 )
		}

    	return (<div>
    				<section>
    						{codes_jsx}
					</section>
				</div>)

    }


}

export default Associations;



