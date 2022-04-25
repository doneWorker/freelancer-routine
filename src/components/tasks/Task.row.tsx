import React, { memo, useMemo } from 'react'
import { Tr, Td } from '@chakra-ui/react'

import { Clickable } from 'types/common'
import { Task } from 'models/Task'
import { format } from 'date-fns'
import { getDuration, stdDatePattern } from 'helpers/dateHelper'

type Props = Task & Clickable & { isSelected?: boolean }

const TaskCard: React.FC<Props> = memo(
  ({
    id,
    name,
    dateCreated,
    dateUpdated,
    tags,
    timeSpent = 0,
    isSelected,
    onClick = () => {},
  }) => {
    const created = useMemo(() => format(new Date(dateCreated), stdDatePattern), [dateCreated])

    const updated = useMemo(() => format(new Date(dateUpdated), stdDatePattern), [dateUpdated])

    const duration = useMemo(() => getDuration(timeSpent), [timeSpent])

    const hoverStyles = {
      cursor: 'pointer',
      background: 'gray.100',
      color: 'teal.500',
    }
    const extraStyles = isSelected && {
      ...hoverStyles,
      borderLeftWidth: 5,
      borderColor: 'green.300',
    }

    return (
      <Tr _hover={hoverStyles} {...extraStyles} onClick={() => onClick(id)}>
        <Td fontWeight={isSelected ? 'bold' : undefined}>{name}</Td>
        <Td>{duration}</Td>
        <Td>{tags}</Td>
        <Td>{created}</Td>
        <Td>{updated}</Td>
      </Tr>
    )
  },
)

export default TaskCard
