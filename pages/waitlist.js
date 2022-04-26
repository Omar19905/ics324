import React from 'react';
import {Alert, AlertDescription, AlertIcon, AlertTitle, Text} from "@chakra-ui/react";
import Link from "next/link";

const Waitlist = () => {
    return (
        <Alert
            status='success'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='100vh'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Success!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Enrolled in wait list successfully!
                <Link href={`/`}>
                    <Text cursor={"pointer"} decoration={"underline"}>Home</Text>
                </Link>
            </AlertDescription>
        </Alert>
    );
};

export default Waitlist;