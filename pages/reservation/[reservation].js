import React from 'react';
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription, Text,
} from '@chakra-ui/react'
import Link from "next/link"
import {useRouter} from "next/router";
const Reservation = () => {

    const router = useRouter()
    const {reservation} = router.query
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
                Flight booked successfully!
            </AlertTitle>
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Reservation ID: {reservation}
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                You can manage your reservation by visiting <Link href={`/my-reservations/${reservation}`}><Text cursor={"pointer"} decoration={"underline"}>Mange My Reservation</Text></Link>
            </AlertDescription>
        </Alert>
    );
};


export default Reservation;