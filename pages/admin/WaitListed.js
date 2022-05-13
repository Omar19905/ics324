import React, {useEffect, useState} from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Center,
    Text,
    HStack,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon, useToast, Flex, Spacer, VStack,
} from '@chakra-ui/react'
import { Select } from '@chakra-ui/react'
import axios from "axios";
import { Tooltip } from '@chakra-ui/react'


const WaitListed = ({flight}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [WaitListed,setWaitListed] = useState([])
    const [seat,setSeat] = useState("")
    const [seats,setSeats] = useState([])
    const toast = useToast()

    useEffect(()=>{
        axios({method: 'get',url: 'http://localhost:3007/waitlisted',
            params: {
                flight:flight,
            }
        }).then(function (response) {

            console.log(response.data.waitlisted)
            setWaitListed(response.data.waitlisted)

        })
        console.log("hello")
    },[flight])


    useEffect(()=>{
        axios({method: 'get',url: 'http://localhost:3007/flight_seats',
            params: {
                flight: flight,
            }
        }).then(function (response) {
            setSeats(response.data.seats)

        })
    },[])

    function promote(passenger) {
        let reservation = Math.random().toString(36).substr(2, 3)+"-"+Math.random().toString(36).substr(2, 3);
        axios({method: 'post',url: 'http://localhost:3007/promote',
            data: {
                identification : passenger.username,
                flight : flight,
                class : passenger.class,
                seat : seat,
                reservation: reservation,
                firstName: passenger.firstName,
                lastName: passenger.lastName
            }
        }).then(function (response) {
            toast({
                title: 'Passenger protected',
                position: "top-right",
                description: `seat (${seat}) booked for Passenger with reservation reference: ${reservation}`,
                status: 'success',
                duration: 8000,
                isClosable: true,
            })
            onClose()
        })
    }

    const data = WaitListed.map((passenger, index) => {
         const data = seats.filter(seat => seat.class ===passenger.class);
        console.log(data)
       let filteredSeats = data.map(seat => <option value={seat.seatNumber}>{seat.seatNumber}</option>
        )

        // console.log(filteredSeats.length)
        return(
            <Flex shadow={"md"} p={5} border={"solid 1px #ccc"} rounded={"lg"} w={"90%"} mt={10} mx={16}>

                <HStack justifyContent={"center"} flex='1' textAlign='left'>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text>Passenger ID:</Text>
                        <Text>{passenger.username}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text>Name</Text>
                        <Text>{passenger.firstName.toUpperCase()} {passenger.lastName.toUpperCase()}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text>Class</Text>
                        <Text>{passenger.class}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack >
                        <Text fontSize={"xl"}  fontWeight={"semibold"}>Seat:</Text>
                            <Select isDisabled={filteredSeats.length==0} onChange={(e)=>setSeat(e.target.value)}  placeholder='Select Seat'>
                                {filteredSeats}
                        </Select>
                        {filteredSeats.length==0 && <Text>seats not available for this passenger</Text>
                        }
                    </VStack>
                    <Spacer/>

                    <Button onClick={()=>promote(passenger)} w={"150px"} bg={"g.2"} color={"white"} mr={3}>Promote</Button>
                    <Spacer/>

                </HStack>
            </Flex>
        )

    })


    return (
        <>
            <Button onClick={onOpen} ml={5} color={"white"} bg={"blue.500"}>Wait Listed</Button>


            <Modal size={"5xl"}  isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent  >
                    <ModalHeader color={"g.1"} >Wait Listed</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        {data.length==0 &&
                        <Text>No passenger registered in this flight wait list  </Text>
                        }
                        {data}


                    </ModalBody>

                    <Center>
                        <ModalFooter>

                            <Button onClick={onClose} colorScheme={"red"}  mt={10} w={"150px"} variant={"outline"} mr={3} >
                                Close
                            </Button>

                        </ModalFooter>
                    </Center>

                </ModalContent>
            </Modal>
        </>
    );
};

export default WaitListed;