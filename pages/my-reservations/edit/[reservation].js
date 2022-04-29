import React, {useState} from 'react';
import {Flex, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import Ticket from "../../../Componets/passnger/Ticket";
import Navbar from "../../../Componets/passnger/Navbar";
import Filters from "../../../Componets/passnger/Filters";
import EditFlightsList from "../../../Componets/passnger/EditFlightsList";

const Reservation = ({reservation_info}) => {
    const [flights, setFlights] = useState([])

    const data = reservation_info.map((passenger, index) => {
        console.log(passenger)
        return (
            <Flex mt={10} color={"g.1"} rounded={"xl"} p={2} direction={"row"}>
                <Spacer/>
                <HStack spacing={20} fontSize={"xl"} fontWeight={"semibold"}>
                    <Text fontSize={"xl"} fontWeight={"semibold"}>Passenger {index + 1}: </Text>

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
                        <Text> Seat</Text>
                        <Text> {passenger.seat.seatNumber}</Text>
                    </VStack>
                    <Spacer/>
                </HStack>
                <Spacer/>

                <Spacer/>
            </Flex>
        )

    })
    return (
        <>
            <Navbar/>
            <Text color={"g.2"} mt={10} mx={"10rem"} fontSize={"3xl"} fontWeight={"semibold"}>Modify Reservation</Text>
            <VStack mb={16}>
                {data}
            </VStack>
            <Filters setFlights={setFlights}/>
            <EditFlightsList passengers={reservation_info} flights={flights} reservation={reservation_info[0].reservation}/>

        </>
    );
};

export async function getServerSideProps(context) {


    const {reservation} = context.query

    const res = await fetch(`http://localhost:3007/reservation?reservation=${reservation}`)
    let reservation_info = await res.json()


    return {
        props: {reservation_info: reservation_info.reservation}, // will be passed to the page component as props
    }
}

export default Reservation;