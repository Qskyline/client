const getters = {
  geIsShowSearch: state => state.isShowSearch,
  getSearchWords: state => state.searchText,
  getEditMachineInfo: state => state.editMachineInfo,
  getAddNewMachineCount: state => state.addNewMachineCount,
  getAlertMsg: state => state.alertMsg
};
export default getters;