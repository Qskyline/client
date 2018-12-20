import mutationTypes from './mutationTypes'

const actions = {
  actionUpdateIsShowSearch: ({commit}, isShowSearch) => {
    commit(mutationTypes.UPDATE_ISSHOWSEARCH, isShowSearch)
  },
  actionUpdateSearchWords: ({commit}, searchWords) => {
    commit(mutationTypes.UPDATE_SEARCHWORDS, searchWords)
  }
};

export default actions;