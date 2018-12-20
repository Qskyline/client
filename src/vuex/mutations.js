import mutationTypes from './mutationTypes'
const mutations = {
  [mutationTypes.UPDATE_ISSHOWSEARCH] (state, isShowSearch) {
    state.isShowSearch = isShowSearch;
  },
  [mutationTypes.UPDATE_SEARCHWORDS] (state, searchWords) {
    state.searchText = searchWords;
  }
};
export default mutations