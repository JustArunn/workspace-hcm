export const formatUser = (x: any) => {
  if(x === undefined || x === null){
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
