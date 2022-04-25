import {
  Box, Center, Heading, SimpleGrid, useDisclosure,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Project } from 'models/Project'
import ProjectCard from 'components/Project.card'
import ProjectModal from 'components/Project.modal'

interface ProjectsListProps {
  list: Project[]
}

const ProjectsList = ({ list }: ProjectsListProps) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleProjectClick = (id: string) => {
    navigate(`project/${id}`)
  }

  return (
    <>
      <SimpleGrid minChildWidth="250px" spacing="10px">
        {list.map((li) => (
          <ProjectCard
            key={li.id}
            onClick={() => handleProjectClick(li.id)}
            {...li}
          />
        ))}
        <Box
          p={5}
          height={150}
          borderWidth={2}
          borderStyle="dotted"
          borderRadius="lg"
          overflow="hidden"
          transition="0.3s"
          _hover={{
            cursor: 'pointer',
            background: 'gray.100',
            color: 'teal.500',
          }}
          onClick={onOpen}
        >
          <Center h="100%">
            <Heading fontSize="m">{t('dashboard.ADD_NEW')}</Heading>
          </Center>
        </Box>
      </SimpleGrid>
      <ProjectModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ProjectsList
