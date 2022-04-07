import { memo, useEffect, useRef, useCallback, useState, useMemo } from 'react'
import {
  Box,
  Stack,
  HStack,
  Input,
  Textarea,
  ButtonGroup,
  Button,
  Text,
  IconButton,
} from '@chakra-ui/react'

import { Task } from 'models/Task'
import { useTicker } from 'hooks/useTicker'
import { getDurationHMS } from 'helpers/dateHelper'
import TagsInput from 'components/common/Tags.input'

import { HiOutlineClock } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { GrClose } from 'react-icons/gr'

type Props = Partial<Task> & {
  onTaskChange: (key: string, val: any) => void
  onClose: () => void
}

type TaskHeaderProps = {
  isTicking: boolean
  formattedTimeSpent: string
  onClose: () => void
  handleStopTimer: () => void
  handleStartTimer: () => void
}
const TaskHeader: React.FC<TaskHeaderProps> = memo(
  ({
    isTicking,
    formattedTimeSpent,
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
        <Button size="sm" leftIcon={<IoMdCheckmarkCircleOutline />}>
          Complete
        </Button>
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

const TaskView: React.FC<Props> = ({
  name,
  description,
  extLink,
  timeSpent,
  onTaskChange,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [time, setTime] = useState<number>(0)
  const [isTicking, setIsTicking] = useState<boolean>(false)
  const { addTickerListener, removeTickerListener } = useTicker()

  const tickerCallback = useCallback(() => {
    setTime((p) => ++p)
  }, [setTime])

  const updateForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    let { name, value } = e.target

    onTaskChange(name, value)
  }

  const handleStartTimer = useCallback(() => {
    setIsTicking(true)
    addTickerListener(tickerCallback)
  }, [addTickerListener, tickerCallback, setIsTicking])

  const handleStopTimer = useCallback(() => {
    setIsTicking(false)
    removeTickerListener(tickerCallback)
  }, [removeTickerListener, tickerCallback, setIsTicking])

  const formattedTimeSpent = useMemo(() => {
    return getDurationHMS(time)
  }, [time])

  useEffect(() => {
    setTimeout(() => ref.current?.style && (ref.current.style.width = '50vw'), 100)

    return () => handleStopTimer()
  }, [])

  return (
    <Box
      ref={ref}
      flexShrink={0}
      transition="400ms"
      width={0}
      borderLeft="1px solid"
      borderColor="gray.100"
      overflow="hidden"
    >
      <Box width={'50vw'} padding="0 1em">
        <TaskHeader
          isTicking={isTicking}
          formattedTimeSpent={formattedTimeSpent}
          onClose={onClose}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
        />
        <form ref={formRef} onChange={updateForm}>
          <Stack spacing={3} minHeight="100vh">
            <TagsInput tags={[]} onAdd={() => {}} onRemove={() => {}} />
            <Input name="name" value={name} placeholder="Title" />
            <Input
              name="extLink"
              value={extLink}
              placeholder="Link to task(optional)"
            />
            <Textarea
              name="description"
              value={description}
              placeholder="Description"
            />
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default TaskView
