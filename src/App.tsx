import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { Plan } from './components/Plan';
import { List} from './components/List';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';

const NavMenu = () => {
  return (
    <>
      <Nav />
    </>
  )
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NavMenu />}>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/list" element={<List />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
