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
import { red } from "../../colors";
import { MyInput } from "../../MyFormComponents";
import styles from "../../styles";
import { counties } from "../../utilities/staticData";
import { useEffect } from "react";
import {
  useEditEmployeeAddress,
  useEmployeeAddress,
} from "../../hooks/useEmpAddress";

const schema = z.object({
  employee: z.number().optional(),
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

export type EmpAddressEditFormData = z.infer<typeof schema>;

const EmployeeAddressEditPage = () => {
  const selectedEmpId = parseInt(localStorage.getItem("bugId")!);
  const { data: address } = useEmployeeAddress(selectedEmpId);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EmpAddressEditFormData>({
    resolver: zodResolver(schema),
  });
  const update = useEditEmployeeAddress(() =>
    toast.success("Updated Successfully!")
  );

  useEffect(() => {
    if (address) {
      setValue("county", address.county);
      setValue("district", address.district);
      setValue("community", address.community);
      setValue("house_address", address.house_address);
    }
  }, [address, selectedEmpId]);

  const onSubmit = (data: EmpAddressEditFormData) => {
    update.mutate({ ...data, employee: selectedEmpId });
  };

  const marginButton = 4;

  return (
    <Container>
      <Heading sx={styles.groupCreateHeading}>
        Employee Address Update Form
      </Heading>
      {update.isError && <Text color={red}>{update.error.message}</Text>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={marginButton}>
          <FormLabel htmlFor="county" sx={labelStyle}>
            Current County of Residance
          </FormLabel>
          <Select {...register("county")}>
            <option value={address?.county}>{address?.county}</option>

            {counties?.map((county) =>
              county.name !== address?.county ? (
                <option key={county.name} value={county.name}>
                  {county.name}
                </option>
              ) : (
                county.name
              )
            )}
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
            Update Address
          </Button>
        </Container>
      </form>
    </Container>
  );
};

export default EmployeeAddressEditPage;

const labelStyle = {
  fontSize: 20,
  color: "gray.400",
};
