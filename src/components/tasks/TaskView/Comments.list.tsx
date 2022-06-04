import React from 'react'
import { List } from '@chakra-ui/react'

import { Comment } from 'models/Comment'
import CommentItem from './Comment.item'

type Props = {
  list: Comment[]
}

const CommentsList: React.FC<Props> = ({ list }) => {
  console.log('rerendered')

  return (
    <List>
      {list.map((comment) => (
        <CommentItem key={comment.id} {...comment} />
      ))}
    </List>
  )
}

export default CommentsList
