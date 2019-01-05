<template>
    <b-row no-gutters align-h="center">
        <b-col cols="12" sm="12" md="11" lg="6" xl="6">
            <vue-form :state="formstate" v-model="formstate" @submit.prevent="submit">
                <validate auto-label class="form-group required-field">
                    <label>Keypass-XML-URL</label>
                    <input type="text" name="keypass" class="form-control" required v-model.lazy="keypassXmlUrl">
                    <field-messages name="keypass" show="$touched || $submitted" class="form-control-feedback">
                        <div class="error" slot="required">Please input content</div>
                    </field-messages>
                </validate>
            </vue-form>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    data() {
      return {
        formstate: {},
        keypassXmlUrl: ''
      }
    },
    methods: {
      submit: function () {
        if (this.formstate.$valid) {
          var func = this.GLOBAL.func;
          func.post('/security/importMachine.do', {url: this.keypassXmlUrl}, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(
            (response) => {
              var show = func.postSuccessCallback(response.data, this.$router);
              this.$emit('msg', show);
              if (show.isSuccess) {
                this.formstate._reset();
                this.keypassXmlUrl = '';
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

<style scoped>
</style>