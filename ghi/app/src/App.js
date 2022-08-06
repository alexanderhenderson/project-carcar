import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateModel from './CreateModel';
import ListAutomobiles from './ListAutomobiles';
import ListModels from './ListModels';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerListPage from './ManufacturerListPage';
import CreateManufacturerPage from './CreateManufacturerPage'
import AddCarToInventory from './AddCarToInventoryPage'
import CreateCustomers from './CreateCustomer';
import CreateSalesRep from './CreateSalesRep';
import CreateSalesRecord from './CreateSalesRecord';
import ListSales from './ListSales';
import ListSalesRepHistory from './ListSalesRepHistory';
import CreateTechnicianPage from './CreateTechnicianPage';
import CreateAppointmentPage from './CreateAppointmentPage';


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
          <Route path="/addCar" element={<AddCarToInventory />} />
          <Route path="/customers" element={<CreateCustomers />} />
          <Route path="/salesrep" element={<CreateSalesRep />} />
          <Route path="/salesrecord" element={<CreateSalesRecord />} />
          <Route path="/sales" element={<ListSales />} />
          <Route path="/salesrephistory" element={<ListSalesRepHistory />} />
          <Route path="/addTechnician" element={<CreateTechnicianPage />} />
          <Route path="/createAppointment" element={<CreateAppointmentPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
