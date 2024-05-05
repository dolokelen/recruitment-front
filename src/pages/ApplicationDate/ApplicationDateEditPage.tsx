import { useParams } from "react-router-dom";
import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import {
  useApplicationDate,
  useDeleteApplicationDate,
  useEditApplicationDate,
} from "../../hooks/useApplicationdate";
import MySpinner from "../../components/MySpinner";
import { red } from "../../colors";
import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../../styles";
import { MyButton, MyInput } from "../../MyFormComponents";
import { toast } from "react-toastify";
import {
  deletionErrorMessage,
  http_400_BAD_REQUEST_CUSTOM_MESSAGE,
} from "../../utilities/httpErrorMessages";
import { hasPermission } from "../../utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  id: z.number().optional(),
  open_date: z.string().min(10, { message: "Opening date is required." }),
  close_date: z.string().min(10, { message: "Closing date is required." }),
});

export type ApplicationDateEditFormData = z.infer<typeof schema>;
const ApplicationDateEditPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ApplicationDateEditFormData>({
    resolver: zodResolver(schema),
  });

  const { id } = useParams();
  const iD = parseInt(id!);
  const { data: appData, error, isLoading } = useApplicationDate(iD);
  const mutation = useDeleteApplicationDate(() =>
    toast.success("Deletion successful!")
  );

  const onUpdate = () => toast.success("Update successful!");
  const mutate = useEditApplicationDate(onUpdate);
  const onSubmit = (data: ApplicationDateEditFormData) =>
    mutate.mutate({ ...data, id: appData?.id });

  const errMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutate);
  useEffect(() => {
    if (appData) {
      setValue("open_date", appData?.open_date);
      setValue("close_date", appData?.close_date);
    }
  }, [appData, setValue]);
  const canDeleteApplicationDate = hasPermission("Can delete application date");
  if (!hasPermission("Can change application date")) return <AccessDenyPage />;
  if (isLoading) return <MySpinner />;
  if (error) return <Text color={red}>{error.message}</Text>;
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading sx={styles.heading}>Application Dates Form</Heading>
        <MyInput
          label="Opening Date YYYY-MM-DD"
          type="text"
          register={register("open_date")}
          errorMessage={errors.open_date && errors.open_date.message}
        >
          {mutate.isError && <Text color={red}>{errMessage}</Text>}
        </MyInput>

        <MyInput
          label="Closing Date YYYY-MM-DD"
          type="text"
          register={register("close_date")}
          errorMessage={errors.close_date && errors.close_date.message}
        />

        <Flex
          justifyContent="space-between"
          display={{ base: "block", sm: "flex" }}
        >
          <MyButton label="Edit" />

          {canDeleteApplicationDate && (
            <Button
              sx={styles.deleteButton}
              isActive
              colorScheme={red}
              type="submit"
              mt={{ base: 8, sm: 2 }}
              onClick={() => {
                mutation.mutate(iD);
                mutation.isError && toast.error(deletionErrorMessage());
              }}
            >
              Delete
            </Button>
          )}
        </Flex>
      </form>
    </Container>
  );
};

export default ApplicationDateEditPage;
