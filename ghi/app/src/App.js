import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateModel from './CreateModel';
import ListAutomobiles from './ListAutomobiles';
import ListModels from './ListModels';
import MainPage from './MainPage';
import Nav from './Nav';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/automobiles" element={<ListAutomobiles />} />
          <Route path="/models/new" element={<CreateModel />} />
          <Route path="/models" element={<ListModels />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
