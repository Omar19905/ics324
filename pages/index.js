import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Header from "../Componets/passnger/Header";
import Typist from "react-typist";
import React, {useState} from "react";
import {Text} from "@chakra-ui/react";
import Filters from "../Componets/passnger/Filters";
import FlightsList from "../Componets/passnger/FlightsList";
import Navbar from "../Componets/passnger/Navbar";

export default function Home() {
    const [flights, setFlights] = useState([])
    console.table(flights)
    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="ics 324 project"/>
                <link rel="icon" href="/plane.png"/>
            </Head>
            <Navbar/>

            <Header/>
            <Filters setFlights={setFlights}/>
            <FlightsList flights={flights}/>

        </div>
    )
}


