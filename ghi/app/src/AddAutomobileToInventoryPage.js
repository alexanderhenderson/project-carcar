import React from 'react';

class AddAutomobileToInventory extends React.Component{

  constructor(props){
    // initilizing super class
    super(props);

    this.state = {
      color: '',
      year: '',
      vin: '',
      models: [],
    }
  
    // event bindings
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleModelChange = this.handleModelChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  async componentDidMount() {

    // url for vehicle model list api call
    const url = 'http://localhost:8100/api/models/';

    // send api call
    const response = await fetch(url);

    // if response is good, store model list
    if (response.ok){

        const data = await response.json();

        this.setState({models: data.models});
    }

}

  // handle change in color
  handleColorChange(event){
    const value = event.target.value;
    this.setState({color: value});
  }

  // handle change in year
  handleYearChange(event){
    const value = event.target.value;
    this.setState({year: value});
  }

  // handle change in vin
  handleVinChange(event){
    const value = event.target.value;
    this.setState({vin: value});
  }
  
  // handle model change
  handleModelChange(event){
    const value = event.target.value;
    this.setState({model: value});
  }

  async handleSubmit(event){

    // prevent browser from interferring
    event.preventDefault();

    // get state data
    const data = {...this.state};
    //console.log("state: ", this.state)
    
    
    // data conversion
    data.model_id = data.model;
    delete data.model;
    delete data.models;
    const jsonData = JSON.stringify(data);
    
    //console.log("data: ", jsonData);

    // setting up and fetching
    const postURL = '	http://localhost:8100/api/automobiles/';
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
      //console.log('Response: ', data);
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
              <h1>Add Automobile to inventory</h1>
              <form onSubmit={this.handleSubmit}>
              <div className="mb-3">
              <div className="form-floating mb-3">
                  <input onChange={this.handleYearChange} value={this.state.year} max='2040' min='1900' type="number" placeholder="year" name="year" id="year" className="form-control"/>
                  <label htmlFor="year"> Year </label>
              </div>
                  <select onChange={this.handleModelChange} required placeholder="Model" name="model" id="model" className="form-select">
                  <option value="">Select model</option>
                  {this.state.models.map(model => {
                       return (
                        <option key={model.href} value={model.id}>
                          {`${model.manufacturer.name} ${model.name}`}
                        </option>
                      );
                     })}
                  </select>
              </div>
              <div className="form-floating mb-3">
                  <input onChange={this.handleVinChange} value={this.state.vin} type="text" placeholder="vin" name="vin" id="vin" className="form-control"/>
                  <label htmlFor="vin"> Vin Number </label>
              </div>
              <div className="form-floating mb-3">
                  <input onChange={this.handleColorChange} value={this.state.color} type="text" placeholder="Color" name="color" id="color" className="form-control"/>
                  <label htmlFor="color"> Color </label>
              </div>
                <button className="btn btn-success">Create</button>
              </form>
          </div>
          </div>
          </div>
          </div>
      )};
};
    

export default AddAutomobileToInventory;
