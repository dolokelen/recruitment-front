import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Select,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { red } from "../colors";
import { MyInput } from "../MyFormComponents";
import styles from "../styles";
import { counties } from "../utilities/staticData";
import { useCreateApplicantAddress } from "../hooks/useApplicantAddress";
import getUserId from "../utilities/getUserId";

const schema = z.object({
  applicant: z.number().optional(),
  county: z
    .string()
    .min(4, { message: "Current County of Residance is required." }),
  district: z
    .number({
      invalid_type_error: "Current District of Residance is required.",
    })
    .min(1, { message: "Current District of Residance is required." })
    .positive(),
  community: z
    .string()
    .min(2, { message: "Current Community of Residance is required." }),
  house_address: z
    .string()
    .min(2, { message: "Current House Address is required." }),
});

export type AppAddressCreatePageData = z.infer<typeof schema>;

const ApplicantAddressCreatePage = () => {
  //getUserId() should be used if the user is an applicant [Applicant only]
  //Otherwise useParms() for geting the selected applicantId [Admin only]
  // Double submission will case unique constraint error [status=500] [applicantID]
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppAddressCreatePageData>({
    resolver: zodResolver(schema),
  });
  const create = useCreateApplicantAddress(
    () => toast.success("Done Successfully!"),
    () => reset()
  );

  //If Admin will use this get the ApplicantId from the useParms()
  const onSubmit = (data: AppAddressCreatePageData) => {
    create.mutate({ ...data, applicant: getUserId() });
  };

  const marginButton = 4;

  return (
    <Container>
      <Heading sx={styles.groupCreateHeading}>Application Address Form</Heading>
      {create.isError && <Text color={red}>{create.error.message}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={marginButton}>
          <FormLabel htmlFor="county" sx={labelStyle}>
            Current County of Residance
          </FormLabel>
          <Select {...register("county")}>
            {counties?.map((county) => (
              <option key={county.name} value={county.name}>
                {county.name}
              </option>
            ))}
          </Select>
          {errors?.county && <Text color={red}>{errors.county.message}</Text>}
        </Box>

        <MyInput
          label="Current District of Residance"
          type="number"
          register={register("district", { valueAsNumber: true })}
          errorMessage={errors?.district && errors.district.message}
        />

        <MyInput
          label="Current Community of Residance"
          type="text"
          register={register("community")}
          errorMessage={errors?.community && errors.community.message}
        />
        <MyInput
          label="Current House Address"
          type="text"
          register={register("house_address")}
          errorMessage={errors?.house_address && errors.house_address.message}
        />

        <Container>
          <Button
            type="submit"
            colorScheme="blue"
            isActive
            w={{ base: "inherit", sm: "auto" }}
          >
            Submit
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default ApplicantAddressCreatePage;

const labelStyle = {
  fontSize: 20,
  color: "gray.400",
};
