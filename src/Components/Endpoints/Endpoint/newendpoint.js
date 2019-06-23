import React from 'react';


import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import FlashMessage from 'react-flash-message'
import { Redirect } from 'react-router-dom'

class NewEndpoint extends React.Component {
  
  state = {
    name: '',
    path : '',
    method: '',
    data : '{key1 : value1, key2: value2}',
    active: true,
    userSelectedMethod: 'GET',
    Message:  null,
    submitted: false
  }
 

 //This is useful for Edit/Add button
 // When edit add button clicked displayAddNewEndpoint data is passed via props
 // and this is set as default data of new object.

  constructor(props) {
    super(props)

    if(this.props.displayAddNewEndpoint.endpoint_name) {
      console.log("Display this.props.displayAddNewEndpoint via copy&edit")
      console.log(this.props.displayAddNewEndpoint)
      this.state.name = this.props.displayAddNewEndpoint.endpoint_name;
      this.state.path = this.props.displayAddNewEndpoint.path;
      this.state.method = this.props.displayAddNewEndpoint.method || 'GET';
      this.state.active = this.props.displayAddNewEndpoint.active;
      this.state.data = this.props.displayAddNewEndpoint.data || '{key1 : value1, key2: value2}';
    }
  }

  handleMethodChange = (e) => {
    let method = e.target.value.trim()
    if(method==='POST') {
      this.setState ( {userSelectedMethod: method} );
      this.setState ( {method: method} );
      //this.props.displayAddNewEndpoint.method = 'POST';
    } else {
      this.setState ( {userSelectedMethod: method} );
      this.setState ( {method: method} );
      //this.props.displayAddNewEndpoint.method = 'GET';
    }
  }

  createNewEndpoint = (e) => {
    
    e.preventDefault()

    console.log("Clicked on createNewEndpoint")

    this.setState({Message: null})

    let newEndpoint = {
      name: this.state.name,
      path: this.state.path,
      method : this.state.method,
      active : this.state.active
    }

    if (this.state.method === 'POST' && this.state.data) {
      newEndpoint['data'] = this.state.data
    }

    //console.log("On submit " + JSON.stringify(newEndpoint))

    axios.post('/endpoint/dev/v1/0', newEndpoint,
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
    let get_data = (

      <div>
        <Form.Group controlId="name" >  
          <Form.Label >Endpoint Name</Form.Label>
          <Form.Control type="text" placeholder="Name of Endpoint" value={this.state.name} 
          onChange={(event) => this.setState({name: event.target.value})} required />

          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of endpoint.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="path">
          <Form.Label>URI Path</Form.Label>
          <Form.Control type="text" placeholder="URI Path" value={this.state.path}
           onChange={(event) => this.setState({path: event.target.value})} 
          />
          
          <Form.Text className="text-muted">
            Example: /test/v1/[tools_name]/[purpose] , /test/v1/perforce/create_user for testing and /prod/v1/perforce/create_user for production.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="method">          
          <Form.Label>Method to call</Form.Label>
            <Form.Control as="select" onChange={this.handleMethodChange} value={this.state.method}>

              <option>GET</option>
              <option>POST</option>

            </Form.Control>

            <Form.Text className="text-muted">
              Typically you will be calling GET, you can pass data using query string of GET method.
              If you need to pass JSON (chunk of data), then you need POST method.
            </Form.Text>
        
        </Form.Group>

        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" value={this.state.enabled} 
          onChange={(event) => this.setState({active: event.target.checked})} />
        </Form.Group>
        </div>
        )

      let post_data = ""
    
      if ( this.state.method === 'POST') {

      console.log("Methooood is " + this.state.userSelectedMethod)
      post_data = (

              <Form.Group controlId="data">

                <Form.Label>Data to pass</Form.Label>
                  <Form.Control as="textarea" value={this.state.data}
                    onChange={(event) => this.setState({data: event.target.value})} 
                  />
                <Form.Text className="text-muted">
                  Typically you will be calling GET, you can pass data using query string of GET method.
                  If you need to pass JSON (chunk of data), then you need POST method.
                </Form.Text>

              </Form.Group> 
            )
        }
          
      let submit_button = (<Button variant="primary" onClick={this.createNewEndpoint} > Submit </Button>)
      

      if (this.state.submitted) {
        return (
            <Redirect to="/endpoints" push={true} />
          );

      } else {
      return (


              <div key={this.htmlId} ><FlashMessage duration={5000} persistOnHover={true} position="top"> <p>{this.state.Message}</p> </FlashMessage>

              <div style={{display: 'flex', justifyContent: 'center'}}>
                <div><h1>Define New Endpoint</h1></div>
              </div>

                <Form>
                {get_data}
                {post_data}
                {submit_button}
              </Form></div> )
        }
  }
}


export default NewEndpoint;