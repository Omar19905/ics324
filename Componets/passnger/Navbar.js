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
                <Button bg={"transparent"} border={"2px white solid"}  cursor={"pointer"} onClick={()=>router.push("/")}  color={"white"} fontSize={"lg"}>Book Flight</Button>
                <Button bg={"transparent"} border={"2px white solid"} color={"white"} onClick={()=>router.push("/my-reservations/")}   fontSize={"lg"}>My Reservation</Button>

            </HStack>
        </Flex>
    );
};

export default Navbar;