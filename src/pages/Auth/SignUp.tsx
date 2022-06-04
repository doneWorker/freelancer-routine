/* eslint-disable */
import React, { useState } from 'react'
import { Formik } from 'formik'
import {
  Box,
  Grid,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  InputRightElement,
  Stack,
  FormErrorMessage,
  Text,
} from '@chakra-ui/react'

import { SignUpSchema } from './validation'
import { signUpArgs } from 'types/common'
import { Link } from 'react-router-dom'

import logo from './auth-logo.png'
import Container from './Container'
import { useUserAction } from 'store/recoil/user.atom'

const SignUp: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { signUp } = useUserAction()

  const handleSubmit = async (values: signUpArgs, { setSubmitting }: any) => {
    const authResp = signUp(values)

    setSubmitting(false)
  }

  return (
    <Container>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Stack gap={1}>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  type="text"
                  value={values.firstName}
                  isRequired
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.firstName && touched.firstName && (
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  type="text"
                  value={values.lastName}
                  isRequired
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.lastName && touched.lastName && (
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={values.email}
                  isRequired
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <InputGroup size="md">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    isRequired
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {errors.password && touched.password && (
                  <FormErrorMessage>{errors.password}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                <Input
                  id="passwordConfirmation"
                  type="password"
                  isRequired
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
                )}
              </FormControl>
              <Button type="submit" width="100%" isLoading={isSubmitting}>
                Sign Up
              </Button>
              <Text>
                Or you can login{' '}
                <Link to="/signin" style={{ textDecoration: 'underline' }}>
                  here
                </Link>
              </Text>
            </Stack>
          </form>
        )}
      </Formik>
    </Container>
  )
}

export default SignUp
