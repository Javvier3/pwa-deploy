import { Routes, Route } from 'react-router-dom';
import Conductores from './screens/Conductores/Conductores';
import Unidades from './screens/Unidades/Unidades';
import Login from'./screens/Login/Login'
import Viajes from './screens/Viajes/Viajes';

function App() {
  return (
  
  <Routes>
    <Route path="/viajes" element={<Viajes/>}></Route>
    <Route path="/conductores" element={<Conductores/>}></Route>
    <Route path="/unidades" element={<Unidades/>}></Route>
    <Route path="/logout" element={<Login/>}></Route>
  </Routes>
  );
}

export default App;
