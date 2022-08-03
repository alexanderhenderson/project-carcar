import React from 'react';

class CreateTechnicianPage extends React.Component{

  constructor(props){
    // initilizing super class
    super(props);

    this.state = {
      name: '',
      employeeNumber: '',
    }
  
    // event bindings
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // handle change in manufacturer form tag / state
  handleNameChange(event){
    const value = event.target.value;
    this.setState({name: value});
  }
  
  // handle change in manufacturer form tag / state
  handleEmployeeNumberChange(event){
    const value = event.target.value;
    this.setState({employeeNumber: value});
  }
  
  async handleSubmit(event){

    // prevent browser from interferring
    event.preventDefault();

    // get state data
    const data = {...this.state};

    console.log("state: ", this.state)

    // data conversion
    data.employee_number = data.employeeNumber
    delete data.employeeNumber
    const jsonData = JSON.stringify(data);

    console.log("data: ", data)

    // setting up and fetching
    const postURL = 'http://localhost:8080/api/technicians/';
    const fetchParameters ={
      method: 'post',
      body: jsonData,
      headers:{
        'Content-Type': 'application/json',
    },
    };

    // send post request
    const jsonResponse = await fetch(postURL, fetchParameters)

    // clearing form/state if successful
    if (jsonResponse.ok){
      const response = await jsonResponse.json();
      console.log('Response: ', data);
      this.setState({
        name: '',
        employeeNumber: '',
      });
    }
  }

    render(){
        return(
          <div className=".container-lg">
          <div className="column">
          <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
              <h1>Add Technician</h1>
              <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                  <input onChange={this.handleNameChange} value={this.state.name} type="text" placeholder="Name" name="name" id="name" className="form-control"/>
                  <label htmlFor="name"> Name </label>
              </div>
              <div className="form-floating mb-3">
                  <input onChange={this.handleEmployeeNumberChange} value={this.state.employeeNumber} type="number" min="0" placeholder="Employee Number" name="employeeNumber" id="employeeNumber" className="form-control"/>
                  <label htmlFor="employeeNumber"> Employee Number </label>
              </div>
                <button className="btn btn-success">Create</button>
              </form>
          </div>
          </div>
          </div>
          </div>
      )};
};
    

export default CreateTechnicianPage;
