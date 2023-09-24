import React, { useContext } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './layout/frontLayout'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import BlogsPage from './pages/BlogsPage'
import AboutPage from './pages/AboutPage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthContext } from './context/AuthContext'
import AccountPage from './pages/AccountPage'
import NotFoundPage from './pages/NotFoundPage'
import { ToastContainer } from 'react-toastify'
import MyBlogsPage from './pages/MyBlogsPage'

function App() {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path='category' element={<CategoryPage />} />
            <Route path='blogs' element={<BlogsPage />} />
            <Route path='about' element={<AboutPage />} />
            <Route path='register' element={<RegisterPage />} />
            <Route path='login' element={<LoginPage />} />
            {isAuthenticated ?
              <>
                <Route path='account' element={<AccountPage />} />
                <Route path='my-blogs' element={<MyBlogsPage />} />
              </>

              :
              <Route path='*' element={<NotFoundPage />} />

            }
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App