<template>
    <b-container fluid class="container_login" v-show="isShow">
        <b-row no-gutters>
            <b-col>
                <b-alert :variant="state" dismissible :show="showDismissibleAlert"
                         @dismissed="showDismissibleAlert=false">
                    {{loginInfo}}{{help}}{{count}}{{unit}}
                </b-alert>
            </b-col>
        </b-row>

        <b-row align-v="center" align-h="center" class="row_login_frame">
            <transition name="fade">
                <b-col class="col_login_frame" cols="10" md="4" lg="3" xl="2.1">
                    <b-row no-gutters class="text-center row_logo">
                        <b-col>Skyline</b-col>
                    </b-row>
                    <b-row no-gutters align-h="center">
                        <b-col cols="10">
                            <hr class="line">
                        </b-col>
                    </b-row>
                    <vue-form :state="formstate" v-model="formstate" @submit.prevent="submit">
                        <validate auto-label class="form-group required-field">
                            <input
                                    type="text"
                                    name="name"
                                    :style="backgroundDiv"
                                    class="form-control login_input_username login_input"
                                    placeholder="Enter your name"
                                    required pattern="^[a-zA-Z][a-zA-Z|_|\-]{3,19}$"
                                    v-model.lazy="user.name">
                        </validate>
                        <validate auto-label class="form-group required-field">
                            <input
                                    type="password"
                                    name="password"
                                    :style="backgroundDiv"
                                    class="form-control login_input_password login_input"
                                    placeholder="Enter your password"
                                    required maxlength="16" minlength="8"
                                    v-model.lazy="user.password">
                        </validate>
                        <div class="verifyCode-frame" v-if="isShowVerifyCode">
                            <validate auto-label class="form-group required-field">
                                <input
                                        type="text"
                                        name="verify"
                                        class="form-control login_input_verify login_input"
                                        placeholder="Verify Code"
                                        required maxlength="4" minlength="4"
                                        v-model.lazy="user.verify">
                            </validate>
                            <div class="verifyCode-image" :style="verifyCodeUrl" @click="flushVerifyCode"></div>
                        </div>

                        <b-row class="row_choice">
                            <b-col><a href="#">Forgot your account or password?</a></b-col>
                        </b-row>
                        <b-row class="row_choice">
                            <b-col><a href="#/register">Create account.</a></b-col>
                        </b-row>
                        <b-row class="row_choice">
                            <b-col>
                                <b-form-checkbox v-model="user.isRememberMe">Remember me a week.</b-form-checkbox>
                            </b-col>
                        </b-row>

                        <b-row no-gutters class="row_submit">
                            <b-col>
                                <b-button variant="secondary" type="submit" class="login_button">submit</b-button>
                            </b-col>
                        </b-row>
                    </vue-form>
                </b-col>
            </transition>
        </b-row>
    </b-container>
</template>

<script>
  export default {
    created() {
      var _runStatus = this.GLOBAL.runStatus;
      var func = this.GLOBAL.func;
      func.post('/security/check_loginStatus.do').then(
        (response) => {
          var response_data = response.data;
          switch (response_data.statusCode) {
            case _runStatus.STATUS_LOGGED:
              this.$router.push({path: '/home'});
              break;
            case _runStatus.STATUS_NOLOGGED:
            case _runStatus.STATUS_SESSION_TIMEOUT:
            case _runStatus.STATUS_SESSION_SINGLE_USER_RESTRICTION:
            case _runStatus.STATUS_ACCESS_DENY:
              this.isShow = true;
              this.getVerifyCode(response_data.data);
              break;
          }
        }
      );
    },
    data() {
      return {
        formstate: {},
        user: {
          name: '',
          password: '',
          isRememberMe: '',
          verify: ''
        },
        isShow: false,
        showDismissibleAlert: false,
        loginInfo: '',
        verifyCodeUrl: '',
        isShowVerifyCode: false,
        state: 'danger',
        count: '',
        unit: '',
        help: ''
      }
    },
    computed: {
      backgroundDiv: function () {
        return {
          backgroundImage: 'url(' + require('../assets/input_icons_24_2764534.png') + ')'
        }
      }
    },
    methods: {
      submit: function () {
        if (this.formstate.$valid) {
          var router = this.$router;
          var userEncrypt = {};
          userEncrypt.name = this.user.name;
          userEncrypt.password = this.md5(this.user.password);
          userEncrypt.isRememberMe = this.user.isRememberMe;
          userEncrypt.verify = this.user.verify;
          this.qlogin(this.Qs.stringify(userEncrypt)).then(() => {
            this.state = 'info';
            this.help = ' in ';
            this.count = 5;
            this.unit = ' second!';
            var tt = setInterval(() => {
              this.count--;
              if (this.count == 0) {
                clearInterval(tt);
                router.push({path: '/home'});
              }
            }, 1000);
          }).catch((response) => {
            this.loginInfo = response.errMsg;
            this.showDismissibleAlert = true;
            this.getVerifyCode(response);
          });
        } else {
          this.loginInfo = 'Format Error!';
          this.showDismissibleAlert = true;
        }
      },
      flushVerifyCode: function () {
        this.qflushVerifyCode().then((response) => {
          this.getVerifyCode(response);
        }).catch((response) => {
          this.loginInfo = response;
          this.showDismissibleAlert = true;
        });
      },
      getVerifyCode: function (data) {
        if (data != null && typeof (data.needVerifyCode) !== "undefined" && data.needVerifyCode == true) {
          this.isShowVerifyCode = true;
          this.verifyCodeUrl = "background-image: url(data:image/png;base64," + data.image + ");";
        }
      }
    }
  }
</script>

<style>
    .container_login {
        padding: 0;
    }

    .row_login_frame {
        margin-top: 10%;
    }

    .col_login_frame {
        border: 1px solid #555555;
    }

    .row_logo {
        margin-top: 1.5rem;
        margin-bottom: -0.9rem;
    }

    .line {
        border: none;
        border-top: 1px solid #555555;
    }

    .login_input {
        padding-left: 3rem !important;
        background-repeat: no-repeat;
        margin-bottom: 3%;
        height: 2.5rem;
    }

    .login_input_username {
        margin-top: 1.2rem;
        background-position: 1% 31%;
    }

    .login_input_username:focus {
        background-position: 1% 50.6%;
    }

    .login_input_password {
        background-position: 1% 69%;
    }

    .login_input_password:focus {
        background-position: 1% 88.6%;
    }

    .verifyCode-frame {
        position: relative;
        margin-bottom: 1.5rem;
    }

    .verifyCode-image {
        width: 5rem;
        height: 2.5rem;
        position: absolute;
        top: 0;
        left: 0;
        background: no-repeat center center;
    }

    .login_input_verify {
        padding-left: 5rem !important;
        background-position: 4% center;
    }

    .row_choice {
        margin-bottom: 3%;
        font-size: small;
    }

    .row_submit {
        margin-top: 1.2rem;
        margin-bottom: 1.5rem;
    }

    .login_button {
        width: 100%;
    }

    /*vue animation*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>