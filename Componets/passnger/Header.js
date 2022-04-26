import React from 'react';
import {Box, Flex, Text} from "@chakra-ui/react";
import Typist from 'react-typist';

const Header = () => {

    return (
        <Flex  h={"30%"} roundedBottom={"xl"}   w={"100%"}   bg={"g.1"}>

        <Box fontFamily={"Quicksand"} textAlign={"center"} color={"white"} fontSize={"6xl"} w='100%' h='21vh' >

            Something special in the
            <Text fontFamily={"Quicksand"} display={"inline"} color={"g.2"}> air</Text>
        </Box>


        </Flex>
    );
};

export default Header;