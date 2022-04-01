import {
  Box,
  Heading,
  Divider,
  Tooltip,
  Text,
  Progress,
  Icon,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { Project } from '../models/Project'

import { BsClock, BsListTask } from 'react-icons/bs'
import { BiTask, BiDollar } from 'react-icons/bi'

const ProjectCard: React.FC<Project> = (project) => {
  const completePercentage =
    project.tasksCompleted && project.tasksTotal
      ? (project.tasksCompleted * 100) / project.tasksTotal
      : 0
  const { t } = useTranslation()

  return (
    <Box
      key={project.id}
      height={150}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Progress hasStripe value={completePercentage} h={1} />
      <Box p={6}>
        <Heading fontSize="m">{project.name}</Heading>
      </Box>
      <Box
        borderTopWidth="1px"
        height="40px"
        display="flex"
        justifyContent="space-evenly"
      >
        <Tooltip label={t('dashboard.TIME_SPENT')} fontSize="md">
          <Box
            cursor="help"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Icon as={BsClock} />
            <Text ml={2}>{project.timeSpent || '-'}</Text>
          </Box>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip label={t('dashboard.TASKS_TOTAL')} fontSize="md">
          <Box
            cursor="help"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Icon as={BsListTask} />
            <Text ml={2}>{project.tasksTotal}</Text>
          </Box>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip label={t('dashboard.TASKS_COMPLETED')} fontSize="md">
          <Box
            cursor="help"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Icon as={BiTask} />
            <Text ml={2}>{project.tasksCompleted}</Text>
          </Box>
        </Tooltip>
        <Divider orientation="vertical" />
        <Tooltip label={t('dashboard.MONEY_EARNED')} fontSize="md">
          <Box
            cursor="help"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Icon as={BiDollar} />
            <Text ml={2}>{project.moneyEarned || '-'}</Text>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default ProjectCard
