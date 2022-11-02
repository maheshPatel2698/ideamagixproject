import React, { useState, useEffect, useContext } from 'react'
import "../CSS/Products.css"
import { Button, Link, Image, Input, Heading } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import axios from "axios"
import storeContext from '../Context/StoreContext'


const Products = () => {
    const { setCart, cart, user, toast } = useContext(storeContext)
    const [query, setQuery] = useState('')
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        const url = `${process.env.REACT_APP_API}/products`
        const prod = await axios.get(url)
        setProducts(prod.data)
    }

    const addToCart = (id, title, image, description, price, category,) => {
        if (!user?.username) {
            return toast({
                title: 'Error !',
                description: "Please Login To account",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        const isAlreadyAdded = cart.findIndex(function (array) {
            return array.id === id
        })
        if (isAlreadyAdded !== -1) {
            alert("Already Added")
            return
        }
        let product = {
            id,
            title,
            image,
            description,
            price,
            category
        }
        setCart([...cart, product])
        toast({
            title: 'Added !',
            description: "Added to Cart SuccessFully",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    const filterProducts = () => {
        const filterProducts = products.filter((prod) => {
            return prod?.title.includes(query)
        })

        setProducts(filterProducts)
    }
    useEffect(() => {

        query ? filterProducts() : getAllProducts()
        // eslint-disable-next-line
    }, [query])

    return (
        <div className='mainsec-sub'>
            <div className="filtersec">
                <Heading m={2} as='h3' size='md'>Search Your Product</Heading>
                <Input placeholder='Search Your Query Here' value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <div className='productsection-sub'>
                {products.length === 0 ? <Heading textAlign='center' as="h1" size='xl'>No Match Product</Heading> : products.map((prod) => {
                    return (
                        <div className="card" key={prod?.id}>
                            <Link href={`/product/${prod?.id}`}>
                                <div className="imgclass">
                                    <Image className='img' src={prod?.image} alt='Image' />
                                </div>
                            </Link>
                            <div className="top">
                                <span>{prod?.title}</span>
                                <span>💰{prod?.price}</span>

                            </div>
                            <div className="para">
                                <p>{prod?.description.slice(0, 70)}...</p>

                            </div>
                            <div className="midsec">
                                <span>{prod?.category}</span>
                                <span id='sp'>
                                    {Array(5)
                                        .fill('')
                                        .map((_, i) => (
                                            <StarIcon
                                                key={i}
                                                color={i < prod?.rating.rate ? 'teal.500' : 'gray.300'}
                                            />
                                        ))}
                                </span>
                                <span>{prod?.count}</span>

                            </div>
                            <div className="action">
                                <Button m={2} colorScheme='blue' >Buy Now</Button>
                                <Button m={2} onClick={() => addToCart(prod?.id, prod?.title, prod?.image, prod?.description, prod?.price, prod?.category)} colorScheme='blue' >Add to Cart</Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default Products