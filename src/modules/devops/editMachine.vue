<template>
    <b-row no-gutters align-h="center">
        <b-col cols="12" sm="12" md="11" lg="6" xl="6">
            <vue-form :state="formstate" v-model="formstate" @submit.prevent="submit">
                <validate auto-label class="form-group required-field">
                    <label>Ip*</label>
                    <input type="text" name="ip" class="form-control" required v-model.lazy="machine.ip">
                    <field-messages name="ip" show="$touched || $submitted" class="form-control-feedback">
                        <div class="error" slot="required">Please input content</div>
                    </field-messages>
                </validate>
                <validate auto-label class="form-group required-field">
                    <label>LoginUser*</label>
                    <input type="text" name="loginUser" class="form-control" required v-model.lazy="machine.loginUser">
                    <field-messages name="loginUser" show="$touched || $submitted" class="form-control-feedback">
                        <div class="error" slot="required">Please input content</div>
                    </field-messages>
                </validate>
                <validate auto-label class="form-group required-field">
                    <label>LoginPassword*</label>
                    <input type="text" name="loginPassword" class="form-control" required
                           v-model.lazy="machine.loginPassword">
                    <field-messages name="loginPassword" show="$touched || $submitted" class="form-control-feedback">
                        <div class="error" slot="required">Please input content</div>
                    </field-messages>
                </validate>

                <div style="text-align: right"><a href="#/maintain/editMachine" v-on:click="isShowDetail=!isShowDetail">showDetail</a></div>
                <transition name="fade"><div v-show="isShowDetail">
                    <validate auto-label class="form-group required-field">
                        <label>LoginType*</label>
                        <select class="form-control" name="loginType" required v-model.lazy="machine.loginType">
                            <option value="password">Password</option>
                            <option value="key">Key</option>
                        </select>
                        <field-messages name="loginType" show="$touched || $dirty || $submitted" class="form-control-feedback">
                            <div slot="required">Please input content</div>
                        </field-messages>
                    </validate>
                    <validate auto-label class="form-group required-field">
                        <label>LoginPort*</label>
                        <input type="number" name="loginPort" class="form-control" min="22" max="10000" required v-model.lazy="machine.loginPort">
                        <field-messages name="loginPort" show="$touched || $submitted" class="form-control-feedback">
                            <div class="error" slot="required">Please input content</div>
                            <div class="error" slot="min">the range is between 22 and 10000</div>
                            <div class="error" slot="max">the range is between 22 and 10000</div>
                        </field-messages>
                    </validate>
                    <validate auto-label class="form-group required-field">
                        <label>Tags</label>
                        <multiselect v-model="value"
                                     placeholder="Type to search"
                                     :options="moptions"
                                     @select="multiselectSelect"
                                     @remove="multiselectRemove"
                                     :multiple="true">
                            <span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
                        </multiselect>
                    </validate>
                    <div v-show="this.GLOBAL.func.hasRole('admin', userRoles)">
                        <validate auto-label class="form-group">
                            <label>LoginCmd</label>
                            <input type="text" name="loginCmd" class="form-control" v-model.lazy="machine.loginCmd">
                        </validate>
                        <b-form-radio-group class="form-group" v-model="selected" :options="options" name="radioInline"></b-form-radio-group>
                        <validate auto-label class="form-group required-field" v-if="selected == 'ActiveSuRoot'">
                            <label>RootPassword*</label>
                            <input type="text" name="rootPassword" class="form-control" required v-model.lazy="machine.rootPassword">
                            <field-messages name="rootPassword" show="$touched || $submitted" class="form-control-feedback">
                                <div class="error" slot="required">Please input content</div>
                            </field-messages>
                        </validate>
                        <validate auto-label class="form-group">
                            <label>RootCmd</label>
                            <input type="text" name="rootCmd" class="form-control" v-model.lazy="machine.rootCmd">
                        </validate>
                    </div>
                </div></transition>

                <div class="py-2 text-center">
                    <button class="btn btn-primary" type="submit">Submit</button>
                </div>
            </vue-form>
        </b-col>
    </b-row>
</template>

<script>
  import Multiselect from 'vue-multiselect'
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import MUTATIONS from '../../vuex/mutationTypes'
  export default {
    components: { Multiselect },
    created() {
      this.GLOBAL.func.post('/security/getAllTag.do').then(
        (response) => {
          var show = this.GLOBAL.func.postSuccessCallback(response.data, this.$router);
          if (show.isSuccess) {
            this.moptions = show.data
          }
        }
      ).catch(
        () => {
          var show = this.GLOBAL.func.postFailedCallback();
          this.$emit('msg', show);
        }
      );
      if (this.getEditMachineInfo != null && this.getEditMachineInfo.id != null) {
        this.machine.id = this.getEditMachineInfo.id;
        this.machine.loginType = this.getEditMachineInfo.loginType;
        this.machine.ip = this.getEditMachineInfo.ip;
        this.machine.loginPort = parseInt(this.getEditMachineInfo.sshPort);
        this.machine.loginUser = this.getEditMachineInfo.loginUser;
        this.machine.loginPassword = this.getEditMachineInfo.password;
        this.machine.tags = this.getEditMachineInfo.tags;
        if (this.machine.tags != null) {
          this.value = this.machine.tags.split(',');
        }
        this.machine.desc = this.getEditMachineInfo.desc;
        //admin user initialize
        if (this.GLOBAL.func.hasRole('admin', this.userRoles)) {
          this.machine.loginCmd = this.getEditMachineInfo.loginCmd;
          this.machine.activeSudoRoot = this.getEditMachineInfo.isActiveSudoRoot;
          this.machine.activeSuRoot = this.getEditMachineInfo.isActiveSuRoot;
          if (this.machine.activeSudoRoot == 'true') {
            this.selected = 'ActiveSudoRoot';
          } else if (this.machine.activeSuRoot == 'true') {
            this.selected = 'ActiveSuRoot';
          } else {
            this.selected = 'DeactivateRoot';
          }
          this.machine.rootPassword = this.getEditMachineInfo.rootPassword;
          this.machine.rootCmd = this.getEditMachineInfo.rootCmd;
        }
      }
    },
    data() {
      return {
        formstate: {},
        machine: {
          //判断新增还是编辑
          id:'',

          //必填
          loginType: 'password',
          ip: '',
          loginPort: 22,
          loginUser: '',
          loginPassword: '',

          //选填
          tags: '',
          desc: '',

          //admin用户可选
          loginCmd: '',
          activeSudoRoot: 'false',
          activeSuRoot: 'false',
          rootPassword: '',
          rootCmd: ''
        },
        isShowDetail: false,
        options: [
          { text: 'DeactivateRoot', value: 'DeactivateRoot' },
          { text: 'ActiveSudoRoot', value: 'ActiveSudoRoot' },
          { text: 'ActiveSuRoot', value: 'ActiveSuRoot' }
        ],
        selected: 'DeactivateRoot',
        value: [],
        moptions: []
      }
    },
    methods: {
      submit: function () {
        if (this.formstate.$valid) {
          var func = this.GLOBAL.func;
          switch (this.selected) {
            case 'ActiveSudoRoot':
              this.machine.activeSudoRoot = 'true';
              this.machine.activeSuRoot = 'false';
              break;
            case 'ActiveSuRoot':
              this.machine.activeSudoRoot = 'false';
              this.machine.activeSuRoot = 'true';
              break;
            default:
              this.machine.activeSudoRoot = 'false';
              this.machine.activeSuRoot = 'false';
          }
          if (this.value != null && this.value.length > 0) {
            this.machine.tags = this.value.join(',');
          }
          func.post('/security/editMachine.do', this.machine, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            (response) => {
              var show = func.postSuccessCallback(response.data, this.$router);
              this.$emit('msg', show);
              if (show.isSuccess) {
                this.formstate._reset();
                Object.assign(this.$data.machine, this.$options.data().machine);
                this.clearEditInfo(null);
                this.isShowDetail = false;
                this.$router.push({path: '/home'});
              }
            }
          ).catch(
            () => {
              var show = func.postFailedCallback();
              this.$emit('msg', show);
            }
          );
        }
      },
      multiselectSelect: function (tag) {
        var index;
        for (var i = 0; i < this.moptions.length; i++) {
          if (tag === this.moptions[i]) {
            index = i;
            break;
          }
        }
        this.moptions.splice(i, 1);
      },
      multiselectRemove: function (tag) {
        this.moptions.push(tag);
      },
      ...mapMutations({
        clearEditInfo: MUTATIONS.UPDATE_EDITMACHINEINFO
      }),
    },
    computed: {
      ...mapGetters({
        getEditMachineInfo: 'getEditMachineInfo',
        addNewMachineEvent: 'getAddNewMachineCount',
        userRoles: 'getUserRole'
      })
    },
    beforeDestroy() {
      this.clearEditInfo(null);
    },
    watch: {
      addNewMachineEvent: function () {
        this.formstate._reset();
        Object.assign(this.$data.machine, this.$options.data().machine);
        this.clearEditInfo(null);
      }
    }
  }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style>
    /*vue animation*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>