import React from 'react'
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

import { Clickable } from 'types/common'
import { Project } from 'models/Project'

import { BsClock, BsListTask } from 'react-icons/bs'
import { BiTask, BiDollar } from 'react-icons/bi'

type Props = Project & Clickable

const ProjectCard: React.FC<Props> = (props) => {
  const {
    id, tasksCompleted, tasksTotal, timeSpent, moneyEarned, name, onClick,
  } = props

  const completePercentage = tasksCompleted && tasksTotal ? (tasksCompleted * 100) / tasksTotal : 0
  const { t } = useTranslation()

  return (
    <Box
      key={id}
      height={150}
      cursor="pointer"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      transition="0.3s"
      _hover={{
        boxShadow: 'lg',
      }}
      onClick={onClick}
    >
      <Progress hasStripe value={completePercentage} h={1} />
      <Box p={6}>
        <Heading fontSize="m">{name}</Heading>
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
            <Text ml={2}>{timeSpent || '-'}</Text>
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
            <Text ml={2}>{tasksTotal || '-'}</Text>
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
            <Text ml={2}>{tasksCompleted || '-'}</Text>
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
            <Text ml={2}>{moneyEarned || '-'}</Text>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  )
}

export default ProjectCard
