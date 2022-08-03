import React from 'react';

class CreateAppointmentPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            vin: "",
			      ownerName: "",
			      data: "",
			      time: "",
            reason: "",
		        technician: [],
        };

        this.handleFabricChange = this.handleFabricChange.bind(this);
        this.handleStyleNameChange = this.handleStyleNameChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handlePictureURLChange = this.handlePictureURLChange.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



    }

    // in here we import locations to select from when entering
    // a hat into tracking/storage
    async componentDidMount() {

        
        const url = 'http://localhost:8100/api/locations/';

        const response = await fetch(url);

        if (response.ok){
            //console.log("API Response received");
            const data = await response.json();
            this.setState({locations: data.locations});
        
        } else {
            console.log("API call failed");
        }
    }

    handleFabricChange(event) {
        const value = event.target.value;
        this.setState({fabric: value});
        console.log(value);
    }

    handleStyleNameChange(event) {
        const value = event.target.value;
        this.setState({styleName: value});
    }

    handleColorChange(event) {
        const value = event.target.value;
        this.setState({color: value});
    }

    handlePictureURLChange(event) {
        const value = event.target.value;
        this.setState({pictureURL: value});
    }
    
    handleLocationChange(event) {
        const value = event.target.value;
        this.setState({location: value});
    }


    // this will submit our completed form and clear it
    async handleSubmit(event) {
        //console.log("submit event detected")
        
        // keep the browser from interferring
        event.preventDefault();

        const data = {...this.state};

        data.style_name = data.styleName;
        data.picture_url = data.pictureURL;

        delete data.styleName;
        delete data.pictureURL;
        delete data.locations;

        //console.log("JSON Corrected data: ", data);
        const jsonData = JSON.stringify(data);

        const getResponseURL = 'http://localhost:8090/api/hats/';
        const fetchParameters = {
            method: 'post',
            body: jsonData,
            headers:{
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(getResponseURL, fetchParameters)

        if (response.ok){
            let newHat = await response.json();
            newHat = JSON.stringify(newHat);
            console.log(newHat);
        }

    }

    render(){
        return(
            <div className="my-5 container">
            <div className="column">
            <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                    <h1>Create a new hat</h1>
                    <form onSubmit={this.handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleFabricChange} value={this.state.fabric} placeholder="Fabric" required type="text" name ="fabric" id="fabric" className="form-control"/>
                        <label htmlFor="name">Fabric</label>
                    </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleColorChange} value={this.state.color} placeholder="Color" required type="text" name ="color" id="color" className="form-control"/>
                    <label htmlFor="name">Color</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleStyleNameChange} value={this.state.styleName} placeholder="Style Name" required type="text" name ="styleName" id="styleName" className="form-control"/>
                    <label htmlFor="name">Style Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handlePictureURLChange} value={this.state.pictureURL} placeholder="Picture URL" required type="url" name ="pictureURL" id="pictureURL" className="form-control"/>
                    <label htmlFor="name">Picture URL</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleLocationChange} required name="locations" id='locations' className='form-select'>
                    <option value="">Choose a location</option>
                      {this.state.locations.map(location => {
                       return (
                        <option key={location.href} value={location.id}>
                          {location.closet_name}
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
export default CreateAppointmentPage;