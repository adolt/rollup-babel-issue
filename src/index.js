import { init } from '@elastic/apm-rum'
import { isOnline, getPageLoadTransactionName } from './helpers'

export function initApm({ useBrowserHistory, ...options }) {
  return init({
    active: isOnline(),
    serverUrl: 'https://apm.domain.cn',
    pageLoadTransactionName: getPageLoadTransactionName(useBrowserHistory),
    ...options,
  })
}
