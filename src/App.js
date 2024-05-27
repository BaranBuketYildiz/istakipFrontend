import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Customer from './pages/Customer';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
          <Route path='customer' element={<Customer />}/>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
