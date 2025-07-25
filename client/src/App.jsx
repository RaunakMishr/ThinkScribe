import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
const App = ()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element ={<Home/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>
      </Routes>
    </div>
  )
}
export default App;