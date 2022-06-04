/* eslint-disable */
import React, { memo, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import classNames from 'classnames'
import ReactQuill from 'react-quill'

import 'react-quill/dist/quill.snow.css'
import './Task.description.scss'

type Props = {
  description?: string
  onChange: (key: string, val: string) => void
}

const PLACEHOLDER = 'Add more information about your task here'

const TaskDescription: React.FC<Props> = ({ description = '', onChange }) => {
  const debouncedOnChange = debounce(onChange, 1_000)
  const [id, setId] = useState<number>(Math.random())
  const [focused, setFocused] = useState<boolean>(false)

  const handleChange = (v: string) => {
    debouncedOnChange('description', v)
  }

  useEffect(() => {
    setId(Math.random())
  }, [onChange])

  return (
    <div key={id}>
      <ReactQuill
        className={classNames('task-editor', { focused: focused })}
        placeholder={PLACEHOLDER}
        modules={{
          toolbar: ['bold', 'italic', 'underline', 'image'],
        }}
        defaultValue={description}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={handleChange}
      />
    </div>
  )
}

export default memo(TaskDescription)
