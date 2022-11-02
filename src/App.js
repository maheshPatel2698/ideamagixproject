import React, { useState, useEffect } from 'react'
import storeContext from './Context/StoreContext'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Products from "./Pages/Products"
import Admin from './Pages/Admin'
import Checkout from './Pages/Checkout'
import About from './Pages/About'
import axios from 'axios'
import Product from './Pages/Product'
import { Routes, Route } from "react-router-dom"
import { useToast } from "@chakra-ui/react"
const App = () => {
  const toast = useToast()
  const checkPrevUser = () => {
    const user = localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    else {
      return null
    }
  }


  const [products, setProducts] = useState([])
  const [user, setUser] = useState(checkPrevUser())
  const [cart, setCart] = useState([])

  const getAllProducts = async () => {
    const url = `${process.env.REACT_APP_API}/products`
    const prod = await axios.get(url)
    setProducts(prod.data)
  }


  useEffect(() => {
    getAllProducts()
  }, [])
  return (
    <>
      <storeContext.Provider value={{
        products,
        setProducts,
        user,
        setUser,
        cart,
        setCart,
        toast

      }}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />

          <Route path='/checkout' element={<Checkout />} />
          <Route path='/products' element={<Products />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/about' element={<About />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
        <Footer />
      </storeContext.Provider>
    </>
  )
}

export default App