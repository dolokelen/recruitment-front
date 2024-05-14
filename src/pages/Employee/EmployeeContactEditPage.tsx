import { Container, Heading, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../utilities/httpErrorMessages";
import { red } from "../../colors";
import { useEffect } from "react";
import styles from "../../styles";
import { MyButtonWithIcon, MyInput } from "../../MyFormComponents";
import { useSearchParams } from "react-router-dom";
import {
  useEditEmployeeContact,
  useEmployeeContact,
} from "../../hooks/useEmpContacts";

const schema = z.object({
  phone: z.string().min(10, {
    message: "Phone number is required.",
  }),
  id: z.number().optional(),
});

export type EmpContactEditFormData = z.infer<typeof schema>;

const EmployeeContactEditPage = () => {
  const onUpdate = () => toast.success("Updated Successfully!");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmpContactEditFormData>({ resolver: zodResolver(schema) });

  const [params, _] = useSearchParams();
  const selectedEmpId = parseInt(localStorage.getItem("bugId")!);
  const contactId = parseInt(params.get("contactId")!);

  const { data: contact } = useEmployeeContact(selectedEmpId, contactId);

  const update = useEditEmployeeContact(selectedEmpId, onUpdate);
  const onSubmit = (data: EmpContactEditFormData) => {
    update.mutate({ ...data, id: contactId });
  };

  useEffect(() => {
    if (contact) setValue("phone", contact.phone);
  }, [contact, setValue]);

  const customErrMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(update);
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading sx={styles.groupCreateHeading}>Contact Edit Form</Heading>
          <MyInput
            label="Name"
            type="text"
            register={register("phone")}
            errorMessage={errors.phone && errors.phone.message}
          >
            {customErrMessage && <Text color={red}>{customErrMessage}</Text>}
          </MyInput>

          <MyButtonWithIcon label="Update" />
        </form>
      </Container>
    </>
  );
};

export default EmployeeContactEditPage;
