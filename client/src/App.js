import { Route, Routes } from 'react-router-dom';
import './App.css';

import Landing from './react/components/Landing/Landing';
import Layout from './react/components/Layout/Layout';
import Home from './react/components/Home/Home';
import CreateRecipe from './react/components/CreateRecipe/CreateRecipe';
import About from './react/components/About/About';
import RecipeDetail from './react/components/RecipeDetail/RecipeDetail';
import NotFound from './react/components/NotFound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Landing />} />
        <Route path={"/"} element={<Layout />}>
          <Route path={"/home/"} element={<Home />} />
          <Route path={"/home/:id"} element={<RecipeDetail />} />
          <Route path={"/createrecipe"} element={<CreateRecipe />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"*"} element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
