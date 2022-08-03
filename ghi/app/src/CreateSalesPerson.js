import React from 'react';

class CreateSalesPersons extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            employeenumber: "",
        }
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleEmployeeNumberChange = this.handleEmployeeNumberChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    
    
    
    handleNameChange(event) {
        const value = event.target.value;
        this.setState({name: value});
    }

    handleEmployeeNumberChange(event) {
        const value = event.target.value;
        this.setState({employeenumber: value});
    }

    async handleSubmit(event) { 
        event.preventDefault();
        const data = {...this.state};

        // console.log(data);
        let salespersonsUrl = 'http://localhost:8090/api/salespersons/';
        let fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(salespersonsUrl, fetchConfig);
        if (response.ok) {
            // console.log("response is ok")
            const newSalesPerson = await response.json();
            console.log(newSalesPerson)
            const cleared = {
                name: "",
                employeenumber: "",
            }
            this.setState(cleared);
        }


    }


    render () {
        return (
            <div className="row">
            <div className="offset-3 col-6">
            <div className="shadow p-4 mt-4">
                <h1>Create a Sales Person</h1>
                <form onSubmit={this.handleSubmit} id="create-salespersons-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} placeholder="Name" required type="text" name="name" value={this.state.name} id="name" className="form-control" />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={this.handleEmployeeNumberChange} placeholder="Employee number" required type="numbers" name="employeenumber" value={this.state.employeenumber} id="employeenumber" className="form-control" />
                        <label htmlFor="employeenumber">Employee Number</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                </form>
            </div>
            </div>
            </div>

        );
    }
}

export default CreateSalesPersons
