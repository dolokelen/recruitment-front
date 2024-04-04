import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { red, teal } from "../colors";

interface Props {
  onDelete: () => void;
  entityName?: string;
  label: string;
  color?: string;
  selectedItem: number;
  mt?: number;
  p?: number;
  mdWidth?: string;
  baseWidth?: string;
  smWidth?: string;
}

const BulkDeleteButton = ({
  label,
  entityName,
  color,
  selectedItem,
  mt,
  p,
  mdWidth,
  baseWidth,
  smWidth,
  onDelete,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button 
      isActive 
      mt={mt}
      p={p}
      width={{base: baseWidth, sm: smWidth, md: mdWidth}}
      colorScheme={color ? color : red} 
      onClick={onOpen}
      >
        {label}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg="yellow.300">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              <Heading as="h4" color="#1A365D">
                {entityName ? entityName : "Caution! 💀"}
              </Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box as="span" color="#1A365D" fontWeight="bold">
                Are you sure you want to permanently delete {selectedItem}{" "}
                {entityName}?
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                isActive
                ref={cancelRef}
                onClick={onClose}
                colorScheme={teal}
              >
                No
              </Button>
              <Button
                isActive
                type="submit"
                onClick={onDelete}
                colorScheme={color ? color : red}
                ml={3}
              >
                Yes
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default BulkDeleteButton;
