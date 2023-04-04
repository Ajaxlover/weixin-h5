import common from './common'
import thirdAuth from './thirdAuth'
import thirdAuthCB from './thirdAuthCB'
import weixin from './weixin'
import permission from './permission'

function doFilters() {
  common.doFilter()
  thirdAuth.doFilter()
  thirdAuthCB.doFilter()
  permission.doFilter()
  weixin.doFilter()
}

export default {
  doFilters
}
