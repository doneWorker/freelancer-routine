/* eslint-disable */
import React, { useState } from 'react'
import { Box, Grid, Avatar, Button } from '@chakra-ui/react'
import ReactQuill from 'react-quill'
import classNames from 'classnames'

import './Comment.form.scss'

interface Props {
  isEditMode?: boolean
  commentBody?: string
  onSubmit(content: string): void
}

const PLACEHOLDER = 'Leave a comment'
const toolbar = ['bold', 'italic', 'underline', 'image']

const CommentForm: React.FC<Props> = (props) => {
  const { isEditMode, commentBody } = props
  const { onSubmit } = props

  const [focused, setFocused] = useState<boolean>(false)
  const [content, setContent] = useState<string>(commentBody || '')

  const handleSubmit = () => {
    onSubmit(content)
    setContent('')
  }

  return (
    <Box
      w="100%"
      p="20px"
      position="relative"
      background="#edf2f6"
      borderTop="1px solid #a0aebf"
    >
      <Grid templateColumns="50px auto" gap={1} alignItems="center">
        <Avatar size="sm" />
        <ReactQuill
          className={classNames('comment-editor', { focused })}
          modules={{
            toolbar,
          }}
          style={{ whiteSpace: 'pre' }}
          placeholder={PLACEHOLDER}
          value={content}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={setContent}
        />
      </Grid>
      <Button
        size="sm"
        position="absolute"
        bottom="25px"
        right="25px"
        background="teal.500"
        color="white"
        display={focused ? 'block' : 'none'}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Box>
  )
}

export default CommentForm
