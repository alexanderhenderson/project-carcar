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
import CreateSalesPersons from './CreateSalesPerson';
import CreateSalesRecord from './CreateSalesRecord';
import ListSales from './ListSales';


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
          <Route path="/salespersons" element={<CreateSalesPersons />} />
          <Route path="/salesrecord/new" element={<CreateSalesRecord />} />
          <Route path="/sales" element={<ListSales />} />          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
