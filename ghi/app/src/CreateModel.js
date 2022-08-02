import React from "react";


class CreateModel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pictureUrl: '',
            manufacturers: [],
        }
        
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handlePictureUrlChange = this.handlePictureUrlChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleManufacturerIdChange = this.handleManufacturerIdChange.bind(this);
        
    }

    async componentDidMount() {


        const url = 'http://localhost:8100/api/manufacturers/';

        const response = await fetch(url);

        if (response.ok){
            //console.log("API Response received");
            const data = await response.json();
            this.setState({manufacturers: data.manufacturers});
        
        } else {
            console.log("API call failed");
        }
    

    }


    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handlePictureUrlChange(event) {
        const value = event.target.value;
        this.setState({pictureUrl: value});
    }

    handleManufacturerIdChange(event) {
        const value = event.target.value;
        this.setState({manufacturersID: value});
    }


    async handleSubmit(event) {
        console.log("submit event detected")
        
        // keep the browser from interferring
        event.preventDefault();

        console.log(this.state);
        const data = {...this.state};

        data.picture_url = data.pictureURL;
        data.manufacturer_id = data.manufacturerId;
        

        delete data.pictureURL;
        delete data.manufacturerId;
        delete data.manufacturers;

        console.log(data);

        //console.log("JSON Corrected data: ", data);
        const jsonData = JSON.stringify(data);

        const getResponseURL = 'http://localhost:8100/api/models/';
        const fetchParameters = {
            method: 'post',
            body: jsonData,
            headers:{
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(getResponseURL, fetchParameters)

        if (response.ok){
            let newModel = await response.json();
            newModel = JSON.stringify(newModel);
            console.log(newModel);
        }

    }

    render(){
        return(
            <div className="my-5 container">
            <div className="column">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new vehicle model</h1>
                    <form onSubmit={this.handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name ="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handlePictureUrlChange} value={this.state.pictureUrl} placeholder="Picture URL" required type="url" name ="pictureUrl" id="pictureUrl" className="form-control"/>
                    <label htmlFor="pictureUrl">Picture URL</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleManufacturerIdChange} required name="manufacturerId" id='manufacturerId' className='form-select'>
                    <option value="">Choose a manufacturer</option>
                      {this.state.manufacturers.map(manufacturer => {
                       return (
                        <option key={manufacturer.href} value={manufacturer.id}>
                          {manufacturer.name}
                        </option>
                      );
                     })}
                    </select>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
          </div>
                  
        )
    };

}
export default CreateModel;





