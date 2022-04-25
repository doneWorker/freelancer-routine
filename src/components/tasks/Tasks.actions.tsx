import React from 'react'
import { Button, HStack } from '@chakra-ui/react'

import { AiOutlinePlusCircle } from 'react-icons/ai'

interface Props {
  // selectedIds?: string[]
  onCreate: () => void
}

const TasksActions: React.FC<Props> = ({ onCreate }) => (
  <HStack borderBottom="1px solid #eee">
    <Button
      margin={1}
      size="sm"
      leftIcon={<AiOutlinePlusCircle />}
      onClick={onCreate}
    >
      Add Task
    </Button>
  </HStack>
)

export default TasksActions
