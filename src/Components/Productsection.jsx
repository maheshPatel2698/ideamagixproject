import React from 'react'
import "../CSS/Productsection.css"
import { Image, Button } from '@chakra-ui/react'

import { StarIcon } from "@chakra-ui/icons"
import { Link } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"
const Productsection = ({ products }) => {

    const navigate = useNavigate()
    return (
        <>
            <div className='productsection-main'>
                {products.slice(0, 6).map((prod) => {
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
                                <Button m={2} colorScheme='blue' >Add to Cart</Button>
                            </div>
                        </div>
                    )
                })}

            </div>
            <div className="bottom">
                <Button colorScheme='blue' m={2} onClick={() => navigate('/products')} >View All Products</Button>
            </div>
        </>
    )
}

export default Productsection