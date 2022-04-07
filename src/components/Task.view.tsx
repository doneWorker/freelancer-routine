import { useEffect, useRef, useCallback, useState, useMemo } from 'react'
import {
  Box,
  Stack,
  HStack,
  Input,
  Textarea,
  ButtonGroup,
  Button,
  Text,
} from '@chakra-ui/react'

import { Task } from 'models/Task'
import { useTicker } from 'hooks/useTicker'
import { getDurationHMS } from 'helpers/dateHelper'
import TagsInput from 'components/common/Tags.input'

import { HiOutlineClock } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'

type Props = Partial<Task> & {
  onTaskChange: (key: string, val: any) => void
}

const TaskView: React.FC<Props> = ({
  name,
  description,
  extLink,
  timeSpent,
  onTaskChange,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [time, setTime] = useState<number>(0)
  const [isTicking, setIsTicking] = useState<Boolean>(false)
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
      transition=".3s"
      width={0}
      borderLeft="1px solid"
      borderColor="gray.100"
      overflow="hidden"
    >
      <Box width={'50vw'} padding="0 1em">
        <HStack marginBottom={2} padding={'5px 0'}>
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
