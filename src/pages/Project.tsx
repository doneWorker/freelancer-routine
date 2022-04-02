import { useCallback, useEffect } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router'

import { fetchTasks, tasksSelector } from '../store/slices/tasksSlice'
import LanguageSwitcher from '../components/LanguageSwitcher'

import { useTicker } from '../hooks/useTicker'
import TaskCard from '../components/Task.card'

/*
 * Main Page
 */
const Project = () => {
  const tasks = useSelector(tasksSelector)
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { id } = useParams()

  useTicker(useCallback(() => {}, []))

  // hydrate
  useEffect(() => {
    if (id !== undefined) dispatch(fetchTasks(id))
  }, [dispatch, id])

  return (
    <>
      <LanguageSwitcher style={{ position: 'absolute', top: 5, right: 5 }} />
      <Container maxW="container.lg">
        <TableContainer>
          <Table>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Created at</Th>
                <Th>Updated at</Th>
                <Th isNumeric>multiply by</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tasks.list.map((task) => (
                <Tr>
                  <TaskCard key={task.id} {...task} onClick={() => {}} />
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export default Project
