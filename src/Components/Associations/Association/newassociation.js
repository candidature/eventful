import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import FlashMessage from 'react-flash-message'
import { Redirect } from 'react-router-dom'

class NewAssociation extends React.Component {
  
  state = {
    id: '',
    name: '',
    
    endpoint_id : '',
    runtime_id: '',
    code_id: '',
    trigger : 'EVENT',
    error: '',

    active: true,
    userSelectedType: '',
    Message:  null,
    submitted: false
  }
 
  constructor(props) {
    super(props)
    
    if(this.props.displayAddNewAssociation.name) {
      console.log("Display this.props.displayAddNewAssociation via copy&edit")
      console.log(this.props.displayAddNewAssociation)
      this.state.id = this.props.id;
      this.state.name = this.props.displayAddNewAssociation.name;



      this.state.runtime_id = this.props.displayAddNewAssociation.runtime_id;
      this.state.endpoint_id = this.props.displayAddNewAssociation.endpoint_id;
      this.state.code_id = this.props.displayAddNewAssociation.code_id;

      this.state.trigger = this.props.displayAddNewAssociation.trigger || 'EVENT';

      this.state.active = this.props.displayAddNewAssociation.active || true;
    }
    if(!this.props.displayAddNewAssociation && this.props.runtimes[0]){
      this.state.runtime_id = this.props.runtimes[0].id;
    }

    if(!this.props.displayAddNewAssociation && this.props.endpoints[0]){
      this.state.endpoint_id = this.props.endpoints[0].id;
    }

    if(!this.props.displayAddNewAssociation && this.props.codes[0].id){
      this.state.code_id = this.props.codes[0].id;
    }
  }

  handleTypeChange = (e) => {
    let type = e.target.value.trim()    
    this.setState ( {userSelectedType: type} );
    this.setState ( {type: type} );
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

  createNewAssociation = (e) => {
    
    e.preventDefault()
    console.log("Clicked on createNewRuntime")
    console.log(this.props);

    this.setState({Message: null})

    let newAssociation = {
      name: this.state.name,
      endpoint_id : this.state.endpoint_id,
      runtime_id : this.state.runtime_id,
      code_id: this.state.code_id,
      trigger : this.state.trigger,

      active : this.state.active
    }


    console.log("On Creating new Association " + JSON.stringify(newAssociation))

    axios.post('/association/dev/v1/0', newAssociation,
                    { headers: { 'Content-Type': 'application/json' } } )

          .then( (response) => {
                  console.log("Response of post" + JSON.stringify(response.data))
                  this.setState({submitted: true})
                  //this.props.history.push("/")
          })
          .catch( (error) => {

            this.setState({ Message: error.response.data.message })
            console.log("ERROR" + JSON.stringify(error.response.data.message))
            
          })
    }


  render() {
    let basic_data = (
        <div>
        <Form.Group controlId="association" >  
          <Form.Label >Association Name</Form.Label>
          <Form.Control type="text" placeholder="Name of the Association" value={this.state.name} 
          onChange={(event) => this.setState({name: event.target.value})} required />

          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of association.
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="endpoint_id">          
          <Form.Label>Select an Endpoint</Form.Label>
            <Form.Control as="select" onChange={ this.handleEndpointSelection } 
                defaultValue={this.state.endpoint_id}
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
            <Form.Control as="select" onChange={ this.handleRuntimeSelection }
                defaultValue={this.state.runtime_id}
               >
              {
                this.props.runtimes.map( (runtime, index)  => {
                  console.log("Inside")
                  console.log(runtime.id)
                  return <option key={runtime.id} value={runtime.id}>

                          Endpoint id: {runtime.id} - - 
                          Endpoint Name: {runtime.runtime_name} - - 
                          Endpoint Method: {runtime.type || "null"}
                          
                         </option>
                }
                )
              }
          </Form.Control>

            <Form.Text className="text-muted">
              Select a Runtime which will can be used on endpoint invocation.
            </Form.Text>
        
        </Form.Group>






        <Form.Group controlId="code_id">          
          <Form.Label>Select the Code to run</Form.Label>
            <Form.Control as="select" onChange={ this.handleCodeSelection } 
                defaultValue={this.state.code_id}
               >
              {
                this.props.codes.map( (code, index)  => {
                  console.log("Inside")
                  console.log(code.id)
                  return <option key={code.id} value={code.id}>

                          Endpoint id: {code.id} - - 
                          Endpoint Name: {code.name}

                         </option>
                }
                )
              }
          </Form.Control>

            <Form.Text className="text-muted">
              Select a Endpoint which will can be called on an event.
            </Form.Text>
        
        </Form.Group>



        <Form.Group controlId="trigger">          
          <Form.Label>How frequetly get triggered</Form.Label>
            <Form.Control as="select" onChange={this.handleTriggerChange} value={this.state.trigger}>

              <option>EVENT</option>
              <option>SCHEDULED EVENT - TBD</option>

            </Form.Control>

            <Form.Text className="text-muted">
              EVENT : Runs job as service account as which this queuing system running.
              EVENT and SCHEDULE : Run job remotely on specified host and username.
            </Form.Text>
        
        </Form.Group>

        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" value={this.state.enabled} 
          onChange={(event) => this.setState({active: event.target.checked})} />
        </Form.Group>

        </div>
        
        )

          
      let submit_button = (<Button variant="primary" onClick={this.createNewAssociation} > Submit </Button>)
      

      if (this.state.submitted) {
        return (
            <Redirect to="/homepage" push={true} />
          );
      } else {
      return (<div key={this.htmlId} ><FlashMessage duration={5000} persistOnHover={true} position="top"> <p>{this.state.Message}</p> </FlashMessage>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div><h1>Define New Code</h1></div>
                </div>
                <Form>
                {basic_data}

                {submit_button}
              </Form></div> )
        }
  }
}


export default NewAssociation;