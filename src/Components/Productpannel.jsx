import React, { useEffect, useState } from 'react'
import "../CSS/Ppannel.css"
import { Button, Input } from '@chakra-ui/react'
import axios from "axios"
import Productsection from './Productsection'

const Productpannel = () => {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState([])
    const [products, setProducts] = useState([])

    const getAllCategory = async () => {
        const url = `${process.env.REACT_APP_API}/products/categories`
        const cate = await axios.get(url)
        const { data } = cate
        setCategory(data)

    }

    const getAllProducts = async () => {
        const url = `${process.env.REACT_APP_API}/products`
        const prod = await axios.get(url)
        setProducts(prod.data)
    }

    const fetchProducts = async (value) => {
        const url = `${process.env.REACT_APP_API}/products/category/${value}`
        const data = await axios(url)
        setProducts(data.data)

    }

    const filterProducts = () => {
        const filterProducts = products.filter((prod) => {
            return prod?.description.includes(query)
        })
        setProducts(filterProducts)
    }

    useEffect(() => {
        getAllCategory()
        query ? filterProducts() : getAllProducts()
        // eslint-disable-next-line
    }, [query])
    return (
        <>
            <Input placeholder='Search Your Query Here' value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className='productpannel'>
                {category.map((d, index) => {
                    return (
                        <Button className='btn' width="auto" p={2} onClick={() => fetchProducts(d)} m={3} key={index} varient='solid' colorScheme='blue'>
                            {d}
                        </Button>
                    )
                })}
            </div >
            <Productsection products={products} />
        </>
    )
}

export default Productpannel