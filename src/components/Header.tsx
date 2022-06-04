import React from 'react'
import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

import LanguageSwitcher from 'components/LanguageSwitcher'
import { userState } from 'store/recoil/user.atom'

import { MdDashboard } from 'react-icons/md'

type Props = {
  isAbsolute?: boolean
  center?: React.ReactNode
}

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: 50,
  padding: '0 5px',
  borderBottom: '1px solid #eee',
}

const Header: React.FC<Props> = ({ isAbsolute = false, center = null }) => {
  const user = useRecoilValue(userState)

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
      <span>{user.firstName}</span>
      <LanguageSwitcher />
    </Box>
  )
}

export default React.memo(Header)
