import React, { useContext, useState } from 'react'
import "../CSS/Login.css"
import { Button, FormLabel, Input, Stack, FormControl, Heading } from '@chakra-ui/react'
import axios from 'axios'
import storeContext from '../Context/StoreContext'

const Login = () => {
    const { setUser, toast } = useContext(storeContext)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')



    const handleUserLogin = async () => {

        try {
            let url = `${process.env.REACT_APP_API}/auth/login`
            let user = {
                username,
                password
            }
            const loginUser = await axios.post(url, user)
            const { data } = loginUser
            let userDetails = {
                username,
                token: data.token
            }
            setUser(userDetails)
            localStorage.setItem('user', JSON.stringify(userDetails))
            setUsername('')
            setPassword('')
            toast({
                title: 'Login SuccessFull',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } catch (error) {
            console.log(error)
            toast({
                title: 'Login failed',
                description: "Some Error occured",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
    }

    return (
        <>
            <div className='login'>
                <Heading textAlign='center' as='h1' size='xl'>
                    Login Form
                </Heading>
                <div className="loginform">
                    <FormControl>
                        <FormLabel>Your Username</FormLabel>
                        <Input
                            id='usename'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type='username'
                            name='username'
                            placeholder='Type Your User Name Here'
                        />

                        <FormLabel>Your Password</FormLabel>
                        <Input
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type='password'
                            name='password'
                            placeholder='Type Your Password Here'
                        />
                        <Stack spacing={4} direction='row' justifyContent='center' align='center'>
                            <Button onClick={handleUserLogin} m={2} colorScheme="blue">Submit</Button>
                        </Stack>
                    </FormControl>
                </div>
            </div>

        </>
    )
}

export default Login