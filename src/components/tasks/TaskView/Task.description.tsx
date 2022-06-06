/* eslint-disable */
import React, { memo, useEffect, useState } from 'react'
import { debounce } from 'lodash'
import classNames from 'classnames'
import ReactQuill from 'react-quill'
import 'quill-mention'

import { fetchSuggestions } from 'api/users'

import 'react-quill/dist/quill.snow.css'
import 'quill-mention/dist/quill.mention.css'
import './Task.description.scss'

let atValues: any = [
  { id: 1, value: 'Kirill Anikin' },
  { id: 2, value: 'Karim Benzema' },
]
let hashValues: any = []

const mention = {
  allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
  mentionDenotationChars: ['@', '#'],
  linkTarget: 'https://www.google.com',
  source: async function (searchTerm: string, renderList: any, mentionChar: any) {
    if (searchTerm === '') return []

    const users = await fetchSuggestions(searchTerm)
    if (!users) return []

    const list = (users.list as any).map((u: any) => ({
      id: u.id,
      value: `${u.firstName} ${u.lastName}`,
    }))

    renderList(list)
    // let values: any

    // if (mentionChar === '@') {
    //   values = atValues
    // } else {
    //   values = hashValues
    // }

    // if (searchTerm.length === 0) {
    //   renderList(values, searchTerm)
    // } else {
    //   const matches = []
    //   for (let i = 0; i < values.length; i++)
    //     if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase()))
    //       matches.push(values[i])
    //   renderList(matches, searchTerm)
    // }
  },
}

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

  const toolbar = ['bold', 'italic', 'underline', 'image']

  return (
    <div key={id}>
      <ReactQuill
        className={classNames('task-editor', { focused: focused })}
        placeholder={PLACEHOLDER}
        modules={{
          toolbar,
          mention,
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
