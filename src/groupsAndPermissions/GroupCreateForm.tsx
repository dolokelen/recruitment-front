import {
  Box,
  Checkbox,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useCreateGroup } from "../hooks/useGroups";
import { http_400_BAD_REQUEST_CUSTOM_MESSAGE } from "../utilities/httpErrorMessages";
import { red } from "../colors";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect } from "react";
import styles from "../styles";
import { MyButtonWithIcon } from "../MyFormComponents";
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

  //   if (!hasPermission("Can add group")) return <AccessDenyPage />;

  return (
    <Box sx={styles.grooupCreateWrapper}>
      <Box sx={styles.groupCreateInnerWrapper}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Heading sx={styles.groupCreateHeading}>Group Creation Form</Heading>

          {/* Tradeoff: scapegoat enables bulk create!*/}
          <Box display="none">
            <Checkbox {...register("scapegoat")}>display is none?</Checkbox>
            {errors.scapegoat && (
              <Text color={red}>{errors.scapegoat.message}</Text>
            )}
          </Box>

          {fields.map((group, index) => (
            <HStack key={group.id}>
              <Box sx={styles.groupCreateInputWrapper}>
                <FormLabel sx={styles.groupCreateInputLabel}>Name</FormLabel>
                <Input
                  {...register(`groups.${index}.name`)}
                  sx={styles.groupCreateInput}
                />
                {errors?.groups?.[index]?.name && (
                  <Text color={red}>{errors.groups[index]?.name?.message}</Text>
                )}
                {customErrorMessage && (
                  <Text color={red}>{customErrorMessage}</Text>
                )}
              </Box>

              <Box sx={styles.groupCreateIconWrapper}>
                <FiPlusCircle
                  onClick={() => append({ name: "" })}
                  size={styles.groupCreatePlusIcon.size}
                  color={styles.groupCreatePlusIcon.color}
                />
              </Box>
              {fields.length > 1 && (
                <Box sx={styles.groupCreateIconWrapper}>
                  <MdOutlineRemoveCircleOutline
                    onClick={() => remove(index)}
                    size={styles.groupCreatePlusIcon.size}
                    color={styles.groupCreateRemoveIcon.color}
                  />
                </Box>
              )}
            </HStack>
          ))}

          <MyButtonWithIcon label="Create" />
        </form>
      </Box>

      {/* Group list section */}
      <Box sx={styles.createGroupListWrapper}>
        <GroupList />
      </Box>
    </Box>
  );
};

export default GroupCreateForm;
