import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
            <h3 className="text-white"> Inventory:</h3>
              <NavLink className="nav-link" aria-current="page" to="/models/new">
                Create a Automobile Model
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/models">
                Lost of Automobile Models
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/createManufacturer">
                Create Manufacturer
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/manufacturers">
                List of Manufacturers
              </NavLink>
<<<<<<< HEAD
              <NavLink className="nav-link" aria-current="page" to="/addAutomobile">
                Add Automobile to Inventory
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/automobiles">
                Automobiles in Inventory
              </NavLink>
              </li>
              <li className="nav-item">
              <h3 className="text-white"> Service:</h3>
=======
              <NavLink className="nav-link" aria-current="page" to="/customers">
                Create a potential customer
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/salespersons">
                Create a Sales Person
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/salesrecord/new">
                Create a Sales Record
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/sales">
                List Sales
              </NavLink>
>>>>>>> main-branch
              <NavLink className="nav-link" aria-current="page" to="/addTechnician">
                Add Technician
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/createAppointment">
                Create Appointment
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/scheduledAppointments">
                Scheduled Appointments
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/serviceHistory">
                Service History
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
