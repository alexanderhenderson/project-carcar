import React from 'react';

class CreateSalesRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: [],
            selectedauto: '',
            customers: [],
            selectedcustomer: '',
            salesrep: [],
            selectedsalesrep: '',
            price: "",
        }
        this.handleAutoChange = this.handleAutoChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesRepChange = this.handleSalesRepChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const autoresponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoresponse.ok) {
          const autodata = await autoresponse.json();
          console.log(autodata);
          this.setState({autos: autodata.autos});
        }
        const represponse = await fetch('http://localhost:8090/api/salesrep/');
        if (represponse.ok) {
          const data = await represponse.json();
          console.log(data);
          this.setState({salesrep: data.salesrep});
        }
        const custresponse = await fetch('http://localhost:8090/api/customers/');
        if (custresponse.ok) {
          const data = await custresponse.json();
          console.log(data);
          this.setState({customers: data.customers});
        }

        console.log(this.state);
      }


    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};
        
        delete data.autos;
        delete data.customers;
        delete data.salesrep;
        
        data.automobile = data.selectedauto;
        data.customer = data.selectedcustomer;
        data.salesrep = data.selectedsalesrep;
        
        delete data.selectedauto;
        delete data.selectedcustomer;
        delete data.selectedsalesrep;


        // console.log(data);
        let getResponseURL = 'http://localhost:8090/api/sales/';
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        console.log(data);
        let response = await fetch(getResponseURL, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();
            console.log(newSalesRecord);
            const cleared = {
                price: '',
            }
            this.setState(cleared);
            console.log(newSalesRecord);
        }


    }
    handleAutoChange(event) {
        const value = event.target.value;
        this.setState({selectedauto: value});
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({selectedcustomer: value});
    }

    handleSalesRepChange(event) {
        const value = event.target.value;
        this.setState({selectedsalesrep: value});
    }

    handlePriceChange(event) {
        const value = event.target.value;
        this.setState({price: value});
    }
    


    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Record a new sale</h1>
                <form onSubmit={this.handleSubmit} id="create-hat-form">
                    <div className="mb-3">
                        <select onChange={this.handleAutoChange} required name="auto" id='auto' className='form-select'>
                            <option value="">Automobile</option>
                            {this.state.autos.map(auto => {
                                return (
                                    <option key={auto.id} value={auto.id}>{auto.model.name}</option>
                            );
                        })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleSalesRepChange} name="salesrep" required id="salesrep" className="form-select">
                            <option value="">Sales Rep</option>
                            {this.state.salesrep.map(salesr => {
                                return (
                                    <option key={salesr.id} value={salesr.id}>{salesr.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleCustomerChange} name="Customers" required id="customer" className="form-select">
                            <option value="">Customers</option>
                            {this.state.customers.map(customer => {
                                return (
                                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="form-floating mb-3">
                        <input onChange={this.handlePriceChange} placeholder="Price" required type="text" name="price" value={this.state.price} id="price" className="form-control" />
                        <label htmlFor="price">Price</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default CreateSalesRecord
