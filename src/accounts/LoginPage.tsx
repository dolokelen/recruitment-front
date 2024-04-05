import { Text, Link, Box } from "@chakra-ui/react";
import { blue500, red500 } from "../colors";
import { MyButton, MyHeading, MyInput } from "../MyFormComponents";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/useLogin";
import styles from "../styles";

const schema = z.object({
  email: z
    .string()
    .min(3, { message: "Email is required." })
    .email("This is not a valid email address."),
  password: z
    .string()
    .min(8, { message: "Password cannot be less than 8 characters." }),
});

export type LoginFormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const { handleLogin, error } = useLogin();
  const onSubmit = (data: LoginFormData) => handleLogin(data);

  const HTTP_401_UNAUTHORIZED = "Request failed with status code 401";
  const HTTP_401_RESPONSE =
    "No active account found with the given credentials";
  const marginButton = 4;

  return (
    <Box sx={styles.loginWrapper}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MyHeading>Login Form</MyHeading>
        {error === HTTP_401_UNAUTHORIZED ? (
          <Box color={red500} mb={marginButton}>
            {HTTP_401_RESPONSE}
          </Box>
        ) : (
          <Box mb={marginButton} color={red500}>
            {error}
          </Box>
        )}

        <MyInput
          label="Email"
          type="text"
          register={register("email")}
          errorMessage={errors.email && errors.email.message}
        />

        <MyInput
          label="Password"
          type="password"
          register={register("password")}
          errorMessage={errors.password && errors.password.message}
        />

        <MyButton label="Login" />

        <Text color={blue500} sx={styles.resetPwdLinkFontSize}>
          <Link>Forget Your Password?</Link>
        </Text>
      </form>
    </Box>
  );
};

export default LoginForm;
