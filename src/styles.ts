//   GroupDetailPage Common Styles //
const commonPermissionsHeadingBox = {
  color: "white",
};

const commonPermissionsHeadings = {
  textAlign: { base: "center" },
  p: { base: "0.5rem", sm: "0.8rem", md: "1rem" },
  marginTop: { base: "2rem", sm: "2rem", md: "auto" },
  fontSize: { base: "1rem", sm: "1.3rem", md: "1.5rem" },
};

const commonGroupPermissionsListItems = {
  pl: 2,
};

const commonAddAndRemovePermissionButton = {
  width: { base: "90%", sm: "40%", md: "90%" },
};

const commonColors = {
  blue: "blue",
};

const commonMargins = {
  mt: 4,
  mx: 2,
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
    color: commonPermissionsHeadingBox.color,
  },

  availablePermissionsHeadingBox: {
    bg: "teal",
    color: commonPermissionsHeadingBox.color,
  },

  //   GroupDetailPage Headings
  availablePermissionsHeading: {
    bg: "cyan.900",
    p: commonPermissionsHeadings.p,
    fontSize: commonPermissionsHeadings.fontSize,
    marginTop: commonPermissionsHeadings.marginTop,
    textAlign: commonPermissionsHeadings.textAlign,
  },

  groupPermissionsHeading: {
    bg: "orange.800",
    p: commonPermissionsHeadings.p,
    fontSize: commonPermissionsHeadings.fontSize,
    marginTop: commonPermissionsHeadings.marginTop,
    textAlign: commonPermissionsHeadings.textAlign,
  },

  //   GroupDetailPage List
  groupPermissionsListItems: {
    pl: commonGroupPermissionsListItems.pl,
  },

  groupAvailablePermissionsListItems: {
    pl: commonGroupPermissionsListItems.pl,
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
};
