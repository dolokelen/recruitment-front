import {
  Container,
  Heading,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { red } from "../colors";
import { useEffect } from "react";
import styles from "../styles";
import { MyButtonWithIcon, MyInput } from "../MyFormComponents";
import {
  useApplicantContact,
  useEditAppContact,
} from "../hooks/useApplicantContact";
import { useSearchParams } from "react-router-dom";

const schema = z.object({
  phone: z.string().min(10, {
    message: "Phone number is required.",
  }),
  id: z.number().optional(),
});

export type AppContactEditFormData = z.infer<typeof schema>;

const ApplicantContactEditPage = () => {
  //I'm using the login userId, if admin will use this component
  //you should get the applicant id using the useParms
  //   const formRef = useRef(null);
 
  const onUpdate = () => toast.success("Updated Successfully!");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AppContactEditFormData>({ resolver: zodResolver(schema) });

  const [params, _] = useSearchParams();
  const contactId = params.get("contactId");
  const { data: contact } = useApplicantContact(parseInt(contactId!));

  const update = useEditAppContact(onUpdate);
  const onSubmit = (data: AppContactEditFormData) => {
    update.mutate({ ...data, id: parseInt(contactId!) });
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

export default ApplicantContactEditPage;
