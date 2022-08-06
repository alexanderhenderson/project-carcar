import React from 'react';

class CreateCustomers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            address: "",
            phone: "",
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};

        // console.log(data);
        let postUrl = 'http://localhost:8090/api/customers/';
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(postUrl, fetchConfig);
        if (response.ok) {
            // console.log("response is ok")
            const newCustomer = await response.json();
            console.log(data);
            const cleared = {
                name: "",
                address: "",
                phone: "",
            }
            this.setState(cleared);
        }


    }
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleAddressChange(event) {
        const value = event.target.value;
        this.setState({address: value});
    }

    handlePhoneChange(event) {
        const value = event.target.value;
        this.setState({phone: value});
    }


    

    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Add a potential customer</h1>
                <form onSubmit={this.handleSubmit} id="create-hat-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" value={this.state.name} id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleAddressChange} placeholder="Address" required type="text" name="address" value={this.state.address} id="address" className="form-control" />
                        <label htmlFor="address">Address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handlePhoneChange} placeholder="Phone" required type="text"  name="phone" value={this.state.phone} id="phone" className="form-control" />
                        <label htmlFor="phone">Phone number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default CreateCustomers
