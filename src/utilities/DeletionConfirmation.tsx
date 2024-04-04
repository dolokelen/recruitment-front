import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  ButtonProps,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import {
  alertDialogBody,
  alertDialogContentBG,
  alertDialogHeading,
  red,
  teal,
} from "../colors";

interface Props {
  entityId: number;
  entityName: number | string | undefined;
  label: string;
  baseWidth?: string;
  smWidth?: string;
  mdWidth?: string;
  onMutate: (entityId: number) => void;
}

const DeletionConfirmation: React.FC<Props & ButtonProps> = ({
  entityId,
  entityName,
  label,
  onMutate,
  baseWidth,
  smWidth,
  mdWidth
  
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  return (
    <>
      <Button
        isActive
        
        colorScheme={red}
        onClick={onOpen}

        w={{ base: baseWidth, sm: smWidth, md: mdWidth }}
      >
        {label}
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={alertDialogContentBG}>
            <AlertDialogHeader
              color={alertDialogHeading}
              fontSize="lg"
              fontWeight="bold"
            >
              <Heading as="h4">{entityName}</Heading>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Box color={alertDialogBody} as="span" fontWeight="bold">
                Are you sure you want to permanently delete {entityName}?
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                isActive
                colorScheme={teal}
                ref={cancelRef}
                onClick={onClose}
              >
                No
              </Button>
              <Button
                isActive
                type="submit"
                onClick={() => onMutate(entityId)}
                colorScheme={red}
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

export default DeletionConfirmation;
