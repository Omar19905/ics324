import React, {useState} from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link, Center, Alert, AlertIcon, AlertTitle, AlertDescription,
} from '@chakra-ui/react';

import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import axios from "axios";
import {useRouter} from "next/router";


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter()

    function handleSubmit() {
        axios({
            method: 'post',url: 'http://localhost:3007/login',
            data: {
                username:email,
                password:password
            }
        }).then(function (response) {

            router.push("/admin/flights")
        }).catch(function (error) {
            setError(error.response.data.error);

        })
    }

    return (
        <>
            <Stack mt={50} align={'center'}>
            <Text color={"g.1"} fontSize={'5xl'} textAlign={'center'}>
                Sign in
            </Text>
        </Stack>

            <Box
                minW={"30vw"}
                rounded={'lg'}

                p={8}>
                <Stack mx={"30rem"}  spacing={4}>
                    {error !== "" && <Alert  status='error'>
                        <AlertIcon/>
                        <AlertTitle mr={2}>Sign-in failed !</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>}
                    <Box>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" onChange={(e)=>setEmail(e.target.value)}/>
                        </FormControl>
                    </Box>

                    <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                            <Input onChange={(e)=>setPassword(e.target.value)} type={showPassword ? 'text' : 'password'}/>
                            <InputRightElement h={'full'}>
                                <Button
                                    variant={'ghost'}
                                    onClick={() =>
                                        setShowPassword((showPassword) => !showPassword)
                                    }>
                                    {showPassword ? <ViewIcon/> : <ViewOffIcon/>}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                    </FormControl>
                    <Stack spacing={10} pt={2}>
                        <Button
                            onClick={handleSubmit}
                            w={205}
                            mx={"auto"}
                            rounded={"3xl"}
                            size="lg"
                            bg={'g.2'}
                            color={'white'}
                            _hover={{
                                bg: 'g.2',
                            }}>
                            Sign in
                        </Button>
                    </Stack>
                    <Stack pt={6}>

                    </Stack>
                </Stack>
            </Box>
        </>
    );
};

export default Login;