import React, {useEffect} from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, Box, VStack, Text, HStack, Spacer, RadioGroup, Stack, Radio, Flex, Tr, Td, Button, Input, Center,
} from '@chakra-ui/react'
import Edit_flight from "../../pages/admin/Edit_flight";
import axios from "axios";
import {useRouter} from "next/router";

const FlightsList = ({flights}) => {
    console.log(flights)
    const [classType, setClassType] = React.useState('economy')
    const [weight, setWeight] = React.useState(20)
    const [seat, setSeat] = React.useState("")

    let router = useRouter()

    function handleBookFlight(id) {
        axios({
            method: 'post',url: 'http://localhost:3007/book_seat',
            data: {
                flight:id,
                seat:seat,
                weight:weight
            }
        }).then(function (response) {
            console.log(response.data);

        })
    }

    function filterSeats(classType) {
        axios({method: 'post',url: 'http://localhost:3007/flight_seats',
            data: {
                flight:id,
                seat:seat,
                weight:weight
            }
        }).then(function (response) {
            console.log(response.data);

        })
    }

    useEffect(()=>{
        // filterSeats(classType)
    },[classType])


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
                        router.push(`/flight/${flight.flightId}`)

                    }}
                    _hover={{backgroundColor: "g.2"}} color={"white"} bg={"g.2"} rounded={"xl"} w={"15%"}>
                    Select

                </Button>


            </HStack>
        </Flex>
    ))


    return (
        <VStack>
            {data}
        </VStack>

    );
};

export default FlightsList;