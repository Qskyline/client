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
                <validate auto-label class="form-group required-field">
                    <label>Tags*</label>
                    <input type="text" name="tags" class="form-control" required v-model.lazy="machine.tags">
                    <field-messages name="tags" show="$touched || $submitted" class="form-control-feedback">
                        <div class="error" slot="required">Please input content</div>
                    </field-messages>
                </validate>

                <div style="text-align: right"><a href="#" v-on:click="isShowDetail=!isShowDetail">showDetail</a></div>
                <transition name="fade"><div v-show="isShowDetail">
                    <validate auto-label class="form-group required-field">
                        <label>LoginType*</label>
                        <select class="form-control" name="loginType" required v-model.lazy="machine.loginType">
                            <option value="password">Password</option>
                            <option value="privateKey">Key</option>
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
                </div></transition>

                <div class="py-2 text-center">
                    <button class="btn btn-primary" type="submit">Submit</button>
                </div>
            </vue-form>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    data() {
      return {
        formstate: {},
        machine: {
          loginType: 'password',
          ip: '',
          loginUser: '',
          loginPassword: '',
          loginPort: 22,
          tags: ''
        },
        regions: [],
        isShowDetail: false
      }
    },
    methods: {
      submit: function () {
        if (this.formstate.$valid) {
          var func = this.GLOBAL.func;
          func.post('/security/addMachine.do', this.machine, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            (response) => {
              var show = func.postSuccessCallback(response.data, this.$router);
              this.$emit('msg', show);
              if (show.isSuccess) {
                this.formstate._reset();
                Object.assign(this.$data, this.$options.data());
              }
            }
          ).catch(
            (response) => {
              var show = func.postFailedCallback(response.data);
              this.$emit('msg', show);
            }
          );
        }
      }
    }
  }
</script>

<style>
    /*vue animation*/
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>