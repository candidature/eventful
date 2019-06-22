import React from 'react';
import { Form } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';


const EditEndpoint = (props) => {
  console.log("All passed props into EditEndpoint " + JSON.stringify(props))
  return (
    <div>
      <h1>Editing endpoint {props.id}</h1>
        <Form.Group controlId="name">  
          <Form.Label >Endpoint Name</Form.Label>
          <Form.Control type="text" placeholder="Name of Endpoint" value={props.selectedEndpoint.endpoint_name} 
           />

          <Form.Text className="text-muted">
            A name which helps everyone easily identify purpose of endpoint.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="path">
          <Form.Label>URI Path</Form.Label>
          <Form.Control type="text" placeholder="URI Path" value={props.path}
        />
          
        <Form.Text className="text-muted">
            Example: /test/v1/[tools_name]/[purpose] , /test/v1/perforce/create_user for testing and /prod/v1/perforce/create_user for production.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="method">          
          <Form.Label>Method to call</Form.Label>
            <Form.Control as="select" value={props.method}>
              <option>GET</option>
              <option>POST</option>
           </Form.Control>

            <Form.Text className="text-muted">
              Typically you will be calling GET, you can pass data using query string of GET method.
              If you need to pass JSON (chunk of data), then you need POST method.
            </Form.Text>
        </Form.Group>

        <Form.Group controlId="active">
          <Form.Check type="checkbox" label="Active" value={props.enabled} 
           />
        </Form.Group>
        </div>
    )
};
export default withRouter(EditEndpoint);