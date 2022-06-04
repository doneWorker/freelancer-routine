/* eslint-disable */
import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react'
import { Avatar, Box, Stack, WrapItem, Text } from '@chakra-ui/react'

import { Task } from 'models/Task'
import useTicker from 'hooks/useTicker'
import { getDurationHMS } from 'helpers/dateHelper'
import TagsInput from 'components/common/Tags.input'
import TaskHeader from './Task.header'
import Field from './Field'
import TaskTitle from './Task.title'
import TaskDescription from './Task.description'
import CommentForm from './Comment.form'
import Priority from './fields/Priority'
import DueDate from './fields/DueDate'
import CommentsList from './Comments.list'
import { taskActiveState, useTasksActions } from 'store/recoil/tasks.atom'
import { useRecoilValue } from 'recoil'

type Props = Partial<Task> & {
  name?: string
  description?: string
  onTaskChange: (key: string, val: any) => void
  onCommentSubmit: (content: string) => void
  onDelete: () => void
  onClose: () => void
}

const TaskView: React.FC<Props> = (props: Props) => {
  const { name, description, priority, dueDate, id } = props
  const { onTaskChange, onCommentSubmit, onDelete, onClose } = props
  const { fetchComments } = useTasksActions()
  const { comments } = useRecoilValue(taskActiveState)

  console.log('comments', comments)

  const ref = useRef<HTMLDivElement>(null)
  const [time, setTime] = useState<number>(0)
  const [isTicking, setIsTicking] = useState<boolean>(false)
  const { addTickerListener, removeTickerListener } = useTicker()

  const tickerCallback = useCallback(() => {
    setTime((p) => p + 1)
  }, [setTime])

  const updateForm = useCallback(
    (key: string, value: string) => {
      onTaskChange(key, value)
    },
    [onTaskChange],
  )

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
      ref.current?.style && (ref.current.style.width = '50%')
    }, 100)

    return () => handleStopTimer()
  }, [])

  useEffect(() => {
    id && fetchComments(id)
  }, [id])

  const rootStyle = {
    flexShrink: 0,
    transition: '400ms',
    w: 0,
    h: '100%',
    borderLeft: '1px solid',
    borderColor: 'gray.100',
    overflow: 'hidden',
  }

  return (
    <Box ref={ref} {...rootStyle}>
      <Box w="100%" h="100%" position="relative" p={0} overflow="auto">
        <TaskHeader
          isTicking={isTicking}
          formattedTimeSpent={formattedTimeSpent}
          onDelete={onDelete}
          onClose={onClose}
          handleStartTimer={handleStartTimer}
          handleStopTimer={handleStopTimer}
        />
        <Stack spacing={3} p="0 12px">
          <TaskTitle name={name} onChange={updateForm} />

          <Field
            text="Assignee"
            elem={
              <WrapItem display="flex" alignItems="center" cursor="pointer">
                <Avatar
                  size="sm"
                  name="Kirill Anikin"
                  src="https://bit.ly/kent-c-dodds"
                />
                <Text ml={2} fontWeight={500}>
                  Kirill Anikin
                </Text>
              </WrapItem>
            }
          />
          <Field
            text="Due date"
            elem={<DueDate value={dueDate} onChange={updateForm} />}
          />
          <Field
            text="Priority"
            elem={<Priority value={priority || 'medium'} onChange={updateForm} />}
          />
          <Field text="Phase" elem="In-progress" />
          <Field text="Tags" elem={<TagsInput />} />
          <Field
            text="Description"
            elem={
              <TaskDescription description={description} onChange={updateForm} />
            }
          />
        </Stack>
        <Box background="#edf2f6" p="10px 12px" mt={2}>
          Created by @Kirill
        </Box>
        <CommentsList list={comments || []} />
        <CommentForm onSubmit={onCommentSubmit} />
      </Box>
    </Box>
  )
}

export default TaskView
