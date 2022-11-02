import React, { useContext, useState } from 'react'
import "../CSS/Navbar.css"
import {
    Avatar,
    IconButton,
    useColorMode,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
    DrawerCloseButton,
    Image,
    Button,
    Tag,
    TagLabel,
    Heading,
    Menu,
    MenuButton,
    MenuList,
    MenuItem
} from "@chakra-ui/react"

import { SunIcon, MoonIcon, DeleteIcon, HamburgerIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import storeContext from '../Context/StoreContext'


const Navbar = () => {
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, setUser, cart, setCart, toast } = useContext(storeContext)
    const [placement] = useState('bottom')
    const { colorMode, toggleColorMode } = useColorMode()

    const handleLogout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    const deleteFromcart = (id) => {

        const deleteCart = cart.filter((c) => {
            return c?.id !== id
        })
        setCart(deleteCart)
        toast({
            title: 'Item Deleted',
            description: "Item SuccessFully Deleted!",
            status: 'success',
            duration: 9000,
            isClosable: true,
        })
    }
    const checkoutItem = () => {
        navigate('/checkout')

    }
    return (
        <div className='navbar'>
            <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>Your Cart
                        <Tag
                            size='sm'
                            key='sm'
                            borderRadius='full'
                            variant='solid'
                            colorScheme={`${cart.length === 0 ? "yellow" : "green"}`}
                        >
                            <TagLabel>{cart?.length}</TagLabel>
                        </Tag></DrawerHeader>
                    <DrawerBody>
                        <div className='cart'>
                            {cart.length === 0 ? <Heading textAlign='center' as='h2' size="xl" >No Items On Cart</Heading> : cart.map((c) => {
                                return (
                                    <div className="cartcard" key={c?.id}>
                                        <div className="img-class">
                                            <Image className='img' src={c?.image} alt='image' />
                                        </div>
                                        <div className="details">
                                            <span>{c?.title}</span>
                                            <span>💰{c?.price}</span>
                                            <span>{c?.category}</span>
                                            <span>{c?.description}</span>
                                        </div>
                                        <div className="buttonsec">
                                            <Button m={2} onClick={() => checkoutItem(c)} colorScheme='blue'>Chekout</Button>
                                            <Button m={2} onClick={() => deleteFromcart(c?.id)} leftIcon={<DeleteIcon />} colorScheme='red'>Delete Item</Button>
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <div className="left">
                <Avatar src='/logo.svg' name='reactJS' />
            </div>
            <div className="mid">
                <span onClick={() => navigate('/')} >Home</span>
                <span onClick={() => navigate('/about')} >About Us</span>
                <span onClick={onOpen}>
                    <Tag
                        size='sm'
                        key='sm'
                        borderRadius='full'
                        variant='solid'
                        colorScheme={`${cart.length === 0 ? "yellow" : "green"}`}
                    >
                        <TagLabel>{cart?.length}</TagLabel>
                    </Tag> Cart</span>
                <span onClick={() => navigate('/checkout')} >Checkout</span>
                <span onClick={() => navigate('/products')} >Products</span>
                {!user ?
                    <span onClick={() => navigate('/login')}>Login</span>
                    :
                    <span onClick={handleLogout}>Logout</span>}
            </div>
            <div className="right">
                <div className="menus">
                    <Menu className="menus">
                        <MenuButton as={Button} rightIcon={<HamburgerIcon />}>
                            Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem> <span onClick={() => navigate('/')} >Home</span></MenuItem>
                            <MenuItem> <span onClick={() => navigate('/about')} >About Us</span> </MenuItem>
                            <MenuItem><span onClick={() => navigate('/products')} >Products</span></MenuItem>
                            <MenuItem><span onClick={() => navigate('/checkout')} >Checkout</span></MenuItem>
                            <MenuItem>  {!user ?
                                <span onClick={() => navigate('/login')}>Login</span>
                                :
                                <span onClick={handleLogout}>Logout</span>}</MenuItem>
                            <MenuItem><span onClick={onOpen}>
                                <Tag
                                    size='sm'
                                    key='sm'
                                    borderRadius='full'
                                    variant='solid'
                                    colorScheme={`${cart.length === 0 ? "yellow" : "green"}`}
                                >
                                    <TagLabel>{cart?.length}</TagLabel>
                                </Tag> Cart</span></MenuItem>
                        </MenuList>
                    </Menu>
                </div>
                <span onClick={() => navigate('/admin')}>{
                    user?.username === process.env.REACT_APP_USERNAME
                        ?
                        "Admin"
                        :
                        null
                }</span>
                <IconButton onClick={toggleColorMode} icon={colorMode === 'light' ? <MoonIcon color='black' /> : <SunIcon color='black' />} />
            </div>
        </div>
    )
}

export default Navbar