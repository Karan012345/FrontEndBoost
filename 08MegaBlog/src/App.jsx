
import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .catch(() => {
        dispatch(logout())
      })
      .finally(() => {
        setLoading(false)
      })
  }, [dispatch])



  /* if (loading) {
     return <h1>Loading...</h1>
   }*/

  return !loading ? (
    <div className='min-h-screen flex felx-wrap
    content-between bg-gray-400'>
      <div className='w-full-block'>
        <Header />
        <main>
          TODO: <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null

}


export default App

