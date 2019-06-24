import React from 'react';
import Code from './Code/code';

import EditCode from './Code/editcode';

import NewCode from './Code/newcode';

import { Row , Button} from 'react-bootstrap';
import axios from 'axios';
import { Form } from 'react-bootstrap';

class Codes extends React.Component {

state = {
    codes: [],

    selectedCode : false,

    code: null,
    id: null,
    filteredcodes: false,
    displayAddNewruntime: false

  }

  
  handleSubmit(event) {
    event.preventDefault();
  }

  componentDidMount () {
  	console.log("props on componentDidMount of codes ==")
  	console.log(this.props)

      axios.get('http://localhost:5000/code/dev/v1')
         .then(response=>{
          this.setState({codes: response.data.codes })
          console.log(response.data.codes)
      })
	}

	clickedAddNewruntime = () => {			
		this.setState({displayAddNewruntime: !this.state.displayAddNewruntime})
	}

	runtimeCopydHandler = (id) => {

	}
	codeSelectedHandler = (id, state) => {
		console.log("Selected code with ID", id)
		this.setState({selectedruntime: id})

		axios.get('/code/dev/v1/' + id)
			.then(response=> {
				if(state === "copy") {
					//this is for copy&Edit // Boolean error from here.
					console.log(response.data)
					this.setState({displayAddNewruntime: response.data})

				} else{
				this.setState({code: response.data})
				}
		})
	}

	codeDeletedHandler = (id) => {
		axios.delete('/code/dev/v1/'+id)
			 .then(response=>{

			 	this.setState({
        			codes: this.state.codes.filter(el => el.id !== id)
    			})
		 })
	}

	methodCheckbox = (method, checked) => {
			console.log("clicked "+ method)
			if(checked) {
				this.setState({codes :  this.state.codes.filter((item) => item.method === method) })
			} else {
				axios.get('http://localhost:5000/code/dev/v1')
         			.then(response=>{
          			this.setState({codes: response.data.codes });
      			})
			}
	}
	


	render() {

		console.log("Rending codes, displayAddNewruntime is ");
		console.log(this.state.displayAddNewruntime);

		let codes_jsx = null;

	if(this.state.selectedruntime) {
		codes_jsx = (<p style={{textAlign : 'center'}} > Loading... </p>)
	}

	if(this.state.code) {

		console.log("Invoking single code " + JSON.stringify(this.state.code))
		codes_jsx = (
				<div>
					<section>
  						<EditCode selectedruntime={this.state.code}/>
  					</section>
	  			</div>
		)

	} else if(this.state.displayAddNewruntime) {
				codes_jsx = (
				<div>
					<section>
  						<NewCode displayAddNewRuntime={this.state.displayAddNewruntime}/>
  					</section>
	  			</div>
				)
	} 
	else {
	codes_jsx = (<div> 
						<Form.Group >
								<Row>
									<Button style={{margin: '10px' }}  variant="primary" size="md" active  
										onClick={this.clickedAddNewruntime}>
											Add New Code
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
      			
			<Row> {this.state.codes.map( (code, index)  => {
				return <Code 
							key={index} 
							id={code.id} 
							name={code.name} 
							code={code.code} 
							user_name={code.user_name}
							environment_variables={code.environment_variables}
							packages_install_commands={code.packages_install_commands}
							exposed_port={code.exposed_port}

							editClicked={ () => this.codeSelectedHandler(code.id, "edit") } 
							copyClicked={ () => this.codeSelectedHandler(code.id , "copy") }
							deleteClicked={ () => this.codeDeletedHandler(code.id) } 
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

export default Codes;



