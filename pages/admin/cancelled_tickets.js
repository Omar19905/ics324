import React from 'react';
import Navbar from "../../Componets/Admin/Navbar";
import {Flex, HStack, Spacer, Text, VStack} from "@chakra-ui/react";

const CancelledTickets = ({cancelledTickets}) => {

    const data = cancelledTickets.map((ticket, index) => {
        return(
            <Flex shadow={"md"} p={5} border={"solid 1px #ccc"} rounded={"lg"} w={"90%"} mt={10} mx={16}>

                <HStack justifyContent={"center"} flex='1' textAlign='left'>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.2"}>Ticket Id</Text>
                        <Text>{ticket.ticketId}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text color={"g.2"}>Seat</Text>
                        <Text>{ticket.seat}
                        </Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text color={"g.2"}>FlightId</Text>
                        <Text>{ticket.flight}</Text>
                    </VStack>
                    <Spacer/>



                </HStack>
            </Flex>
        )

    })
    

    return (
        <>
            <Navbar/>
            <Text mt={16} mx={16} fontWeight={"semibold"} fontSize={"3xl"}>Cancelled Tickets</Text>
            <VStack mb={16} spacing={10}>
                {data}
            </VStack>
        </>
    );
};

export async function getServerSideProps(context) {


    const res = await fetch(`http://localhost:3007/cancelled_tickets`)
    let cancelledTickets = await res.json()
    cancelledTickets = cancelledTickets.cancelled




    return {
        props: {cancelledTickets}, // will be passed to the page component as props
    }
}

export default CancelledTickets;