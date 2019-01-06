<template>
    <b-row no-gutters align-h="center">
        <b-col cols="12" sm="12" md="11" lg="6" xl="6" v-if="userRoles != 'user'">
            <vue-form :state="formstate" v-model="formstate" @submit.prevent="submit">
                <validate auto-label class="form-group required-field">
                    <label>Keypass-XML-URL</label>
                    <input type="text" name="keypass" class="form-control" required v-model.lazy="keypassXmlUrl">
                    <field-messages name="keypass" show="$touched || $submitted" class="form-control-feedback">
                        <div class="error" slot="required">Please input content</div>
                    </field-messages>
                </validate>
                <div class="py-2 text-center">
                    <button class="btn btn-primary" type="submit">Submit</button>
                </div>
            </vue-form>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    created() {
      var func = this.GLOBAL.func;
      func.hasRole('admin').catch(() => {
        this.$router.push({path: '/home'});
      });
    },
    data() {
      return {
        formstate: {},
        keypassXmlUrl: ''
      }
    },
    methods: {
      submit: function () {
        if (this.formstate.$valid) {
          this.importMachine({url: this.keypassXmlUrl}).then(() => {
            this.formstate._reset();
            this.keypassXmlUrl = '';
          });
        }
      }
    }
  }
</script>

<style scoped>
</style>