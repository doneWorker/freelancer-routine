import React, { memo, useMemo } from 'react'
import { Tr, Td } from '@chakra-ui/react'

import { Clickable } from 'types/common'
import { Task } from 'models/Task'
import { fromNow, getDuration } from 'helpers/dateHelper'

type Props = Partial<Task> & Clickable & { isSelected?: boolean }

const TaskRow: React.FC<Props> = memo(
  ({
    id,
    name,
    dueDate,
    priority,
    timeSpent = 0,
    isSelected,
    onClick = () => {},
  }) => {
    const dueDateMemo = useMemo(
      () => dueDate && fromNow(new Date(dueDate)),
      [dueDate],
    )

    const duration = useMemo(() => getDuration(timeSpent, true), [timeSpent])

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
        <Td fontWeight="500">{name}</Td>
        <Td>{dueDateMemo}</Td>
        <Td>{priority}</Td>
        <Td>{duration}</Td>
      </Tr>
    )
  },
)

export default TaskRow
