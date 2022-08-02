import React from 'react';


class ListModels extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            pictureUrl: '',
            models: [],
        };

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
    }

    // in here we import locations to select from when entering
    // a hat into tracking/storage
    async componentDidMount() {

        
        const url = 'http://localhost:8100/api/models/';

        const response = await fetch(url);

        if (response.ok){
            const data = await response.json();
            this.setState({models: data.models});
            console.log("API Response received", data);
        
        } else {
            console.log("API call failed");
        }
    }

    async handleDeleteClick(event) {
        
        //get the hat ID from the event target (delete button)
        const modelID = event.target.value;
        //console.log("Delete button ", hatID, " clicked")

        //set base URL and add the hat ID so delete request is correct
        const baseURL = 'http://localhost:8100/api/models/';
        const deleteURL = baseURL + modelID

        // only fetch parameters needed = method
        const fetchParameters = {
            method: 'delete',
        };

        // send the request, then convert and hold the response
        const response = await fetch(deleteURL, fetchParameters)
        let answer = await response.json();
        
        // log the response to the console
        console.log(answer)

        // if response is ok, log success message and delete
        // parts from state
        if (response.ok){
            console.log("OK!");

            
        }

    }

    render(){
        return(
            <div className="my-5 container">
            <div className="column">
            <div className="offset-3 col-6">
            <table className="table table-hover">
                <thead>
                  <tr>
                    <th> Model Name </th>
                    <th> Picture </th>
                    <th> Manufacturer </th>
                  </tr>
                </thead>
                <tbody>
                    {this.state.models.map(model=>{
                    return(
                        <tr key = {model.id}> 
                            <td>{model.name}</td>
                            <td><img src={model.picture_url} className="img-thumbnail" /></td>
                            <td>{model.manufacturer.name}</td>
                            <td>
                                <button type="button" onClick={this.handleDeleteClick} value={model.id} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>
                    )
                    })}
                </tbody>
            </table>    
            </div>
            </div>
            </div>
                  
        )
    };

}
export default ListModels;