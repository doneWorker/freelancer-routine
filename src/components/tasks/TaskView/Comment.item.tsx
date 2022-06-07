/* eslint-disable */
import React, { useMemo } from 'react'
import { Box, Stack, HStack, Avatar, Text, Tooltip, Icon } from '@chakra-ui/react'

import { Comment } from 'models/Comment'
import { formatDistance } from 'date-fns'
import { BiTrash } from 'react-icons/bi'

type Props = Partial<Comment> & { onDelete: () => void }

const CommentItem: React.FC<Props> = (props) => {
  const { author, body, dateCreated } = props
  const { onDelete } = props

  const dateCreatedMemo = useMemo(
    () =>
      dateCreated &&
      formatDistance(new Date(dateCreated), new Date(), { addSuffix: false }),
    [dateCreated],
  )
  const displayName = `${author?.firstName} ${author?.lastName}`

  return (
    <Stack spacing={3} p="0 12px" mb="12px">
      <HStack position="relative">
        <Box p="12px 0" w="50px">
          <Avatar size="sm" name="Kirill Anikin" src="https://bit.ly/kent-c-dodds" />
        </Box>
        <Box>
          <Box display="flex">
            <Text fontWeight="500">{displayName}</Text>
            <Text color="gray.500" ml={2}>
              {dateCreatedMemo}
            </Text>
          </Box>
          <Box w="100%" dangerouslySetInnerHTML={{ __html: body || '' }} />
          <Tooltip label="delete comment" fontSize="md">
            <Box
              position="absolute"
              right={0}
              bottom={0}
              cursor="pointer"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              onClick={() => onDelete()}
            >
              <Icon as={BiTrash} />
            </Box>
          </Tooltip>
        </Box>
      </HStack>
    </Stack>
  )
}

export default CommentItem
