import {
  Box,
  Button,
  Container,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { red } from "../colors";
import { MyInput } from "../MyFormComponents";
import styles from "../styles";
import { useCreateApplication } from "../hooks/useApplicants";
import { counties, genders, religions } from "../utilities/staticData";

const schema = z.object({
  gender: z.string().min(1, { message: "Gender is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  birth_date: z
    .string()
    .min(10, { message: "Birth date is required. e.g:. 1847-01-22" }),
  county: z
    .string()
    .min(4, { message: "Applicant county of birth is required." }),
});

export type ApplicationFormData = z.infer<typeof schema>;

const ApplicantBiodataForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(schema),
  });

  const [imageFile, setImageFile] = useState<File | undefined>();

  const onCreate = () => toast.success("Registration Done Successfully!");
  const create = useCreateApplication(onCreate, () => reset());

  function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  const onSubmit = (data: ApplicationFormData) => {
    const formData = new FormData();

    formData.append("gender", data.gender);
    formData.append("birth_date", data.birth_date);
    formData.append("religion", data.religion);
    formData.append("county", data.county);

    imageFile && formData.append("image", imageFile);

    if (!formData.get("image")) return toast.error("Your photo is missing!");
    create.mutate(formData);
  };

  const marginButton = 4;

  return (
    <Container>
      <Heading sx={styles.groupCreateHeading}>Applicant Biodata Form</Heading>
      {create.isError && <Text color={red}>{create.error.message}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={marginButton}>
          <FormLabel htmlFor="gender" sx={labelStyle}>
            Gender
          </FormLabel>
          <Select {...register("gender")}>
            {genders?.map((gender) => (
              <option key={gender.name} value={gender.name}>
                {gender.name}
              </option>
            ))}
          </Select>
          {errors?.gender && <Text color={red}>{errors.gender.message}</Text>}
        </Box>

        <MyInput
          label="Birth Date"
          type="text"
          register={register("birth_date")}
          errorMessage={errors.birth_date && errors.birth_date.message}
        />

        <Box mb={marginButton}>
          <FormLabel htmlFor="county" sx={labelStyle}>
            County of Birth
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

        <Box mb={marginButton}>
          <FormLabel htmlFor="religion" sx={labelStyle}>
            Religion
          </FormLabel>
          <Select {...register("religion")}>
            {religions?.map((religion) => (
              <option key={religion.name} value={religion.name}>
                {religion.name}
              </option>
            ))}
          </Select>
          {errors?.religion && (
            <Text color={red}>{errors.religion.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="image" sx={labelStyle}>
            Applicant photo
          </FormLabel>
          <Input
            onChange={handleImageChange}
            name="image"
            type="file"
            id="image"
          />
        </Box>

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

export default ApplicantBiodataForm;

const labelStyle = {
  fontSize: 20,
  color: "gray.400",
};
