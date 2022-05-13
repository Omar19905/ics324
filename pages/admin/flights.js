import React, {useEffect, useState} from 'react';
import {Box} from "@chakra-ui/react";
import FlightsList from "../../Componets/Admin/FlightsList";
import axios from "axios";
import Navbar from "../../Componets/Admin/Navbar";

const Flights = () => {
    const [flights,setFlights] = useState([])

    function getFlights(){
        axios({
            method: 'get',
            url: 'http://localhost:3007/get_flights',
        }).then(function (response) {
            setFlights(response.data.flights)
        })
    }
    
    useEffect(()=>{
        getFlights()

        },[])

    return (
        <>
            <Navbar/>
            <Box mt={"5rem"} mx={"10rem"}>
                <FlightsList flights={flights} getFlights={getFlights}/>
            </Box>
        </>
    );
};

// export async function getServerSideProps(context) {
//
//     const res = await fetch(`http://localhost:3007/get_flights`)
//     const data = await res.json()
//
//
//     return {
//         props: {
//             flights:data.flights
//         }, // will be passed to the page component as props
//     }
// }

export default Flights;