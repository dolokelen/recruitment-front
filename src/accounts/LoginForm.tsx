import { Text, Link, Box } from "@chakra-ui/react";
import { blue } from "./../colors";
import "./registration.css";
import { MyButton, MyHeading, MyInput } from "../MyFormComponents";

const LoginForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Box className="div" id="div">
        <MyHeading>Login Form</MyHeading>

        <MyInput label="Email" name="" type="text">
          {false && <Text>Dynamic error message</Text>}
        </MyInput>

        <MyInput label="Password" name="password" type="password">
          {false && <Text>Dynamic error message</Text>}
        </MyInput>

        <MyButton type="submit" color={blue}>
          Login
        </MyButton>

        <Text color={blue}>
          <Link>Forget Your Password?</Link>
        </Text>
      </Box>
    </form>
  );
};

export default LoginForm;
