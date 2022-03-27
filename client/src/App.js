import { Route, Routes } from 'react-router-dom';
import './App.css';

import Landing from './react/components/Landing/Landing';
import Layout from './react/components/Layout/Layout';
import Home from './react/components/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path={"/"} element={<Landing/>} />
        <Route path={"/"} element={<Layout/>}>
          <Route path={"/home"} element={<Home/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
