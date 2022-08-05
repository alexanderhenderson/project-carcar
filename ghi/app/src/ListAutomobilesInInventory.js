import React from "react";


class ListAutomobiles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {autos: []}
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({autos: data.autos});
    }
  }


  render() {

    return (
    <div>
      <h1> Automobiles in Inventory </h1>
      <table className="table table-striped" title="Automobiles in Inventory">
          <thead>
            <tr>
              <th>Color</th>
              <th>Year</th>
              <th>VIN</th>
              <th>Model</th>
            </tr>
          </thead>
          <tbody>
            {this.state.autos.map(automobile => {
              console.log(automobile);
              return (
                <tr key={automobile.id}>
                  <td>{ automobile.color }</td>
                  <td>{ automobile.year }</td>
                  <td>{ automobile.vin }</td>
                  <td>{automobile.model.name}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    )
}
}


export default ListAutomobiles




// import React from 'react';


// class ListAutomobiles extends React.Component{

//     constructor(props) {
//         super(props);
//         this.state = {
//             color: '',
//             year: '',
//             vin: '',
//             model_id: '',
//             autos: [],
//         };

//         this.handleDeleteClick = this.handleDeleteClick.bind(this);
//     }

//     // in here we import locations to select from when entering
//     // a automobile into tracking/storage
//     async componentDidMount() {

        
//         const url = 'http://localhost:8100/api/automobiles/';

//         const response = await fetch(url);

//         if (response.ok){
//             const data = await response.json();
//             this.setState({autos: data.autos});
//             console.log("API Response received", data);
        
//         } else {
//             console.log("API call failed");
//         }
//     }

//     async handleDeleteClick(event) {
        
//         //get the automobile ID from the event target (delete button)
//         const automobileID = event.target.value;
//         //console.log("Delete button ", automobileID, " clicked")

//         //set base URL and add the automobile ID so delete request is correct
//         const baseURL = 'http://localhost:8100/api/automobiles/';
//         const deleteURL = baseURL + automobileID

//         // only fetch parameters needed = method
//         const fetchParameters = {
//             method: 'delete',
//         };

//         // send the request, then convert and hold the response
//         const response = await fetch(deleteURL, fetchParameters)
//         let answer = await response.json();
        
//         // log the response to the console
//         console.log(answer)

//         // if response is ok, log success message and delete
//         // parts from state
//         if (response.ok){
//             console.log("OK!");

            
//         }

//     }

//     render(){
//         return(
//             <div className="my-5 container">
//             <div className="column">
//             <div className="offset-3 col-6">
//             <table className="table table-hover">
//                 <thead>
//                   <tr>
//                     <th> Color </th>
//                     <th> Year </th>
//                     <th> Vin </th>
//                     <th> Model ID </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                     {this.state.autos.map(automobile=>{
//                     return(
//                         <tr key = {automobile.id}> 
//                             <td>{automobile.color}</td>
//                             <td>{automobile.year}</td>
//                             <td>{automobile.vin}</td>
//                             <td>{automobile.model.name}</td>
//                             <td>
//                                 <button type="button" onClick={this.handleDeleteClick} value={automobile.id} className="btn btn-danger">Delete</button>
//                             </td>
//                         </tr>
//                     )
//                     })}
//                 </tbody>
//             </table>    
//             </div>
//             </div>
//             </div>
                  
//         )
//     };

// }
// export default ListAutomobiles;