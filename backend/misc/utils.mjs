export const connectedUsers = new Set();

export const isUserOnline = (userId) => {

  return connectedUsers.has(userId);
};
