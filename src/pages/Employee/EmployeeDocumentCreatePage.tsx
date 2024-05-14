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
import { highestEducations } from "../../utilities/staticData";
import { useCreateEmployeeDocument } from "../../hooks/useEmpDocuments";

const schema = z.object({
  major: z.string().min(2, { message: "Major is required." }),
  manor: z.string().min(2, { message: "Manor is required." }),
  cgpa: z.string().min(1, { message: "Cumulative GPA is required." }),
  institution: z
    .string()
    .min(4, { message: "The document institution is required." }),
  country: z
    .string()
    .min(4, { message: "The country for this document is required." }),
  county: z
    .string()
    .min(4, { message: "The county for this document is required." }),
  qualification: z.string().min(3, { message: "Education level is required." }),
  graduation_year: z
    .number({ invalid_type_error: "Year of graduation is required." })
    .min(4, { message: "Graduation year is required." })
    .positive(),
});

export type EmpDocumentCreatePageData = z.infer<typeof schema>;

const EmployeeDocumentCreatePage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmpDocumentCreatePageData>({
    resolver: zodResolver(schema),
  });

  const [resume, setResume] = useState<File | undefined>();
  const [degree, setDegree] = useState<File | undefined>();
  const [appLetter, setApplicationLetter] = useState<File | undefined>();
  const [commLetter, setCommunityLetter] = useState<File | undefined>();
  const [refLetter, setReferenceLetter] = useState<File | undefined>();

  const onCreate = () => toast.success("Submitted Successfully!");
  const create = useCreateEmployeeDocument(onCreate, () => reset());
  const selectedEmpId = localStorage.getItem("bugId")!;

  function handleResumeChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setResume(selectedFile);
  }

  function handleDegreeChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setDegree(selectedFile);
  }

  function handleApplicationLetterChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setApplicationLetter(selectedFile);
  }

  function handleCommunityLetterChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setCommunityLetter(selectedFile);
  }

  function handleReferenceLetterChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setReferenceLetter(selectedFile);
  }

  const onSubmit = (data: EmpDocumentCreatePageData) => {
    const formData = new FormData();

    formData.append("employee", selectedEmpId);
    formData.append("institution", data.institution);
    formData.append("cgpa", data.cgpa);
    formData.append("country", data.country);
    formData.append("county", data.county);
    formData.append("major", data.major);
    formData.append("manor", data.manor);
    formData.append("qualification", data.qualification);
    formData.append("graduation_year", data.graduation_year.toString());
    resume && formData.append("resume", resume);
    degree && formData.append("degree", degree);
    appLetter && formData.append("application_letter", appLetter);
    commLetter && formData.append("community_letter", commLetter);
    refLetter && formData.append("reference_letter", refLetter);

    if (
      !formData.get("resume") ||
      !formData.get("degree") ||
      !formData.get("application_letter") ||
      !formData.get("community_letter") ||
      !formData.get("reference_letter")
    )
      return toast.error("One or more documents migth be missing!");
    create.mutate(formData);
  };

  const marginButton = 4;

  return (
    <Container>
      <Heading sx={styles.groupCreateHeading}>
        Employee Documents Upload Form
      </Heading>
      {create.isError && <Text color={red}>{create.error.message}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyInput
          label="Institution Name"
          type="text"
          register={register("institution")}
          errorMessage={errors?.institution && errors.institution.message}
        />

        <MyInput
          label="Major"
          type="text"
          register={register("major")}
          errorMessage={errors?.major && errors.major.message}
        />

        <MyInput
          label="Manor"
          type="text"
          register={register("manor")}
          errorMessage={errors?.manor && errors.manor.message}
        />

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
        <MyInput
          label="Cumulative GPA"
          type="text"
          register={register("cgpa")}
          errorMessage={errors?.cgpa && errors.cgpa.message}
        />
        <MyInput
          label="Country of Study"
          type="text"
          register={register("country")}
          errorMessage={errors?.country && errors.country.message}
        />

        <MyInput
          label="County/State of Study"
          type="text"
          register={register("county")}
          errorMessage={errors?.county && errors.county.message}
        />

        <MyInput
          label="Year of Graduation"
          type="number"
          register={register("graduation_year", {
            valueAsNumber: true,
          })}
          errorMessage={
            errors?.graduation_year && errors.graduation_year.message
          }
        />
        <Box mb={marginButton}>
          <FormLabel htmlFor="degree" sx={labelStyle}>
            Academic Degree
          </FormLabel>
          <Input
            onChange={handleDegreeChange}
            name="degree"
            type="file"
            id="degree"
          />
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="resume" sx={labelStyle}>
            Resume
          </FormLabel>
          <Input
            onChange={handleResumeChange}
            name="resume"
            type="file"
            id="resume"
          />
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="application_letter" sx={labelStyle}>
            Application Letter
          </FormLabel>
          <Input
            onChange={handleApplicationLetterChange}
            name="application_letter"
            type="file"
            id="application_letter"
          />
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="reference_letter" sx={labelStyle}>
            Reference Letter
          </FormLabel>
          <Input
            onChange={handleReferenceLetterChange}
            name="reference_letter"
            type="file"
            id="reference_letter"
          />
        </Box>

        <Box mb={marginButton}>
          <FormLabel htmlFor="community_letter" sx={labelStyle}>
            Community Letter
          </FormLabel>
          <Input
            onChange={handleCommunityLetterChange}
            name="community_letter"
            type="file"
            id="community_letter"
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

export default EmployeeDocumentCreatePage;

const labelStyle = {
  fontSize: 20,
  color: "gray.400",
};
