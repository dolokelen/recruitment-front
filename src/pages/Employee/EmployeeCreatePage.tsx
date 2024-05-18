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
import { red } from "../../colors";
import { MyInput } from "../../MyFormComponents";
import styles from "../../styles";
import {
  counties,
  employmentStatuses,
  genders,
  highestEducations,
  religions,
} from "../../utilities/staticData";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../../utilities/httpErrorMessages";
import { useCreateEmployee } from "../../hooks/useEmployees";
import { useEmployees } from "./../../hooks/useEmployees";
import { hasPermission } from "../../utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const userSchema = z.object({
  email: z
    .string()
    .min(5, { message: "Email is required." })
    .email("This is not a valid email address."),
  first_name: z.string().min(2, { message: "First name is required." }),
  last_name: z.string().min(2, { message: "Last name is required." }),
  // I'm creating default password at the backend
  //You can opt to include the is_active when updating employee
});

const schema = z.object({
  gender: z.string().min(1, { message: "Gender is required" }),
  religion: z.string().min(1, { message: "Religion is required" }),
  position: z.string().min(3, { message: "Position is required" }),
  employment: z.string().min(6, { message: "Type of employment is required" }),
  qualification: z
    .string()
    .min(6, { message: "Highest leve of education is required" }),
  salary: z
    .number({ invalid_type_error: "Monthly salary amount is required." })
    .min(3, { message: "Monthly salary amount is required" })
    .positive(),
  supervisor: z.number(),
  birth_date: z
    .string()
    .min(10, { message: "Birth date is required. e.g:. 1847-01-22" }),
  county: z
    .string()
    .min(4, { message: "Employee county of birth is required." }),
  user: userSchema,
});

export type EmployeeFormData = z.infer<typeof schema>;

const EmployeeCreatePage = () => {
  const { data: employees } = useEmployees();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
  });

  const [imageFile, setImageFile] = useState<File | undefined>();

  const onCreate = () => toast.success("Done Successfully!");
  const create = useCreateEmployee(onCreate, () => reset());

  function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  const onSubmit = (data: EmployeeFormData) => {
    const formData = new FormData();

    formData.append("email", data.user.email);
    formData.append("first_name", data.user.first_name);
    formData.append("last_name", data.user.last_name);
    formData.append("employment", data.employment);
    formData.append("position", data.position);
    formData.append("qualification", data.qualification);
    formData.append("salary", data.salary.toString());
    formData.append("supervisor", data.supervisor.toString());
    formData.append("gender", data.gender);
    formData.append("birth_date", data.birth_date);
    formData.append("religion", data.religion);
    formData.append("county", data.county);

    imageFile && formData.append("image", imageFile);

    if (!formData.get("image")) return toast.error("Your photo is missing!");
    create.mutate(formData);
  };

  const marginButton = 4;
  //Only for unique fields
  const customErrMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(create);

  if (!hasPermission("Can add employee")) return <AccessDenyPage />;
  return (
    <Container>
      <Heading sx={styles.groupCreateHeading}>Employee Biodata Form</Heading>
      {create.isError && <Text color={red}>{create.error.message}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          label="First Name"
          type="text"
          register={register("user.first_name")}
          errorMessage={
            errors.user?.first_name && errors.user.first_name.message
          }
        />
        <MyInput
          label="Last Name"
          type="text"
          register={register("user.last_name")}
          errorMessage={errors.user?.last_name && errors.user.last_name.message}
        />
        <MyInput
          placeholder="jdoe@doriamsoft.com"
          label="Email Address"
          type="text"
          register={register("user.email")}
          errorMessage={errors.user?.email && errors.user.email.message}
        >
          {customErrMessage && <Text color={red}>{customErrMessage}</Text>}
        </MyInput>
        <MyInput
          placeholder="Executive Director"
          label="Position"
          type="text"
          register={register("position")}
          errorMessage={errors?.position && errors.position.message}
        />
        <MyInput
          label="Salary"
          type="number"
          register={register("salary", { valueAsNumber: true })}
          errorMessage={errors?.salary && errors.salary.message}
        />
        <Box mb={marginButton}>
          <FormLabel htmlFor="employment" sx={labelStyle}>
            Type of Employment
          </FormLabel>
          <Select {...register("employment")}>
            {employmentStatuses?.map((status) => (
              <option key={status.name} value={status.name}>
                {status.name}
              </option>
            ))}
          </Select>
          {errors?.employment && (
            <Text color={red}>{errors.employment.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="qualification" sx={labelStyle}>
            Highest Level of Education
          </FormLabel>
          <Select {...register("qualification")}>
            {highestEducations?.map((edu) => (
              <option key={edu.name} value={edu.name}>
                {edu.name}
              </option>
            ))}
          </Select>
          {errors?.qualification && (
            <Text color={red}>{errors.qualification.message}</Text>
          )}
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="supervisor">Supervisor</FormLabel>
          <Select {...register("supervisor", { valueAsNumber: true })}>
            <option value={0}>---No Supervisor---</option>
            {employees?.map((employee) => (
              <option key={employee.user.id} value={employee.user.id}>
                {employee.user.full_name}
              </option>
            ))}
          </Select>
        </Box>

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
          placeholder="1847-01-22"
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
            Employee photo
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

export default EmployeeCreatePage;

const labelStyle = {
  fontSize: 20,
  color: "gray.400",
};
