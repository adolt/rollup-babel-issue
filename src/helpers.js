const isOnline = () => {
  const isDevOrQA = /(n?dev|qa)/.test(window.location.host)
  const isProduction = process.env.NODE_ENV === 'production'

  return isProduction && !isDevOrQA
}

const getPageLoadTransactionName = (useBrowserHistory = false) => {
  let path = '/'

  if (useBrowserHistory) {
    path = window.location.pathname
  } else {
    path = window.location.hash.split('?')[0].replace('#', '')
  }

  return path || '/'
}

export { isOnline, getPageLoadTransactionName }
