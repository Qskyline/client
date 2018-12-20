import mutationTypes from './mutationTypes'

const actions = {
  updateLoginInfo: ({commit}, loginInfo) => {
    commit(mutationTypes.UPDATE_LOGININFO, loginInfo)
  },
  updateShowDismissibleAlert: ({commit}, showDismissibleAlert) => {
    commit(mutationTypes.UPDATE_SHOWDISMISSIBLEALERT, showDismissibleAlert)
  }
};

export default actions;