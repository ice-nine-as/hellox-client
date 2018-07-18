exports = module.exports = {
  isHttp2() {
    return /^true$/i.test(process.env.H2 || '');
  },
};