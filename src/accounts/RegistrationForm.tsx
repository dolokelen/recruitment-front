import { Text, Link, Box } from "@chakra-ui/react";
import { blue } from "./../colors";
import "./registration.css";
import { MyButton, MyHeading, MyInput } from "../MyFormComponents";

const RegistrationForm = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <Box className="div" id="div">
      <MyHeading>Registration Form</MyHeading>

      <MyInput label="Email" name="" type="text">
        {false && <Text>Dynamic error message</Text>}
      </MyInput>

      <MyInput label="Password" name="password" type="password">
        {false && <Text>Dynamic error message</Text>}
      </MyInput>

      <MyInput label="Confirm Password" name="confirm_password" type="password">
        {false && <Text>Dynamic error message</Text>}
      </MyInput>

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
