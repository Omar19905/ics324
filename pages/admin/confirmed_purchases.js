import React from 'react';
import Navbar from "../../Componets/Admin/Navbar";
import {Flex, HStack, Spacer, Text, VStack} from "@chakra-ui/react";

const ConfirmedPurchases = ({confirmedPurchases}) => {

    console.log(    confirmedPurchases)
    const data = confirmedPurchases.map((purchase, index) => {
        return(
            <Flex shadow={"md"} p={5} border={"solid 1px #ccc"} rounded={"lg"} w={"90%"} mt={10} mx={16}>

                <HStack justifyContent={"center"} flex='1' textAlign='left'>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.2"}>Reservation</Text>
                        <Text>{purchase.reservation}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text color={"g.2"}>Name</Text>
                        <Text>{purchase.firstName.toUpperCase()}-
                            {purchase.lastName.toUpperCase()}
                        </Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text color={"g.2"}>FlightId</Text>
                        <Text>{purchase.seat.flight.flightId}</Text>
                    </VStack>
                    <Spacer/>




                </HStack>
            </Flex>
        )

    })

    return (
        <>
            <Navbar/>
            <Text mt={16} mx={16} fontWeight={"semibold"} fontSize={"3xl"}>Confirmed Purchases</Text>
            <VStack spacing={10}>
                {data}
            </VStack>
        </>
    );
};

export async function getServerSideProps(context) {


    const res = await fetch(`http://localhost:3007/confirmed_purchases`)
    let confirmedPurchases = await res.json()
    confirmedPurchases = confirmedPurchases.purchases




    return {
        props: {confirmedPurchases}, // will be passed to the page component as props
    }
}

export default ConfirmedPurchases;