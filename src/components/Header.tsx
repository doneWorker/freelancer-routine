import { Box } from '@chakra-ui/react'

import LanguageSwitcher from '../components/LanguageSwitcher'

type Props = {
  isAbsolute?: boolean
}

const Header: React.FC<Props> = ({ isAbsolute = false }) => {
  const style = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
    height: 50,
  }

  return (
    <Box as="header" position={isAbsolute ? 'absolute' : undefined} style={style}>
      <LanguageSwitcher style={{ margin: 5 }} />
    </Box>
  )
}

export default Header
