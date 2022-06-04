/* eslint-disable */
import React from 'react'
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react'
import { isToday, isPast } from 'date-fns'
import { DayPicker } from 'react-day-picker'

import { fromNow } from 'helpers/dateHelper'

import './DueDate.scss'
import 'react-day-picker/dist/style.css'

type Props = {
  value: string | undefined
  onChange: (key: string, val: string) => void
}

const getLabelColor = (date: Date | null) => {
  if (!date) return

  return isToday(date) ? 'green' : isPast(date) ? 'red' : 'black'
}

const DueDate: React.FC<Props> = ({ value, onChange }) => {
  const date: Date | null = value ? new Date(value) : null
  const label = date ? fromNow(date) : 'N/A'
  const labelColor = getLabelColor(date)

  const handleSelect = (d: Date) => {
    d && onChange('dueDate', d?.toString())
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Box color={labelColor} cursor="pointer" w={100}>
          {label}
        </Box>
      </PopoverTrigger>
      <PopoverContent w="auto" pt={2}>
        <PopoverCloseButton />
        <PopoverBody>
          <DayPicker
            className="due-date__picker"
            mode="single"
            selected={new Date()}
          />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default DueDate
