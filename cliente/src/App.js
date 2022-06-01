
//NAV Y FOOTER
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';

import { BrowserRouter as Router, Routes, Route,Navigate} from 'react-router-dom';
//PAGINAS
import Inicio from './paginas/home';
import Roles from './paginas/roles/roles';
import Departamentos from './paginas/departamentos/departamentos';
import Login from './paginas/login';
//COOKIES
import Cookies from 'universal-cookie';
import Municipios from './paginas/municipios/municipios';
import Poblaciones from './paginas/poblaciones/poblaciones';
import Laboratorios from './paginas/laboratorios/laboratorios';
import Profesiones from './paginas/profesiones/profesiones';
import Usuarios from './paginas/usuarios/usuarios';
import OpcionesPermisos from './paginas/opcionespermisos/opcionespermisos';
import Areas from './paginas/areas/areas';
import EstadosCiviles from './paginas/estadosciviles/estadosciviles';
import Unidades from './paginas/unidades/unidades';
import Laboratoristas from './paginas/laboratoristas/laboratoristas';
import Pacientes from './paginas/pacientes/pacientes';
import Chequeos from './paginas/chequeos/chequeos';
import DetalleChequeo from './paginas/detalleChequeo/detalleChequeo';
import Muestras from './paginas/muestras/muestras';
import ReporteTipeo from './paginas/reporteTipeo/reporteTipeo';

const cookies = new Cookies();


function RequireAuth({ children, redirectTo }) {
  let isAutenticado = false;//aqui
  if(cookies.get('nombre')){
    isAutenticado = true;
  }
  return isAutenticado ? children : <Navigate to={redirectTo} />;
}
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          
          <Route path='/departamentos' element={ <RequireAuth redirectTo="/login"><Departamentos/></RequireAuth>} />
          <Route path='/roles' element={ <RequireAuth redirectTo="/login"><Roles/></RequireAuth>} />
          <Route path='/municipios' element={ <RequireAuth redirectTo="/login"><Municipios/></RequireAuth>} />        
          <Route path='/poblaciones' element={ <RequireAuth redirectTo="/login"><Poblaciones/></RequireAuth>} />
          <Route path='/laboratorios' element={ <RequireAuth redirectTo="/login"><Laboratorios/></RequireAuth>} />          
          <Route path='/profesiones' element={ <RequireAuth redirectTo="/login"><Profesiones/></RequireAuth>} />
          <Route path='/usuarios' element={ <RequireAuth redirectTo="/login"><Usuarios/></RequireAuth>} />
          <Route path='/opcionespermisos' element={ <RequireAuth redirectTo="/login"><OpcionesPermisos/></RequireAuth>} />
          <Route path='/areas' element={ <RequireAuth redirectTo="/login"><Areas/></RequireAuth>} />          
          <Route path='/estadosciviles' element={ <RequireAuth redirectTo="/login"><EstadosCiviles/></RequireAuth>} />          
          <Route path='/unidades' element={ <RequireAuth redirectTo="/login"><Unidades/></RequireAuth>} />
          <Route path='/laboratoristas' element={ <RequireAuth redirectTo="/login"><Laboratoristas/></RequireAuth>} />
          <Route path='/pacientes' element={ <RequireAuth redirectTo="/login"><Pacientes/></RequireAuth>} />
          <Route path='/chequeos' element={ <RequireAuth redirectTo="/login"><Chequeos/></RequireAuth>} />
          <Route path='/resultados' element={ <RequireAuth redirectTo="/login"><DetalleChequeo/></RequireAuth>} />
          <Route path='/muestras' element={ <RequireAuth redirectTo="/login"><Muestras/></RequireAuth>} />
          <Route path='/reportetipeo' element={ <RequireAuth redirectTo="/login"><ReporteTipeo/></RequireAuth>} />

          <Route exact path='/' element={<RequireAuth redirectTo="/login"><Inicio/></RequireAuth>} />
          
          
          <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
