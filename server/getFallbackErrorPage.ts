export const getFallbackErrorPage = (): never => {
  throw new Error();
};

export default getFallbackErrorPage;