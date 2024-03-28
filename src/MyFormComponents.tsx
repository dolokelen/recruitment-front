import { Box, Button, FormLabel, Input, Heading } from "@chakra-ui/react";
import { ReactNode } from "react";

interface HProps {
  children: ReactNode;
}

export const MyHeading = ({ children }: HProps) => {
  return (
    <Heading className="heading" id="heading">
      {children}
    </Heading>
  );
};

interface IProps {
  label: string;
  name: string;
  type?: string;
  children: ReactNode;
}

export const MyInput = ({ label, name, children, type = "text" }: IProps) => {
  return (
    <Box id="input-box-id" className="input-box-class">
      <FormLabel>{label}</FormLabel>
      <Input name={name} type={type} id="input-id" className="input-class" />
      {children}
    </Box>
  );
};

interface BProps {
  children: ReactNode;
  type: "submit" | "button";
  color: string;
}
export const MyButton = ({ children, type, color }: BProps) => {
  return (
    <Button colorScheme={color} type={type} id="btn-id" className="btn-class">
      {children}
    </Button>
  );
};
