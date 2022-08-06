import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateModel from './CreateModel';
import ListAutomobiles from './ListAutomobilesInInventory';
import ListModels from './ListModels';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerListPage from './ManufacturerListPage';
import CreateManufacturerPage from './CreateManufacturerPage'
<<<<<<< HEAD
import AddAutomobileToInventory from './AddAutomobileToInventoryPage'
=======
import AddCarToInventory from './AddCarToInventoryPage'
import CreateCustomers from './CreateCustomer';
import CreateSalesPersons from './CreateSalesPerson';
import CreateSalesRecord from './CreateSalesRecord';
import ListSales from './ListSales';
>>>>>>> main-branch
import CreateTechnicianPage from './CreateTechnicianPage';
import CreateAppointmentPage from './CreateAppointmentPage';
import ScheduledAppointmentsListPage from './ScheduledAppointmentsListPage';
import AppointmentHistroyPage from './AppointmentHistoryPage';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerListPage />} />
          <Route path="/createManufacturer" element={<CreateManufacturerPage />} />
          <Route path="/automobiles" element={<ListAutomobiles />} />
          <Route path="/models/new" element={<CreateModel />} />
          <Route path="/models" element={<ListModels />} />
<<<<<<< HEAD
          <Route path="/addAutomobile" element={<AddAutomobileToInventory />} />
=======
          <Route path="/addCar" element={<AddCarToInventory />} />
          <Route path="/customers" element={<CreateCustomers />} />
          <Route path="/salespersons" element={<CreateSalesPersons />} />
          <Route path="/salesrecord/new" element={<CreateSalesRecord />} />
          <Route path="/sales" element={<ListSales />} />          
>>>>>>> main-branch
          <Route path="/addTechnician" element={<CreateTechnicianPage />} />
          <Route path="/createAppointment" element={<CreateAppointmentPage />} />
          <Route path="/scheduledAppointments" element={<ScheduledAppointmentsListPage />} />
          <Route path="/serviceHistory" element={<AppointmentHistroyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
