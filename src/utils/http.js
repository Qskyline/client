import axios from 'axios'
import global from '../global'
import mutationTypes from '../vuex/mutationTypes'

function postSuccessCallback(response, router) {
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
      router.push('/');
      break;
    case runStatus.STATUS_SESSION_TIMEOUT:
      result.msg_type = true;
      result.msg = 'The current session is expired! It will redirect to login-page.';
      result.stat = 'info';
      result.showDismissibleAlert = true;
      setTimeout(function () {
        router.push('/');
      }, 5000);
      break;
    case runStatus.STATUS_SESSION_SINGLE_USER_RESTRICTION:
      result.msg_type = true;
      result.msg = 'The current user has been kicked out! It will redirect to login-page.';
      result.stat = 'info';
      result.showDismissibleAlert = true;
      setTimeout(function () {
        router.push('/');
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

function register(param) {
  return new Promise(function (resolve, reject) {
    post('/security/register.do', param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
      (response) => {
        var response_data = response.data;
        var _registerStatus = global.registerStatus;
        switch (response_data.statusCode) {
          case _registerStatus.REGISTER_SUCCESS:
            resolve();
            break;
          case _registerStatus.REGISTER_FAILED_U_E:
          case _registerStatus.REGISTER_FAILED_M_E:
          case _registerStatus.REGISTER_FAILED_UNKNOWN_ERROR:
          case _registerStatus.REGISTER_FAILED_SECURITYCHECK:
          default:
            reject(response_data);
        }
      }).catch(
      () => {
        var data = {};
        data.errMsg = 'System Error!';
        reject(data);
      }
    );
  });
}


function hasRole(role) {
  var store = this.$store;
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    post('/security/hasRole.do', {role: role}).then(
      (response) => {
        var data = postSuccessCallback(response.data, router);
        if (data.isSuccess) {
          if (data.data === 'true') {
            resolve();
          } else {
            var data = postFailedCallback("You don't have the permission to access the page.");
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
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    post('/security/getAllMachine.do').then(
      (response) => {
        var data = postSuccessCallback(response.data, router);
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
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    post('/security/editMachine.do', machine, {headers: {'Content-Type': 'application/json'}}).then(
      (response) => {
        var show = postSuccessCallback(response.data, router);
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
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    post('/security/getAllTag.do').then(
      (response) => {
        var show = postSuccessCallback(response.data, router);
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
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    post('/security/importMachine.do', param, {headers: {'Content-Type': 'multipart/form-data'}}).then(
      (response) => {
        var show = postSuccessCallback(response.data, router);
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

function login(params) {
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    post('/security/login.do', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
      (response) => {
        var _loginStatus = global.loginStatus;
        var response_data = response.data;
        switch (response_data.statusCode) {
          case _loginStatus.LOGIN_SUCCESS:
            router.push({path: '/home'});
            break;
          case _loginStatus.LOGIN_USER_ALREADY_LOGGED:
            resolve();
          case _loginStatus.LOGIN_AUTH_FAILED:
          case _loginStatus.LOGIN_USER_LOCKED:
          case _loginStatus.LOGIN_USER_NICKOUT_ERROR:
          case _loginStatus.LOGIN_VERIFYCODE_ERROR:
          case _loginStatus.LOGIN_VERIFYCODE_TIMEOUT:
          case _loginStatus.LOGIN_UNKNOWN_ERROR:
          case _loginStatus.LOGIN_SECURITY_SQLINJECTION:
            reject(response_data);
            break;
          default :
            var data = {};
            data.errMsg = 'Unknown error!';
            reject(data);
            break;
        }
      }).catch(
      () => {
        var data = {};
        data.errMsg = 'System Error!';
        reject(data);
      }
    );
  });
}

function flushVerifyCode() {
  return new Promise(function (resolve, reject) {
    post('/security/flushVerifyCode.do').then(
      (response) => {
        resolve(response.data.data);
      }).catch(
      () => {
        reject('System Error!');
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
  Vue.prototype.qregister = register;
  Vue.prototype.qlogin = login;
  Vue.prototype.qflushVerifyCode = flushVerifyCode;
};