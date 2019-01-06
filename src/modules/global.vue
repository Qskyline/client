<script>
  import axios from 'axios'
  import routerConfig from '../router'
  import VueRouter from 'vue-router'

  const router = new VueRouter({routes: routerConfig});

  const config = {
    prefix: ''
  };

  const registerStatus = {
    REGISTER_SUCCESS: 0,
    REGISTER_FAILED_U_E: 1,   //Username is already exist.
    REGISTER_FAILED_M_E: 2,   //MobliePhomeNumber is already exist.
    REGISTER_FAILED_UNKNOWN_ERROR: 3,   //Unknown error.
    REGISTER_FAILED_SECURITYCHECK: 4
  };

  const loginStatus = {
    LOGIN_SUCCESS: 100,
    LOGIN_USER_ALREADY_LOGGED: 101,
    LOGIN_AUTH_FAILED: 102,
    LOGIN_USER_LOCKED: 103,
    LOGIN_USER_NICKOUT_ERROR: 104,
    LOGIN_SECURITY_SQLINJECTION: 105,
    LOGIN_VERIFYCODE_ERROR: 106,
    LOGIN_VERIFYCODE_TIMEOUT: 107,
    LOGIN_UNKNOWN_ERROR: 108
  };

  const runStatus = {
    STATUS_LOGGED: 200,
    STATUS_NOLOGGED: 201,
    STATUS_SESSION_TIMEOUT: 202,
    STATUS_SESSION_SINGLE_USER_RESTRICTION: 203
  };

  const logoutStatus = {
    LOGOUT_SUCCESS: 300
  };

  const operationStatus = {
    OPERATION_ERROR: 400,
    OPERATION_ERROR_PARAMS: 401,
    OPERATION_ERROR_ACCESS_DENY: 402
  };

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
    switch(response.statusCode) {
      case runStatus.STATUS_LOGGED:
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
        setTimeout(function() {
          router.push('/');
        }, 5000);
        break;
      case runStatus.STATUS_SESSION_SINGLE_USER_RESTRICTION:
        result.msg_type = true;
        result.msg = 'The current user has been kicked out! It will redirect to login-page.';
        result.stat = 'info';
        result.showDismissibleAlert = true;
        setTimeout(function() {
          router.push('/');
        }, 5000);
        break;
      case operationStatus.OPERATION_ERROR:
        result.msg_type = true;
        result.msg = response.errMsg;
        result.stat = 'danger';
        result.showDismissibleAlert = true;
        break;
      case runStatus.OPERATION_ERROR_PARAMS:
        result.msg_type = true;
        result.msg = response.errMsg;
        result.stat = 'danger';
        result.showDismissibleAlert = true;
        break;
      case runStatus.OPERATION_ERROR_ACCESS_DENY:
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

  function hasRole(role) {
    return new Promise(function (resolve, reject) {
      post('/security/hasRole.do', {role: role}).then(
        (response) => {
          var data = postSuccessCallback(response.data, router);
          if (data.isSuccess){
            if (data.data === 'true') {
              resolve();
            }
          } else {
            reject(data);
          }
        }
      ).catch(
        () => {
         var data = postFailedCallback("You don't have the permission to access the page.");
         reject(data);
        }
      );
    });
  }

  function post(url, params, profile) {
    var _url = config.prefix + url;
    return axios.post(_url, params, profile);
  }

  export default {
    config,
    registerStatus,
    loginStatus,
    runStatus,
    logoutStatus,
    operationStatus,
    func: {
      postSuccessCallback,
      postFailedCallback,
      post,
      hasRole
    }
  }
</script>