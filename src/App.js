import {
    Heading,
    IconButton,
    VStack,
    useColorMode,
    useToast,
    Flex,
    HStack,
    Stack,
    Text,
    Container, Link, useDisclosure,
} from "@chakra-ui/react";
import GoalsList from './components/GoalsList';
import AddGoal from './components/AddGoal';
import {FaSun, FaMoon, FaGithub} from 'react-icons/fa'
import React, {useState, useEffect} from 'react'
import DefaultHomepageAnimation from "./components/DefaultHomepageAnimation";
import {nanoid} from "nanoid";
import AllGoalsCompleteDialog from "./components/AllGoalsCompleteDialog";

function App() {
    const toast = useToast();
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [goals, setGoals] = useState(
        () => JSON.parse(localStorage.getItem('startupProgress')) || []
    );

    // region Save to Local Storage Whenever `goals` State Changes
    useEffect(() => {
        localStorage.setItem('startupProgress', JSON.stringify(goals));
    }, [goals]);
    // endregion

    // region Add Goal
    function addGoal(goal) {
        if (goals.length === 0) {
            goal.status = "PENDING"
            setGoals([goal]);
        } else {
            setGoals([...goals, goal]);
        }
    }

    // endregion

    // region Edit Goal
    function editGoal(goalId, updatedGoal, onClose) {
        const data = updatedGoal.trim();

        if (!data) {
            toast({
                title: 'Please Enter Something',
                position: 'top',
                status: 'warning',
                duration: 1500,
                isClosable: true,
            });

            return;
        }

        const newGoalsUpdate = goals.map((goal, index, array) => {
            if (goal.id === goalId) {
                goal.name = updatedGoal;
                goal.check = false
            }
            return goal;
        });
        setGoals(newGoalsUpdate);
        onClose();
    }

    // endregion

    // region Delete a Specific Goal
    function deleteSingleGoal(goalId) {
        const newGoals = goals.filter((goal) => {
            return goal.id !== goalId;
        });
        setGoals(newGoals);
        checkIfAllTasksAreComplete();
    }

    // endregion

    // region Delete All Goals
    function deleteAllGoals() {
        setGoals([]);
    }

    // endregion

    // region Add Sub Goal
    function addSubGoal(goalId, subGoal) {
        let newGoals = goals.map((currentGoal) => {
            if (currentGoal.id === goalId) {
                currentGoal.subGoals.push({
                    subGoalId: nanoid(),
                    status: false,
                    name: subGoal
                })
                toast({
                    title: 'Sub Goals Added',
                    position: 'top',
                    status: 'success',
                    duration: 1000,
                    isClosable: true,
                });
                return currentGoal;
            } else {
                return currentGoal;
            }
        });

        setGoals(newGoals);
    }

    // endregion

    // region Change Sub Goal Status
    function changeSubGoalStatus(goalId, subGoalIndex) {
        let currentGoalIndex = -1;
        let newGoals = goals.map((goal, index, array) => {
            if (goal.id === goalId) {
                currentGoalIndex = index;
                goal.subGoals[subGoalIndex].status = !goal.subGoals[subGoalIndex].status;
            }
            return goal;
        });

        const filteredGoal = goals.filter(goal => {
            if (goal.id === goalId) return true;
            return false;
        });

        const subGoalSize = filteredGoal[0].subGoals.length;
        const completeSubGoals = filteredGoal[0].subGoals.filter(subGoal => {
            return subGoal.status;
        }).length;

        if (completeSubGoals === subGoalSize) {
            newGoals = newGoals.map((goal, index, array) => {
                if (goal.id === goalId) {
                    goal.status = "FINISHED";
                }
                if (index === currentGoalIndex + 1) {
                    goal.status = "PENDING";
                }
                return goal;
            });
        }

        setGoals(newGoals);
        checkIfAllTasksAreComplete();
    }

    // endregion

    // region Check If All Tasks Are Complete
    function checkIfAllTasksAreComplete() {
        const uncompletedGoals = goals.filter(goal => {
            if (goal.status === "PENDING" || goal.status === "LOCKED") return true;

            return false;
        }).length;
        if (uncompletedGoals === 0 && goals.length !== 0) {
            onOpen();
        }
    }

    // endregion

    const {colorMode, toggleColorMode} = useColorMode();

    return (
        <Stack minH={'100vh'} direction={{base: 'column', md: 'row'}}>
            <AllGoalsCompleteDialog isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>
            <Flex bgColor={colorMode === 'light' ? 'gray.800' : 'gray.900'} flex={1} align={'center'}>
                <VStack minH={'100vh'} p={8} flex={1} align={'center'} justify={'center'} alignSelf='flex-start'>
                    <HStack alignSelf='flex-start'>
                        <IconButton
                            icon={colorMode === 'light' ? <FaSun/> : <FaMoon/>}
                            isRound='true'
                            size='sm'
                            alignSelf='flex-start'
                            onClick={toggleColorMode}
                            aria-label={"Theme Toggle"}/>
                        <Link href='https://github.com/Yon12853/crave-startup-tracker.git' isExternal>
                            <IconButton
                                icon={<FaGithub/>}
                                isRound='true'
                                size='sm'
                                alignSelf='flex-start'
                                onClick={toggleColorMode}
                                aria-label={"Theme Toggle"}/>
                        </Link>
                    </HStack>
                    <Flex bgColor={colorMode === 'light' ? 'gray.800' : 'gray.900'} flex={1} align={'center'}
                          justify={'center'}>
                        <Container maxW={'5xl'}>
                            <Stack
                                textAlign={'center'}
                                align={'center'}
                                spacing={{base: 8, md: 10}}
                                py={{base: 20, md: 28}}>
                                <DefaultHomepageAnimation/>
                                <Heading
                                    color={'gray.100'}
                                    fontWeight={600}
                                    fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}
                                    lineHeight={'110%'}>
                                    Build Your {' '}
                                    <Text
                                        as={'span'}
                                        // color={'orange.400'}
                                        bgGradient='linear(to-l, red.300, pink.500)'
                                        bgClip='text'
                                    >
                                        Awesome Startup
                                    </Text>
                                </Heading>
                                <Text color={'gray.500'} maxW={'3xl'}>
                                    Add Your Main Goals Here And You Can Add More Sub Goals On The Right Section.
                                </Text>
                                <AddGoal addGoal={addGoal}/>
                            </Stack>
                        </Container>
                    </Flex>
                </VStack>
            </Flex>
            <Flex flex={1}>
                <VStack p={4} minW='50vw' minH='100vh' pb={28}>
                    <Heading
                        p='5'
                        fontWeight='bold'
                        size='xl'
                    >
                        Your Roadmap,{' '}
                        <Text
                            as={'span'}

                            bgGradient='linear(to-l, red.300, pink.500)'
                            bgClip='text'
                        >
                            Your Goals!
                        </Text>
                    </Heading>
                    <GoalsList
                        goals={goals}
                        updateGoal={editGoal}
                        deleteGoal={deleteSingleGoal}
                        deleteAllGoal={deleteAllGoals}
                        addSubGoal={addSubGoal}
                        changeSubGoalStatus={changeSubGoalStatus}/>
                </VStack>
            </Flex>
        </Stack>
    );
}

export default App;

