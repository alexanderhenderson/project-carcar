import React from "react";


class ListSalesPersonHistory extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        salesperson: '',
        employeenumber: '',
        purchaser: '',
        price: '',
        vin: '',
        sales: [],
    
    }
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8100/api/salesrecord/');
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      this.setState({sales: data.sales});
    }
  }


  render() {

    return (
    
    <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Employee number</th>
            <th>Purchaser</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {this.state.sales.map(sale => {
            console.log(sale);
            return (
              <tr key={sale.id}>
                <td>{ sale.salesperson.name }</td>
                <td>{ sale.employee.employeenumber }</td>
                <td>{ sale.customer.name}</td>
                <td>{ sale.automobile.vin }</td>
                <td>{ sale.price }</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
}
}


export default ListSalesPersonHistory
