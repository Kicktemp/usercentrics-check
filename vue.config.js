module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/usercentrics-check/'
    : '/',
  productionSourceMap: false
}
