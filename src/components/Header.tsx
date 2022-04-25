import React, { memo } from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import LanguageSwitcher from 'components/LanguageSwitcher'

import { MdDashboard } from 'react-icons/md'

type Props = {
  isAbsolute?: boolean
  center?: React.ReactNode
}

const Header: React.FC<Props> = memo(({ isAbsolute = false, center = null }) => {
  const style = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 5px',
    height: 50,
    borderBottom: '1px solid #eee',
  }

  return (
    <Box as="header" position={isAbsolute ? 'absolute' : undefined} style={style}>
      <nav>
        <Link to="/">
          <Button display="flex" alignItems="center" leftIcon={<MdDashboard />}>
            Dashboard
          </Button>
        </Link>
      </nav>
      {center}
      <LanguageSwitcher />
    </Box>
  )
})

export default Header
