import React from 'react';
import {Box, Flex, Text, HStack, Radio, VStack, Spacer, Button, Center} from "@chakra-ui/react";
import Navbar from "../../Componets/passnger/Navbar";
import CancelTicket from "../../Componets/passnger/CancelTicket";
import Ticket from "../../Componets/passnger/Ticket";
import {useRouter} from "next/router";

const Reservation = ({reservation_info}) => {

    const router = useRouter()

    const data = reservation_info.map((passenger, index) => {
        console.log(passenger)
        return(
            <Flex mt={10} color={"g.1"} rounded={"xl"} p={2} direction={"row"}>
                <Spacer/>

                <Spacer/>
                <HStack spacing={20} fontSize={"xl"} fontWeight={"semibold"}>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>Passenger {index + 1}:  </Text>

                    <Spacer/>
                    <VStack>
                        <Text> First Name</Text>
                        <Text>{passenger.firstName}</Text>
                    </VStack>
                    <VStack>
                        <Text> Last Name </Text>
                        <Text> {passenger.lastName}</Text>
                    </VStack>
                    <VStack>
                        <Text>  Seat</Text>
                        <Text> {passenger.seat.seatNumber}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack>
                        <Text>Ticket</Text>
                        <Ticket passenger={passenger} index={index+1}/>
                    </VStack>
                </HStack>
                <Spacer/>

                <Spacer/>
            </Flex>
        )

    })

    console.log(reservation_info)
    if (reservation_info.length == 0) {
        return (
            <>
                <Navbar />
                <Box mt={10} w={"30%"} mx={"auto"}>
                    <Text>No Reservation Found</Text>
                    <Button onClick={() => router.push("/")}>Home</Button>
                </Box>
            </>
        )
    }
    return (
            <>
                <Navbar/>
                <HStack mt={10} color={"g.2"}>
                    <Spacer/>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>Flight:</Text>

                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text>{reservation_info[0].seat.flight.fromAirport}</Text>
                        <Text>{reservation_info[0].seat.flight.takeoffTime}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text>{reservation_info[0].seat.flight.toAirport}</Text>
                        <Text>{reservation_info[0].seat.flight.landingTime}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text>{reservation_info[0].seat.flight.date}</Text>
                    </VStack>
                    <Spacer/>
                </HStack>
                <VStack>
                    {data}
                </VStack>

                <Center>
                    <HStack mt={16}>
                    <CancelTicket reservation={reservation_info[0].reservation} fines={reservation_info[0].seat.missingFine}/>
                    <Button onClick={()=>router.push(`/my-reservations/edit/${reservation_info[0].reservation}`)} variant={"outline"} colorScheme={"yellow"} px={20} >Edit</Button>
                </HStack>
                </Center>

            </>
    );
};

export async function getServerSideProps(context) {


    const {reservation} = context.query

    const res = await fetch(`http://localhost:3007/reservation?reservation=${reservation}`)
    let reservation_info = await res.json()



    return {
        props: {reservation_info:reservation_info.reservation}, // will be passed to the page component as props
    }
}
export default Reservation;