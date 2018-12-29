const getters = {
  geIsShowSearch: state => state.isShowSearch,
  getSearchWords: state => state.searchText,
  getEditMachineInfo: state => state.editMachineInfo,
  getAddNewMachineCount: state => state.addNewMachineCount
};
export default getters;