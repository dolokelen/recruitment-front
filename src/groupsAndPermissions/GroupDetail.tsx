import {
  Box,
  Button,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  List,
  ListItem,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import GroupEditForm from "./GroupEditForm";
import OverflowYContainer from "./OverflowYContainer";
import PermissionList from "./PermissionList";
import {
  useDeleteGroup,
  useGroup,
  useUpdateGroupPermissions,
} from "../hooks/useGroups";
import { blue, red } from "../colors";
import MySpinner from "../components/MySpinner";
import DeletionConfirmation from "../utilities/DeletionConfirmation";

const GroupDetailPage = () => {
  const { id } = useParams();
  const groupId = parseInt(id!);

  const { data: group, isLoading, error } = useGroup(groupId);

  const mutation = useDeleteGroup(() => toast.success("Deleted successfully."));
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  const handlePermissionsRemoval = useUpdateGroupPermissions(
    { id: groupId, permission_ids_to_remove: selectedPermissions },
    () => {
      setSelectedPermissions([]);
      toast.success("Permissions removed successfully!");
    }
  );

  // const canChangeGroup = hasPermission("Can change group");
  // const canChangePermission = hasPermission("Can change permission");

  // if (!hasPermission("Can view group")) return <AccessDenyPage />;
  if (error) return <Text color={red}>{error.message}</Text>;
  if (isLoading) return <MySpinner />;

  const handleCheckboxChange = (permissionId: number) => {
    if (selectedPermissions.includes(permissionId)) {
      setSelectedPermissions(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    }
  };

  return (
    <>
      <Box bg='green.700'>
        <GroupEditForm />
        </Box>

      {/* <HStack fontSize={30} mt={8} mb={3} justifyContent="space-evenly">
        <Box ml="-10%">{group?.name} Permissions</Box>
        <Box>Available Permissions</Box>
      </HStack>

      <Grid
        bg="gold"
        templateAreas={{
          base: `"groupPermissions unAssignPermissions" "buttons buttons"`,
          //   sm: `"nav nav" "aside main"`,
        }}
        templateColumns={{
          base: `0.29fr 0.29fr`,
          //   sm: `225px 1fr`,
        }}
        justifyContent="space-evenly"
      >
        <GridItem area="groupPermissions">
          <OverflowYContainer>
            <List>
              {group?.permissions?.length ? (
                group.permissions?.map((p) => (
                  <ListItem key={p.id}>
                    <Checkbox
                      isChecked={selectedPermissions.includes(p.id)}
                      onChange={() => handleCheckboxChange(p.id)}
                    >
                      {p.name}
                    </Checkbox>
                  </ListItem>
                ))
              ) : (
                <ListItem color={red}>No assigned permissions</ListItem>
              )}
            </List>
          </OverflowYContainer>
        </GridItem>

        <GridItem area="unAssignPermissions">
          <PermissionList assignPermissions={group?.permissions} />
        </GridItem>

        <GridItem area="buttons">
          <Flex justifyContent="space-evenly">
            {selectedPermissions.length === 0 ? (
              <Button isActive isDisabled colorScheme={blue}>
                Remove
              </Button>
            ) : (
              <Button
                isActive
                onClick={handlePermissionsRemoval}
                colorScheme={blue}
              >
                Remove
              </Button>
            )}

            <DeletionConfirmation
              entityId={groupId}
              entityName={group?.name}
              label="Delete Group"
              onMutate={() => mutation.mutate(groupId)}
            />

            <Button isActive isDisabled colorScheme={blue}>
              Add
            </Button>
          </Flex>
        </GridItem>
      </Grid> */}

      <Box
        my={8}
        px={4}
        bg="skyblue"
        display={{ md: "flex" }}
        justifyContent="space-between"
      >
        <Box bg="orangered">
          <Heading
            textAlign={{ base: "center" }}
            fontSize={{ base: "1rem", md: "1.5rem" }}
          >
            Group Permissions
          </Heading>
          <OverflowYContainer>
            <List>
              {group?.permissions?.length ? (
                group.permissions?.map((p) => (
                  <ListItem key={p.id}>
                    <Checkbox
                      isChecked={selectedPermissions.includes(p.id)}
                      onChange={() => handleCheckboxChange(p.id)}
                    >
                      {p.name}
                    </Checkbox>
                  </ListItem>
                ))
              ) : (
                <ListItem color={red}>No assigned permissions</ListItem>
              )}
            </List>
          </OverflowYContainer>
          {selectedPermissions.length === 0 ? (
            <Button
              mt={4}
              w={{ base: "90%", sm: "40%", md: "90%" }}
              mx={2}
              // transform='translateX(50%)'
              isActive
              isDisabled
              colorScheme={blue}
            >
              Remove
            </Button>
          ) : (
            <Button
              // transform='translateX(50%)'
              mt={4}
              w={{ base: "90%", sm: "40%", md: "90%" }}
              mx={2}
              isActive
              onClick={handlePermissionsRemoval}
              colorScheme={blue}
            >
              Remove
            </Button>
          )}
        </Box>

        <Button
          isActive
          colorScheme="red"
          display={{ base: "none", md: "inline-block" }}
        >
          Delete Group1
        </Button>

        <Box bg="teal">
          <Heading
            textAlign={{ base: "center" }}
            fontSize={{ base: "1rem", md: "1.5rem" }}
            marginTop={{ base: "2rem" }}
          >
            Available Permissions
          </Heading>
          <PermissionList assignPermissions={group?.permissions} />
          {/* <Button transform='translateX(50%)' isActive isDisabled colorScheme={blue}>
            Add
          </Button> */}
        </Box>

        <Button 
        isActive 
        colorScheme="yellow" 
        mt={{base: 6}} 
        display={{ md: "none" }}
        w={{ base: "90%", sm: "40%", md: "90%" }}
        >
          Delete Group2
        </Button>
      </Box>
    </>
  );
  // return (
  //   <>
  //     {canChangeGroup && <GroupEditForm />}
  //     {canChangePermission ? (
  //       <>
  //         <HStack fontSize={30} mt={8} mb={3} justifyContent="space-evenly">
  //           <Box ml="-10%">{group?.name} Permissions</Box>
  //           <Box>Available Permissions</Box>
  //         </HStack>

  //         <Grid
  //           templateAreas={{
  //             base: `"groupPermissions unAssignPermissions" "buttons buttons"`,
  //             //   sm: `"nav nav" "aside main"`,
  //           }}
  //           templateColumns={{
  //             base: `0.29fr 0.29fr`,
  //             //   sm: `225px 1fr`,
  //           }}
  //           justifyContent="space-evenly"
  //         >
  //           <GridItem area="groupPermissions">
  //             <OverflowYContainer>
  //               <List>
  //                 {group.permissions?.length ? (
  //                   group.permissions?.map((p) => (
  //                     <ListItem key={p.id}>
  //                       <Checkbox
  //                         isChecked={selectedPermissions.includes(p.id)}
  //                         onChange={() => handleCheckboxChange(p.id)}
  //                       >
  //                         {p.name}
  //                       </Checkbox>
  //                     </ListItem>
  //                   ))
  //                 ) : (
  //                   <ListItem color={red}>No assigned permissions</ListItem>
  //                 )}
  //               </List>
  //             </OverflowYContainer>
  //           </GridItem>

  //           <GridItem area="unAssignPermissions">
  //             <PermissionList assignPermissions={group.permissions} />
  //           </GridItem>

  //           <GridItem area="buttons">
  //             <Flex justifyContent="space-evenly">
  //               {selectedPermissions.length === 0 ? (
  //                 <Button isActive isDisabled colorScheme={blue}>
  //                   Remove
  //                 </Button>
  //               ) : (
  //                 <Button
  //                   isActive
  //                   onClick={handlePermissionsRemoval}
  //                   colorScheme={blue}
  //                 >
  //                   Remove
  //                 </Button>
  //               )}

  //               <DeletionConfirmation
  //                 entityId={groupId}
  //                 entityName={group.name}
  //                 label="Delete Group"
  //                 onMutate={() => mutation.mutate(groupId)}
  //               />

  //               <Button isActive isDisabled colorScheme={blue}>
  //                 Add
  //               </Button>
  //             </Flex>
  //           </GridItem>
  //         </Grid>
  //       </>
  //     ) : (
  //       <AccessDenyPage />
  //     )}
  //   </>
  // );
};

export default GroupDetailPage;
