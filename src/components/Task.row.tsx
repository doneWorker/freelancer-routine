import {
  Container,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'

import { Clickable } from '../types/common'
import { Task } from '../models/Task'

type Props = Task & Clickable

const TaskCard: React.FC<Props> = ({ name, dateCreated, timeSpans }) => {
  return (
    <Tr>
      <Td></Td>
      <Td>millimetres (mm)</Td>
      <Td isNumeric>25.4</Td>
    </Tr>
  )
}

export default TaskCard
