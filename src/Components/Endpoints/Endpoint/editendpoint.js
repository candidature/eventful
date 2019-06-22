import React from 'react';
import { Form , Button } from 'react-bootstrap';
import axios from 'axios';
import { Redirect } from 'react-router-dom'

class EditEndpoint extends React.Component {
  
  state = {
    endpoint_name: '',
    path : '',
    method: 'GET',
    data : '',
    active: true,
    modified: false,
    Message:  null
  }

  constructor(props) {
    super(props);
    this.state.endpoint_name = this.props.selectedEndpoint.endpoint_name;
    this.state.path = this.props.selectedEndpoint.path
    this.state.method = this.props.selectedEndpoint.method

    this.state.data = this.props.selectedEndpoint.data || '{key1 : value1, key2: value2}'

    this.state.active = this.props.selectedEndpoint.active
  }


  restEndpoint = (e) => {
    e.preventDefault()
    document.getElementById("editform").reset();
    console.log("Clicked on resetEndpoint")
    this.setState({endpoint_name: this.props.selectedEndpoint.endpoint_name })



    this.state.endpoint_name = this.props.selectedEndpoint.endpoint_name;
    this.state.path = this.props.selectedEndpoint.path
    this.state.method = this.props.selectedEndpoint.method

    this.state.data = this.props.selectedEndpoint.data

    this.state.active = this.props.selectedEndpoint.active

  }

  saveEndpoint = (e) => {
    
    e.preventDefault()

    console.log("Clicked on saveEndpoint")

    this.setState({Message: null})

    let editEndpoint = {
      name: this.state.endpoint_name,
      path: this.state.path,
      method : this.state.method,
      active : this.state.active
    }

    if (this.state.method === 'POST' && this.state.data) {
      editEndpoint['data'] = this.state.data
    }

    console.log("New state of endpoint")
    console.log(editEndpoint)
    console.log("On put " + JSON.stringify(editEndpoint))

    axios.put('/endpoint/dev/v1/'+ this.props.selectedEndpoint.id, editEndpoint,
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

      console.log("All passed props into EditEndpoint " + JSON.stringify(this.props))
      console.log(this.props);

      let post_data = ""
      if (this.state.method === 'POST') {


        post_data = (<Form.Group controlId="data">

                <Form.Label>Data to pass</Form.Label>
                  <Form.Control as="textarea" defaultValue={this.state.data}
                    onChange={(event) => this.setState({data: event.target.value})} 

                  />
                <Form.Text className="text-muted">
                  Typically you will be calling GET, you can pass data using query string of GET method.
                  If you need to pass JSON (chunk of data), then you need POST method.
                </Form.Text>

          </Form.Group>  )

        }

        if (this.state.modified) {
        return (
            <Redirect to="/endpoints" push={true} />
          );

      } else {

  return (
    <form id="editform" autoComplete="off">
      <h1>Editing endpoint {this.props.id}</h1>
        <Form.Group controlId="name">  
          <Form.Label >Endpoint Name</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedEndpoint.endpoint_name}
          onChange={(event) => this.setState({endpoint_name: event.target.value})}

           />
          

          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of endpoint.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="path">
          <Form.Label>URI Path</Form.Label>
          <Form.Control type="text" defaultValue={this.props.selectedEndpoint.path}
          onChange={(event) => this.setState({path: event.target.value})}
        />
          
        <Form.Text className="text-muted">
            Example: /test/v1/[tools_name]/[purpose] , /test/v1/perforce/create_user for testing and /prod/v1/perforce/create_user for production.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="method">          
          <Form.Label>Method to call</Form.Label>
            <Form.Control as="select" defaultValue={this.props.selectedEndpoint.method}
              onChange={(event) => this.setState({method: event.target.value})}
            >
              <option>GET</option>
              <option>POST</option>
           </Form.Control>

            <Form.Text className="text-muted">
              Typically you will be calling GET, you can pass data using query string of GET method.
              If you need to pass JSON (chunk of data), then you need POST method.
            </Form.Text>
        </Form.Group>

        {post_data}

        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" defaultValue={this.props.selectedEndpoint.enabled}
          onChange={(event) => this.setState({enabled: event.target.value})}
           />
        </Form.Group>






        <Button variant="primary" onClick={this.saveEndpoint} > Save </Button>

        <Button variant="primary" onClick={this.restEndpoint} > Reset </Button>
        </form>
    ) }
    }
}


export default EditEndpoint;