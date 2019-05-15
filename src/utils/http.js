import common from './common';
import mutationTypes from '../vuex/mutationTypes'
import global from "../global";

function register(param) {
  return new Promise(function (resolve, reject) {
    common.post('/security/register.do', param, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
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

function login(params) {
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    common.post('/security/login.do', params, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
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
    common.post('/security/flushVerifyCode.do').then(
      (response) => {
        resolve(response.data.data);
      }).catch(
      () => {
        reject('System Error!');
      }
    );
  });
}

function hasRole(role) {
  var store = this.$store;
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    common.post('/security/hasRole.do', {role: role}).then(
      (response) => {
        var data = common.postSuccessCallback(response.data, router);
        if (data.isSuccess) {
          if (data.data === 'true') {
            resolve();
          } else {
            var data = common.postFailedCallback("You don't have the permission to access the page.");
            reject(data);
          }
        } else {
          store.commit(mutationTypes.UPDATE_ALERTMSG, data);
          reject(data);
        }
      }
    ).catch(
      () => {
        var data = common.postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data);
      }
    );
  });
}

function logout() {
  var store = this.$store;
  return new Promise(function (resolve, reject) {
    common.post('/security/logout.do').then(
      (response) => {
        var _logoutStatus = global.logoutStatus;
        var response_data = response.data;
        if (response_data == _logoutStatus.LOGOUT_SUCCESS) {
          resolve();
        } else {
          var data = common.postFailedCallback("退出失败");
          store.commit(mutationTypes.UPDATE_ALERTMSG, data);
          reject(data);
        }
      }
    ).catch(
      () => {
        var data = common.postFailedCallback("退出失败");
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data);
      }
    );
  });
}

function checkLoginStatus() {
  var store = this.$store;
  var router = this.$router;
  return new Promise(function (resolve, reject) {
    common.post('/security/check_loginStatus.do').then(
      (response) => {
        var data = common.postSuccessCallback(response.data, router);
        if (data.isSuccess) {
          resolve()
        }
      }
    ).catch(
      () => {
        var data = common.postFailedCallback();
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
    common.post('/security/getAllMachine.do').then(
      (response) => {
        var data = common.postSuccessCallback(response.data, router);
        if (data.isSuccess) {
          resolve(data.data);
        } else {
          store.commit(mutationTypes.UPDATE_ALERTMSG, data);
          reject(data);
        }
      }).catch(
      () => {
        var data = common.postFailedCallback();
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
    common.post('/security/editMachine.do', machine, {headers: {'Content-Type': 'application/json'}}).then(
      (response) => {
        var show = common.postSuccessCallback(response.data, router);
        store.commit(mutationTypes.UPDATE_ALERTMSG, show);
        if (show.isSuccess) {
          resolve();
        } else {
          reject(show);
        }
      }).catch(
      () => {
        var data = common.postFailedCallback();
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
    common.post('/security/getAllTag.do').then(
      (response) => {
        var show = common.postSuccessCallback(response.data, router);
        if (show.isSuccess) {
          resolve(show.data);
        } else {
          store.commit(mutationTypes.UPDATE_ALERTMSG, show);
          reject(data);
        }
      }).catch(
      () => {
        var data = common.postFailedCallback();
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
    common.post('/security/importMachine.do', param, {headers: {'Content-Type': 'multipart/form-data'}}).then(
      (response) => {
        var show = common.postSuccessCallback(response.data, router);
        store.commit(mutationTypes.UPDATE_ALERTMSG, show);
        if (show.isSuccess) {
          resolve();
        } else {
          reject(show);
        }
      }).catch(
      () => {
        var data = common.postFailedCallback();
        store.commit(mutationTypes.UPDATE_ALERTMSG, data);
        reject(data)
      }
    );
  });
}

exports.install = function (Vue) {
  Vue.prototype.qregister = register;
  Vue.prototype.qlogin = login;
  Vue.prototype.qflushVerifyCode = flushVerifyCode;
  Vue.prototype.hasRole = hasRole;
  Vue.prototype.qlogout = logout;
  Vue.prototype.checkLoginStatus = checkLoginStatus;
  Vue.prototype.getAllMachine = getAllMachine;
  Vue.prototype.editMachine = editMachine;
  Vue.prototype.getAllTag = getAllTag;
  Vue.prototype.importMachine = importMachine;
};