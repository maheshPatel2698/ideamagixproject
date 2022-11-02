import React, { useContext, useState, useEffect } from 'react'
import { Link, Image, Button, Input, Heading, FormLabel } from '@chakra-ui/react'

import "../CSS/Checkout.css"
import storeContext from '../Context/StoreContext'
import { useNavigate } from "react-router-dom"
const Checkout = () => {
    const navigate = useNavigate()
    const { cart, setCart, user, toast } = useContext(storeContext)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [number, setNumber] = useState('')

    let Total = 0;
    cart.forEach((item) => {
        Total = parseFloat(Total) + parseFloat(item.price)
    })

    const checkoutCart = () => {
        if (!(name && email && number && address)) {
            toast({
                title: 'Missing !',
                description: "Some fields are Missing",
                status: 'warning',
                duration: 9000,
                isClosable: true,
            })
            return
        }
        else {
            toast({
                title: 'Purchased !',
                description: "Product Purchased SuccessFully",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
            setCart([])
            navigate('/products')
        }
    }

    useEffect(() => {
        if (user) {
            setName(user?.username)
        }
    }, [user])

    return (
        <>
            <div className='main-sec-ce'>
                {cart.map((prod) => {
                    return (
                        <div className="card-sec" key={prod?.id}>
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
                            </div>

                        </div>
                    )
                })}
                <div className="infosection">
                    <Heading as="h2" textAlign='center' size="md">Please FillUp form So we Can Deliver you products</Heading>
                    <div className="checkoutForm">
                        <FormLabel>Name</FormLabel>
                        <Input
                            m={2}
                            placeholder="Type Your Name Here"
                            id='name'
                            name='name'
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <FormLabel>Address</FormLabel>
                        <Input
                            m={2}
                            placeholder="Type Your Address Here"
                            id='address'
                            type="text"
                            value={address}
                            name="address"
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <FormLabel>Email</FormLabel>
                        <Input
                            m={2}
                            placeholder="Type Your Email Here"
                            id='email'
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <FormLabel>Number</FormLabel>
                        <Input
                            m={2}
                            placeholder="Type Your Number Here"
                            id='number'
                            type='number'
                            name="number"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                </div>
                <div className="action-sec">
                    <span>Total: {Total}</span>
                    <Button m={2} onClick={checkoutCart} colorScheme="blue">Buy Now</Button>
                </div>
            </div>
        </>
    )
}

export default Checkout