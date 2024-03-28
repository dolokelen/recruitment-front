import { Box, Text, Button, FormLabel, Input, Heading, Link } from "@chakra-ui/react";
import { blue } from "./../colors";
import "./registration.css";

const RegistrationForm = () => {
  return (
    <form>
      <Heading className="heading" id="heading">
        Registration Form
      </Heading>
      <Box id="input-box" className="input-box">
        <FormLabel>Email</FormLabel>
        <Input name="" type="" id="inpu" className="responsive" />
        {/* <Text>Dynamic error message</Text> */}
      </Box>
      <Box id="input-box" className="input-box">
        <FormLabel>Password</FormLabel>
        <Input name="" type="" id="inpu" className="responsive" />
        {/* <Text>Dynamic error message</Text> */}
      </Box>
      <Box id="input-box" className="input-box">
        <FormLabel>Confirm Password</FormLabel>
        <Input name="" type="" id="inpu" className="responsive" />
        {/* <Text>Dynamic error message</Text> */}
      </Box>
      <Button
        colorScheme={blue}
        type="button"
        id="inpu"
        className="responsive submit-btn"
      >
        Register Now
      </Button>
      <Text color={blue}>Already Have An Account? <Link>Login</Link></Text>
    </form>
  );
};

export default RegistrationForm;
