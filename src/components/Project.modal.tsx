import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

import { PaymentType, Project } from 'models/Project'
import { createProject } from 'store/slices/projectsSlice'

type ModalType = 'new' | 'edit'

interface Props {
  type: ModalType
  isOpen: boolean
  onClose: () => void
  data?: Partial<Project>
}

type ProjectForm = HTMLFormElement &
  {
    [K in keyof Project]: HTMLInputElement | HTMLTextAreaElement
  }

const defaultFormState: Partial<Project> = {
  name: '',
  paymentType: PaymentType.NotSpecify,
  description: '',
  hourlyRate: undefined,
}

const ProjectModal: React.FC<Props> = ({ isOpen, type, data, onClose }: Props) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const formRef = useRef<ProjectForm>(null)
  const [form, setForm] = useState<typeof defaultFormState>(defaultFormState)
  const showHourly: Boolean = form.paymentType === PaymentType.Hourly

  const handleClose = () => {
    setForm(defaultFormState)
    onClose()
  }

  const handleCreate = () => {
    dispatch(createProject(form))
    handleClose()
  }

  const updateForm = (e: React.ChangeEvent<HTMLFormElement>) => {
    let { name, value } = e.target

    setForm((form) => ({ ...form, [name]: value }))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t('dashboard.ADD_NEW')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form ref={formRef} onChange={updateForm}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>{t('common.NAME')}</FormLabel>
                <Input name="name" value={form.name} />
              </FormControl>
              <FormControl>
                <FormLabel>{t('common.DESCRIPTION')}</FormLabel>
                <Textarea name="description" value={form.description} />
              </FormControl>
              <FormControl>
                <FormLabel>{t('forms.project.EARNING_TYPE')}</FormLabel>
                <Select name="paymentType">
                  <option
                    selected={form.paymentType === PaymentType.Hourly}
                    value={PaymentType.Hourly}
                  >
                    {t('forms.project.EARN_HOURLY')}
                  </option>
                  <option
                    value={PaymentType.Project}
                    selected={form.paymentType === PaymentType.Project}
                  >
                    {t('forms.project.EARN_ENTIRE_PROJECT')}
                  </option>
                  <option
                    value={PaymentType.NotSpecify}
                    selected={form.paymentType === PaymentType.NotSpecify}
                  >
                    {t('forms.project.EARN_NOTHING')}
                  </option>
                </Select>
              </FormControl>
              <FormControl style={{ display: showHourly ? 'block' : 'none' }}>
                <FormLabel>{t('forms.project.HOURLY_RATE')}</FormLabel>
                <Input name="hourlyRate" type="number" value={form.hourlyRate} />
              </FormControl>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            {t('forms.CREATE')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('forms.CLOSE')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ProjectModal
