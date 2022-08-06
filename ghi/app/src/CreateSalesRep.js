import React from "react";


class CreateSalesPerson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            employeenumber: '',
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
        
        
        // keep the browser from interferring
        event.preventDefault();

        
        const data = {...this.state};
        

        console.log("JSON Corrected data: ", data);
        const jsonData = JSON.stringify(data);

        const getResponseURL = 'http://localhost:8090/api/salesrep/';
        const fetchParameters = {
            method: 'post',
            body: jsonData,
            headers:{
                'Content-Type': 'application/json',
            },
        };

        const response = await fetch(getResponseURL, fetchParameters)

        if (response.ok){
            const newSalesPerson = await response.json();
            // newModel = JSON.stringify(newModel);
            console.log(newSalesPerson);

            const cleared = {
                name: '',
                employeenumber: '',
              };
              this.setState(cleared);
        }

    }

    render(){
        return(
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new sales person</h1>
                    <form onSubmit={this.handleSubmit} id="create-model-form">
                    <div className="form-floating mb-3">
                        <input onChange={this.handleNameChange} value={this.state.name} placeholder="Name" required type="text" name ="name" id="name" className="form-control"/>
                        <label htmlFor="name">Name</label>
                    </div>
                  <div className="form-floating mb-3">
                    <input onChange={this.handleEmployeeNumberChange} value={this.state.employeenumber} placeholder="Employee number" required type="text" name ="employeenumber" id="employeenumber" className="form-control"/>
                    <label htmlFor="employeenumber">Employee Number</label>
                  </div>
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>      
        )
    };

}
export default CreateSalesPerson;
