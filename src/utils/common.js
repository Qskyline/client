import axios from 'axios'
import global from '../global'

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

export default {
  postSuccessCallback,
  postFailedCallback,
  post
}