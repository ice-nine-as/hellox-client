export const isHttp2 = () => /^true$/i.test(process.env.H2 || '');

export default isHttp2;