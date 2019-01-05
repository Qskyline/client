<template><b-container fluid class="home_template" v-show="show">
  <b-row no-gutters><b-col>
    <navigator/>
  </b-col></b-row>

  <b-row no-gutters align-h="center" class="card_frame"><b-col cols="11" sm="11" md="11" lg="11" xl="11">
    <b-row no-gutters>
      <b-col>
        <b-alert :variant="state" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
          {{info}}
        </b-alert>
        <b-alert :variant="state" dismissible :show="dismissCount" @dismissed="dismissCount=0" @dismiss-count-down="countDownChanged">
          {{info}}
          <b-progress :variant="state" :max="dismissSecs" :value="dismissCount" height="0px"></b-progress>
        </b-alert>
      </b-col>
    </b-row>
    <router-view v-on:msg="showAlert"/>
  </b-col></b-row>
</b-container></template>

<script>
import navigator from '../modules/nav'
import { mapMutations } from 'vuex'
import MUTATIONS from '../vuex/mutationTypes'
export default {
  created() {
    this.GLOBAL.func.post('/security/getUserRole.do').then(
      (response) => {
        var show = this.GLOBAL.func.postSuccessCallback(response.data, this.$router);
        if (show.isSuccess) {
          this.setUserRole(show.data);
        }
      }
    ).catch(
      () => {
        var show = this.GLOBAL.func.postFailedCallback();
        this.$emit('msg', show);
      }
    );
  },
  data() {
    return {
      showDismissibleAlert: false,
      info: '',
      state: 'danger',
      dismissSecs: 0,
      dismissCount: 0
    }
  },
  components: {
    navigator
  },
  methods: {
    countDownChanged: function(dismissDown) {
      this.dismissCount = dismissDown;
    },
    showAlert: function(msg) {
      console.log(msg);
      if(msg.msg_type) {
        this.dismissCount = 0;
        this.dismissSecs = 0;
        this.showDismissibleAlert = msg.showDismissibleAlert;
      } else {
        this.showDismissibleAlert = false;
        this.dismissCount = msg.showDismissibleAlert;
        this.dismissSecs = msg.dismissSecs;
      }
      this.state = msg.stat;
      this.info = msg.msg;
    },
    ...mapMutations({
      setUserRole: MUTATIONS.UPDATE_USERROLE
    })
  },
  props: ['show']
}
</script>

<style>
.home_template {
  padding: 0;
}
.card_frame {
  margin-top: 0.5rem;
}
</style>