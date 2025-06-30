export const shadowEmailString = (email: string) => {
  const stringComponents = email.split("@");
  const prefix = stringComponents[0].substring(0, 4);

  return `${prefix}***@${stringComponents[1]}`;
};
