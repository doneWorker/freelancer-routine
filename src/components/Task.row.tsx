import { useMemo } from 'react'
import { Tr, Td } from '@chakra-ui/react'

import { Clickable } from '../types/common'
import { Task } from '../models/Task'
import { format } from 'date-fns'
import { getDuration, stdDatePattern } from '../helpers/dateHelper'

type Props = Task & Clickable

const TaskCard: React.FC<Props> = ({
  name,
  dateCreated,
  dateUpdated,
  tags,
  timeSpent = 0,
  onClick = () => {},
}) => {
  const created = useMemo(() => {
    return format(new Date(dateCreated), stdDatePattern)
  }, [dateCreated])

  const updated = useMemo(() => {
    return format(new Date(dateUpdated), stdDatePattern)
  }, [dateUpdated])

  const duration = useMemo(() => {
    return getDuration(timeSpent)
  }, [timeSpent])

  return (
    <Tr
      _hover={{
        cursor: 'pointer',
        background: 'gray.100',
        color: 'teal.500',
      }}
      onClick={onClick}
    >
      <Td>{name}</Td>
      <Td>{duration}</Td>
      <Td>{tags}</Td>
      <Td>{created}</Td>
      <Td>{updated}</Td>
    </Tr>
  )
}

export default TaskCard
