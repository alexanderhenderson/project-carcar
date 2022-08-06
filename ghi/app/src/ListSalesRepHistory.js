import React from "react";


class ListSalesPersonHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        salesrep: [],
        customer: '',
        vin: '',
        price: '',
        sales: [],
        selectedsalesrep: '',
        selectedsales: [],
        
    
    };

    this.handleSalesRepChange = this.handleSalesRepChange.bind(this);
  }
  

  async componentDidMount() {
    const represponse = await fetch('http://localhost:8090/api/salesrep/');
    if (represponse.ok) {
      const repdata = await represponse.json();
      console.log(repdata);
      this.setState({salesrep: repdata.salesrep});
    }
    const response = await fetch('http://localhost:8090/api/sales/');
    if (response.ok) {
      const data = await response.json();

      // const filteredData = data.filter(
      //   item =>{return (item.salesrep.id)}
      // )

      console.log(data);
      this.setState({sales: data.sales});
    }

    
  }
  

  handleSalesRepChange(event) {
    const value = event.target.value;
    this.setState({selectedsalesrep: value});
    console.log(typeof(value.id));
    let copy = [...this.state.sales];
    console.log("pre-filter:", copy);
    const newcopy = copy.filter(selectedrep =>  {return(selectedrep.salesrep.id == value)});
    console.log("post-filter:", newcopy);
    this.setState({selectedsales: newcopy});
  }
  
  


  render() {

    // const filteredSales = this.state.filter(function(result) {
    //   return 
    // })

    return (
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Select a Sales rep</h1>
          
          <div className="mb-3">
            <select onChange={this.handleSalesRepChange} required name="salesrep" id='salesrep' className='form-select'>
                <option value="">Sales Rep</option>
                {this.state.salesrep.map(rep => {
                    return (
                      <option key={rep.id} value={rep.id}>{rep.name}</option>
                  );
              })}
            </select>
          </div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Sales rep</th>
                  <th>Employee number</th>
                  <th>Purchaser</th>
                  <th>VIN</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                { 
                  this.state.selectedsales.map(filteredsale => {
                 
                  
                  return (
                    <tr key={filteredsale.id}>
                      <td>{ filteredsale.salesrep.name }</td>
                      <td>{ filteredsale.salesrep.employeenumber }</td>
                      <td>{ filteredsale.customer.name}</td>
                      <td>{ filteredsale.automobile.vin }</td>
                      <td>{ filteredsale.price }</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          
        </div>
      </div>
      )
}
}


export default ListSalesPersonHistory
