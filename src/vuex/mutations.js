import mutationTypes from './mutationTypes'
const mutations = {
  [mutationTypes.UPDATE_LOGININFO] (state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  [mutationTypes.UPDATE_SHOWDISMISSIBLEALERT] (state, showDismissibleAlert) {
    state.showDismissibleAlert = showDismissibleAlert;
  },
  [mutationTypes.UPDATE_ISSHOWSEARCH] (state, isShowSearch) {
    state.isShowSearch = isShowSearch;
  },
  [mutationTypes.UPDATE_SEARCHWORDS] (state, searchWords) {
    state.searchText = searchWords;
  }
};
export default mutations