import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Layout from './pages/Admin/Layout';
import AddBlog from './pages/Admin/AddBlog';
import Dashboard from './pages/Admin/Dashboard';
import ListBlog from './pages/Admin/ListBlog';
import Comments from './pages/Admin/Comments';
import Login from './components/admin/Login';

const App = ()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element ={<Home/>}></Route>
        <Route path='/blog/:id' element={<Blog/>}></Route>

        <Route path='/admin' element={true ? <Layout/> : <Login/>}>
          <Route index element={<Dashboard/>}></Route>
          <Route path='addBlog' element={<AddBlog/>}></Route>
          <Route path='listBlog' element={<ListBlog/>}></Route>
          <Route path='comments' element={<Comments/>}></Route>
        </Route>
        
      </Routes>
    </div>
  )
}
export default App;