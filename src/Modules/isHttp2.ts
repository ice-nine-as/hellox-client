export const isHttp2 = () => /^true$/.test(process.env.H2);

export default isHttp2;