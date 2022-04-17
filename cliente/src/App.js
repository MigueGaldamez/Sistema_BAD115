
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
const cookies = new Cookies();


function RequireAuth({ children, redirectTo }) {
  let isAutenticado = false;
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
          <Route path='/municipios' element={ <RequireAuth redirectTo="/login"><Municipios/></RequireAuth>} />
          <Route path='/municipios' element={ <RequireAuth redirectTo="/login"><Municipios/></RequireAuth>} />
          

          <Route exact path='/' exact element={<RequireAuth redirectTo="/login"><Inicio/></RequireAuth>} />
          
          
          <Route path='/login' element={<Login/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
