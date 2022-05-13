import React from 'react';
import {Flex, HStack, Spacer, Text, VStack} from "@chakra-ui/react";
import Navbar from "../../Componets/Admin/Navbar";

const WaitListed = ({waitlisted}) => {

    
    const data = waitlisted.map((passenger, index) => {
        return(
            <Flex  p={5} border={"solid 1px #ccc"}  w={"90%"} mt={10} mx={16}>

                <HStack justifyContent={"center"} flex='1' textAlign='left'>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.2"}>Passenger</Text>
                        <Text>{passenger.firstName.toUpperCase()} {passenger.lastName.toUpperCase()}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"}  fontWeight={"semibold"}>
                        <Text color={"g.2"}>Class</Text>
                        <Text>{passenger.class}
                        </Text>
                    </VStack>
                    <Spacer/>



                </HStack>
            </Flex>
        )

    })


        return (
            <>
                <Navbar/>
                <div>
                    {data}
                </div>
            </>
    );
};

export async function getServerSideProps(context) {


    const res = await fetch(`http://localhost:3007/all_waitlisted`)
    let waitlisted = await res.json()
    waitlisted = waitlisted.waitlisted




    return {
        props: {waitlisted}, // will be passed to the page component as props
    }
}

export default WaitListed;