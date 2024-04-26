import { Text, Box, Heading } from "@chakra-ui/react";
import { blue500, red } from "./../colors";
import { MyButton, MyInput } from "../MyFormComponents";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegistration } from "../hooks/useRegistration";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { LOGIN_ROUTE } from "../cacheKeysAndRoutes";
import autoRouteToHome from "../utilities/getHomeRoute";
import styles from "../styles";

const schema = z
  .object({
    first_name: z.string().min(1, { message: "First name is require." }),
    last_name: z.string().min(1, { message: "Last name is require." }),
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
      const passwordPattern =
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[?@!&*%$.])[A-Za-z\d?@!&*%$.].{7,20}$/;
      return passwordPattern.test(values.password);
    },
    {
      message: "Password must contain at least any of these @!?.&*%$",
      path: ["password"],
    }
  )
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

  const errMessage = "This email is already registered with our system.";
  return (
    <Box sx={styles.registrationWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading sx={styles.registrationHeader}>Registration Form</Heading>

        <MyInput
          label="First Name"
          type="text"
          register={register("first_name")}
          errorMessage={errors.first_name && errors.first_name.message}
        />

        <MyInput
          label="Last Name"
          type="text"
          register={register("last_name")}
          errorMessage={errors.last_name && errors.last_name.message}
        />

        <MyInput
          label="Email"
          type="text"
          register={register("email")}
          errorMessage={errors.email && errors.email.message}
        >
          {registration.isError && <Text color={red}>{errMessage}</Text>}
        </MyInput>

        <MyInput
          label="Password"
          type="password"
          register={register("password")}
          errorMessage={errors.password && errors.password.message}
        />

        <MyInput
          label="Confirm Password"
          type="password"
          register={register("confirm_password")}
          errorMessage={
            errors.confirm_password && errors.confirm_password.message
          }
        />

        <MyButton label="Register Now" />

        <Text color={blue500} sx={styles.resetPwdLinkFontSize}>
          Already Have An Account?{" "}
          <Link to={autoRouteToHome() + LOGIN_ROUTE}>Login</Link>
        </Text>
      </form>
    </Box>
  );
};

export default RegistrationForm;
