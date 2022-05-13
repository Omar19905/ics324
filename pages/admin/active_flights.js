import React from 'react';
import {Button, Flex, HStack, Radio, Spacer, Text, VStack} from "@chakra-ui/react";
import Navbar from "../../Componets/Admin/Navbar";


const ActiveFlights = ({activeFlights}) => {
    console.log(activeFlights)
    const data = activeFlights.map((flight, index) => {
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





                </HStack>
            </Flex>
        )

    })
    return (
        <>
            <Navbar/>
            <Text mt={16} mx={16} fontWeight={"semibold"} fontSize={"xl"}>Active Flights</Text>
            <Flex direction={"column"}>
            {data}
        </Flex>
        </>
    );
};

export async function getServerSideProps(context) {


    const {flightId} = context.query

    const res = await fetch(`http://localhost:3007/active_flights`)
    let activeFlights = await res.json()
     activeFlights = activeFlights.activeFlights




    return {
        props: {activeFlights}, // will be passed to the page component as props
    }
}

export default ActiveFlights;