import * as mutationTypes from './mutationTypes'
const mutations = {
  [mutationTypes.UPDATE_LOGININFO] (state, loginInfo) {
    state.loginInfo = loginInfo
  },
  [mutationTypes.UPDATE_SHOWDISMISSIBLEALERT] (state, showDismissibleAlert) {
    state.showDismissibleAlert = showDismissibleAlert
  }
}
export default mutations