import React, { useContext } from 'react'
import storeContext from '../Context/StoreContext'
import { Navigate } from "react-router-dom"
import '../CSS/Admin.css'
import { Image, Button, Link, Heading } from "@chakra-ui/react"
import { StarIcon, DeleteIcon } from "@chakra-ui/icons"
import axios from "axios"

const Admin = () => {
    const { user, products, setProducts, toast } = useContext(storeContext)
    const userName = process.env.REACT_APP_USERNAME

    const deleteProduct = async (id) => {
        let url = `${process.env.REACT_APP_API}/products/${id}`
        const response = await axios.delete(url)
        console.log(response)


        setProducts(products.filter((prod) => {
            return prod?.id !== id
        }))
        toast({
            title: 'Deleted !',
            description: "Deleted SuccessFully",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }

    if (user?.username === userName) {
        return (
            <>


                <div className='adminpannel'>
                    <div className='productsection'>
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
                                        <div className="action">
                                            <Button m={2} onClick={() => deleteProduct(prod?.id)} colorScheme='red' leftIcon={<DeleteIcon />} >Delete</Button>

                                        </div>
                                    </div>
                                </div>

                            )
                        })}

                    </div>

                </div>
            </>
        )
    }
    else {
        return <Navigate to='/' />
    }
}

export default Admin