import { Box, Heading, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { useEditGroup, useGroup } from "../hooks/useGroups";
import { red, teal } from "../colors";
import { MyButton, MyInput } from "../MyFormComponents";
import MySpinner from "../components/MySpinner";
import styles from "../styles";
import { hasPermission } from "../utilities/hasPermissions";
import AccessDenyPage from "../pages/AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, {
    message: "Group name is required.",
  }),
});

export type GroupEditFormData = z.infer<typeof schema>;

const GroupEditForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GroupEditFormData>({ resolver: zodResolver(schema) });

  const { id } = useParams();
  const { data, error, isLoading } = useGroup(parseInt(id!));

  const mutation = useEditGroup(() => toast.success("Updated successfully."));
  const onSubmit = (name: GroupEditFormData) => {
    mutation.mutate({ ...name, id: data?.id! });
  };

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
    }
  }, [data, setValue]);

  const customerErrMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  if (!hasPermission("Can change group")) return <AccessDenyPage />;
  if (error) return <Text color={red}>{error.message}</Text>;
  if (isLoading) return <MySpinner />;

  return (
    <Box sx={styles.groupEditWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading sx={styles.groupEditHeading}>Edit {data?.name}</Heading>
        <MyInput
          label="Name"
          type="text"
          register={register("name")}
          errorMessage={errors.name && errors.name.message}
        >
          {customerErrMessage && <Text color={red}>{customerErrMessage}</Text>}
        </MyInput>
        <MyButton colorScheme={teal} label="Update" />
      </form>
    </Box>
  );
};

export default GroupEditForm;
