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

export default {
  //GroupDetailPage Wrapper
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
    pl: 2,
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
    w: { base: "90%", sm: "40%", md: "90%" },
    colorScheme: "blue",
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
};
