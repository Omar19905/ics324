import React from 'react';
import {Button, Text, useDisclosure, useToast} from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react'
import {useRouter} from "next/router";
import axios from "axios";
const CancelTicket = ({fines,reservation}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const router = useRouter()
    const toast = useToast()


    function cancelReservation() {
        console.log(reservation)
        axios({method: 'delete',url: 'http://localhost:3007/cancel_reservation',
            data: {
                reservationId: reservation,
            }
        }).then(function (response) {
            toast({
                title: 'Reservation Cancelled',
                position: "top-right",
                description: "Reservation Cancelled successfully you will be redirected to home page",
                status: 'warning',
                duration: 8000,
                isClosable: true,
            })

            setInterval(()=>{
                // router.push("/")
            },8000)

        }).catch(function (response) {
            console.log(response)
        })
    }

    return (
        <>
            <Button colorScheme='red' variant={"outline"} onClick={onOpen}>
                Cancel Reservation
            </Button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Cancel Flight
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                            <Text fontSize={"xl"} fontWeight={"semibold"}>Cancellation Fine: SR{fines} </Text>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button onClick={cancelReservation} colorScheme='red'  ml={3}>
                                Cancel Flight
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default CancelTicket;