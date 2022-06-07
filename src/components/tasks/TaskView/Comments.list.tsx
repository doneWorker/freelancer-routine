/* eslint-disable no-unused-vars */
import React from 'react'
import { List } from '@chakra-ui/react'

import { Comment } from 'models/Comment'
import CommentItem from './Comment.item'

type Props = {
  list: Comment[]
  onDelete: (id: string) => void
}

const CommentsList: React.FC<Props> = ({ list, onDelete }) => (
  <List>
    {list.map((comment) => (
      <CommentItem key={comment.id} {...comment} onDelete={() => onDelete(comment.id)} />
    ))}
  </List>
)

export default CommentsList
