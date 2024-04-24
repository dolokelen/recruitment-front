import {
    Box,
    Button,
    Container,
    FormLabel,
    HStack,
    Heading,
    Input,
    Select,
    Text,
  } from "@chakra-ui/react";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useEffect, useState } from "react";
  import { useFieldArray, useForm } from "react-hook-form";
  import { toast } from "react-toastify";
  import { z } from "zod";
  import { red } from "../colors";
  import { MyInput } from "../MyFormComponents";
  import styles from "../styles";
  import { FiPlusCircle } from "react-icons/fi";
  import { MdOutlineRemoveCircleOutline } from "react-icons/md";
  import { useCreateApplication } from "../hooks/useApplicants";
  import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
  import {
    counties,
    genders,
    highestEducations,
    religions,
  } from "../utilities/staticData";
  
  const documentSchema = z.object({
    major: z.string().min(2, { message: "Major is required." }),
    manor: z.string().min(2, { message: "Manor is required." }),
    cgpa: z
      .number({ invalid_type_error: "Cumulative GPA is required" })
      .min(1, { message: "Cumulative GPA is required." }),
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
  
  const addressSchema = z.object({
    country: z.string().min(4, {
      message: "Applicant current country of address is required.",
    }),
    county: z.string().min(4, {
      message: "Applicant current county of address is required.",
    }),
    house_address: z.string().min(4, {
      message: "Applicant current house address is required.",
    }),
    district: z.number({ invalid_type_error: "District is required." }).min(1, {
      message: "Applicant district is required.",
    }),
    community: z.string().min(2, {
      message: "Applicant community is required.",
    }),
  });
  
  const contactSchema = z.object({
    phone: z.string().min(10, { message: "Phone number is required." }),
  });
  
  const schema = z.object({
    gender: z.string().min(1, { message: "Gender is required" }),
    religion: z.string().min(1, { message: "Religion is required" }),
    birth_date: z
      .string()
      .min(10, { message: "Birth date is required. e.g:. 1847-01-22" }),
    county: z
      .string()
      .min(4, { message: "Applicant county of birth is required." }),
    app_document: documentSchema,
    app_address: addressSchema,
    app_contact: z.array(contactSchema),
  });
  
  export type ApplicationFormData = z.infer<typeof schema>;
  
  const ApplicationForm = () => {
    const {
      register,
      handleSubmit,
      control,
      reset,
      formState: { errors },
    } = useForm<ApplicationFormData>({
      resolver: zodResolver(schema),
    });
  
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [resume, setResume] = useState<File | undefined>();
    const [degree, setDegree] = useState<File | undefined>();
    const [appLetter, setApplicationLetter] = useState<File | undefined>();
    const [commLetter, setCommunityLetter] = useState<File | undefined>();
    const [refLetter, setReferenceLetter] = useState<File | undefined>();
    const [policeClearance, setPoliceClearance] = useState<File | undefined>();
  
    const onCreate = () => toast.success("Registration Done Successfully!");
    const create = useCreateApplication(onCreate, () => reset());
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: "app_contact",
    });
  
    useEffect(() => {
      // two fields are appended instead of one!
      if (fields.length === 0) {
        append({ phone: "" });
      }
    }, []);
  
    function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      };
      const selectedFile = target.files[0];
  
      if (selectedFile) setImageFile(selectedFile);
    }
  
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
  
    function handlePoliceClearanceChange(e: React.FormEvent<HTMLInputElement>) {
      const target = e.target as HTMLInputElement & {
        files: FileList;
      };
      const selectedFile = target.files[0];
  
      if (selectedFile) setPoliceClearance(selectedFile);
    }
  
    const onSubmit = (data: ApplicationFormData) => {
      const formData = new FormData();
  
      // formData.append("app_document", JSON.stringify(data.app_document));
      formData.append('cgpa', data.app_document.cgpa.toString())
      formData.append('institution', data.app_document.institution)
      formData.append('country', data.app_document.country)
      formData.append('docCounty', data.app_document.county)
      formData.append('major', data.app_document.major)
      formData.append('manor', data.app_document.manor)
      formData.append('qualification', data.app_document.qualification)
      formData.append('graduation_year', data.app_document.graduation_year.toString())
  
      
      // formData.append("app_address", JSON.stringify(data.app_address));
      formData.append('community', data.app_address.community)
      formData.append('addrCountry', data.app_address.country)
      formData.append('addrCounty', data.app_address.county)
      formData.append('district', data.app_address.district.toString())
      formData.append('house_address', data.app_address.house_address)
  
  
      data.app_contact.forEach((contact) =>
        formData.append(`app_contact`, contact.phone)
      );
  
      formData.append("gender", data.gender);
      formData.append("birth_date", data.birth_date);
      formData.append("religion", data.religion);
      formData.append("county", data.county);
  
      imageFile && formData.append("image", imageFile);
      resume && formData.append("resume", resume);
      degree && formData.append("degree", degree);
      appLetter && formData.append("appLetter", appLetter);
      commLetter && formData.append("commLetter", commLetter);
      refLetter && formData.append("refLetter", refLetter);
      policeClearance && formData.append("policeClearance", policeClearance);
  
      if (
        !formData.get("image") ||
        !formData.get("resume") ||
        !formData.get("degree") ||
        !formData.get("appLetter") ||
        !formData.get("commLetter") ||
        !formData.get("refLetter") ||
        !formData.get("policeClearance")
      )
        return toast.error("One or more documents migth be missing!");
      create.mutate(formData);
    };
  
    const marginButton = 4;
    const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(create);
  
    return (
      <Container>
        <Heading sx={styles.groupCreateHeading}>Application Form</Heading>
        {create.isError && <Text color={red}>{create.error.message}</Text>}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Applicant Section */}
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
  
          {/* Document Section */}
          <MyInput
            label="Cumulative GPA"
            type="number"
            register={register("app_document.cgpa", { valueAsNumber: true })}
            errorMessage={
              errors.app_document?.cgpa && errors.app_document?.cgpa.message
            }
          />
  
          <MyInput
            label="Major"
            type="text"
            register={register("app_document.major")}
            errorMessage={
              errors.app_document?.major && errors.app_document?.major.message
            }
          />
  
          <MyInput
            label="Manor"
            type="text"
            register={register("app_document.manor")}
            errorMessage={
              errors.app_document?.manor && errors.app_document?.manor.message
            }
          />
  
          <MyInput
            label="Country of Study"
            type="text"
            register={register("app_document.country")}
            errorMessage={
              errors.app_document?.country && errors.app_document?.country.message
            }
          />
  
          <MyInput
            label="County/State of Study"
            type="text"
            register={register("app_document.county")}
            errorMessage={
              errors.app_document?.county && errors.app_document?.county.message
            }
          />
  
          <MyInput
            label="Institution Name"
            type="text"
            register={register("app_document.institution")}
            errorMessage={
              errors.app_document?.institution &&
              errors.app_document?.institution.message
            }
          />
  
          <Box mb={marginButton}>
            <FormLabel htmlFor="qualification" sx={labelStyle}>
              Highest Level of Education
            </FormLabel>
            <Select {...register("app_document.qualification")}>
              {highestEducations?.map((edu) => (
                <option key={edu.name} value={edu.name}>
                  {edu.name}
                </option>
              ))}
            </Select>
            {errors?.app_document?.qualification && (
              <Text color={red}>{errors.app_document.qualification.message}</Text>
            )}
          </Box>
  
          <MyInput
            label="Year of Graduation"
            type="number"
            register={register("app_document.graduation_year", {
              valueAsNumber: true,
            })}
            errorMessage={
              errors.app_document?.graduation_year &&
              errors.app_document?.graduation_year.message
            }
          />
  
          {/* Address Section */}
          <MyInput
            label="Current Country of Residence"
            register={register("app_address.country")}
            errorMessage={
              errors.app_address?.country && errors.app_address?.country.message
            }
          />
  
          <Box mb={marginButton}>
            <FormLabel htmlFor="county" sx={labelStyle}>
              Current County of Residence
            </FormLabel>
            <Select {...register("app_address.county")}>
              {counties?.map((county) => (
                <option key={county.name} value={county.name}>
                  {county.name}
                </option>
              ))}
            </Select>
            {errors?.app_address?.county && (
              <Text color={red}>{errors.app_address.county.message}</Text>
            )}
          </Box>
  
          <MyInput
            type="number"
            label="Current District of Residence"
            register={register("app_address.district", { valueAsNumber: true })}
            errorMessage={
              errors.app_address?.district && errors.app_address?.district.message
            }
          />
  
          <MyInput
            label="Current Community of Residence"
            register={register("app_address.community")}
            errorMessage={
              errors.app_address?.community &&
              errors.app_address?.community.message
            }
          />
  
          <MyInput
            label="Current House Address"
            register={register("app_address.house_address")}
            errorMessage={
              errors.app_address?.house_address &&
              errors.app_address?.house_address.message
            }
          />
  
          {/* Contact Section */}
          {fields.map((contact, index) => (
            <HStack key={contact.id}>
              <Box sx={styles.groupCreateInputWrapper}>
                <FormLabel sx={labelStyle}>Phone Number</FormLabel>
                <Input {...register(`app_contact.${index}.phone`)} />
                {errors?.app_contact?.[index]?.phone && (
                  <Text color={red}>
                    {errors.app_contact[index]?.phone?.message}
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
            <FormLabel htmlFor="appLetter" sx={labelStyle}>
              Application Letter
            </FormLabel>
            <Input
              onChange={handleApplicationLetterChange}
              name="appLetter"
              type="file"
              id="appLetter"
            />
          </Box>
          <Box mb={marginButton}>
            <FormLabel htmlFor="commLetter" sx={labelStyle}>
              Community Letter
            </FormLabel>
            <Input
              onChange={handleCommunityLetterChange}
              name="commLetter"
              type="file"
              id="commLetter"
            />
          </Box>
  
          <Box mb={marginButton}>
            <FormLabel htmlFor="refLetter" sx={labelStyle}>
              Reference Letter
            </FormLabel>
            <Input
              onChange={handleReferenceLetterChange}
              name="refLetter"
              type="file"
              id="refLetter"
            />
          </Box>
  
          <Box mb={marginButton}>
            <FormLabel htmlFor="policeClearance" sx={labelStyle}>
              Police Clearance
            </FormLabel>
            <Input
              onChange={handlePoliceClearanceChange}
              name="policeClearance"
              type="file"
              id="policeClearance"
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
  
  export default ApplicationForm;
  
  const labelStyle = {
    fontSize: 20,
    color: "gray.400",
  };
  