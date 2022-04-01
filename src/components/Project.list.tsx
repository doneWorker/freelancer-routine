import { Project } from '../models/Project'
import ProjectCard from '../components/Project.card'
import ProjectModal from './Project.modal'
import { useTranslation } from 'react-i18next'
import { Box, Center, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'

interface ProjectsListProps {
  list: Project[]
}

const ProjectsList = ({ list }: ProjectsListProps) => {
  const { t } = useTranslation()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SimpleGrid minChildWidth="250px" spacing="10px">
        {list.map((li) => (
          <ProjectCard key={li.id} {...li} />
        ))}
        <Box
          p={5}
          height={150}
          borderWidth={2}
          borderStyle={'dotted'}
          borderRadius="lg"
          overflow="hidden"
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
      <ProjectModal type="new" isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default ProjectsList
