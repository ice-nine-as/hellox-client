const isHttp2 = () => /^true$/i.test(process.env.H2 || '');
module.exports = isHttp2;
module.exports.isHttp2 = isHttp2;