/* eslint-disable */
import React, { useMemo } from 'react'
import { Box, Stack, HStack, Avatar, Text, Tooltip, Icon } from '@chakra-ui/react'

import { Comment } from 'models/Comment'
import { formatDistance } from 'date-fns'

import { BiTrash, BiPencil } from 'react-icons/bi'

type Props = Partial<Comment> & { onDelete: () => void; onEdit: () => void }

const CommentItem: React.FC<Props> = (props) => {
  const { author, body, dateCreated, isEdited } = props
  const { onDelete, onEdit } = props

  console.log('comment is edited', isEdited)

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
            {isEdited && (
              <Text color="gray.500" ml={2}>
                | edited
              </Text>
            )}
          </Box>
          <Box w="100%" dangerouslySetInnerHTML={{ __html: body || '' }} />
          <Box position="absolute" right={0} bottom={0}>
            <Tooltip label="delete comment" fontSize="md">
              <Box
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => onDelete()}
              >
                <Icon as={BiTrash} />
              </Box>
              <Box
                cursor="pointer"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => onEdit()}
              >
                <Icon as={BiPencil} />
              </Box>
            </Tooltip>
          </Box>
        </Box>
      </HStack>
    </Stack>
  )
}

export default CommentItem
