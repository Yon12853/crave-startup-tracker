import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button, Text, Heading, Container, Box
} from '@chakra-ui/react'
import {useEffect, useState} from 'react';
import React from 'react';
import axios from "axios";
import AllGoalsCompleteAnimation from "./AllGoalsCompleteAnimation";

function AllGoalsCompleteDialog({isOpen, onOpen, onClose}) {
    const [randomFact, setRandomFact] = useState('');

    // region Get Random Fact From `https://uselessfacts.jsph.pl/random.json`
    useEffect(() => {
        axios.get(`https://uselessfacts.jsph.pl/random.json`)
            .then(res => {
                setRandomFact(res.data.text)
            })
    }, []);
    // endregion

    return (
        <>
            <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent w='90%'>
                    <ModalHeader textAlign="center">
                        <Text>
                            Congrats! All Goals Done :)
                        </Text>
                    </ModalHeader>
                    <ModalBody pb={6}>
                        <AllGoalsCompleteAnimation/>
                        <Box textAlign="center" py={3} px={3}>
                            <Heading as="h2" size="xl" mt={6} mb={2}>
                                As a bonus, here is a random fact:
                            </Heading>
                            <Container maxW='md'>
                                <Text color={'gray.500'}>
                                    {randomFact}
                                </Text>
                                <br/>
                                <Text color={'gray.500'}>
                                    (delete all tasks to start all over again)
                                </Text>
                            </Container>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Box textAlign="center" w={'100vw'}>
                            <Button
                                px='8'
                                pl='10'
                                pr='10'
                                h='46'
                                onClick={onClose}
                                fontSize={'sm'}
                                rounded={'full'}
                                bgGradient='linear(to-l, red.300, pink.500)'
                                color={'white'}
                                boxShadow={
                                    '0px 1px 25px -5px rgb(238, 105, 133 / 48%), 0 10px 10px -5px rgb(238, 105, 133 / 43%)'
                                }
                                _hover={{
                                    bgGradient: 'linear(to-l, red.500, pink.600)',
                                }}
                                _focus={{
                                    bgGradient: 'linear(to-l, red.500, pink.600)',
                                }}>
                                Okay
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AllGoalsCompleteDialog;