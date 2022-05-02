import {useState} from 'react'
import {Button, HStack, Input, useColorMode, useToast} from "@chakra-ui/react";
import {nanoid} from 'nanoid';

function AddGoal({addGoal}) {
    const toast = useToast();
    const [content, setContent] = useState('');
    const {colorMode} = useColorMode();

    function handleSubmit(e) {
        e.preventDefault();

        const goalText = content.trim();

        if (!goalText) {
            toast({
                title: 'Please enter something',
                position: 'top',
                status: 'warning',
                duration: 1500,
                isClosable: false,
            });
            return setContent('');
        }

        const goal = {
            id: nanoid(),
            name: goalText,
            status: "LOCKED",
            subGoals: [],
        };

        addGoal(goal);
        setContent('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    h='46'
                    variant='filled'
                    rounded={'full'}
                    placeholder='Add an Awesome Goal'
                    _focus={{
                        color: colorMode === 'light' ? 'black' : 'gray:500'
                    }}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <Button
                    px='8'
                    pl='10'
                    pr='10'
                    h='46'
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
                    Add Goal
                </Button>
            </HStack>
        </form>
    );
}

export default AddGoal;