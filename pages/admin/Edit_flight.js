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
    InputLeftAddon, useToast,
} from '@chakra-ui/react'
import Select from "react-select";
import axios from "axios";
import airport from "../../airports.json";

const EditFlight = ({flight,getFlights}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    const toast = useToast()

    

    const [planes,setPlanes]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [fromAirport,setFromAirport]=useState("")
    const [toAirport,setToAirport]=useState("")
    const [takeoffTime,setTakeoffTime]=useState("")
    const [economyPrice,setEconomyPrice]=useState("")
    const [businessPrice,setBusinessPrice]=useState("")
    const [firstPrice,setFirstPrice]=useState("")
    const [selectedPlane,setSelectedPlane]=useState("")
    const [landingTime,setLandingTime]=useState("")
    const [date,setDate]=useState("")
    const [planeId,setPlaneId]=useState([])

    useEffect(()=>{
        axios({
            method: 'get',
            url: 'http://localhost:3007/get_planes',
        }).then(function (response) {
            let options = response.data.planes
            let data = []
            for (let i = 0; i < options.length; i++) {
                data.push({
                    label: options[i].planeName,
                    value: options[i].planeId,

                })
                setPlanes(data)
            }

        })

        setFromAirport(flight.fromAirport)
        setTakeoffTime(flight.takeoffTime)
        setToAirport(flight.toAirport)
        setLandingTime(flight.landingTime)
        setDate(flight.date)
        setPlaneId(flight.planeId.planeId)
        setSelectedPlane(flight.planeId.planeName)
        setEconomyPrice(flight.economyPrice)
        setBusinessPrice(flight.businessPrice)
        setFirstPrice(flight.firstPrice)

    },[])

    function handleSubmit(){
        setIsLoading(true);

        axios({
            method: 'put',
            url: 'http://localhost:3007/edit_flight',
            data: {
                flightId: flight.flightId,
                fromAirport: fromAirport,
                toAirport: toAirport,
                takeoffTime: takeoffTime,
                landingTime: landingTime,
                date: date,
                planeId: planeId,
                economyPrice: economyPrice,
                businessPrice: businessPrice,
                firstPrice: firstPrice
            }
        }).then(function (response) {
            getFlights()
            toast({
                title: 'Flight edited',
                position: "top-right",
                description: "Flight edited successfully.",
                status: 'info',
                duration: 8000,
                isClosable: true,
            })
            setIsLoading(false);

        }).catch(function (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);

            }
        })
    }


    return (
                <>
                    <Button onClick={onOpen} mr={2} color={"white"} bg={"yellow.500"}>Edit</Button>


                    <Modal size={"5xl"}  isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent  >
                            <ModalHeader color={"g.1"} >Edit Flight</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody >
                                <HStack spacing={10}>
                                    <FormControl  id="title" isRequired>
                                        <FormLabel fontSize={"xl"}>From</FormLabel>
                                        <Select   defaultValue={{ label: fromAirport }} onChange={(e) => setFromAirport(e.value)}
                                                placeholder={"From"} options={airport}/>
                                    </FormControl>

                                    <FormControl  id="date" isRequired>
                                        <FormLabel fontSize={"xl"}>Time</FormLabel>
                                        <Input value={takeoffTime} onChange={(e)=>setTakeoffTime(e.target.value)} type="time"></Input>
                                    </FormControl>

                                </HStack>

                                <HStack spacing={10} my={5}>
                                    <FormControl  id="title" isRequired>
                                        <FormLabel fontSize={"xl"}>To</FormLabel>
                                        <Select   defaultValue={{ label: toAirport }} onChange={(e) => setToAirport(e.value)}
                                                  placeholder={"From"} options={airport}/>
                                    </FormControl>
                                    <FormControl  id="date" isRequired>
                                        <FormLabel fontSize={"xl"}>Time</FormLabel>
                                        <Input value={landingTime} onChange={(e)=>setLandingTime(e.target.value)} type="time"></Input>
                                    </FormControl>


                                </HStack>

                                <FormControl  id="date" isRequired>
                                    <FormLabel fontSize={"xl"}>Date</FormLabel>
                                    <Input value={date} onChange={(e)=>setDate(e.target.value)} type="date"></Input>
                                </FormControl>
                                <FormControl w={"30%"}  id="plane" isRequired>
                                    <FormLabel fontSize={"xl"}>plane</FormLabel>
                                    <Select   defaultValue={{ label: selectedPlane }} onChange={(e) => setPlaneId(e.value)}
                                            placeholder={"Plane"} options={planes}/>
                                </FormControl>

                                <HStack mt={5}>
                                    <FormControl  id="EconomyPrice" isRequired>
                                        <FormLabel fontSize={"xl"}>EconomyPrice</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='$' />
                                            <Input value={economyPrice} onChange={(e) => setEconomyPrice(e.target.value)} type="number"/></InputGroup>
                                    </FormControl>
                                    <FormControl  id="BusinessPrice" isRequired>
                                        <FormLabel fontSize={"xl"}>BusinessPrice</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='$' />
                                            <Input value={businessPrice} onChange={(e) => setBusinessPrice(e.target.value)} type="number"/></InputGroup>
                                    </FormControl>
                                    <FormControl  id="FirstPrice" isRequired>
                                        <FormLabel fontSize={"xl"}>FirstPrice</FormLabel>
                                        <InputGroup>
                                            <InputLeftAddon children='$' />
                                            <Input value={firstPrice} onChange={(e) => setFirstPrice(e.target.value)} type="number"/></InputGroup>
                                    </FormControl>
                                </HStack>


                            </ModalBody>

                            <Center>
                            <ModalFooter>

                                    <Button isLoading={isLoading} mt={10} w={"150px"} bg={"g.2"} color={"white"} mr={3} onClick={handleSubmit}>
                                    save
                                </Button>

                            </ModalFooter>
                            </Center>

                        </ModalContent>
                    </Modal>
                </>

    );
};

export default EditFlight;