import React from 'react';

class ManufacturerListPage extends React.Component{

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
        <div className="shadow p-4 mt-4">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Manufacturers</th>
            </tr>
          </thead>
          <tbody>
            
          {this.state.manufacturers.map(manufacturer=>{
            return(
              <tr key = {manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
              )
            })}
          </tbody>
        </table>
        </div>
    )};
};

export default ManufacturerListPage;
