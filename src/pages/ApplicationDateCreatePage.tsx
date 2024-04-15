import { Text, Heading } from "@chakra-ui/react";
import { red } from "./../colors";
import { MyButton, MyInput } from "../MyFormComponents";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { useCreateApplicationDate } from "../hooks/useApplicationdate";
import styles from "../styles";

const schema = z.object({
  open_date: z.string().min(10, { message: "Opening date is required." }),
  close_date: z.string().min(10, { message: "Closing date is required." }),
});

export type ApplicationDateFormData = z.infer<typeof schema>;

const ApplicationDatePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationDateFormData>({
    resolver: zodResolver(schema),
  });

  const onCreate = () => toast.success("Success!");
  const mutate = useCreateApplicationDate(onCreate, () => reset());
  const onSubmit = (data: ApplicationDateFormData) => mutate.mutate(data);

  const errMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutate);

  return (
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

      <MyButton label="Submit" />
    </form>
  );
};

export default ApplicationDatePage;
