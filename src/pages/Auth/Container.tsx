/* eslint-disable */
import React from 'react'
import { Box, Grid, Image } from '@chakra-ui/react'

import logo from './auth-logo.png'

const CopyRight = () => (
  <span
    style={{ position: 'absolute', bottom: 5, width: '50vw', textAlign: 'center' }}
  >
    © {new Date().getFullYear()}All Right Reserved
  </span>
)

const Container: React.FC = ({ children }) => {
  return (
    <Grid templateColumns="40vw 60vw" height="100vh">
      <Box
        background="white"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box w="50%">{children}</Box>
        <CopyRight />
      </Box>
      <Box
        bgGradient="linear(to-l, #484bf1, #91b3f9)"
        display="flex"
        justifyContent="center"
        alignItems="center"
        boxShadow="lg"
      >
        <Image src={logo} w="75%" m="auto" />
        <a
          style={{
            position: 'absolute',
            right: 10,
            bottom: 10,
            fontSize: 7,
            color: 'white',
          }}
          target="_blank"
          href="https://www.freepik.com/vectors/solution"
        >
          Solution vector created by vectorjuice - www.freepik.com
        </a>
      </Box>
    </Grid>
  )
}

export default Container
