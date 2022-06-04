/* eslint-disable */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Formik } from 'formik'
import {
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

import { useUserAction } from 'store/recoil/user.atom'
import { SignInSchema } from './validation'
import * as api from 'api/auth'
import Container from './Container'

import logo from './auth-logo.png'

interface FormFields {
  email: string
  password: string
}

// type FormErrors = Partial<FormFields>

const SignIn: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { signIn } = useUserAction()

  const handleSubmit = async (values: FormFields, { setSubmitting }: any) => {
    const authResp = signIn(values.email, values.password)

    setSubmitting(false)
  }

  return (
    <Container>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={SignInSchema}
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
            <Stack gap={3}>
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
                    current-password
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
              <Button type="submit" width="100%" isLoading={isSubmitting}>
                Sign In
              </Button>
              <Text>
                Or you can sign up{' '}
                <Link to="/signup" style={{ textDecoration: 'underline' }}>
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

export default SignIn
