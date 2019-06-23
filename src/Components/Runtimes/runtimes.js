import React from 'react';
import Runtime from './Runtime/runtime' 

import EditRuntime from './Runtime/editruntime'

import NewRuntime from './Runtime/newruntime'

import { Row , Button} from 'react-bootstrap';
import axios from 'axios';
import { Form } from 'react-bootstrap';

class Runtimes extends React.Component {

state = {
    runtimes: [],
    selectedruntime : false,
    modal : false,
    runtime: null,
    id: null,
    filteredruntimes: false,
    displayAddNewruntime: false

  }

  
  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount () {
  	console.log("props on componentDidMount of runtimes ==")
  	console.log(this.props)

      axios.get('http://localhost:5000/runtime/dev/v1')
         .then(response=>{
          this.setState({runtimes: response.data.runtimes })
      })
	}

	clickedAddNewruntime = () => {			
		this.setState({displayAddNewruntime: !this.state.displayAddNewruntime})
	}

	runtimeCopydHandler = (id) => {

	}
	runtimeselectedHandler = (id, state) => {
		console.log("Selected runtime with ID", id)
		this.setState({selectedruntime: id})

		axios.get('/runtime/dev/v1/' + id)
			.then(response=> {
				if(state === "copy") {
					//this is for copy&Edit // Boolean error from here.
					console.log(response.data)
					this.setState({displayAddNewruntime: response.data})

				} else{
				this.setState({runtime: response.data})
				}
		})
	}

	runtimeDeletedHandler = (id) => {
		axios.delete('/runtime/dev/v1/'+id)
			 .then(response=>{

			 	this.setState({
        			runtimes: this.state.runtimes.filter(el => el.id !== id)
    			})
		 })
	}

	methodCheckbox = (method, checked) => {
			console.log("clicked "+ method)
			if(checked) {
				this.setState({runtimes :  this.state.runtimes.filter((item) => item.method === method) })
			} else {
				axios.get('http://localhost:5000/runtime/dev/v1')
         			.then(response=>{
          			this.setState({runtimes: response.data.runtimes });
      			})
			}
	}
	


	render() {

		console.log("Rending runtimes, displayAddNewruntime is ");
		console.log(this.state.displayAddNewruntime);

		let runtimes_jsx = null;

	if(this.state.selectedruntime) {
		runtimes_jsx = (<p style={{textAlign : 'center'}} > Loading... </p>)
	}

	if(this.state.runtime) {

		console.log("Invoking single runtime " + JSON.stringify(this.state.runtime))
		runtimes_jsx = (
				<div>
					<section>
  						<EditRuntime selectedruntime={this.state.runtime}/>
  					</section>
	  			</div>
		)

	} else if(this.state.displayAddNewruntime) {
				runtimes_jsx = (
				<div>
					<section>
  						<NewRuntime displayAddNewRuntime={this.state.displayAddNewruntime}/>
  					</section>
	  			</div>
				)
	} 
	else {
	runtimes_jsx = (<div> 
						<Form.Group >
								<Row>
								<Button style={{margin: '10px' }}  variant="primary" size="md" active  
									onClick={this.clickedAddNewruntime}>
										Add New Runtime
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
      			
			<Row> {this.state.runtimes.map( (runtime, index)  => {
				return <Runtime 
							key={index} 
							id={runtime.id} 
							name={runtime.name} 
							type={runtime.type} 
							user_name={runtime.user_name}
							user_password={runtime.user_password}
							user_hostname={runtime.user_hostname}
							dockerfile={runtime.dockerfile}
							editClicked={ () => this.runtimeselectedHandler(runtime.id, "edit") } 
							copyClicked={ () => this.runtimeselectedHandler(runtime.id , "copy") }
							deleteClicked={ () => this.runtimeDeletedHandler(runtime.id) } 
							/> } ) }
			</Row>
			
			</div>
					 )
		}

    	return (<div>
    				<section>
    						{runtimes_jsx}
					</section>
				</div>)

    }


}

export default Runtimes;



