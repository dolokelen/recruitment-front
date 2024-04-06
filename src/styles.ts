import { blackAlpha700, blue, blue700, red, teal, white } from "./colors";

//   GroupDetailPage Common Styles //
const commonPermissionsHeadings = {
  textAlign: { base: "center" },
  p: { base: "0.5rem", sm: "0.8rem", md: "1rem" },
  marginTop: { base: "2rem", sm: "2rem", md: "auto" },
};

const commonPaddings = {
  pl: 2,
};

const commonAddAndRemovePermissionButton = {
  width: { base: "90%", sm: "40%", md: "90%" },
};

const commonMargins = {
  mt: 4,
  mx: 2,
};

const borderRadius20 = "20px";
const borderRadius48 = "48px";

const borderRadius = {
  borderTopLeftRadius: borderRadius48,
  borderTopRightRadius: borderRadius48,
  borderLeftRadius: borderRadius20,
  borderRightRadius: borderRadius20,
};

const commonHeading = {
  fontSize: { base: "1rem", sm: "1.3rem", md: "1.5rem" },
};

const commonIconSize = {
  size1rem: "1rem",
};

const commonResponsiveMargin = {
  my: { base: 4, md: 4 },
  mx: { base: 4, sm: 20, md: 48 },
};

const commonMargin = {
  my: 4,
};

export default {
  // *************** GroupDetailPage Wrapper ***************//
  groupDetailPageWrapper: {
    my: 8,
    px: 4,
    display: { md: "flex" },
    justifyContent: "space-between",
  },

  //   GroupDetailPage Headings Boxes
  groupPermissionsHeadingBox: {
    bg: "orange.500",
    color: white,
    borderTopLeftRadius: borderRadius.borderTopLeftRadius,
    borderTopRightRadius: borderRadius.borderTopRightRadius,
  },

  availablePermissionsHeadingBox: {
    bg: teal,
    color: white,
    borderTopLeftRadius: borderRadius.borderTopLeftRadius,
    borderTopRightRadius: borderRadius.borderTopRightRadius,
  },

  //   GroupDetailPage Headings
  availablePermissionsHeading: {
    bg: "cyan.900",
    p: commonPermissionsHeadings.p,
    fontSize: commonHeading.fontSize,
    marginTop: commonPermissionsHeadings.marginTop,
    textAlign: commonPermissionsHeadings.textAlign,
    borderTopLeftRadius: borderRadius.borderTopLeftRadius,
    borderTopRightRadius: borderRadius.borderTopRightRadius,
  },

  groupPermissionsHeading: {
    bg: "orange.800",
    p: commonPermissionsHeadings.p,
    fontSize: commonHeading.fontSize,
    marginTop: commonPermissionsHeadings.marginTop,
    textAlign: commonPermissionsHeadings.textAlign,
    borderTopLeftRadius: borderRadius.borderTopLeftRadius,
    borderTopRightRadius: borderRadius.borderTopRightRadius,
  },

  //   GroupDetailPage List
  groupPermissionsListItems: {
    pl: commonPaddings.pl,
  },

  groupAvailablePermissionsListItems: {
    pl: commonPaddings.pl,
  },

  noAssignPermissionsListItem: {
    p: 1,
    color: "yellow",
    fontSize: { base: "1rem", md: "1.3rem" },
  },

  //   GroupDetailPage Buttons
  groupPermissionsRemoveButton: {
    mt: 4,
    mx: 2,
    w: commonAddAndRemovePermissionButton.width,
    colorScheme: blue,
  },

  deleteGroupButtonBoxForDesktop: {
    display: { base: "none", md: "inline-block" },
  },

  deleteGroupButtonBoxForMobile: {
    mt: { base: 6 },
    display: { md: "none" },
  },

  deleteGroupButtonForMobile: {
    display: { base: "100%", sm: "40%", md: "90%" },
  },

  // *************** PermissionsList ***************//
  addButtonDisable: {
    mt: commonMargins.mt,
    mx: commonMargins.mx,
    colorScheme: blue,
    w: commonAddAndRemovePermissionButton.width,
  },

  addButton: {
    mt: commonMargins.mt,
    mx: commonMargins.mx,
    colorScheme: blue,
    w: commonAddAndRemovePermissionButton.width,
  },

  // *************** GroupList *************** //
  // Heading
  groupListHeading: {
    p: "1rem",
    bg: "blue.900",
    color: white,
    fontSize: commonHeading.fontSize,
  },

  // List
  groupListItems: {
    pr: 2,
    pl: commonPaddings.pl,
  },

  // Buttons Wrapper
  groupListButtonBox: {
    p: 4,
    w: { base: "100%", sm: "auto", md: "100%" },
  },

  groupListButtonDisable: {
    colorScheme: "red",
    w: { base: "inherit", sm: "auto", md: "inherit" },
  },

  groupListDeleteAllButton: {
    width: { base: "100%", sm: "auto", md: "100%" },
  },

  // *************** GroupCreatePage *************** //
  // Grid
  groupCreateGrid: {
    gap: "6",
    color: blackAlpha700,
    boxShadow: "dark-lg",
    p: "6",
    roundedBottom: "lg",
  },

  groupCreateFormWrapper: {
    mx: 4,
    my: commonResponsiveMargin.my,
  },

  // Heading
  groupCreateHeading: {
    my: commonMargin.my,
    color: blue700,
    fontSize: commonHeading.fontSize,
  },

  //Input field wrapper
  groupCreateInputWrapper: {
    my: commonMargin.my,
    w: "100%",
  },

  groupCreateInputLabel: {
    fontSize: 20,
  },

  groupCreateInput: {
    borderRadius: { base: 8 },
    border: "1px solid skyblue",
    size: { base: "sm", sm: "md" },
  },

  groupCreateIconWrapper: {
    mt: 5,
    ":hover": { cursor: "pointer" },
  },

  groupCreatePlusIcon: {
    color: "#2B6CB0",
    size: commonIconSize.size1rem,
  },

  groupCreateRemoveIcon: {
    color: red,
    size: commonIconSize.size1rem,
  },

  //CreateGroup Create Button
  groupCreateButton: {
    w: { base: "38vw", sm: "50%" },
    size: { base: "sm", sm: "md" },
    colorScheme: blue,
  },

  // GroupList GridItem
  createGroupListGridItem: {
    w: { base: "100%", sm: "50%", md: "auto" },
  },

  // GroupList Wrapper
  createGroupListWrapper: {
    my: commonMargin.my,
    bg: blue700,
    textAlign: "left",
    mx: { base: 4, md: 0 },
    color: white,
    borderLeftRadius: borderRadius.borderLeftRadius,
    borderRightRadius: borderRadius.borderLeftRadius,
  },

  // ********************* GroupEdit Form ********************* //
  // Form wrapper
  groupEditWrapper: {
    mx: 4,
    my: commonResponsiveMargin.my,
  },

  // Heading
  groupEditHeading: {
    fontSize: commonHeading.fontSize,
    my: commonMargin.my,
    color: blue700,
  },

  // ****************** Login Form ******************* //
  loginWrapper: {
    mx: commonResponsiveMargin.mx,
    my: commonResponsiveMargin.my,
  },

  // Heading
  loginHeader: {
    my: commonMargin.my,
    color: blue700,
    fontSize: commonHeading.fontSize,
  },

  resetPwdLinkFontSize: {
    fontSize: { base: ".7rem", md: "1rem" },
    mt: 2,
  },

  // ****************** Registration From ****************** //
  registrationWrapper: {
    mx: commonResponsiveMargin.mx,
    my: commonResponsiveMargin.my,
  },

  // Heading
  registrationHeader: {
    my: commonMargin.my,
    color: blue700,
    fontSize: commonHeading.fontSize,
  },
};
