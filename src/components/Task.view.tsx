import { useEffect, useState, useRef } from 'react'
import { Box, Stack, HStack, Input, Textarea, Button } from '@chakra-ui/react'

import { Task } from '../models/Task'

import { HiOutlineClock } from 'react-icons/hi'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { AiOutlinePlusCircle } from 'react-icons/ai'

type Props = Partial<Task> & {
  onTaskChange: (key: string, val: any) => void
}

const defaultFormState: Partial<Task> = {
  name: '',
  extLink: '',
  description: '',
}

const TaskView: React.FC<Props> = ({
  id,
  name,
  dateCreated,
  dateUpdated,
  timeSpent,
  onTaskChange,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [form, setForm] = useState<typeof defaultFormState>(defaultFormState)

  useEffect(() => {
    setTimeout(() => ref.current?.style && (ref.current.style.width = '50vw'), 100)
  }, [])

  const updateForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    let { name, value } = e.target

    onTaskChange(name, value)
  }

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
      <Box width={'50vw'} padding="0 1em">
        <HStack marginBottom={2} padding={'5px 0'}>
          <Button size="sm" leftIcon={<AiOutlinePlusCircle />}>
            Add tags
          </Button>
          <Button size="sm" leftIcon={<HiOutlineClock />}>
            Start
          </Button>
          <Button size="sm" leftIcon={<IoMdCheckmarkCircleOutline />}>
            Complete
          </Button>
        </HStack>
        <form ref={formRef} onChange={updateForm}>
          <Stack spacing={3} minHeight="100vh">
            <Input name="name" value={name} placeholder="Title" />
            <Input
              name="extLink"
              value={form.extLink}
              placeholder="Link to task(optional)"
            />
            <Textarea
              name="description"
              value={form.description}
              placeholder="Description"
            />
          </Stack>
        </form>
      </Box>
    </Box>
  )
}

export default TaskView
