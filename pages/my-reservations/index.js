import React, {useState} from 'react';
import {
    Alert,
    AlertDescription, AlertIcon,
    AlertTitle,
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import Navbar from "../../Componets/passnger/Navbar";
import axios from "axios";
import {useRouter} from "next/router";

const Index = () => {
    const [reservation,setReservation]= useState()
    const [message,setMessage]= useState("")

    const router = useRouter()

    function handleSubmit() {
        axios({method: 'get',url: 'http://localhost:3007/reservation',
            params: {
                reservation:reservation,
            }
        }).then(function (response) {

            let res = response.data.reservation
            console.log(res)

            if (res.length > 0) {
                router.push(`/my-reservations/${reservation}`)

            }else {
                setMessage("No reservation found with this ID")
            }

        })
    }
    return (
        <Box bg={"gray.100"} h={"100vh"}>
            <Navbar/>

            <Box mt={20} w={"50%"} mx={"auto"}>
                {message!=="" && <Alert status={"error"}>
                    <AlertIcon/>
                    <AlertTitle>Fail</AlertTitle>
                    <AlertDescription>{message}</AlertDescription>
                </Alert>}
                <FormControl>
                    <FormLabel>Reservation ID:</FormLabel>
                    <Input onChange={(e)=>setReservation(e.target.value)} w={"40%"} bg={"white"}/>
                </FormControl>
                <Button onClick={handleSubmit} bg={"g.2"} color={"white"} mt={5}>Manage</Button>
            </Box>


        </Box>
    );
};

export default Index;