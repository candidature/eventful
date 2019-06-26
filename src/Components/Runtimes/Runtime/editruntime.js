import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class EditRuntime extends React.Component {
  
  state = {
    name: '',
    type : '',
    user_name: '',
    user_password: '',
    user_hostname: '',
    dockerfile : '',
    active: true,
    modified: false,
    Message:  null
  }

  constructor(props) {
    super(props);
    this.state.endpoint_name = this.props.selectedruntime.endpoint_name;
    this.state.type = this.props.selectedruntime.type;

    this.state.user_name = this.props.selectedruntime.user_name;
    this.state.user_password = this.props.selectedruntime.user_password;
    this.state.user_hostname = this.props.selectedruntime.user_hostname;

    this.state.dockerfile = this.props.selectedruntime.dockerfile;
    this.state.active = this.props.selectedruntime.active

  }


  restRuntime = (e) => {
    e.preventDefault()
    document.getElementById("editform").reset();
    console.log("Clicked on resetRuntime")
    this.setState({name: this.props.selectedruntime.endpoint_name })

    this.setState({type: this.props.selectedruntime.type })
    this.setState({user_name: this.props.selectedruntime.user_name })
    this.setState({user_password: this.props.selectedruntime.user_password })
    this.setState({user_hostname: this.props.selectedruntime.user_hostname })
    this.setState({dockerfile: this.props.selectedruntime.dockerfile })

    this.setState({active: this.props.selectedruntime.active })    
    

  }

  saveRuntime = (e) => {
    
    e.preventDefault()

    console.log("Clicked on saveRuntime")

    this.setState({Message: null})

    let editRuntime = {
      name: this.state.name,
      type: this.state.type,
      
      dockerfile : this.state.dockerfile,
      active : this.state.active
    }

    if (this.state.type === 'REMOTE') {
      

      editRuntime['user_name'] = this.state.user_name
      ////
      editRuntime['user_password'] = this.state.user_password
      editRuntime['user_hostname'] = this.state.user_hostname

    } else if(this.state.type === 'CONTAINER') {
      editRuntime['dockerfile'] = this.state.dockerfile
    }

    console.log("New state of runtime")
    console.log(editRuntime)
    console.log("On put " + JSON.stringify(editRuntime))

    axios.put('/runtime/dev/v1/'+ this.props.selectedruntime.id, editRuntime,
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

      console.log("All passed props into EditRuntime " + JSON.stringify(this.props))
      console.log(this.props);

      let dynamic_data = ""
    
      if ( this.state.type === 'REMOTE') {
        
        dynamic_data = (
            <div>
              <Form.Group controlId="user_name" >  
                <Form.Label >Username</Form.Label>
                <Form.Control type="text" placeholder="Username to login to remote host" value={this.state.user_name} 
                    onChange={(event) => this.setState({user_name: event.target.value})} required />

                <Form.Text className="text-muted">
                    A name which helps everyone easily identify purpose of runtime.
                </Form.Text>
              </Form.Group>


              <Form.Group controlId="user_password" >  
                <Form.Label >Password</Form.Label>
                <Form.Control type="text" placeholder="Password to login to remote host" value={this.state.user_password} 
                    onChange={(event) => this.setState({user_password: event.target.value})} required />

                <Form.Text className="text-muted">
                    A name which helps everyone easily identify purpose of runtime.
                </Form.Text>
              </Form.Group>


              <Form.Group controlId="user_hostname" >  
                <Form.Label >Hostname</Form.Label>
                <Form.Control type="text" placeholder="Hostname for remote login" value={this.state.user_hostname} 
                    onChange={(event) => this.setState({user_hostname: event.target.value})} required />

                <Form.Text className="text-muted">
                    A name which helps everyone easily identify purpose of runtime.
                </Form.Text>
              </Form.Group>



              </div>
          )

      } else if (this.state.type === 'CONTAINER') {
        
        dynamic_data = (
            
            <Form.Group controlId="data">

                <Form.Label>Dockerfile Content</Form.Label>
                  <Form.Control as="textarea" value={this.state.dockerfile}
                    onChange={(event) => this.setState({dockerfile: event.target.value})} 
                  />
                <Form.Text className="text-muted">
                  Dockerfile without code - code will be mouted and supplied to this runtime.
                </Form.Text>

              </Form.Group> 


          )
      }

      if (this.state.modified) {
        return (
            <Redirect to="/runtimes" push={true} />
          );

      } else {

  return (
    <form id="editform" autoComplete="off">
      
        <div style={{display: 'flex', justifyContent: 'center'}}>
                <div><h1>Edit Runtime {this.props.selectedruntime.id}</h1></div>
        </div>
        
        <Form.Group controlId="name">  
          <Form.Label >Runtime Name</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedruntime.name}
          onChange={(event) => this.setState({name: event.target.value})}
           />
          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of endpoint.
          </Form.Text>
        </Form.Group>


        <Form.Group controlId="type">          
          <Form.Label>Type Of Runtime</Form.Label>
            <Form.Control as="select" defaultValue={this.props.selectedruntime.type}
              onChange={(event) => this.setState({type: event.target.value})}
            >
              <option>LOCAL</option>
              <option>REMOTE</option>
              <option>CONTAINER</option>
           </Form.Control>

            <Form.Text className="text-muted">
              LOCAL : Runs job as service account as which this queuing system running.
              REMOTE : Run job remotely on specified host and username.
              DOCKER: Run job in a specified docker container. A container of specified dockerfile is created at runtime.
            </Form.Text>
        </Form.Group>

        {dynamic_data}

        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" defaultValue={this.props.selectedruntime.enabled}
          onChange={(event) => this.setState({enabled: event.target.value})}
           />
        </Form.Group>



        <Button variant="primary" onClick={this.saveRuntime} > Save </Button>

        <Button variant="primary" onClick={this.restRuntime} > Reset </Button>
        </form>
    ) }
    }
}


export default EditRuntime;