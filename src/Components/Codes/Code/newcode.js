import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import FlashMessage from 'react-flash-message'
import { Redirect } from 'react-router-dom'

class NewCode extends React.Component {
  
  state = {
    id: '',
    name: '',
    code : '', // other options are remote, docker(container)
    environment_variables : '',
    packages_install_commands: '',
    exposed_port: '',

    error: '',

    active: true,
    userSelectedType: '',
    Message:  null,
    submitted: false
  }
 
  constructor(props) {
    super(props)

    if(this.props.displayAddNewRuntime.name) {
      console.log("Display this.props.displayAddNewRuntime via copy&edit")
      console.log(this.props.displayAddNewRuntime)
      this.state.id = this.props.id;
      this.state.name = this.props.displayAddNewRuntime.name;
      this.state.code = this.props.displayAddNewRuntime.code || ''

      this.state.environment_variables = this.props.displayAddNewRuntime.environment_variables;
      this.state.packages_install_commands = this.props.displayAddNewRuntime.packages_install_commands;
      this.state.exposed_port = this.props.displayAddNewRuntime.exposed_port;      


      this.state.active = this.props.displayAddNewRuntime.active || true;
    }
  }

  handleTypeChange = (e) => {
    let type = e.target.value.trim()    
    this.setState ( {userSelectedType: type} );
    this.setState ( {type: type} );
  }

  createNewRuntime = (e) => {
    
    e.preventDefault()

    console.log("Clicked on createNewRuntime")

    this.setState({Message: null})

    let newCode = {
      name: this.state.name,
      code: this.state.code,
      environment_variables : this.state.environment_variables,
      packages_install_commands : this.state.packages_install_commands,
      exposed_port: this.state.exposed_port,

      active : this.state.active
    }


    console.log("On Creating new Code " + JSON.stringify(newCode))

    axios.post('/code/dev/v1/0', newCode,
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
        <Form.Group controlId="name" >  
          <Form.Label >Code Name</Form.Label>
          <Form.Control type="text" placeholder="Name of Runtime" value={this.state.name} 
          onChange={(event) => this.setState({name: event.target.value})} required />

          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of runtime.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="environment_variables" >  
          <Form.Label >Environment Variables to be set before running your code.</Form.Label>
          <Form.Control type="text" placeholder="Environment Variables" value={this.state.environment_variables} 
          onChange={(event) => this.setState({environment_variables: event.target.value})}  />

          <Form.Text className="text-muted">
            Comma ";" seperated list of environment_variables will be set before running your code.
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="packages_install_commands" >  
          <Form.Label >Packages install command to be run before running your code.</Form.Label>
          <Form.Control type="text" placeholder="Package Install command" value={this.state.packages_install_commands} 
          onChange={(event) => this.setState({packages_install_commands: event.target.value})} required />

          <Form.Text className="text-muted">
            Comma ";" seperated list of packages_install_commands will be run before running your code.
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="exposed_port" >  
          <Form.Label >Port to be exposed by runtime for code execution to be seen from outside.</Form.Label>
          <Form.Control type="text" placeholder="Exposed Port" value={this.state.exposed_port} 
          onChange={(event) => this.setState({exposed_port: event.target.value})} required />

          <Form.Text className="text-muted">
            Exposed_port which will help others contact your environment.
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="code">

                <Form.Label>Code Content</Form.Label>
                  <Form.Control as="textarea" value={this.state.code}
                    onChange={(event) => this.setState({code: event.target.value})} 
                  />
                <Form.Text className="text-muted">
                  Real code to be executed.
                </Form.Text>
        </Form.Group> 


        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" value={this.state.enabled} 
          onChange={(event) => this.setState({active: event.target.checked})} />
        </Form.Group>

        </div>
        
        )

          
      let submit_button = (<Button variant="primary" onClick={this.createNewRuntime} > Submit </Button>)
      

      if (this.state.submitted) {
        return (
            <Redirect to="/codes" push={true} />
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


export default NewCode;