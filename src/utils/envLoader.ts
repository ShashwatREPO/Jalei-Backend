export default (variable: string) => {
  if (!process.env[variable]) {
    console.error(
      `[log]: Critical environment variable process.env.${variable} is missing`
    );
    throw new Error();
  }

  return process.env[variable];
};
