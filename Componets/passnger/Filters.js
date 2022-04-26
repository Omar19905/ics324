import React, {useEffect, useState} from 'react';
import {Box, Button, Divider, HStack, Input} from "@chakra-ui/react";
import Select from 'react-select'
import axios from "axios";


import airport from "../../airports.json"


const Filters = ({setFlights}) => {
    const [date, setDate] = useState(null);
    const[fromAirport, setFromAirport]=useState("")
    const[toAirport, setToAirport]=useState("")
    const [categories, setCategories] = useState([])




    function getFlights(){

        console.log(fromAirport+toAirport+date)
        axios({
            method: 'get',
            url: 'http://localhost:3007/search_flights',
            params: {
                fromAirport:fromAirport,
                toAirport:toAirport,
                date:date
            }
        }).then(function (response) {
            setFlights(response.data.flights)
        })
    }





    return (
        <>
            <HStack zIndex={"1"} position={"relative"} top={-7} ml={10} rounded={"100px"} h={16} shadow={"2xl"}
                   bg={"white"} w={"85%"} px={6} justify={"center"} mx={"auto"} spacing={10}>
            <Box py={"4px"} w={"50%"}>


                <Select onChange={(e) => setFromAirport(e.value)}
                        placeholder={"From"} options={airport}/>

            </Box>



            <Divider h={"60%"} orientation='vertical'/>
            <Box w={"50%"}>
                <Select onChange={(e) => setToAirport(e.value)}
                        placeholder={"To"} options={airport}/>
            </Box>
            {/*<Select placeholder={"Type of Activity"}  w={"50%"} border={"none"} >*/}
            {/*    <option onClick={console.log("hi")}  value='option1'>Option1</option>*/}
            {/*    <option value='option1'>Option 1</option>*/}
            {/*    <option value='option1'>Option 1</option>*/}
            {/*</Select>*/}
            <Divider h={"60%"} orientation='vertical'/>
            <Box w={"50%"}>
                <Input onChange={(e) => setDate(e.target.value)} type="date"></Input>
            </Box>
            {/*<Select placeholder='City' w={"50%"} border={"none"} >*/}
            {/*    <option onClick={console.log("hi")}  value='option1'>Option1</option>*/}
            {/*    <option value='option1'>Option 1</option>*/}
            {/*    <option value='option1'>Option 1</option>*/}
            {/*</Select>*/}
            <Button onClick={getFlights} _hover={{backgroundColor: "g.2"}} color={"white"} bg={"g.2"} rounded={"3xl"} w={"35%"}>
                Search Flights
            </Button>

        </HStack>


        </>

    );
};


export default Filters;