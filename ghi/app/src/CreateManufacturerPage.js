import React from 'react';

class CreateManufacturerPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      manufacturers: [],
    }
  }

  async componentDidMount() {

    const url = 'http://localhost:8100/api/manufacturers/';
    const response = await fetch(url);

    if (response.ok){
        const data = await response.json();
        this.setState({manufacturers: data.manufacturers});
        console.log("API Response received", data);
    
    } else {
        console.log("API call failed");
    }
}


    render(){
        return (
          <div className=".container-lg">
          <div className="column">
          <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
              <h1 >Create a Manufacturer</h1>
              <form>
              <div className="form-floating mb-3">
                  <input type="text" placeholder="Manufacturer" name="Manufacturer" id="manufacturer" className="form-control"/>
                  <label htmlFor="name"> Manufacturer</label>
              </div>
              <button type="button" class="btn btn-success">Create</button>
              </form>
          </div>
          </div>
          </div>
          </div>
    )};
};

export default CreateManufacturerPage;
