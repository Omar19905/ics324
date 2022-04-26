import React from 'react';
import {Button, Divider, HStack, Icon, Spacer, Text, useDisclosure, VStack} from "@chakra-ui/react";
import Barcode from "react-barcode"

import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton
} from '@chakra-ui/react'
import { FaPlane } from 'react-icons/fa';
import CancelTicket from "./CancelTicket";


const Ticket = ({passenger,index}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

    return (
        <>
            <Button rounded={"3xl"} color={"white"} bg={"g.2"} onClick={onOpen}>
                View Ticket
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}

            >
                <AlertDialogOverlay>

                    <AlertDialogContent w={"550px"}>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Passenger{index} Ticket
                        </AlertDialogHeader>
                        <AlertDialogCloseButton />


                        <AlertDialogBody>
                            <HStack my={5} justifyContent={"Center"} fontWeight={"semibold"}>
                                <Text>{passenger.seat.flight.fromAirport}</Text>
                                <Icon as={FaPlane}/>
                                <Text>{passenger.seat.flight.toAirport}</Text>
                            </HStack>
                            <HStack mx={"12"}>
                                <VStack alignItems={"left"}>
                                    <Text fontSize={"lg"} fontWeight={"semibold"} color={"g.2"}>Passenger</Text>
                                    <Text fontWeight={"semibold"}>{passenger.firstName.toLocaleUpperCase()} {passenger.lastName.toUpperCase()}</Text>
                                </VStack>
                                <Spacer/>
                                <VStack alignItems={"left"}>
                                    <Text fontSize={"lg"} fontWeight={"semibold"} color={"g.2"}>Date</Text>
                                    <Text fontWeight={"semibold"}>{passenger.seat.flight.date}</Text>
                                </VStack>
                            </HStack>
                            <HStack mt={7} mx={"12"}>
                                <VStack alignItems={"left"}>
                                    <Text fontSize={"lg"} fontWeight={"semibold"} color={"g.2"}>Class</Text>
                                    <Text fontWeight={"semibold"}>{passenger.seat.class}</Text>
                                </VStack>
                                <Spacer/>
                                <VStack alignItems={"left"}>
                                    <Text fontSize={"lg"} fontWeight={"semibold"} color={"g.2"}>Seat</Text>
                                    <Text fontWeight={"semibold"}>{passenger.seat.seatNumber}   </Text>
                                </VStack>
                            </HStack>
                            <Divider mt={5} size={"3xl"} type={"dashed"} />
                        </AlertDialogBody>

                        <AlertDialogFooter>

                            <VStack w={"100%"}>
                                <Barcode value={passenger.ticketId}/>
                            <CancelTicket fines={passenger.seat.missingFine}/>
                            </VStack>
                            

                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default Ticket;