import {
  Box,
  Text,
  Button,
  Checkbox,
  Container,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "../../styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { red } from "../../colors";
import { useEditEmployeeImage } from "../../hooks/useEmployees";
import { hasPermission } from "../../utilities/hasPermissions";
import AccessDenyPage from "../AccessDenyPage";

const schema = z.object({
  scapegoat: z.boolean(), //To allow me use handleSubmit
});

export type Form = z.infer<typeof schema>;

const EmployeeProfileEditPage = () => {
  const { register, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
  });
  const selectedEmpId = localStorage.getItem("bugId");
  const onUpdate = () => toast.success("Updated Successfully!");
  const update = useEditEmployeeImage(onUpdate, parseInt(selectedEmpId!));
  const [imageFile, setImageFile] = useState<File | undefined>();
  
  if (!hasPermission("Can change employee")) return <AccessDenyPage />;

  function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    const selectedFile = target.files[0];

    if (selectedFile) setImageFile(selectedFile);
  }

  const onSubmit = () => {
    const formData = new FormData();

    imageFile && formData.append("image", imageFile);

    if (!formData.get("image")) return toast.error("Your photo is missing!");
    update.mutate(formData);
  };

  const errorMessage =
    update.error?.message === "Request failed with status code 400"
      ? "File size cannot be larger than 300KB"
      : update.error?.message;

  return (
    <Container>
      <Heading sx={styles.groupCreateHeading}>
        Employee Biodata Edit Form
      </Heading>
      {update.isError && <Text color={red}>{errorMessage}</Text>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={4}>
          <FormLabel htmlFor="image" sx={labelStyle}>
            Select New Picture
          </FormLabel>
          <Input
            onChange={handleImageChange}
            name="image"
            type="file"
            id="image"
          />
        </Box>

        {/* Tradeoff: scapegoat enables the use of hook form!*/}
        <Checkbox display="none" {...register("scapegoat")}>
          display is none?
        </Checkbox>

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

export default EmployeeProfileEditPage;

const labelStyle = {
  fontSize: 20,
  color: "gray.400",
};
