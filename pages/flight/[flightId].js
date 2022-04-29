import React, {useEffect, useState} from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    HStack,
    VStack,
    Text,
    Spacer,
    RadioGroup,
    Stack,
    Radio,
    Input,
    Button,
    SimpleGrid,
    Flex,
    Code,
    FormControl, FormLabel, Icon, PinInput, PinInputField, useToast,
} from '@chakra-ui/react'
import {useRouter} from "next/router";
import axios from "axios";


const FlightId = ({seats, reservation}) => {
    const [passengers, setPassengers] = useState([])
    const [filteredSeats, setFilteredSeats] = useState(seats.seats.filter(seat => seat.class === "Economy"))
    const [classType, setClassType] = React.useState('Economy')
    const [weight, setWeight] = React.useState(20)
    const [firstName, setFirstName] = React.useState("")
    const [lastName, setLastName] = React.useState("")
    const [id, setId] = React.useState("")
    const [seat, setSeat] = React.useState(null)
    const [totalPrice, setTotalPrice] = useState(0)

    const toast = useToast()

    const [cardnumber, setCardNumber] = useState("")
    const [expirationDate, setExpirationDate] = useState("")
    const [ccv, setCcv] = useState(0)

    const router = useRouter()
    const {flightId} = router.query

    useEffect(() => {
        const result = seats.seats.filter(seat => seat.class === classType);
        setFilteredSeats(result)
    }, [classType])


    const data = filteredSeats.sort().map((seat, index) => {
        return (
            <Radio colorScheme={"red"} value={seat.seatNumber}>{seat.seatNumber}</Radio>
        )

    })

    const addedPassengers = passengers.map((passenger, index) => {
        return (
            <Flex shadow={"md"} p={1} border={"solid 1px #ccc"} rounded={"lg"} w={"90%"} >

                <HStack mt={5} justifyContent={"center"} flex='1' textAlign='left'>
                    <Spacer/>
                    <HStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.1"}>Passenger{index+1}:</Text>
                    </HStack>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.2"}>First Name</Text>
                        <Text>{passenger.firstName.toUpperCase()}</Text>
                    </VStack>
                    <Spacer/>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.2"}>Last Name</Text>
                        <Text>{passenger.lastName.toUpperCase()}</Text>
                    </VStack>
                    <Spacer/>
                    <VStack fontSize={"xl"} fontWeight={"semibold"}>
                        <Text color={"g.2"}>Seat</Text>
                        <Text>{passenger.seat}
                        </Text>
                    </VStack>
                    <Spacer/>


                </HStack>
            </Flex>
        )

    })

    function handlePayment() {
        axios({
            method: 'post', url: 'http://localhost:3007/pay',
            data: {
                identification: reservation,
                cardNumber: cardnumber,
                expirationDate: expirationDate,
                ccv: ccv
            }
        }).then(function (response) {

            router.push(`/reservation/${reservation}`)

        })
    }


    function book_flight() {

        passengers.forEach((passenger) => {
            console.table(passenger)
            console.log(flightId)
            console.log(reservation)
            axios({
                method: 'post', url: 'http://localhost:3007/book_seat',
                data: {
                    flight: passenger.flight,
                    seat: passenger.seat,
                    weight: passenger.weight,
                    identification: passenger.identification,
                    reservation: passenger.reservation,
                    firstName: passenger.firstName,
                    lastName: passenger.lastName
                }
            }).then(function (response) {
                console.log(response.data);

            })
        })

        handlePayment()

    }

    console.log(classType)

    function enroll_waitlist() {
        axios({
            method: 'post', url: 'http://localhost:3007/enroll_waitlist',
            data: {
                flight: flightId,
                identification: id,
                firstName: firstName,
                lastName: lastName,
                class: classType
            }
        }).then(function (response) {
            router.push("/waitlist")

        })
    }


    return (
        <>
            <Box p={3} top={0} w={"100%"} bg={"g.1"} color={"g.2"} mb={5}
                 fontSize={"xl"}>Reservation: {reservation}</Box>

            <Box mt={10} mx={"10rem"}>

                <Text mb={5} fontSize={"xl"}>Added Passengers:</Text>
                <VStack alignItems={"flex-start"} my={5}>
                    {addedPassengers}
                </VStack>


                <Accordion allowMultiple>
                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    passenger information
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>
                            <HStack flex='1' textAlign='left'>

                                <VStack textAlign={"left"}>
                                    <Text>First Name:</Text>
                                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)}
                                           textAlign={"center"}
                                           type="text"></Input>
                                </VStack>
                                <VStack>
                                    <Text>Last Name:</Text>
                                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)}
                                           textAlign={"center"}
                                           type="text"></Input>
                                </VStack>
                                <VStack>
                                    <Text>ID</Text>
                                    <Input value={id} onChange={(e) => setId(e.target.value)} textAlign={"center"}
                                           type="text"></Input>
                                </VStack>
                                <VStack>
                                    <Text>Weight (KG)</Text>
                                    <Input value={weight} onChange={(e) => setWeight(e.target.value)}
                                           textAlign={"center"} w={16}
                                           type="text"></Input>
                                </VStack>
                                <Spacer/>


                                <Button onClick={() => {
                                    let neewPassenger = {
                                        flight: flightId,
                                        seat: seat,
                                        weight: weight,
                                        identification: id,
                                        reservation: reservation,
                                        firstName: firstName,
                                        lastName: lastName
                                    }
                                    setPassengers(passengers => [...passengers, neewPassenger]);
                                    setFirstName("")
                                    setLastName("")
                                    setId("")
                                    setWeight(20)
                                    setSeat("")
                                    setTotalPrice(totalPrice + filteredSeats[0].price)

                                }} disabled={passengers.length >= 10} _hover={{backgroundColor: "g.2"}} color={"white"}
                                        bg={"g.2"} rounded={"xl"}
                                        w={"18%"}>
                                    Add Passenger

                                </Button>
                            </HStack>

                            <Box>
                                <RadioGroup mt={10} onChange={setClassType} value={classType}>
                                    <Stack direction='row'>
                                        <Radio colorScheme={"red"} value='Economy'>Economy</Radio>
                                        <Radio colorScheme={"red"} value='Business'>Business</Radio>
                                        <Radio colorScheme={"red"} value='First Class'>First</Radio>
                                    </Stack>
                                </RadioGroup>

                                {filteredSeats.length > 0 &&
                                <Text fontSize={"xl"}>Price: {filteredSeats[0].price}</Text>
                                } <RadioGroup mt={10} value={seat} onChange={setSeat}>
                                Seats:

                                <SimpleGrid w={"500px"} columns={4}>

                                    {data}

                                </SimpleGrid>
                            </RadioGroup>
                                {filteredSeats.length == 0 &&
                                <Button onClick={enroll_waitlist} colorScheme={"green"} variant={"outline"} mt={2}>Enroll
                                    in wait list</Button>
                                }

                            </Box>

                        </AccordionPanel>
                    </AccordionItem>

                    <AccordionItem>
                        <h2>
                            <AccordionButton>
                                <Box flex='1' textAlign='left'>
                                    Payment
                                </Box>
                                <AccordionIcon/>
                            </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4}>

                            <FormControl>

                                <FormLabel>Card Holder</FormLabel>
                                <Input fontWeight={"semibold"} placeholder='enter caerd holder name'/>
                            </FormControl>

                            <FormControl mt={10}>
                                <FormLabel>Card Number</FormLabel>

                                <Input onChange={(e) => setCardNumber(e.target.value)} type="number"
                                       placeholder={"card number"}/>

                            </FormControl>

                            <HStack mt={10}>
                                <FormLabel minW={"20%"}>Expiry Date</FormLabel>
                                <Input onChange={(e) => setExpirationDate(e.target.value)} fontWeight={"semibold"}
                                       w={"100px"} placeholder='MM/YY'/>

                            </HStack>

                            <HStack mt={10}>
                                <FormLabel minW={"20%"}>CCV number</FormLabel>
                                <Input onChange={(e) => setCcv(e.target.value)} fontWeight={"semibold"} w={"100px"}
                                       placeholder='3 digits'/>
                            </HStack>

                            <Button mt={10}

                                    onClick={() => {
                                        book_flight()
                                    }}


                                    _hover={{backgroundColor: "g.2"}} h={10} w={"60%"} px={10} color={"white"}
                                    bg={"g.2"}
                                    mx={"auto"}>
                                Pay ${totalPrice} now
                            </Button>

                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
            </Box></>
    );
};


export async function getServerSideProps(context) {


    const {flightId} = context.query

    const res = await fetch(`http://localhost:3007/flight_seats?flight=${flightId}`)
    const seats = await res.json()

    const reservation = Math.random().toString(36).substr(2, 3) + "-" + Math.random().toString(36).substr(2, 3);


    console.log(seats)

    return {
        props: {seats, reservation}, // will be passed to the page component as props
    }
}

export default FlightId;