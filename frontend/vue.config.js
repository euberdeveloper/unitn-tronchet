module.exports = {
  lintOnSave: false
  /* chainWebpack: config => {
    config.plugins.delete('html')
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
  } */,

  pluginOptions: {
    i18n: {
      locale: 'it',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
