import {
  Box,
  Button,
  Checkbox,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateGroup } from "../hooks/useGroups";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { blue, plusIcon, red } from "../colors";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect } from "react";
import { styles } from "../accounts/styles";
import { MyHeading } from "../MyFormComponents";
import GroupList from "./GroupList";

const groupSchema = z.object({
  name: z.string().min(1, {
    message: "Group name is required",
  }),
});

const schema = z.object({
  scapegoat: z.boolean(), //To allow nesting of group
  groups: z.array(groupSchema),
});

type GroupCreateFormData = z.infer<typeof schema>;

const GroupCreateForm = () => {
  const onCreate = () => toast.success("Group Created Successfully!");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<GroupCreateFormData>({ resolver: zodResolver(schema) });

  const mutation = useCreateGroup(onCreate, () => reset());
  const onSubmit = (data: GroupCreateFormData) => {
    mutation.mutate(data["groups"]);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "groups",
  });

  useEffect(() => {
    // two fields are appended instead of one!
    if (fields.length === 0) {
      append({ name: "" });
    }
  }, []);

  const customErrorMessage = http_400_BAD_REQUEST_CUSTOM_MESSAGE(mutation);
  const iconSize = "1rem";
  //   if (!hasPermission("Can add group")) return <AccessDenyPage />;

  return (
    <Box display={{ md: "flex" }} justifyContent="space-evenly">
      <Box mx={4} my={styles.formWrapperMY}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MyHeading>Group Creation Form</MyHeading>

          {/* Tradeoff: scapegoat enables bulk create!*/}
          <Box display="none">
            <Checkbox {...register("scapegoat")}>display is none?</Checkbox>
            {errors.scapegoat && (
              <Text color={red}>{errors.scapegoat.message}</Text>
            )}
          </Box>

          {fields.map((group, index) => (
            <HStack key={group.id}>
              <Box my={4} w="100%">
                <FormLabel fontSize={20}>Name</FormLabel>
                <Input
                  {...register(`groups.${index}.name`)}
                  size={{ base: "sm", sm: "md" }}
                  borderRadius={{ base: 8 }}
                  border="1px solid skyblue"
                />
                {errors?.groups?.[index]?.name && (
                  <Text color={red}>{errors.groups[index]?.name?.message}</Text>
                )}
                {customErrorMessage && (
                  <Text color={red}>{customErrorMessage}</Text>
                )}
              </Box>

              <Box mt={5} style={styles._hover}>
                <FiPlusCircle
                  onClick={() => append({ name: "" })}
                  size={iconSize}
                  color={plusIcon}
                />
              </Box>
              {fields.length > 1 && (
                <Box mt={5} style={styles._hover}>
                  <MdOutlineRemoveCircleOutline
                    onClick={() => remove(index)}
                    size={iconSize}
                    color={red}
                  />
                </Box>
              )}
            </HStack>
          ))}

          <Button
            type="submit"
            w={{ base: "38vw", sm: "50%" }}
            size={{ base: "sm", sm: "md" }}
            colorScheme={blue}
          >
            Create
          </Button>
        </form>
      </Box>

      {/* Group list section */}
      <Box ml={30} mt={4} textAlign="left">
        <GroupList />
      </Box>
    </Box>
  );
};

export default GroupCreateForm;
