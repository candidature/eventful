import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class EditCode extends React.Component {
  
  state = {
    id : '',
    name: '',
    code : '',
    environment_variables: '',
    packages_install_commands: '',
    exposed_port: '',

    active: true,
    modified: false,
    Message:  null
  }

  constructor(props) {
    super(props);
    this.state.id = this.props.selectedruntime.id;
    this.state.name = this.props.selectedruntime.name;
    this.state.code = this.props.selectedruntime.code;

    this.state.environment_variables = this.props.selectedruntime.environment_variables;
    this.state.packages_install_commands = this.props.selectedruntime.packages_install_commands;
    this.state.exposed_port = this.props.selectedruntime.exposed_port;

    this.state.active = this.props.selectedruntime.active;
  }


  restCode = (e) => {
    e.preventDefault()
    document.getElementById("editform").reset();
    console.log("Clicked on resetRuntime")
    this.setState({name: this.props.selectedruntime.endpoint_name })

    this.setState({code: this.props.selectedruntime.code })
    this.setState({environment_variables: this.props.selectedruntime.environment_variables })
    this.setState({packages_install_commands: this.props.selectedruntime.packages_install_commands })
    this.setState({exposed_port: this.props.selectedruntime.exposed_port })


    this.setState({active: this.props.selectedruntime.active })    
    

  }

  saveCode = (e) => {
    
    e.preventDefault()

    console.log("Clicked on saveCode")

    this.setState({Message: null})

    let editCode = {
      name: this.state.name,
      code: this.state.code,
      
      environment_variables : this.state.environment_variables,
      packages_install_commands : this.state.packages_install_commands,
      exposed_port : this.state.exposed_port,
      active : this.state.active
    }

    console.log("New state of code")
    console.log(editCode)
    console.log("On put " + JSON.stringify(editCode))

    axios.put('/code/dev/v1/'+ this.props.selectedruntime.id, editCode,
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


  render() {

      console.log("All passed props into EditCode " + JSON.stringify(this.props))
      console.log(this.props);


      if (this.state.modified) {
        return (
            <Redirect to="/codes" push={true} />
          );

      } else {

  return (
    <form id="editform" autoComplete="off">
      
        <div style={{display: 'flex', justifyContent: 'center'}}>
                <div><h1>Edit Code Defination - id {this.props.selectedruntime.id}</h1></div>
        </div>
        
        <Form.Group controlId="name">  
          <Form.Label >Code Name</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedruntime.name}
          onChange={(event) => this.setState({name: event.target.value})}
           />
          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of endpoint.
          </Form.Text>
        </Form.Group>



        <Form.Group controlId="environment_variables">  
          <Form.Label >Environment Variables</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedruntime.environment_variables}
          onChange={(event) => this.setState({environment_variables: event.target.value})}
           />
          <Form.Text className="text-muted">
            List of environment variables, format should be as per runtime requirement.
          </Form.Text>
        </Form.Group>




        <Form.Group controlId="packages_install_commands">  
          <Form.Label >Packages install commands</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedruntime.packages_install_commands}
          onChange={(event) => this.setState({packages_install_commands: event.target.value})}
           />
          <Form.Text className="text-muted">
            Command(s) to run for package installations required to run your code.
            Use as per Runtime requirements.
          </Form.Text>
        </Form.Group>



        <Form.Group controlId="exposed_port">  
          <Form.Label >Exposed Port</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedruntime.exposed_port}
          onChange={(event) => this.setState({exposed_port: event.target.value})}
           />
          <Form.Text className="text-muted">
            PORT number which needs to be exposed to outside your runtime.
          </Form.Text>
        </Form.Group>




        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" defaultValue={this.props.selectedruntime.enabled}
          onChange={(event) => this.setState({enabled: event.target.value})}
           />
        </Form.Group>



        <Button variant="primary" onClick={this.saveCode} > Save </Button>

        <Button variant="primary" onClick={this.restCode} > Reset </Button>
        </form>
    ) }
    }
}


export default EditCode;