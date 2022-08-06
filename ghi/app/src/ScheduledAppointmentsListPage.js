import React from 'react';

class ScheduledAppointmentsListPage extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      appointments: [],
      inventoryVins: [],
    }

    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleCompletedClick = this.handleCompletedClick.bind(this)

  }

  async componentDidMount() {

    // get request for appintment list
    const url = 'http://localhost:8080/api/appointments/';
    const response = await fetch(url);

    if (response.ok){
      const data = await response.json();

      // playing with map functions below
      // const list = [ { a : 'a', b : 'b' } , { a : 'a2' , b : 'b2' }]
      // const neww = list.map(item => Object.assign({}, item, { c : 'c'}))
      // console.log(neww)

      // altering data to include a new field "from inventory" that is set to false by default
      const newData = data.appointments.map(item => Object.assign({}, item, {fromInventory: "No"}))
      //console.log('response: ',newData, " type is ", typeof(newData));

      // filters out services that have been completed using filter method
      const correctedData = newData.filter(
        item =>{return (item.completed == false)}
      );
      //console.log('corrected data: ', correctedData);


      // set state equal to modified newData from our get request
        this.setState({appointments: correctedData});
        //console.log("API Response received", newData);
        
      } else {
        console.log("API call failed");
      }
      
      // get request for previous inventory vins
      const vinUrl = 'http://localhost:8080/api/vins';
      const vinResponse = await fetch(vinUrl);
      
      if (vinResponse.ok){
        const vinData = await vinResponse.json();
        this.setState({inventoryVins: vinData.vins})
      }
      
      // changeing state appointment attribute "fromInventory" to str "Yes"
      // if the vin entered for the appointment matches one that was in our
      // inventory and is now stored in the service microservice automobileVO
      for (let i=0; i < this.state.appointments.length; i+= 1){
        for (let vin of this.state.inventoryVins){
        //console.log('comparing: ', vin['vin'], this.state.appointments[i].vin)
          if (this.state.appointments[i].vin == vin['vin']){
            this.state.appointments[i].fromInventory = "Yes";
            //console.log('great success')
          }
        }
      }

      //console.log('testing if logic works: ',this.state.appointments)
  }


  async handleCompletedClick(event) {
    console.log("completed clicked")

    //get the href from the event target (delete button)
    const appointmentHref = event.target.value;
    console.log("Complete button ", appointmentHref, " clicked")

    //set base URL and add the shoe ID so delete request is correct
    const baseUrl = 'http://localhost:8080';
    const putUrl = baseUrl + appointmentHref
    console.log('url for put request: ', putUrl)

    // only fetch parameters needed = method
    const fetchParameters = {
      method: 'put',
    };

    // send the request, then convert and hold the response
    const response = await fetch(putUrl, fetchParameters)
    let answer = await response.json();    
    // log the response to the console
    // console.log(answer)

    // if response is ok, log success message and delete
    // parts from state
    if (response.ok){
        console.log("great success");

        window.location.reload(false);
      }



  }


  // this event will delete the selected appointment  
  async handleDeleteClick(event) {
        
    //get the href from the event target (delete button)
    const appointmentHref = event.target.value;
    //console.log("Delete button ", shoeID, " clicked")

    //set base URL and add the shoe ID so delete request is correct
    const baseURL = 'http://localhost:8080';
    const deleteURL = baseURL + appointmentHref
    //console.log('url for delete request: ', deleteURL)

    // only fetch parameters needed = method
    const fetchParameters = {
      method: 'delete',
    };

    // send the request, then convert and hold the response
    const response = await fetch(deleteURL, fetchParameters)
    let answer = await response.json();    
    // log the response to the console
    // console.log(answer)

    // if response is ok, log success message and delete
    // parts from state
    if (response.ok){
        console.log("great success");

        window.location.reload(false);
      }
  }


    render(){
        return (
        <div className="shadow p-4 mt-4">
          <h1> Scheduled Appointments </h1>
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Customer</th>
              <th scope="col">Assigned Technician</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Vehicle Vin</th>
              <th scope="col">Special Rate</th>
              <th scope="col">Reason for Appointment</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            
          {this.state.appointments.map(appointment=>{
            return(
              <tr key = {appointment.href}>
                <td>{appointment.owner_name}</td>
                <td>{appointment.assigned_tech.name}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td>{appointment.vin}</td>
                <td>{appointment.fromInventory}</td>
                <td>{appointment.reason_for_appointment}</td>
                <td> 
                <button type="button" onClick={this.handleDeleteClick} value={appointment.href} className="btn btn-danger btn-sm">Cancel Service</button>
                <button type="button" onClick={this.handleCompletedClick} value={appointment.href} className="btn btn-success">Service Completed</button>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        </div>
    )};
};

export default ScheduledAppointmentsListPage;
