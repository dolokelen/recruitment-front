import { Text, Link, Box } from "@chakra-ui/react";
import { blue } from "./../colors";
import "./registration.css";
import { MyButton, MyHeading, MyInput } from "../MyFormComponents";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegistration } from "../hooks/useRegistration";
import { toast } from "react-toastify";

const schema = z
  .object({
    email: z
      .string()
      .min(3, { message: "Email is required." })
      .email("This is not a valid email address."),
    password: z
      .string()
      .min(8, { message: "Password cannot be less than 8 characters." }),
    confirm_password: z
      .string()
      .min(8, { message: "Password cannot be less than 8 charachers." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirm_password;
    },
    {
      message: "Passwords must match!",
      path: ["confirm_password"],
    }
  );

export type RegistrationFormData = z.infer<typeof schema>;

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
  });

  const onCreate = () => toast.success("Registration Executed Successfully!");
  const registration = useRegistration(onCreate, () => reset());
  const onSubmit = (data: RegistrationFormData) => registration.mutate(data);

  if (registration.isError)
    return <Text colorScheme="red">{registration.error.message}</Text>;

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <Box className="div" id="div">
        <MyHeading>Registration Form</MyHeading>

        <MyInput
          label="Email"
          type="text"
          id="input1"
          register={register("email")}
          errorMessage={errors.email && errors.email.message}
        />

        <MyInput
          label="Password"
          type="password"
          id="input2"
          register={register("password")}
          errorMessage={errors.password && errors.password.message}
        />

        <MyInput
          label="Confirm Password"
          type="password"
          id="input3"
          register={register("confirm_password")}
          errorMessage={
            errors.confirm_password && errors.confirm_password.message
          }
        />

        <MyButton type="submit" color={blue}>
          Register Now
        </MyButton>

        <Text color={blue}>
          Already Have An Account? <Link>Login</Link>
        </Text>
      </Box>
    </form>
  );
};

export default RegistrationForm;
