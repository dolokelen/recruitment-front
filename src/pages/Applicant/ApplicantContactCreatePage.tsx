import {
  Box,
  Checkbox,
  Container,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../utilities/httpErrorMessages";
import { red } from "../../colors";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect } from "react";
import styles from "../../styles";
import { MyButtonWithIcon } from "../../MyFormComponents";
import { useCreateAppContacts } from "../../hooks/useApplicantContact";
import getUserId from "../../utilities/getUserId";

const contactSchema = z.object({
  phone: z.string().min(10, {
    message: "Phone number is required.",
  }),
  applicant: z.number().optional(),
});

const schema = z.object({
  scapegoat: z.boolean(), //To allow nesting of group
  contacts: z.array(contactSchema),
});

export type AppContactCreateFormData = z.infer<typeof schema>;

const ApplicantContactCreatePage = () => {
  //I'm using the login userId, if admin will use this component
  //you should get the applicant id using the useParms

  const onCreate = () => toast.success("Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AppContactCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateAppContacts(onCreate, () => reset());
  const onSubmit = (data: AppContactCreateFormData) => {
    const contacts = data["contacts"].map((contact) => ({
      phone: contact.phone,
      applicant: getUserId()!,
    }));

    mutation.mutate(contacts);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "contacts",
  });

  useEffect(() => {
    // two fields are appended instead of one!
    if (fields.length === 0) {
      append({ phone: "" });
    }
  }, []);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  return (
    <>
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading sx={styles.groupCreateHeading}>
            Contact Creation Form
          </Heading>

          {/* Tradeoff: scapegoat enables bulk create!*/}
          <Box display="none">
            <Checkbox {...register("scapegoat")}>display is none?</Checkbox>
            {errors.scapegoat && (
              <Text color={red}>{errors.scapegoat.message}</Text>
            )}
          </Box>

          {fields.map((group, index) => (
            <HStack key={group.id}>
              <Box sx={styles.groupCreateInputWrapper}>
                <FormLabel sx={styles.groupCreateInputLabel}>
                  Phone Number
                </FormLabel>
                <Input
                  {...register(`contacts.${index}.phone`)}
                  sx={styles.groupCreateInput}
                />
                {errors?.contacts?.[index]?.phone && (
                  <Text color={red}>
                    {errors.contacts[index]?.phone?.message}
                  </Text>
                )}
                {customErrorMessage && (
                  <Text color={red}>{customErrorMessage}</Text>
                )}
              </Box>

              <Box sx={styles.groupCreateIconWrapper}>
                <FiPlusCircle
                  onClick={() => append({ phone: "" })}
                  size={styles.groupCreatePlusIcon.size}
                  color={styles.groupCreatePlusIcon.color}
                />
              </Box>
              {fields.length > 1 && (
                <Box sx={styles.groupCreateIconWrapper}>
                  <MdOutlineRemoveCircleOutline
                    onClick={() => remove(index)}
                    size={styles.groupCreatePlusIcon.size}
                    color={styles.groupCreateRemoveIcon.color}
                  />
                </Box>
              )}
            </HStack>
          ))}

          <MyButtonWithIcon label="Create" />
        </form>
      </Container>
    </>
  );
};

export default ApplicantContactCreatePage;
