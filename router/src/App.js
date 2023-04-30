import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Home} from './pages/Home';
import {Menu} from './pages/Menu';
import {Contact} from './pages/Contact';
import {Error} from './pages/Error';
import {Navbar} from './pages/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
        {/*Anything bellow here will change*/}
        <Routes>
            {/*An element is a component which will be rendered when you go to this route*/}
          <Route path="/" element={<Home/>}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/contact" element={<Contact/>}/>
            {/*The * redirects from any url that is not defined above*/}
          <Route path="*" element={<Error/>}/>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
