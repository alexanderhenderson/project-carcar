import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import ManufacturerListPage from './ManufacturerListPage';
import CreateManufacturerPage from './CreateManufacturerPage'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerListPage />} />
          <Route path="/createManufacturer" element={<CreateManufacturerPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
