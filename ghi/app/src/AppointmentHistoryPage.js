import React from 'react';

class AppointmentHistroyPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      search: '',
      appointments: [],
      searchMatchAppointments: []
    }

    this.handleSearchChange = this.handleSearchChange.bind(this)
    this.handleSearchClick = this.handleSearchClick.bind(this)

  }

  async componentDidMount() {

    // first fetch function below gets appointlist and stores appointments that
    // have been completed
    
    // get request for appintment list
    const url = 'http://localhost:8080/api/appointments/';
    const response = await fetch(url);

    if (response.ok){
      const data = await response.json();


      // altering data to include a new field "from inventory" that is set to false by default
      const newData = data.appointments.map(item => Object.assign({}, item, {fromInventory: "No"}))


      // filters out services that have not been completed using filter method
      const correctedData = newData.filter(
        item =>{return (item.completed == true)}
      );


      // set state equal to modified newData from our get request
        this.setState({appointments: correctedData});
        
    } else {
      console.log("API call failed");
    }
  }

  handleSearchChange(event){
    const value = event.target.value;
    this.setState({search: value})
  }

  async handleSearchClick(event) {
    event.preventDefault();

    let appointmentList = [...this.state.appointments];

    for (let i=0; i < appointmentList.length; i+= 1){
      if (appointmentList[i].vin != this.state.search){
        delete appointmentList[i]
      }

    }

    this.setState({searchMatchAppointments: appointmentList});
  }


    render(){
        return (
        <div className="shadow p-4 mt-4">
          <form id="form">
            <div className="form-row">
              <div className="col"> 
              <input onChange={this.handleSearchChange} className="form-control" placeholder="Enter VIN" type="text"/>
              </div>
              <div className="col">
              <button onClick={this.handleSearchClick} className="btn-info form-control"> Search Vin </button>
              </div>
            </div>
          </form>
          <h1> Service History </h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Assigned Technician</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Vehicle Vin</th>
              <th scope="col">Reason for Appointment</th>
            </tr>
          </thead>
          <tbody>
            
          {this.state.searchMatchAppointments.map(appointment=>{
            return(
              <tr key = {appointment.href}>
                <td>{appointment.owner_name}</td>
                <td>{appointment.assigned_tech.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.reason_for_appointment}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
        </div>
    )};
};

export default AppointmentHistroyPage;



