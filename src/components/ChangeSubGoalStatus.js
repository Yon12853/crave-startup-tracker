import {
    IconButton,
} from '@chakra-ui/react'
import React from 'react';
import {FiCheck, FiX} from 'react-icons/fi'

function ChangeSubGoalStatus({goalId, subGoalIndex, changeSubGoalStatus, subGoalStatus}) {
    return (
        <>
            {
                subGoalStatus ? (
                        <IconButton
                            icon={<FiX/>}
                            isRound='true'
                            onClick={() => changeSubGoalStatus(goalId, subGoalIndex)}
                            aria-label={'Change Status'}/>
                    ) :
                    (
                        <IconButton
                            icon={<FiCheck/>}
                            isRound='true'
                            onClick={() => changeSubGoalStatus(goalId, subGoalIndex)}
                            aria-label={'Change Status'}/>
                    )
            }

        </>
    )
}

export {ChangeSubGoalStatus}