import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

interface Props {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

const AddPeriodModal: React.FC<Props> = ({ isOpen, onClose, onAdd }) => {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add period</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onAdd}>
            {t('forms.ADD')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('forms.CLOSE')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default AddPeriodModal
