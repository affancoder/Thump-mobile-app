let existingUsers = [
  "olduser@gmail.com",
];

export const isExistingUser = (email) => {
  return existingUsers.includes(email.toLowerCase().trim());
};

export const addUser = (email) => {
  const normalizedEmail = email.toLowerCase().trim();

  if (!existingUsers.includes(normalizedEmail)) {
    existingUsers.push(normalizedEmail);
  }
};