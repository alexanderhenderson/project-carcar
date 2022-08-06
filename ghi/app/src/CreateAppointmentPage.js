import React from 'react';

class CreateAppointmentPage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            vin: "",
			      ownerName: "",
			      date: "",
			      time: "",
            reason: "",
		        technicians: [],
        };

        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleOwnerNameChange = this.handleOwnerNameChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);



    }

    // in here we import locations to select from when entering
    // a hat into tracking/storage
    async componentDidMount() {

        
        const url = 'http://localhost:8080/api/technicians/';

        const response = await fetch(url);

        if (response.ok){
          const data = await response.json();
          //console.log("API Response received, data: ", data);
            this.setState({technicians: data.technicians});
        
        } else {
            console.log("API call failed");
        }
    }

    handleVinChange(event) {
        const value = event.target.value;
        this.setState({vin: value});
    }

    handleOwnerNameChange(event) {
        const value = event.target.value;
        this.setState({ownerName: value});
    }

    handleDateChange(event) {
        const value = event.target.value;
        this.setState({date: value});
    }

    handleTimeChange(event) {
        const value = event.target.value;
        this.setState({time: value});
    }
    
    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({reason: value});
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({technician: value});
    }

    // // this will submit our completed form and clear it
    async handleSubmit(event) {
        //console.log("submit event detected")
        
        // keep the browser from interferring
        event.preventDefault();

        const data = {...this.state};

        
        data.owner_name = data.ownerName;
        data.assigned_tech = data.technician;
        data.reason_for_appointment = data.reason
        
        delete data.reason;
        delete data.ownerName;
        delete data.technician;
        delete data.technicians;
        
        //console.log("JSON Corrected data: ", data);
        const jsonData = JSON.stringify(data);
        //console.log("JSON Corrected data: ", jsonData);


        const getResponseURL = 'http://localhost:8080/api/appointments/';
        const fetchParameters = {
            method: 'post',
            body: jsonData,
            headers:{
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(getResponseURL, fetchParameters)

        if (response.ok){
            let newAppointment = await response.json();
            newAppointment = JSON.stringify(newAppointment);
            //console.log(newAppointment);

            // clear form
            this.setState({
            vin: "",
			      ownerName: "",
			      date: "",
			      time: "",
            reason: "",
            technician: "",
            });
        }

    }

    render(){
        return(
            <div className="my-5 container">
            <div className="column">
            <div className="offset-3 col-5">
                    <div className="shadow p-4 mt-4">
                    <h1>Create a Service Appointment</h1>
                    <form onSubmit={this.handleSubmit} id="create-location-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleVinChange} value={this.state.vin} placeholder="Vin" min="0" required type="number" name ="vin" id="vin" className="form-control"/>
                        <label htmlFor="vin">Vin</label>
                    </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleOwnerNameChange} value={this.state.ownerName} placeholder="Owner Name" required type="text" name ="ownerName" id="ownerName" className="form-control"/>
                    <label htmlFor="ownerName"> Owner Name </label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleDateChange} value={this.state.date} placeholder="Date" required type="date" name ="date" id="date" className="form-control"/>
                    <label htmlFor="date">Date</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleTimeChange} value={this.state.time} placeholder="Time" required type="time" name ="time" id="time" className="form-control"/>
                    <label htmlFor="time">Time</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea onChange={this.handleReasonChange} value={this.state.reason} placeholder="Reason" required type="text" name ="reason" id="reason" className="form-control"/>
                    <label htmlFor="reason">Reason</label>
                  </div>
                  <div className="mb-3">
                    <select onChange={this.handleTechnicianChange} required name="locations" id='locations' className='form-select'>
                    <option value="">Select a Technician</option>
                      {this.state.technicians.map(technician => {
                       return (
                        <option key={technician.href} value={technician.id}>
                          {technician.name}
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