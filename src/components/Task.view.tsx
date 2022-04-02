import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'

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
      <Box width={'50vw'}>{name}</Box>
    </Box>
  )
}

export default TaskView
