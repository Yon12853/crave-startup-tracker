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
import {FiEdit} from 'react-icons/fi'

function UpdateGoal({goal, updateGoal}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [body, setBody] = useState('');

    const initialRef = React.useRef()

    return (
        <>
            <IconButton
                icon={<FiEdit/>}
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
                    <ModalHeader>Update Your Goal</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody pb={6}>
                        <Text fontWeight='bold' mb='1rem'>
                            Sub Goals wont be affected by the change.
                        </Text>
                        <FormControl>
                            <Input rounded={'full'} ref={initialRef} placeholder='Update Goal'
                                   defaultValue={goal.name}
                                   onChange={(e) => setBody(e.target.value)} onFocus={(e) => setBody(e.target.value)}/>
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
                            onClick={() => updateGoal(goal.id, body, onClose)}
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
                            Update Goal
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default UpdateGoal;