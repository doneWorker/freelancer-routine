import React from 'react'
import {
  Box, Stack, HStack, Avatar, Text,
} from '@chakra-ui/react'

import { Comment } from 'models/Comment'

type Props = Partial<Comment>

const CommentItem: React.FC<Props> = ({ author, body }) => {
  const user = `${author?.firstName} ${author?.lastName}`

  return (
    <Stack spacing={3} p="0 12px">
      <HStack>
        <Box p="12px 0" w="50px">
          <Avatar size="sm" name="Kirill Anikin" src="https://bit.ly/kent-c-dodds" />
        </Box>
        <Box>
          <Text>{user}</Text>
          <Box
            w="100%"
            dangerouslySetInnerHTML={{ __html: body || '' }}
          />
        </Box>
      </HStack>
    </Stack>
  )
}

export default CommentItem
