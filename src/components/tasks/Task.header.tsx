import { memo } from 'react'
import { Box, HStack, ButtonGroup, Button, Text, IconButton } from '@chakra-ui/react'

import { HiOutlineClock } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { BiTrash } from 'react-icons/bi'

type TaskHeaderProps = {
  isTicking: boolean
  formattedTimeSpent: string
  onDelete: () => void
  onClose: () => void
  handleStopTimer: () => void
  handleStartTimer: () => void
}
const TaskHeader: React.FC<TaskHeaderProps> = memo(
  ({
    isTicking,
    formattedTimeSpent,
    onDelete,
    onClose,
    handleStopTimer,
    handleStartTimer,
  }) => {
    return (
      <HStack spacing={1} marginBottom={2} padding={'5px 0'}>
        <IconButton
          aria-label="Close Task"
          size="sm"
          icon={<GrClose />}
          onClick={onClose}
        />
        <IconButton
          size="sm"
          colorScheme="green"
          aria-label="complete"
          title="Complete"
          icon={<IoMdCheckmarkCircleOutline />}
        />
        <IconButton
          size="sm"
          colorScheme="red"
          aria-label="delete"
          title="Delete"
          icon={<BiTrash />}
          onClick={onDelete}
        />
        <Button size="sm" leftIcon={<AiOutlinePlusCircle />}>
          Add tags
        </Button>
        <ButtonGroup size="sm" isAttached spacing={0}>
          <Button
            size="sm"
            mr="-px"
            leftIcon={<HiOutlineClock />}
            onClick={isTicking ? handleStopTimer : handleStartTimer}
          >
            {isTicking ? 'Pause' : 'Start'}
          </Button>
          <Button size="sm">Add time period</Button>
        </ButtonGroup>
        <Box ml="auto !important">
          <Text>Working time: {formattedTimeSpent}</Text>
        </Box>
      </HStack>
    )
  }
)

export default TaskHeader
