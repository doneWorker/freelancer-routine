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
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { Project } from "../models/Project";

interface ProjectModalProps {
  type: "new" | "edit";
  isOpen: boolean;
  onClose: () => void;
  data?: Partial<Project>;
}

const ProjectModal = ({ isOpen, onClose, type, data }: ProjectModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("dashboard.ADD_NEW")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={3}>
            <FormControl>
              <FormLabel>{t("common.NAME")}</FormLabel>
              <Input />
            </FormControl>
            <FormControl>
              <FormLabel>{t("common.DESCRIPTION")}</FormLabel>
              <Textarea />
            </FormControl>
            <FormControl>
              <FormLabel>{t("forms.project.EARNING_TYPE")}</FormLabel>
              <Select>
                <option>{t("forms.project.EARN_HOURLY")}</option>
                <option>{t("forms.project.EARN_ENTIRE_PROJECT")}</option>
                <option>{t("forms.project.EARN_NOTHING")}</option>
              </Select>
            </FormControl>
          </Stack>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
