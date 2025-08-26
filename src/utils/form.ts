export const trimPayload = (data: Record<string, unknown>) => {
  // remove empty value
  const refined: Record<string, unknown> = {};
  for (const key in data) {
    if (data[key]) {
      refined[key] = data[key];
    }
  }

  return refined;
};
