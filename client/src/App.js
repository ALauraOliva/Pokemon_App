import './App.css';
import {Helmet} from "react-helmet";
import { Cards } from './components/Cards/Cards';
import { Nav } from './components/Nav/Nav';
import { About } from './components/About/About'
import { Detail } from './components/Detail/Detail'
import { Create } from './components/Create/Create'
import { LandingPage } from './components/LandingPage/LandingPage'
import { Page404 } from './components/Page404/Page404';
import { Route, Routes, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { createPokemon } from "./redux/actions";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleCreatePokemon = (newPokemonData) => {
    dispatch(createPokemon(newPokemonData))
  };

  return (
    <div className="App">
      <Helmet>
          <meta charSet="utf-8" />
          <title>Pokedex App</title>
          <link rel="canonical" href="http://mysite.com/example" />
          <meta name="description" content="Helmet application" />
      </Helmet>
      {location.pathname !== '/' && <Nav/>}
      <Routes>
            <Route path={'/'} element={<LandingPage/>} />
            <Route path={'/Home'} element={<Cards/>}/>
            <Route path={'/about'} element={<About/>}/>
            <Route path={'/detail/:id'} element={<Detail/>}/>
            <Route path={'/create'} element={<Create onCreatePokemon={handleCreatePokemon}/>}/>
            <Route path={'*'} element={<Page404/>}/>
         </Routes>
    </div>
  );
}

export default App;
