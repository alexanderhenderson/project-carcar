import React from 'react';

class CreateSalesRecord extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            autos: [],
            customers: [],
            salespersons: [],
            price: "",
        }
        this.handleAutoChange = this.handleAutoChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
        this.handleSalesPersonChange = this.handleSalesPersonChange.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const autoresponse = await fetch('http://localhost:8100/api/automobiles/');
        if (autoresponse.ok) {
          const data = await autoresponse.json();
          console.log(data);
          this.setState({autos: data.autos});
        }
        const custresponse = await fetch('http://localhost:8100/api/customers/');
        if (custresponse.ok) {
          const data = await custresponse.json();
          console.log(data);
          this.setState({customers: data.customers});
        }
        const represponse = await fetch('http://localhost:8100/api/salespersons/');
        if (represponse.ok) {
          const data = await represponse.json();
          console.log(data);
          this.setState({salespersons: data.salespersons});
        }
      }


    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};
        
        delete data.autos;
        delete data.customers;
        delete data.salespersons;


        // console.log(data);
        let getResponseURL = 'http://localhost:8090/api/salesrecord/';
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        let response = await fetch(getResponseURL, fetchConfig);
        if (response.ok) {
            const newSalesRecord = await response.json();
            console.log(newSalesRecord);
            const cleared = {
                price: '',
            }
            this.setState(cleared);
        }


    }
    handleAutoChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleCustomerChange(event) {
        const value = event.target.value;
        this.setState({address: value});
    }

    handleSalesPersonChange(event) {
        const value = event.target.value;
        this.setState({phone: value});
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
                <form onSubmit={this.handleSubmit} id="create-hat-form"></form>
                    <div className="mb-3">
                        <select onChange={this.handleAutoChange} value={this.state.autos} name="Automobile" required id="auto" className="form-select">
                            <option value="">Automobile</option>
                            {this.state.autos.map(auto => {
                                return (
                                    <option key={auto.id} value={auto.id}>{auto.model.name}</option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="mb-3">
                        <select onChange={this.handleSalesPersonChange} value={this.state.salespersons} name="Sales person" required id="salesperson" className="form-select">
                            <option value="">Sales person</option>
                            {this.state.salespersons.map(salesperson => {
                                return (
                                    <option key={salesperson.id} value={salesperson.id}>{salesperson.name}</option>
                                );
                            })}
                        </select>
                    </div>                    
                    <div className="mb-3">
                        <select onChange={this.handleCustomerChange} value={this.state.customers} name="Customers" required id="customer" className="form-select">
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
                
            </div>
            </div>
            </div>

        );
    }
}

export default CreateSalesRecord
