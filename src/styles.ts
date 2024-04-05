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

const commonColors = {
  red: "red",
  teal: "teal",
  blue: "blue",
  white: "white",
  blue700: "blue.700",
};

const commonMargins = {
  mt: 4,
  mx: 2,
};

const commonHeading = {
  fontSize: { base: "1rem", sm: "1.3rem", md: "1.5rem" },
};

const commonIconSize = {
  size1rem: "1rem",
};

const commonResponsiveMarginY = {
  my: { base: 4, md: 4 },
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
    color: commonColors.white,
  },

  availablePermissionsHeadingBox: {
    bg: commonColors.teal,
    color: commonColors.white,
  },

  //   GroupDetailPage Headings
  availablePermissionsHeading: {
    bg: "cyan.900",
    p: commonPermissionsHeadings.p,
    fontSize: commonHeading.fontSize,
    marginTop: commonPermissionsHeadings.marginTop,
    textAlign: commonPermissionsHeadings.textAlign,
  },

  groupPermissionsHeading: {
    bg: "orange.800",
    p: commonPermissionsHeadings.p,
    fontSize: commonHeading.fontSize,
    marginTop: commonPermissionsHeadings.marginTop,
    textAlign: commonPermissionsHeadings.textAlign,
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
    colorScheme: commonColors.blue,
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
    colorScheme: commonColors.blue,
    w: commonAddAndRemovePermissionButton.width,
  },

  addButton: {
    mt: commonMargins.mt,
    mx: commonMargins.mx,
    colorScheme: commonColors.blue,
    w: commonAddAndRemovePermissionButton.width,
  },

  // *************** GroupList *************** //
  // Heading
  groupListHeading: {
    p: "1rem",
    bg: "blue.900",
    color: commonColors.white,
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
    mt: 4,
    p: 4,
    width: { base: "100%", sm: "auto", md: "100%" },
  },

  // *************** GroupCreatePage *************** //
  // Form wrapper1
  grooupCreateWrapper: {
    display: { md: "flex" },
    justifyContent: "space-around",
  },

  groupCreateInnerWrapper: {
    mx: 4,
    my: commonResponsiveMarginY.my,
  },

  //Input field wrapper
  groupCreateInputWrapper: {
    my: 4,
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
    color: commonColors.red,
    size: commonIconSize.size1rem,
  },

  //CreateGroup Create Button
  groupCreateButton: {
    w: { base: "38vw", sm: "50%" },
    size: { base: "sm", sm: "md" },
    colorScheme: commonColors.blue,
  },

  // GroupList Wrapper
  createGroupListWrapper: {
    mt: 10,
    bg: "blue.700",
    textAlign: "left",
    mx: { base: 4, md: 0 },
    color: commonColors.white,
  },

  // ********************* GroupEdit Form ********************* //
  // Form wrapper
  groupEditWrapper: {
    mx: 4,
    my: commonResponsiveMarginY.my,
  },

  // Heading
  groupEditHeading: {
    fontSize: commonHeading.fontSize,
    my: 4,
    color: commonColors.blue700,
  },
};
