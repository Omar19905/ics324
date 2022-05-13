import React, {useState} from 'react';
import {Button, Flex, FormControl, FormLabel, HStack, Input, Spacer, Text, VStack} from "@chakra-ui/react";
import Navbar from "../../Componets/Admin/Navbar";
import axios from "axios";

const BookingPercentage = () => {
    const [date,setDate]=useState("")
    const [flights,setFlights] =useState([])

    function get_percentages() {
        axios({method: 'get',url: 'http://localhost:3007/booking_percentage',
            params: {
                date:date
            }
        }).then(function (response) {

            setFlights(response.data.flights)

        })
    }

    
    const data = flights.map((flight, index) => {
        return(
            <Flex shadow={"md"} p={5} border={"solid 1px #ccc"} rounded={"lg"} w={"90%"} mt={10} mx={16}>

                <HStack justifyContent={"center"} flex='1' textAlign='left'>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text>{flight.fromAirport}</Text>
                        <Text>{flight.takeoffTime}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text>{flight.toAirport}</Text>
                        <Text>{flight.landingTime}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text>{flight.date}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text color={"g.2"}>{flight.bookedPercentage}</Text>
                    </VStack>
                    <Spacer/>





                </HStack>
            </Flex>
        )

    })

    return (
        <>
            <Navbar/>
            <Text mt={16} mx={16} fontWeight={"semibold"} fontSize={"xl"}>Bocking Percentage</Text>

            <Flex w={"90%"} mt={10} mx={16}>

                <FormControl>
                    <FormLabel>Date:</FormLabel>
                    <Input type={"date"} onChange={(e) => setDate(e.target.value)} w={"20%"} bg={"white"}/>
                    <Button onClick={get_percentages} bg={"g.2"} color={"white"} h={9} mx={10}>get percentages</Button>
                </FormControl>

            </Flex>

            <Flex my={50} direction={"column"}>
                {data}
            </Flex>

        </>
    );
};

export default BookingPercentage;