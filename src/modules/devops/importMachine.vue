<template>
    <b-row no-gutters align-h="center">
        <b-col cols="12" sm="12" md="11" lg="6" xl="6" v-if="userRoles != 'user'">
            <b-form @submit="submit">
                <b-form-file required="true" placeholder="Choose a Keypass XML file ..." v-model="keypassXmlFile"
                             ref="fileInput"></b-form-file>
                <div class="py-2 text-center">
                    <b-button type="submit" variant="primary">Submit</b-button>
                </div>
            </b-form>
        </b-col>
    </b-row>
</template>

<script>
  import {mapMutations} from 'vuex'
  import MUTATIONS from '../../vuex/mutationTypes'
  export default {
    created() {
      this.hasRole('admin').catch((response) => {
        this.alertMsg(response);
        this.$router.push({path: '/home'});
      });
    },
    data() {
      return {
        keypassXmlFile: null
      }
    },
    methods: {
      submit: function () {
        var data = new FormData();
        data.append("file", this.keypassXmlFile);
        this.importMachine(data).then(() => {
          this.keypassXmlFile = null;
          this.$refs.fileInput.reset();
        });
      },
      ...mapMutations({
        alterMsg: MUTATIONS.UPDATE_ALERTMSG
      })
    }
  }
</script>

<style scoped>
</style>