import './App.css';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Inicio from './paginas/home';
import Roles from './paginas/roles/roles';
import Departamentos from './paginas/departamentos/departamentos';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
          <Route exact path='/' exact element={<Inicio />} />
          <Route path='/roles' element={<Roles/>} />
          <Route path='/departamentos' element={<Departamentos/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
