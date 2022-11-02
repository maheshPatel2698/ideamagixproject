import { Heading, Link } from '@chakra-ui/react'
import React from 'react'
import "../CSS/Footer.css"
import { FaGoogle, FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"

const Footer = () => {
    return (
        <div className='footer'>
            <div className="intro">
                <Heading as="h1" size='md' textAlign='center'>Producto</Heading>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, itaque!</p>
            </div>
            <div className="seconddiv">

                <div className="sitemap">
                    <span>Sitemap</span>
                    <Link href='/' >Home</Link>
                    <Link href='/login' >Login</Link>
                    <Link href='/products' >Products</Link>
                    <Link href='/about' >About</Link>
                </div>
                <div className="sitemap-sec">
                    <span>Social Links</span>
                    <span><FaGoogle size={30} /></span>
                    <span><FaFacebook size={30} /></span>
                    <span><FaLinkedin size={30} /></span>
                    <span><FaTwitter size={30} /></span>
                </div>
            </div>

        </div>
    )
}

export default Footer