import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom"
import "../CSS/Product.css"
import { Image, Button } from '@chakra-ui/react'
import axios from 'axios'
import storeContext from '../Context/StoreContext'
import { StarIcon } from "@chakra-ui/icons"

const Product = () => {

    const { setCart, cart, user } = useContext(storeContext)
    const [product, setProduct] = useState({})
    const { id } = useParams()

    const addToCart = (id, title, image, description, price, category,) => {
        if (!user?.username) {
            alert("Please Login to Account")
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
    }

    const findProduct = async () => {
        let url = `${process.env.REACT_APP_API}/products/${id}`
        const product = await axios.get(url)
        const { data } = product
        setProduct(data)


    }

    useEffect(() => {
        findProduct()
        // eslint-disable-next-line
    }, [id])

    return (
        <div className='product'>
            <div className="image-class">
                <Image className='img' src={product?.image} />
            </div>
            <div className="info">
                <span>{product?.title}</span>
                <span>{product?.description}</span>
                <span>{product?.rating?.count}</span>
                <span>💰{product?.price}</span>
                <span>{product?.category}</span>
                <span>
                    {Array(5)
                        .fill('')
                        .map((_, i) => (
                            <StarIcon
                                key={i}
                                color={i < product?.rating?.rate ? 'teal.500' : 'gray.300'}
                            />
                        ))}
                </span>
            </div>
            <div className="actions">
                <Button colorScheme='blue' m={2} onClick={() => addToCart(product?.id, product?.title, product?.image, product?.description, product?.price, product?.category)} >Add To Cart</Button>
            </div>
        </div>
    )
}

export default Product