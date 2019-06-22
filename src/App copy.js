import React , {Component} from 'react';
import Endpoints from './Components/Endpoints/endpoints'
import axios from 'axios';
import './App.css';


class App extends Component {

  state = {

    endpoints: [
      {'id': 1, 'name': "ADD_USER_ENDPOINT", 'path': '/perforce/test/create_user',  'method': 'POST', 'data': 'abc:def'},
      {'id': 2, 'name': "DELETE_USER_ENDPOINT", 'path': '/perforce/test/create_user',  'method': 'POST', 'data': 'abc:def'},
      {'id': 3, 'name': "EDIT_USER_ENDPOINT", 'path': '/perforce/test/create_user',  'method': 'POST', 'data': '{abc:def}'}
    ],
    showPersons: false
  }

  componentDidMount () {
    axios.get('http://localhost:5000/endpoint/dev/v1')
         .then(response=>{
          this.setState({endpoints: response.data.endpoints })

          console.log(response)
         })

  }

  

  render() {
    
    return (
      <div className="App">
        <Endpoints endpoints={this.state.endpoints}/>
      </div>
    )
  }
}


export default App;
