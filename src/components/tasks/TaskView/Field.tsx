import React from 'react'
import { Box, HStack } from '@chakra-ui/react'

interface Props {
  text: string
  elem: any
}

const Field: React.FC<Props> = ({ text, elem }) => (
  <HStack>
    <Box p="12px 0" w="100px">
      {text}
    </Box>
    <Box p="12px 15px" w="100%">
      {elem}
    </Box>
  </HStack>
)

export default Field
