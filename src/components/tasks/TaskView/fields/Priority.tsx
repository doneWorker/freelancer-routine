/* eslint-disable */
import React from 'react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

// TODO: move it into Priority model
const Priorities: Record<string, { name: string; color: string }> = {
  low: { name: 'Low', color: '#37a169' },
  medium: { name: 'Medium', color: '#ffa500' },
  high: { name: 'High', color: '#f50304' },
  critical: { name: 'Critical', color: '#f50304' },
}

type Props = {
  value: string
  onChange: (key: string, val: string) => void
}

const Priority: React.FC<Props> = ({ value, onChange }) => (
  <Menu>
    <MenuButton
      _active={{ textDecoration: 'underline' }}
      fontWeight={500}
      color={Priorities[value].color}
    >
      {Priorities[value].name}
    </MenuButton>
    <MenuList>
      {Object.keys(Priorities).map((key) => (
        <MenuItem
          key={key}
          fontWeight={500}
          color={Priorities[key].color}
          onClick={() => onChange('priority', key)}
        >
          {Priorities[key].name}
        </MenuItem>
      ))}
    </MenuList>
  </Menu>
)

export default Priority
