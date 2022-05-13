import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    Text,
    useToast
} from "@chakra-ui/react";
import Select from "react-select";
import axios from "axios";
import airport from "../../airports.json"
import Navbar from "../../Componets/Admin/Navbar";


const AddFlight = () => {


    const toast = useToast()




    const [planes,setPlanes]=useState([])
    const [isLoading,setIsLoading]=useState(false)
    const [fromAirport,setFromAirport]=useState("")
    const [toAirport,setToAirport]=useState("")
    const [takeoffTime,setTakeoffTime]=useState("")
    const [economyPrice,setEconomyPrice]=useState("")
    const [businessPrice,setBusinessPrice]=useState("")
    const [firstPrice,setFirstPrice]=useState("")
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

    },[])

    function handleSubmit(){
        setIsLoading(true);

        axios({
            method: 'post',
            url: 'http://localhost:3007/add_flight',
            data: {
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
            toast({
                title: 'Flight added',
                position: "top-right",
                description: "Flight added successfully.",
                status: 'success',
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
            <Navbar/>

            <Center><Box w={"80%"} mb={5} mt={2} ml={"50px"}>
                <Center><Text mx={"auto"} mb={6} fontWeight={"semibold"} color={"g.1"} fontSize={"4xl"}>Add
                    Flight</Text></Center>
                <HStack spacing={10}>
                    <FormControl w={"40%"} id="title" isRequired>
                        <FormLabel fontSize={"xl"}>From</FormLabel>
                        <Select onChange={(e) => setFromAirport(e.value)}
                                placeholder={"From"} options={airport}/>
                    </FormControl>

                    <FormControl w={"40%"} id="date" isRequired>
                        <FormLabel fontSize={"xl"}>Time</FormLabel>
                        <Input onChange={(e) => setTakeoffTime(e.target.value)} type="time"></Input>
                    </FormControl>

                </HStack>

                <HStack spacing={10} my={5}>
                    <FormControl w={"40%"} id="title" isRequired>
                        <FormLabel fontSize={"xl"}>To</FormLabel>
                        <Select onChange={(e) => setToAirport(e.value)}
                                placeholder={"To"} options={airport}/>
                    </FormControl>
                    <FormControl w={"40%"} id="date" isRequired>
                        <FormLabel fontSize={"xl"}>Time</FormLabel>
                        <Input onChange={(e) => setLandingTime(e.target.value)} type="time"></Input>
                    </FormControl>


                </HStack>

                <FormControl w={"30%"} id="date" isRequired>
                    <FormLabel fontSize={"xl"}>Date</FormLabel>
                    <Input onChange={(e) => setDate(e.target.value)} type="date"></Input>
                </FormControl>
                <FormControl w={"30%"} id="plane" isRequired>
                    <FormLabel fontSize={"xl"}>plane</FormLabel>
                    <Select defaultValue={planeId} onChange={(e) => setPlaneId(e.value)}
                            placeholder={"Plane"} options={planes}/>
                </FormControl>

                <HStack mt={5}>
                    <FormControl id="EconomyPrice" isRequired>
                        <FormLabel fontSize={"xl"}>EconomyPrice</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='$'/>
                            <Input onChange={(e) => setEconomyPrice(e.target.value)} type="number"/></InputGroup>
                    </FormControl>
                    <FormControl id="BusinessPrice" isRequired>
                        <FormLabel fontSize={"xl"}>BusinessPrice</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='$'/>
                            <Input onChange={(e) => setBusinessPrice(e.target.value)} type="number"/></InputGroup>
                    </FormControl>
                    <FormControl id="FirstPrice" isRequired>
                        <FormLabel fontSize={"xl"}>FirstPrice</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='$'/>
                            <Input onChange={(e) => setFirstPrice(e.target.value)} type="number"/></InputGroup>
                    </FormControl>
                </HStack>


                <Center>
                    <Button mt={20}

                            isLoading={isLoading}
                            onClick={handleSubmit}
                            _hover={{backgroundColor: "g.2", color: "white"}} py={25} px={100} bg={"g.2"}
                            color={"white"}>Add Flight
                    </Button>
                </Center>
            </Box></Center>
        </>
    );
};

export async function getServerSideProps(context) {

    return {
        props: {}, // will be passed to the page component as props
    }
}

export default AddFlight;