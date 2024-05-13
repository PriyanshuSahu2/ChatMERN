import { USER_ID } from "../requestMethod";

export const getFullName = (data) => {
  const user = data
  return `${user.firstName} ${user.lastName}`;
};

export const getUserProfileImg = (fullName) => {
  return `https://ui-avatars.com/api/?background=random&&name=${fullName}`;
};

export const getUserProfile = (data) => {
  const user = data.members.filter((member) => member._id !== USER_ID)[0];
  return user;
};

export const convertTimestamps = (time) => {
  const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
  const timestamp = Math.floor(new Date(time).getTime() / 1000); // Convert input time to seconds

  const secondsDiff = currentTime - timestamp;

  // Define time intervals in seconds
  const minute = 60;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (secondsDiff < minute) {
    return "a moment ago";
  } else if (secondsDiff < hour) {
    const minutes = Math.floor(secondsDiff / minute);
    return minutes === 1 ? "a minute ago" : `${minutes}m`;
  } else if (secondsDiff < day) {
    const hours = Math.floor(secondsDiff / hour);
    return hours === 1 ? "an hour ago" : `${hours}h`;
  } else {
    const days = Math.floor(secondsDiff / day);
    return days === 1 ? "a day ago" : `${days}d`;
  }
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

