import React from 'react'
import UpdateGoal from './UpdateGoal';
import {DeleteSingleGoal, DeleteAllGoals} from './DeleteSingleGoal';
import {
    HStack,
    Box,
    VStack,
    IconButton,
    Flex,
    Text,
    StackDivider,
    Heading,
    Container,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    Tr, Thead, Th, Tbody, Tfoot, TableContainer, Table, TableCaption, Td
} from '@chakra-ui/react'
import NoGoalsAnimation from "./NoGoalsAnimation";
import {CheckIcon, LockIcon, TimeIcon} from "@chakra-ui/icons";
import AddSubGoal from "./AddSubGoal";
import {ChangeSubGoalStatus} from "./ChangeSubGoalStatus";
import {FiCheck} from "react-icons/fi";

function GoalsList({goals, updateGoal, deleteGoal, deleteAllGoal, addSubGoal, changeSubGoalStatus}) {
    // region If there is no goal render this part
    if (!goals.length) {
        return (
            <>
                <Box minW='75%'>
                    <NoGoalsAnimation/>
                    <Box textAlign="center" py={3} px={3}>
                        <Heading as="h2" size="xl" mt={6} mb={2}>
                            No Goals Added Yet!
                        </Heading>
                        <Container maxW='md'>
                            <Text color={'gray.500'}>
                                Add goals that you wish to achieve throughout the establishment of your awesome company,
                                and we will track the progress for you ;)
                            </Text>
                        </Container>
                    </Box>
                </Box>
            </>
        );
    }
    // endregion

    // region Return Component
    return (
        <>
            <Accordion
                w='100%'
                maxW={{base: '100vw', sm: '100vw', lg: '100vw', xl: '100vw'}}
            >
                {goals.map((goal) => (
                    <AccordionItem>
                        <AccordionButton>
                            <VStack
                                divider={<StackDivider/>}
                                p='2'
                                w='100%'
                                maxW={{base: '100vw', sm: '100vw', lg: '100vw', xl: '100vw'}}
                            >
                                <Box w='100%' p={4}>
                                    <HStack
                                        key={goal.id}
                                        opacity={goal.check === true ? '0.2' : '1'}
                                    >
                                        <Box flex='1' textAlign='left'>
                                            <HStack divider={<StackDivider/>} spacing={4}>
                                                {
                                                    goal.status === "PENDING" ? (
                                                        <IconButton
                                                            colorScheme='red'
                                                            variant='outline'
                                                            aria-label='Call Icon'
                                                            size='sm'
                                                            rounded={'full'}
                                                            icon={<TimeIcon/>}
                                                        />
                                                    ) : goal.status === "FINISHED" ? (
                                                        <IconButton
                                                            colorScheme='teal'
                                                            aria-label='Call Icon'
                                                            size='sm'
                                                            rounded={'full'}
                                                            icon={<CheckIcon/>}
                                                        />
                                                    ) : goal.status === "LOCKED" ? (
                                                        <IconButton
                                                            colorScheme='red'
                                                            aria-label='Call Icon'
                                                            size='sm'
                                                            rounded={'full'}
                                                            icon={<LockIcon/>}
                                                        />
                                                    ) : (
                                                        ''
                                                    )
                                                }
                                                <Text
                                                    w='100%'
                                                    p='8px'
                                                    borderRadius='lg'
                                                    as={goal.check === true ? 's' : ''}
                                                    cursor='pointer'
                                                >
                                                    <strong>{goal.name}</strong>
                                                </Text>
                                                <Text
                                                    w='100%'
                                                    p='8px'
                                                    borderRadius='lg'
                                                    as={goal.check === true ? 's' : ''}
                                                    cursor='pointer'
                                                >
                                                    <strong>{goal.status}</strong>
                                                </Text>
                                            </HStack>
                                        </Box>
                                        <DeleteSingleGoal goal={goal} deleteGoal={deleteGoal}
                                                          deleteAllGoals={deleteAllGoal}/>
                                        <UpdateGoal goal={goal} updateGoal={updateGoal}/>
                                        {
                                            goal.status !== "FINISHED" ? (
                                                <AddSubGoal goalId={goal.id} addSubGoal={addSubGoal}/>
                                            ) : (
                                                <IconButton
                                                    icon={<FiCheck/>}
                                                    variant={'outline'}
                                                    color={'teal'}
                                                    isRound='false'
                                                    onClick={() => {
                                                        alert('All Steps In This Phase Are Already Completed!')
                                                    }
                                                    }
                                                    aria-label={''}/>
                                            )
                                        }
                                    </HStack>
                                </Box>
                            </VStack>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            {
                                goal.subGoals.length > 0 ? (
                                    <TableContainer>
                                        <Table variant='simple'>
                                            <TableCaption>Once your sub goals are all done your main goal will be marked
                                                complete.</TableCaption>
                                            <Thead>
                                                <Tr>
                                                    <Th>Status</Th>
                                                    <Th>Task</Th>
                                                    <Th isNumeric>Action</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                                {
                                                    goal.subGoals.map((subGoal, idx) => (
                                                        <Tr key={subGoal.id}>
                                                            <Td>
                                                                {
                                                                    goal.status === "LOCKED" ? (
                                                                        <IconButton
                                                                            colorScheme='red'
                                                                            aria-label='Lock Icon'
                                                                            size='sm'
                                                                            rounded={'full'}
                                                                            icon={<LockIcon/>}
                                                                        />
                                                                    ) : subGoal.status === true ? (
                                                                        <IconButton
                                                                            colorScheme='teal'
                                                                            aria-label='Check Icon'
                                                                            size='sm'
                                                                            rounded={'full'}
                                                                            icon={<CheckIcon/>}
                                                                        />
                                                                    ) : (
                                                                        <IconButton
                                                                            colorScheme='red'
                                                                            variant='outline'
                                                                            aria-label='Time Icon'
                                                                            size='sm'
                                                                            rounded={'full'}
                                                                            icon={<TimeIcon/>}
                                                                        />
                                                                    )
                                                                }
                                                            </Td>
                                                            <Td>{subGoal.name}</Td>
                                                            <Td>
                                                                <Flex>
                                                                    <VStack p={1} flex={1} align={'center'}
                                                                            justify={'center'} alignSelf='flex-end'>
                                                                        {
                                                                            goal.status !== "LOCKED" ? (
                                                                                <HStack
                                                                                    opacity={goal.check === true ? '0.2' : '1'}
                                                                                    alignSelf='flex-end'
                                                                                >
                                                                                    {
                                                                                        goal.status === "FINISHED" ? (
                                                                                            <IconButton
                                                                                                icon={<FiCheck/>}
                                                                                                variant={'outline'}
                                                                                                color={'teal'}
                                                                                                isRound='false'
                                                                                                onClick={() => {
                                                                                                    alert("This Sub Goal Is Already Completed")
                                                                                                }
                                                                                                }
                                                                                                aria-label={''}/>
                                                                                        ) : (
                                                                                            <ChangeSubGoalStatus
                                                                                                goalId={goal.id}
                                                                                                subGoalIndex={idx}
                                                                                                changeSubGoalStatus={changeSubGoalStatus}
                                                                                                subGoalStatus={subGoal.status}/>
                                                                                        )
                                                                                    }

                                                                                </HStack>
                                                                            ) : (
                                                                                <HStack
                                                                                    opacity={goal.check === true ? '0.2' : '1'}
                                                                                    alignSelf='flex-end'
                                                                                >
                                                                                    <IconButton
                                                                                        aria-label='Lock Icon'
                                                                                        size='sm'
                                                                                        rounded={'full'}
                                                                                        icon={<LockIcon/>}
                                                                                    />
                                                                                </HStack>
                                                                            )
                                                                        }
                                                                    </VStack>
                                                                </Flex>
                                                            </Td>
                                                        </Tr>
                                                    ))
                                                }
                                            </Tbody>
                                            <Tfoot>
                                                <Tr>
                                                    <Th>Status</Th>
                                                    <Th>Task</Th>
                                                    <Th isNumeric>Action</Th>
                                                </Tr>
                                            </Tfoot>
                                        </Table>
                                    </TableContainer>
                                ) : (
                                    <>
                                        <Container p={4} textAlign={'center'}>
                                            <Text color={'gray.500'}>
                                                You currently don't have any Sub Goals in this Goal. Click the plus icon
                                                on the top right of your goal to add a new Sub Goal.
                                            </Text>
                                        </Container>
                                    </>
                                )
                            }
                        </AccordionPanel>
                    </AccordionItem>
                ))}
            </Accordion>

            <Flex>
                <DeleteAllGoals deleteAllGoals={deleteAllGoal}/>
            </Flex>
        </>
    );
    // endregion
}

export default GoalsList;