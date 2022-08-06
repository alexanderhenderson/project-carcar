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
              <NavLink className="nav-link" aria-current="page" to="/automobiles">
                Automobiles
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/models/new">
                Create a vehicle model
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/models">
                Models
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/manufacturers">
                List of Manufacturers
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/createManufacturer">
                Create Manufacturer
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/addCar">
                Add Car to Inventory
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/customers">
                Create a potential customer
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/salesrep">
                Create a Sales Rep
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/salesrecord">
                Create a Sales Record
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/sales">
                List Sales
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/salesrephistory">
                List Sales Rep History
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/addTechnician">
                Add Technician
              </NavLink>
              <NavLink className="nav-link" aria-current="page" to="/createAppointment">
                Create Appointment
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
