/* eslint-disable no-unused-vars */
import React from 'react'
import { Textarea, Input } from '@chakra-ui/react'

type Props = {
  name?: string
  onChange: (key: string, value: string) => void
}

const TaskTitle: React.FC<Props> = ({ name = '', onChange }) => (
  <Input
    variant="unstyled"
    name="name"
    value={name}
    placeholder="Title"
    fontSize="2em"
    onChange={(e) => onChange('name', e.target.value)}
  />
)

export default TaskTitle
