export const formatUser = (x: any) => {
  if (x === undefined || x === null) {
    return null;
  }
  return {
    id: x.id,
    name: x.name.fullName ?? "",
    email: x.primaryEmail ?? "",
    image: x.thumbnailPhotoUrl ?? "",
    jobTitle: x.organizations !== undefined ? x.organizations[0].title : "",
    department:
      x.organizations !== undefined ? x.organizations[0].department : "",
    location:
      x.locations !== undefined
        ? {
            floorName: x.locations[0].floorName ?? "",
            floorSection: x.locations[0].floorSection ?? "",
            buildingId: x.locations[0].buildingId ?? "",
          }
        : {
            floorName: "",
            floorSection: "",
            buildingId: "",
          },
    manager:
      x.isAdmin === false
        ? x.relations !== undefined
          ? x.relations[0].value
          : ""
        : "",
    phone: x.phones !== undefined ? x.phones[0].value : "",
    isAdmin: x.isAdmin,
    employeeId: x.externalIds !== undefined ? x.externalIds[0].value : "",
  };
};

export const formatAllUsers = (users: any[]) => {
  const fUser = users.map((x) => ({
    id: x.id,
    name: x.name.fullName ?? "",
    email: x.primaryEmail ?? "",
    image: x.thumbnailPhotoUrl ?? "",
    jobTitle: x.organizations !== undefined ? x.organizations[0].title : "",
    department:
      x.organizations !== undefined ? x.organizations[0].department : "",
    location:
      x.locations !== undefined
        ? {
            floorName: x.locations[0].floorName ?? "",
            floorSection: x.locations[0].floorSection ?? "",
            buildingId: x.locations[0].buildingId ?? "",
          }
        : {
            floorName: "",
            floorSection: "",
            buildingId: "",
          },
    manager:
      x.isAdmin === false
        ? x.relations !== undefined
          ? x.relations[0].value
          : ""
        : "",
    phone: x.phones !== undefined ? x.phones[0].value : "",
    isAdmin: x.isAdmin,
    employeeId: x.externalIds !== undefined ? x.externalIds[0].value : "",
  }));
  return fUser;
};

export const handleEmailClick = (email: string) => {
  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}`;
  window.open(mailtoLink, "_blank");
};

export const hideUserProperties = (users: any, propertiesToHide: any) => {
  const hideMap = new Map();
  // Build a map for properties to hide based on emails
  propertiesToHide.forEach((item: any) => {
    hideMap.set(item.email, item.properties);
  });
  return users.map((user: any) => {
    const properties = hideMap.get(user.email);
    if (properties) {
      // Create a new object, setting specified properties to an empty string
      return Object.keys(user).reduce((obj: any, key: any) => {
        obj[key] = properties?.includes(key) ? "" : user[key];
        return obj;
      }, {});
    }
    // Return user as is if no properties to hide
    return user;
  });
};
