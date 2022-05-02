import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    useDisclosure,
    IconButton, Tag, TagLabel, HStack, TagLeftIcon
} from '@chakra-ui/react'
import React from 'react';
import {FiTrash2} from 'react-icons/fi'

// region Delete All Goals
function DeleteAllGoals({deleteAllGoals}) {
    const {isOpen, onOpen, onClose} = useDisclosure()
    return (
        <>
            <Button
                mt='8'
                px='8'
                pl='10'
                pr='10'
                h='46'
                onClick={onOpen}
                type='submit'
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
                Delete All Goals
            </Button>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent w='90%'>
                    <ModalHeader>
                        Are you sure you want to remove all goals?
                    </ModalHeader>
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
                            onClick={() => deleteAllGoals()}
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
                            Yes Delete All!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

// endregion

// region Delete Single Goal
function DeleteSingleGoal({goal, deleteGoal}) {
    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <IconButton
                icon={<FiTrash2/>}
                isRound='true'
                onClick={onOpen}
                aria-label={''}/>

            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px)'
                />
                <ModalContent w='90%'>
                    <ModalHeader>
                        Are you sure you want to remove this goal?
                    </ModalHeader>
                    <ModalBody>
                        <HStack spacing={4}>
                            <Tag size={'sm'} variant='outline' colorScheme='red'>
                                <TagLeftIcon as={FiTrash2}/>
                                <TagLabel><strong>{goal.name}</strong> & all Sub Goals will also be removed)</TagLabel>
                            </Tag>
                        </HStack>
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
                            onClick={() => deleteGoal(goal.id, onClose)}
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
                            Yes Remove!
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

// endregion

export {DeleteSingleGoal, DeleteAllGoals}