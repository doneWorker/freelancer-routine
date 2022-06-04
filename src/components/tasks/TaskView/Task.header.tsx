import React, { memo, ReactElement } from 'react'
import {
  Box,
  HStack,
  ButtonGroup,
  Button,
  Text,
  IconButton,
  Divider,
} from '@chakra-ui/react'

import { HiOutlineClock } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'
import { BiTrash } from 'react-icons/bi'

type ActionIconProps = {
  label: string
  colorScheme?: string
  icon: ReactElement
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ActionIcon: React.FC<ActionIconProps> = ({
  label,
  colorScheme = undefined,
  icon,
  onClick,
}) => (
  <IconButton
    aria-label={label}
    colorScheme={colorScheme}
    icon={icon}
    size="sm"
    transition="300ms"
    _hover={{
      borderRadius: '50%',
    }}
    onClick={onClick}
  />
)

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
  }) => (
    <HStack
      spacing={2}
      position="sticky"
      top={0}
      mb={2}
      h={50}
      p="5px 12px"
      zIndex={90}
      borderBottom="1px solid #eee"
      background="white"
    >
      <ActionIcon label="Close Task" icon={<GrClose />} onClick={onClose} />
      <ActionIcon
        label="Complete"
        colorScheme="green"
        icon={<IoMdCheckmarkCircleOutline />}
        onClick={onClose}
      />
      <ActionIcon
        label="Delete"
        colorScheme="red"
        icon={<BiTrash />}
        onClick={onDelete}
      />
      <Divider orientation="vertical" />
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
        <Text>
          Working time:
          {formattedTimeSpent}
        </Text>
      </Box>
    </HStack>
  ),
)

export default TaskHeader
