import React, { CSSProperties, useCallback } from 'react'
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { GrLanguage } from 'react-icons/gr'
import { ReactComponent as FlagRu } from 'flag-icons/flags/4x3/ru.svg'
import { ReactComponent as FlagEn } from 'flag-icons/flags/4x3/gb.svg'

interface Props {
  style?: CSSProperties
}

const LanguageSwitcher: React.FC<Props> = ({ style }) => {
  const { t, i18n } = useTranslation()

  const lang = i18n.language

  const setLang = useCallback(
    (newLang: string) => {
      i18n.changeLanguage(newLang)
    },
    [i18n],
  )

  return (
    <Box style={style || {}}>
      <Menu>
        <MenuButton
          display="flex"
          alignItems="center"
          as={Button}
          leftIcon={<GrLanguage />}
        >
          {t(lang)}
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => setLang('en')}>
            <FlagEn style={{ maxHeight: 18, marginRight: 10 }} />
            {t('en')}
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setLang('ru')}>
            <FlagRu style={{ maxHeight: 18, marginRight: 10 }} />
            {t('ru')}
          </MenuItem>
        </MenuList>
      </Menu>
    </Box>
  )
}

export default LanguageSwitcher
