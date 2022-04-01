import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
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
import { create } from "../store/slices/projectsSlice";

interface ProjectModalProps {
  type: "new" | "edit";
  isOpen: boolean;
  onClose: () => void;
  data?: Partial<Project>;
}

const ProjectModal = ({ isOpen, type, data, onClose }: ProjectModalProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const handleCreate = () => {
    // dispatch(create({ name: "New project" }));
  };

  // form
  useEffect(() => {
    setTimeout(() => console.dir(formRef.current), 2_000);
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t("dashboard.ADD_NEW")}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form ref={formRef}>
            <Stack spacing={3}>
              <FormControl>
                <FormLabel>{t("common.NAME")}</FormLabel>
                <Input name="name" />
              </FormControl>
              <FormControl>
                <FormLabel>{t("common.DESCRIPTION")}</FormLabel>
                <Textarea name="description" />
              </FormControl>
              <FormControl>
                <FormLabel>{t("forms.project.EARNING_TYPE")}</FormLabel>
                <Select name="payment_type">
                  <option>{t("forms.project.EARN_HOURLY")}</option>
                  <option>{t("forms.project.EARN_ENTIRE_PROJECT")}</option>
                  <option>{t("forms.project.EARN_NOTHING")}</option>
                </Select>
              </FormControl>
            </Stack>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleCreate}>
            {t("forms.CREATE")}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t("forms.CLOSE")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProjectModal;
