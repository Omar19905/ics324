import React, {useEffect} from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    VStack,
    Text,
    HStack,
    Spacer,
    RadioGroup,
    Stack,
    Radio,
    Flex,
    Tr,
    Td,
    Button,
    Input,
    Center,
    useToast,
} from '@chakra-ui/react'
import Edit_flight from "../../pages/admin/Edit_flight";
import axios from "axios";
import {useRouter} from "next/router";

const FlightsList = ({flights,reservation,passengers}) => {


    let router = useRouter()
    const toast = useToast()


    function handleBookFlight(reservation,flight) {
        console.log(reservation)
        axios({
            method: 'delete', url: 'http://localhost:3007/cancel_reservation',
            data: {

                reservationId: reservation,

            }
        }).then(function (response) {
            passengers.forEach((passenger) => {
                console.table(passenger)
                console.log(passenger.seat.flight.flightId)
                axios({
                    method: 'post', url: 'http://localhost:3007/book_seat',
                    data: {
                        flight: flight,
                        seat: passenger.seat.seatNumber,
                        weight: passenger.weight,
                        identification: passenger.identification,
                        reservation: passenger.reservation,
                        firstName: passenger.firstName,
                        lastName: passenger.lastName
                    }
                }).then(function (response) {
                    console.log(response.data);
                    toast({
                        title: 'Flight Edited',
                        position: "top-right",
                        description: "Flight Edited successfully.",
                        status: 'info',
                        duration: 8000,
                        isClosable: true,
                    })
                    router.push(`/my-reservations/${reservation}`)
                })
            })

        })


    }





    const data = flights.map((flight, index) => (

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




                <Button
                    onClick={()=>{
                        handleBookFlight(reservation,flight.flightId)

                    }}
                    _hover={{backgroundColor: "g.2"}} color={"white"} bg={"g.2"} rounded={"xl"} w={"15%"}>
                    Confirm Change

                </Button>


            </HStack>
        </Flex>
    ))


    return (
        <VStack mb={10}>
            {data}
        </VStack>

    );
};

export default FlightsList;