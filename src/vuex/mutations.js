import mutationTypes from './mutationTypes'
const mutations = {
  [mutationTypes.UPDATE_ISSHOWSEARCH] (state, isShowSearch) {
    state.isShowSearch = isShowSearch;
  },
  [mutationTypes.UPDATE_SEARCHWORDS] (state, searchWords) {
    state.searchText = searchWords;
  },
  [mutationTypes.UPDATE_ALERTMSG] (state, alertMsg) {
    state.alertMsg = alertMsg;
  }
};
export default mutations