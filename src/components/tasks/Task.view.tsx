import React, {
  useEffect, useRef, useCallback, useState, useMemo,
} from 'react'
import {
  Box, Stack, Input, Textarea,
} from '@chakra-ui/react'

import { Task } from 'models/Task'
import useTicker from 'hooks/useTicker'
import { getDurationHMS } from 'helpers/dateHelper'
import TagsInput from 'components/common/Tags.input'
import TaskHeader from './Task.header'

type Props = Partial<Task> & {
  // eslint-disable-next-line no-unused-vars
  onTaskChange: (key: string, val: any) => void
  onDelete: () => void
  onClose: () => void
}

const TaskView: React.FC<Props> = ({
  name,
  description,
  extLink,
  onTaskChange,
  onDelete,
  onClose,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [time, setTime] = useState<number>(0)
  const [isTicking, setIsTicking] = useState<boolean>(false)
  const { addTickerListener, removeTickerListener } = useTicker()

  const tickerCallback = useCallback(() => {
    setTime((p) => p + 1)
  }, [setTime])

  const updateForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    const { field, value } = e.target

    onTaskChange(field, value)
  }

  const handleStartTimer = useCallback(() => {
    setIsTicking(true)
    addTickerListener(tickerCallback)
  }, [addTickerListener, tickerCallback, setIsTicking])

  const handleStopTimer = useCallback(() => {
    setIsTicking(false)
    removeTickerListener(tickerCallback)
  }, [removeTickerListener, tickerCallback, setIsTicking])

  const formattedTimeSpent = useMemo(() => getDurationHMS(time), [time])

  useEffect(() => {
    setTimeout(() => {
      ref.current?.style && (ref.current.style.width = '50vw')
    }, 100)

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
      <Box width="50vw" padding="0 1em">
        <TaskHeader
          isTicking={isTicking}
          formattedTimeSpent={formattedTimeSpent}
          onDelete={onDelete}
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
