import * as mutationTypes from './mutationTypes'

export const updateLoginInfo = ({commit}, loginInfo) => {
  commit(mutationTypes.UPDATE_LOGININFO, loginInfo)
}
export const updateShowDismissibleAlert = ({commit}, showDismissibleAlert) => {
  commit(mutationTypes.UPDATE_SHOWDISMISSIBLEALERT, showDismissibleAlert)
}