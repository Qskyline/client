import axios from 'axios'
import global from '../global'
import mutationTypes from '../vuex/mutationTypes'

function postSuccessCallback(response) {
  var result = {
    isSuccess: false,
    data: '',
    msg_type: true,
    msg: '',
    stat: '',
    showDismissibleAlert: false,
    dismissSecs: 0
  };

  var runStatus = global.runStatus;
  var operationStatus = global.operationStatus;
  switch (response.statusCode) {
    case runStatus.STATUS_SUCCESS:
      result.data = response.data;
      result.msg_type = false;
      result.msg = 'SUCCESS!';
      result.stat = 'success';
      result.dismissSecs = 10;
      result.showDismissibleAlert = result.dismissSecs;
      result.isSuccess = true;
      break;
    case runStatus.STATUS_NOLOGGED:
      this.$router.push('/');
      break;
    case runStatus.STATUS_SESSION_TIMEOUT:
      result.msg_type = true;
      result.msg = 'The current session is expired! It will redirect to login-page.';
      result.stat = 'info';
      result.showDismissibleAlert = true;
      setTimeout(function () {
        this.$router.push('/');
      }, 5000);
      break;
    case runStatus.STATUS_SESSION_SINGLE_USER_RESTRICTION:
      result.msg_type = true;
      result.msg = 'The current user has been kicked out! It will redirect to login-page.';
      result.stat = 'info';
      result.showDismissibleAlert = true;
      setTimeout(function () {
        this.$router.push('/');
      }, 5000);
      break;
    case operationStatus.OPERATION_ERROR:
      result.msg_type = true;
      result.msg = response.errMsg;
      result.stat = 'danger';
      result.showDismissibleAlert = true;
      break;
    case operationStatus.OPERATION_ERROR_PARAMS:
      result.msg_type = true;
      result.msg = response.errMsg;
      result.stat = 'danger';
      result.showDismissibleAlert = true;
      break;
    case operationStatus.OPERATION_ERROR_ACCESS_DENY:
      result.msg_type = true;
      result.msg = 'ACCESS DENY!';
      result.stat = 'danger';
      result.showDismissibleAlert = true;
      break;
    default :
      result.msg_type = true;
      result.msg = 'UNKNOWN ERROR!';
      result.stat = 'danger';
      result.showDismissibleAlert = true;
  }
  return result;
}

function postFailedCallback(msg) {
  var result = {
    isSuccess: false,
    data: '',
    msg_type: true,
    msg: '',
    stat: '',
    showDismissibleAlert: false,
    dismissSecs: 0
  };
  result.msg_type = true;
  if (msg != null && typeof(msg) === 'string') {
    result.msg = msg;
  } else {
    result.msg = 'CONNECT LOSE!';
  }
  result.stat = 'danger';
  result.showDismissibleAlert = true;
  return result;
}

function post(url, params, profile) {
  var _url = global.config.prefix + url;
  return axios.post(_url, params, profile);
}

function hasRole(role) {
  var store = this.$store;
  return new Promise(function (resolve, reject) {
    post('/security/hasRole.do', {role: role}).then(
      (response) => {
        var data = postSuccessCallback(response.data);
        if (data.isSuccess) {
          if (data.data === 'true') {
            resolve();
          } else {
            var data = postFailedCallback("You don't have the permission to access the page.");
            store.commit(mutationTypes.UPDATE_ALERTMSG, data);
            reject(data);
          }
        } else {
          store.commit(mutationTypes.UPDATE_ALERTMSG, data);
          reject(data);
        }
      }
    ).catch(
      () => {
        var data = postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data);
      }
    );
  });
}

function getAllMachine() {
  var store = this.$store;
  return new Promise(function (resolve, reject) {
    post('/security/getAllMachine.do').then(
      (response) => {
        var data = postSuccessCallback(response.data);
        if (data.isSuccess) {
          resolve(data.data);
        } else {
          store.commit(mutationTypes.UPDATE_ALERTMSG, data);
          reject(data);
        }
      }).catch(
      () => {
        var data = postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data);
      }
    );
  });
}

function editMachine(machine) {
  var store = this.$store;
  return new Promise(function (resolve, reject) {
    post('/security/editMachine.do', machine, {headers: {'Content-Type': 'application/json'}}).then(
      (response) => {
        var show = postSuccessCallback(response.data);
        store.commit(mutationTypes.UPDATE_ALERTMSG, show);
        if (show.isSuccess) {
          resolve();
        } else {
          reject(show);
        }
      }).catch(
      () => {
        var data = postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data)
      }
    );
  });
}

function getAllTag() {
  var store = this.$store;
  return new Promise(function (resolve, reject) {
    post('/security/getAllTag.do').then(
      (response) => {
        var show = postSuccessCallback(response.data);
        if (show.isSuccess) {
          resolve(show.data);
        } else {
          store.commit(mutationTypes.UPDATE_ALERTMSG, show);
          reject(data);
        }
      }).catch(
      () => {
        var data = postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data)
      }
    );
  });
}

function importMachine(param) {
  var store = this.$store;
  return new Promise(function (resolve, reject) {
    post('/security/importMachine.do', param, {headers: {'Content-Type': 'application/json'}}).then(
      (response) => {
        var show = postSuccessCallback(response.data);
        store.commit(mutationTypes.UPDATE_ALERTMSG, show);
        if (show.isSuccess) {
          resolve();
        } else {
          reject(show);
        }
      }).catch(
      () => {
        var data = postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data)
      }
    );
  });
}

exports.install = function (Vue) {
  Vue.prototype.hasRole = hasRole;
  Vue.prototype.getAllMachine = getAllMachine;
  Vue.prototype.editMachine = editMachine;
  Vue.prototype.getAllTag = getAllTag;
  Vue.prototype.importMachine = importMachine;
};