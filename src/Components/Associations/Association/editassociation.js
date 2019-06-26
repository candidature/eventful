import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class EditAssociation extends React.Component {
  
  state = {
    id : '',
    name: '',
    endpoint_id : '',
    runtime_id: '',
    code_id: '',
    
    active: true,
    modified: false,
    Message:  null
  }

  constructor(props) {
    super(props);
    this.state.id = this.props.selectedassociation.id;
    this.state.name = this.props.selectedassociation.name;
    this.state.endpoint_id = this.props.selectedassociation.endpoint_id;

    this.state.runtime_id = this.props.selectedassociation.runtime_id;
    this.state.code_id = this.props.selectedassociation.code_id;


    this.state.active = this.props.selectedassociation.active;
  }


  restCode = (e) => {
    e.preventDefault()
    document.getElementById("editform").reset();
    console.log("Clicked on resetRuntime")
    this.setState({name: this.props.selectedassociation.name })

    this.setState({endpoint_id: this.props.selectedassociation.endpoint_id })
    this.setState({runtime_id: this.props.selectedassociation.runtime_id })
    this.setState({code_id: this.props.selectedassociation.code_id })


    this.setState({active: this.props.selectedassociation.active })    
    

  }

  saveCode = (e) => {
    
    e.preventDefault()

    console.log("Clicked on saveCode")

    this.setState({Message: null})

    let editAssociation = {
      name: this.state.name,
      
      id: this.state.id,
      
      endpoint_id : this.state.endpoint_id,
      runtime_id : this.state.runtime_id,
      code_id : this.state.code_id,
      active : this.state.active
    }

    console.log("New state of association")
    console.log(editAssociation)
    console.log("On put " + JSON.stringify(editAssociation))

    axios.put('/association/dev/v1/'+ this.props.selectedassociation.id, editAssociation,
                    { headers: { 'Content-Type': 'application/json' } } )

          .then( (response) => {
                  console.log("Response of put" + JSON.stringify(response.data))
                  this.setState({modified: true})
                  //this.props.history.push("/")
          })
          .catch( (error) => {

            this.setState({ Message: error.response.data.message })
            console.log("ERROR" + JSON.stringify(error.response.data.message))
            
          })
    }




    handleEndpointSelection = (e)=> {
    let endpoint_id_selected = e.target.value.trim();
    console.log("Selected", endpoint_id_selected);
    this.setState({endpoint_id: endpoint_id_selected});

  }

  handleRuntimeSelection = (e)=> {
    let runtime_id_selected = e.target.value.trim();
    console.log("Selected", runtime_id_selected);
    this.setState({runtime_id: runtime_id_selected});

  }

  handleCodeSelection = (e)=> {
    let code_id_selected = e.target.value.trim();
    console.log("Selected", code_id_selected);
    this.setState({code_id: code_id_selected});

  }

  handleTriggerChange = (e) => {
    let trigger_selected = e.target.value.trim();
    console.log("Selected", trigger_selected);
    this.setState({trigger: trigger_selected})
  }




  render() {

      console.log("All passed props into EditCode " + JSON.stringify(this.props))
      console.log(this.props);


      if (this.state.modified) {
        return (
            <Redirect to="/homepage" push={true} />
          );

      } else {

  return (
    <form id="editform" autoComplete="off">
      
        <div style={{display: 'flex', justifyContent: 'center'}}>
                <div><h1>Edit Association Defination - id {this.props.selectedassociation.id}</h1></div>
        </div>
        
        <Form.Group controlId="name">  
          <Form.Label >Association Name</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedassociation.name}
          onChange={(event) => this.setState({name: event.target.value})}
           />
          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of endpoint.
          </Form.Text>
        </Form.Group>



        <Form.Group controlId="endpoint_id">          
          <Form.Label>Select an Endpoint</Form.Label>
            <Form.Control as="select" onChange={ this.handleEndpointSelection } defaultValue={this.state.endpoint_id}
               >
              {
                this.props.endpoints.map( (endpoint, index)  => {
                  console.log("Inside")
                  console.log(endpoint.id)
                  return <option key={endpoint.id} value={endpoint.id}>

                          Endpoint id: {endpoint.id} - - 
                          Endpoint Name: {endpoint.endpoint_name} - - 
                          Endpoint Method: {endpoint.method || "null"} - - 
                          Endpoint path: {endpoint.path || "null"} 
                         </option>
                }
                )
              }
          </Form.Control>

            <Form.Text className="text-muted">
              Select a Endpoint which will can be called on an event.
            </Form.Text>
        
        </Form.Group>




        <Form.Group controlId="runtime_id">          
          <Form.Label>Select a Runtime</Form.Label>
            <Form.Control as="select" onChange={ this.handleRuntimeSelection } defaultValue={this.state.runtime_id}
               >
              {
                this.props.runtimes.map( (runtime, index)  => {
                  console.log("Inside")
                  console.log(runtime.id)
                  return <option key={runtime.id} value={runtime.id}>

                          Runtime id: {runtime.id} - - 
                          Name: {runtime.name} - - 
                          Type: {runtime.type || "null"}
                          } 
                         </option>
                }
                )
              }
          </Form.Control>

            <Form.Text className="text-muted">
              Select a Runtime which will can be called on an event.
            </Form.Text>
        
        </Form.Group>





        <Form.Group controlId="code_id">          
          <Form.Label>Select a Code</Form.Label>
            <Form.Control as="select" onChange={ this.handleCodeSelection } defaultValue={this.state.code_id}
               >
              {
                this.props.codes.map( (code, index)  => {
                  console.log("Inside")
                  console.log(code.id)
                  return <option key={code.id} value={code.id}>

                          Code id: {code.id} - - 
                          Code Name: {code.name}
                         </option>
                }
                )
              }
          </Form.Control>

            <Form.Text className="text-muted">
              Select a Endpoint which will can be called on an event.
            </Form.Text>
        
        </Form.Group>




        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" defaultValue={this.props.selectedassociation.enabled}
          onChange={(event) => this.setState({enabled: event.target.value})}
           />
        </Form.Group>



        <Button variant="primary" onClick={this.saveCode} > Save </Button>

        <Button variant="primary" onClick={this.restCode} > Reset </Button>
        </form>
    ) }
    }
}


export default EditAssociation;