import { KeyboardEventHandler, useState } from 'react'
import {
  HStack,
  Text,
  Box,
  Input,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react'

import { TaskTag } from 'models/Task'

interface Props {
  tags: TaskTag[]
  onAdd: (tag: Partial<TaskTag>) => void
  onRemove: (id: string) => void
}

const defaultTags: TaskTag[] = [
  { id: '1', name: 'bug-fix', color: 'red' },
  { id: '2', name: 'BE', color: 'blue' },
  { id: '3', name: 'FE', color: 'green' },
]

const TagsInput: React.FC<Props> = ({ tags, onAdd, onRemove }) => {
  const [list, setList] = useState<TaskTag[]>(defaultTags)

  const handleClick = () => {}

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      setList((list) => [
        ...list,
        {
          name: e.currentTarget.value,
          color: 'blue',
          id: Math.random().toString(),
        },
      ])
      e.currentTarget.value = ''
    } else if (e.key === 'Backspace') {
      e.currentTarget.value.length === 0 &&
        setList((list) => list.filter((_, idx) => idx !== list.length - 1))
    }
  }

  return (
    <Box borderWidth={1} p={2} borderRadius="lg" onClick={handleClick}>
      <HStack spacing={2} overflow="auto">
        <Text>Tags: </Text>
        {list.map((li) => (
          <Tag
            key={li.id}
            size="md"
            variant="solid"
            color="#fff"
            flexShrink={0}
            backgroundColor={li.color}
          >
            <TagLabel>{li.name}</TagLabel>
            <TagCloseButton />
          </Tag>
        ))}
        <Input w="auto" variant="unstyled" onKeyDown={handleKeyDown} />
      </HStack>
    </Box>
  )
}

export default TagsInput
