import { useEffect, useRef } from 'react'
import { Box, Stack, HStack, Input, Textarea, Button } from '@chakra-ui/react'

import { Task } from '../models/Task'

type Props = Partial<Task>

const TaskView: React.FC<Props> = ({
  name,
  dateCreated,
  dateUpdated,
  timeSpent,
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => ref.current?.style && (ref.current.style.width = '50vw'), 100)
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
        <HStack marginBottom={2}>
          <Button size="sm">Add tags</Button>
          <Button size="sm">Start</Button>
        </HStack>
        <Stack spacing={3} minHeight="100vh">
          <Input placeholder="Title" />
          <Textarea placeholder="Description" />
        </Stack>
      </Box>
    </Box>
  )
}

export default TaskView
