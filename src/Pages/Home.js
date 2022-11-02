import React from 'react'
import Productpannel from "../Components/Productpannel"
import { Heading } from '@chakra-ui/react'
const Home = () => {

    return (
        <div>

            <Heading textAlign='center' m={2} as='h1' size='xl'>Welcome To Producto</Heading>
            <Productpannel />
        </div>
    )
}

export default Home