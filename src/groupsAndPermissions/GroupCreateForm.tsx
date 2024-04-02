import { Box, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateGroup } from "../hooks/useGroup";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { blue, red } from "../colors";
import { MyButton, MyHeading, MyInput } from "../MyFormComponents";
import { styles } from "../accounts/styles";

const schema = z.object({
  name: z.string().min(1, {
    message: "Group name is required",
  }),
});

export type GroupCreateFormData = z.infer<typeof schema>;
const GroupCreateForm = () => {
  const onCreate = () => toast.success("Group Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GroupCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateGroup(onCreate, () => reset());
  const onSubmit = (data: GroupCreateFormData) => {
    mutation.mutate(data);
  };

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);

  //   if (!hasPermission("Can add group")) return <AccessDenyPage />;

  return (
    <>
      <Box mx={styles.formWrapperMX} my={styles.formWrapperMY}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyHeading>Group Creating Form</MyHeading>
          <MyInput
            label="Name"
            register={register("name")}
            errorMessage={errors.name && errors.name.message}
          >
            {mutation.isError && <Text color={red}>{customErrorMessage}</Text>}
          </MyInput>

          <MyButton type="submit" colorScheme={blue}>
            Create Group
          </MyButton>
        </form>
      </Box>
    </>
  );
};

export default GroupCreateForm;
