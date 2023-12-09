import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import EspaceClient from './components/espaceclient';
import Homebank from './components/homebank';
import Bonsclient from './components/bonsclient';
import Addclient from './components/addclinet';
import Sendemailverification from './components/Sendemailverification';
import Password from './components/Password';
import Historiqueclinet from './components/historiqueclinet';
import Editclient from './components/editclient';
function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      
        <Routes>
          <Route exact path="/newpassword" element={<Password />} />
        </Routes>
        <Routes>
          <Route exact path="/register" element={<Register />} />
        </Routes>
        <Routes>
          <Route exact path="/espaceclient" element={<EspaceClient />} />
        </Routes>
        <Routes>
          <Route exact path="/banque" element={<Homebank />} />
        </Routes>
        <Routes>
          <Route exact path="/bonsclients" element={<Bonsclient />} />
        </Routes>
        <Routes>
          <Route exact path="/addclient" element={<Addclient />} />
        </Routes>
        <Routes>
          <Route exact path='/reset-password' element={<Sendemailverification />}/>
        </Routes>
        <Routes>
          <Route exact path='/client/:email' element={<Historiqueclinet />}/>
        </Routes>
        <Routes>
          <Route exact path='/edit/:id' element={<Editclient />}/>
        </Routes>
        
      </Router>

    </div>
  );
}

export default App;
