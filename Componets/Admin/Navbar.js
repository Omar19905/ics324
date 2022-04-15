import React from 'react';
import {Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import {useRouter} from "next/router";

const Navbar = () => {
    let router = useRouter();

    return (
        <Flex direction={"column"} py={5} px={"5rem"}   w={"100%"}   bg={"g.1"}>
            <HStack w={"100%"}>
                {/*Logo*/}
                <Text cursor={"pointer"} onClick={()=>router.push("/")} fontFamily={"Yeseva One"} color={"g.2"} fontSize={"4xl"}>Airlines</Text>


                <Spacer/>
                <Text cursor={"pointer"} onClick={()=>router.push("/admin/flights")}  color={"g.2"} fontSize={"lg"}>Flights</Text>
                <Text cursor={"pointer"} onClick={()=>router.push("/admin/add_flight")}  color={"g.2"} fontSize={"lg"}>Add Flight</Text>

            </HStack>
        </Flex>
    );
};

export default Navbar;