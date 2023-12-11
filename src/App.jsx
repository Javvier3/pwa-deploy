import { Routes, Route } from 'react-router-dom';
import Conductores from './screens/Conductores/Conductores';
import Unidades from './screens/Unidades/Unidades';
import Login from './screens/Login/Login';
import Viajes from './screens/Viajes/Viajes';
import ViajesRegisterAndEdit from './screens/Viajes/Subscreens/ViajesRegisterAndEdit';
import ParadasRegisterAndEdit from './screens/Viajes/Subscreens/ParadasRegisterAndEdit';

function App() {
  return (
    <Routes>
      <Route path="/viajes" element={<Viajes />} />
      <Route path="/viajesRegister" element={<ViajesRegisterAndEdit isNew={true} />} />
      <Route path="/viajesRegister/:idViaje" element={<ViajesRegisterAndEdit isNew={false} />} />
      <Route path="/paradasRegister" element={<ParadasRegisterAndEdit />} />
      <Route path="/conductores" element={<Conductores />} />
      <Route path="/unidades" element={<Unidades />} />
      <Route path="/logout" element={<Login />} />
    </Routes>
  );
}

export default App;
