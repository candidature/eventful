import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import FlashMessage from 'react-flash-message'
import { Redirect } from 'react-router-dom'

class NewRuntime extends React.Component {
  
  state = {
    name: '',
    type : 'LOCAL', // other options are remote, docker(container)
    user_name : '',
    user_password: '',
    user_hostname: '',

    dockerfile : '',    
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
      this.state.name = this.props.displayAddNewRuntime.name;
      this.state.type = this.props.displayAddNewRuntime.type || 'LOCAL'

      this.state.user_name = this.props.displayAddNewRuntime.user_name;
      this.state.user_password = this.props.displayAddNewRuntime.user_password;
      this.state.user_hostname = this.props.displayAddNewRuntime.user_hostname;


      this.state.dockerfile = this.props.displayAddNewRuntime.dockerfile || '';
      


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

    let newRuntime = {
      name: this.state.name,
      type: this.state.type,
      user_name : this.state.user_name,
      user_password : this.state.user_password,
      user_hostname: this.state.user_hostname,
      dockerfile : this.state.dockerfile,
      active : this.state.active
    }


    console.log("On Creating new Runtime " + JSON.stringify(newRuntime))

    axios.post('/runtime/dev/v1/0', newRuntime,
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
          <Form.Label >Runtime Name</Form.Label>
          <Form.Control type="text" placeholder="Name of Runtime" value={this.state.name} 
          onChange={(event) => this.setState({name: event.target.value})} required />

          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of runtime.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="type">          
          <Form.Label>Type of Runtime</Form.Label>
            <Form.Control as="select" onChange={this.handleTypeChange} value={this.state.type}>

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




        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" value={this.state.enabled} 
          onChange={(event) => this.setState({active: event.target.checked})} />
        </Form.Group>
        </div>
        )

      let dynamic_data = ""
    
      if ( this.state.type === 'REMOTE') {
        console.log("Methooood is " + this.state.userSelectedType)
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
        console.log("Methooood is " + this.state.userSelectedType)
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

      } else {

      }

          
      let submit_button = (<Button variant="primary" onClick={this.createNewRuntime} > Submit </Button>)
      

      if (this.state.submitted) {
        return (
            <Redirect to="/runtimes" push={true} />
          );

      } else {
      return (<div key={this.htmlId} ><FlashMessage duration={5000} persistOnHover={true} position="top"> <p>{this.state.Message}</p> </FlashMessage>

                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div><h1>Define New Runtime</h1></div>
                </div>
                <Form>
                {basic_data}
                {dynamic_data}
                {submit_button}
              </Form></div> )
        }
  }
}


export default NewRuntime;