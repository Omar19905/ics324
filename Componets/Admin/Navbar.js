import React from 'react';
import {Button, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

const Navbar = () => {
    let router = useRouter();

    return (
        <Flex direction={"column"} py={5} px={"5rem"}   w={"100%"}   bg={"g.1"}>
            <HStack w={"100%"}>
                {/*Logo*/}
                <Text cursor={"pointer"} onClick={()=>router.push("/")} fontFamily={"Yeseva One"} color={"g.2"} fontSize={"4xl"}>Airlines</Text>


                <Spacer/>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/flights")}  color={"g.2"} fontSize={"lg"}>Flights</Button>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/add_flight")}  color={"g.2"} fontSize={"lg"}>Add Flight</Button>
                <Spacer/>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/active_flights")}  color={"g.2"} fontSize={"lg"}>Active Flights</Button>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/booking_percentage")}  color={"g.2"} fontSize={"lg"}>Booking Percentage</Button>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/confirmed_purchases")}  color={"g.2"} fontSize={"lg"}>Confirmed Purchases</Button>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/cancelled_tickets")}  color={"g.2"} fontSize={"lg"}>Cancelled Tickets</Button>
                <Button bg={"transparent"} cursor={"pointer"} onClick={()=>router.push("/admin/wait_listed")}  color={"g.2"} fontSize={"lg"}>Wait Listed</Button>


            </HStack>
        </Flex>
    );
};

export default Navbar;