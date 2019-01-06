<template><div>
<div>
  <b-alert state="danger" dismissible :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
    {{loginInfo}}
  </b-alert>
</div>
<div class="container py-5">
  <vue-form :state="formstate" v-model="formstate" @submit.prevent="submit">
    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.name)">
      <label>Name *<span style="font-size: small">&nbsp;(Just the letters a-z,A-Z,_,- are permitted. The first Letter must be in a-z or A-Z. The name's length is between 4 and 20.)</span></label>
      <input type="text" name="name" class="form-control" required pattern="^[a-zA-Z][a-zA-Z|_|\-]{3,19}$" v-model.lazy="user.name">
      <field-messages name="name" show="$touched || $submitted" class="form-control-feedback">
        <div class="success">Success!</div>
        <div class="error" slot="required">Name is a required field</div>
        <div class="error" slot="pattern">Format Error</div>
      </field-messages>
    </validate>

    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.phone)">
      <label>Phone number *</label>
      <input type="tel" name="phone" class="form-control" required pattern="^\d{11}$" v-model.lazy="user.mobile">
      <field-messages name="phone" show="$touched || $submitted" class="form-control-feedback">
        <div class="success">Success!</div>
        <div class="error" slot="required">Phone number is a required field</div>
        <div class="error" slot="pattern">Phone number is invalid</div>
      </field-messages>
    </validate>

    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.password)">
      <label>Password *<span style="font-size: small">&nbsp;(Please ensure the length is between 8 to 16.)</span></label>
      <input type="password" name="password" class="form-control" maxlength="16" minlength="8" required v-model.lazy="user.password">
      <field-messages name="password" show="$touched || $submitted" class="form-control-feedback">
        <div class="success">Success!</div>
        <div class="error" slot="required">Password is a required field</div>
        <div class="error" slot="minlength">Password must be more than 8 characters and less than 16 characters</div>
      </field-messages>
    </validate>

    <validate auto-label class="form-group required-field" :class="fieldClassName(formstate.confirm)">
      <label>Confirm Password *</label>
      <input type="password" name="confirm" :confirm="user.password" class="form-control" maxlength="16" minlength="8" required v-model.lazy="user.confirm">
      <field-messages name="confirm" show="$touched || $submitted" class="form-control-feedback">
        <div class="success">Success!</div>
        <div class="error" slot="required">Confirm Password is a required field</div>
        <div class="error" slot="confirm">Please confirm the value of this field is equal to the Password field's</div>
      </field-messages>
    </validate>

    <div class="py-2 text-center">
      <button class="btn btn-primary" type="submit">Submit</button>
    </div>
  </vue-form>
</div>
</div></template>

<script>
export default {
  data() {
    return {
      formstate: {},
      showDismissibleAlert: false,
      loginInfo: '',
      user: {
        name: '',
        mobile: '',
        password: '',
        confirm: ''
      }
    }
  },
  methods: {
    fieldClassName: function (field) {
      if(!field) {
        return '';
      }
      if((field.$touched || field.$submitted) && field.$valid) {
        return 'has-success';
      }
      if((field.$touched || field.$submitted) && field.$invalid) {
        return 'has-danger';
      }
    },
    submit: function() {
      if (this.formstate.$valid) {
        var router = this.$router;
        var userEncrypt = {};
        userEncrypt.name = this.user.name;
        userEncrypt.mobile = this.user.mobile;
        userEncrypt.password = this.md5(this.user.password);
        userEncrypt.confirm = this.md5(this.user.confirm);
        this.qregister(this.Qs.stringify(userEncrypt)).then(() => {
          router.push({name: 'login'});
        }).catch((response) => {
          this.loginInfo = response.errMsg;
          this.showDismissibleAlert = true;
        });
      }
    }
  }
}
</script>

<style>
.success {
  color: #2AF613;
}
.error {
  color: red;
}
</style>