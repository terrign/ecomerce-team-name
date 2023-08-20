export const getRandomKey = (...args: string[]) => {
  return args.join('#') + Math.random().toLocaleString();
};
