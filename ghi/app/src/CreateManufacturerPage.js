import React from 'react';

class CreateManufacturerPage extends React.Component{

  constructor(props){
    // initilizing super class
    super(props);

    this.state = {
      manufacturer: '',
    }
  
    // event bindings
    this.handleManufacturerChange = this.handleManufacturerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  // handle change in manufacturer form tag / state
  handleManufacturerChange(event){
    const value = event.target.value;
    this.setState({manufacturer: value});
    console.log(value);
  }
  
  async handleSubmit(event){

    // prevent browser from interferring
    event.preventDefault();

    // get state data
    const data = {...this.state};

    console.log("state: ", this.state)

    // data conversion
    data.name = data.manufacturer;
    delete data.manufacturer;
    const jsonData = JSON.stringify(data);

    // setting up and fetching
    const postURL = 'http://localhost:8100/api/manufacturers/';
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
        manufacturer: '',
      });
    }
  }

    render(){
        return(
          <div className=".container-lg">
          <div className="column">
          <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
              <h1>Create a Manufacturer</h1>
              <form onSubmit={this.handleSubmit}>
              <div className="form-floating mb-3">
                  <input onChange={this.handleManufacturerChange} value={this.state.manufacturer} type="text" placeholder="Manufacturer" name="manufacturer" id="manufacturer" className="form-control"/>
                  <label htmlFor="name"> Manufacturer</label>
              </div>
                <button className="btn btn-success">Create</button>
              </form>
          </div>
          </div>
          </div>
          </div>
      )};
};
    

export default CreateManufacturerPage;
