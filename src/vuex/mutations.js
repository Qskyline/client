import mutationTypes from './mutationTypes'
const mutations = {
  [mutationTypes.UPDATE_ISSHOWSEARCH] (state, isShowSearch) {
    state.isShowSearch = isShowSearch;
  },
  [mutationTypes.UPDATE_SEARCHWORDS] (state, searchWords) {
    state.searchText = searchWords;
  },
  [mutationTypes.UPDATE_EDITMACHINEINFO] (state, machineInfo) {
    state.editMachineInfo = machineInfo;
  },
  [mutationTypes.UPDATE_ADDNEWMACHINECOUNT] (state) {
    state.addNewMachineCount ++;
  },
  [mutationTypes.UPDATE_USERROLE] (state, role) {
    state.userRole = role;
  }
};
export default mutations