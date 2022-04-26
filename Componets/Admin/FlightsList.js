    import React from 'react';
    import {
        Table,
        Thead,
        Tbody,
        Tfoot,
        Tr,
        Th,
        Td,
        TableCaption,
        TableContainer, Button, useToast,
    } from '@chakra-ui/react'
    import Edit_flight from "../../pages/admin/Edit_flight";
    import axios from "axios";
    import WaitListed from "../../pages/admin/WaitListed";

    const FlightsList = ({flights, getFlights}) => {
        const toast = useToast()

        function handleDeletePlane(id) {
            axios({
                method: 'delete',
                url: 'http://localhost:3007/delete_flight',
                data: {
                    id
                }
            }).then(function (response) {
                getFlights()
                toast({
                    title: 'Flight deleted',
                    position: "top-right",
                    description: "Flight deleted successfully.",
                    status: 'info',
                    duration: 8000,
                    isClosable: true,
                })

            })
        }

        const data = flights.map((flight, index) => (

            <Tr  key={index}>
                <Td fontSize={"lg"}>{flight.flightId}</Td>
                <Td fontSize={"lg"}>{flight.fromAirport}</Td>
                <Td fontSize={"lg"}>{flight.toAirport}</Td>
                <Td w={"fit-content"} fontSize={"lg"}>{flight.date}</Td>
                <Td>
                    <Edit_flight flight={flight} getFlights={getFlights}/>
                    <Button
                        onClick={() => handleDeletePlane(flight.flightId)}
                        color={"white"} bg={"red.500"}>Delete</Button>
                    <WaitListed flight={flight.flightId}/>
                </Td>
            </Tr>
        ))
        return (
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Added Flights</TableCaption>
                    <Thead bg={"gray.200"}>
                        <Tr>
                            <Th>flight Id</Th>
                            <Th>From</Th>
                            <Th>To</Th>
                            <Th>Date</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data}
                    </Tbody>
                </Table>
            </TableContainer>
        );
    };

    export default FlightsList;