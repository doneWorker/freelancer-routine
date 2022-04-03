import { Box, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

import LanguageSwitcher from '../components/LanguageSwitcher'

type Props = {
  isAbsolute?: boolean
}

const Header: React.FC<Props> = ({ isAbsolute = false }) => {
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
          <Button>Dashboard</Button>
        </Link>
      </nav>
      <LanguageSwitcher />
    </Box>
  )
}

export default Header
