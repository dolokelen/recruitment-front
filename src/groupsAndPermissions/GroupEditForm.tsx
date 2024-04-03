import { Box, Text } from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { useEditGroup, useGroup } from "../hooks/useGroups";
import { red, teal } from "../colors";
import { styles } from "../accounts/styles";
import { MyButton, MyHeading, MyInput } from "../MyFormComponents";
import MySpinner from "../components/MySpinner";

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
  // if (!hasPermission("Can change group")) return <AccessDenyPage />;
  if (error) return <Text color={red}>{error.message}</Text>;
  if (isLoading) return <MySpinner />;
  
  return (
    <Box mx={4} my={styles.formWrapperMY}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyHeading>Edit {data?.name}</MyHeading>
        {/* <Box marginBottom={2}>
            <Input
              {...register("name")}
              type="text"
              size="md"
              placeholder="Enter school year"
            />
            {errors.name && <Text color="red">{errors.name.message}</Text>}
            {mutation.isError && <Text color="red">{customerErrMessage}</Text>}
          </Box> */}
        <MyInput
          label="Name"
          type="text"
          register={register("name")}
          errorMessage={errors.name && errors.name.message}
        >
          {customerErrMessage && <Text color={red}>{customerErrMessage}</Text>}
        </MyInput>
        {/* <Button mt={4} marginRight={6} type="submit" colorScheme={teal}>
            Update
          </Button> */}
        <MyButton w="20%" type="submit" colorScheme={teal}>
          Update
        </MyButton>
      </form>
    </Box>
  );
};

export default GroupEditForm;
