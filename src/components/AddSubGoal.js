import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    FormControl,
    useDisclosure,
    IconButton, Text
} from '@chakra-ui/react'
import {useState} from 'react';
import React from 'react';
import {FiPlus} from 'react-icons/fi'

function AddSubGoal({goalId, addSubGoal}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [subGoal, setSubGoal] = useState('');

    const initialRef = React.useRef()

    return (
        <>
            <IconButton
                icon={<FiPlus/>}
                isRound='true'
                onClick={onOpen}
                aria-label={''}/>
            <Modal
                isCentered
                initialFocusRef={initialRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent w='90%'>
                    <ModalHeader>Add Sub Goal</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Text fontWeight='bold' mb='1rem'>
                            Add Sub Goals that you want to achieve.
                        </Text>
                        <FormControl>
                            <Input rounded={'full'} ref={initialRef} placeholder='Sub Goal'
                                   onChange={(e) => setSubGoal(e.target.value)}
                                   onFocus={(e) => setSubGoal(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            px='8'
                            pl='10'
                            pr='10'
                            h='46'
                            rounded={'full'}
                            mr={3}
                            onClick={onClose}
                            _focus={{
                                borderColor: 'linear(to-l, red.500, pink.600)',
                            }}>
                            Cancel
                        </Button>
                        <Button
                            px='8'
                            pl='10'
                            pr='10'
                            h='46'
                            onClick={() => {
                                initialRef.current.value = ''
                                addSubGoal(goalId, subGoal, onClose)
                            }}
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
                            Add Sub Goal
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AddSubGoal;