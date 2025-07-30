export const getTaskStatus = (status) => {
  switch (status) {
    case "isPending":
      return "Pending";
    case "inProgress":
      return "In Progress";
    case "isCompleted":
      return "Completed";
    default:
      return "Unknown";
  }
};
