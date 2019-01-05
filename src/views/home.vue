<template>
  <homeTemplate show="true"></homeTemplate>
</template>

<script>
import homeTemplate from '../modules/homeTemplate'
import { mapMutations } from 'vuex'
import MUTATIONS from '../vuex/mutationTypes'
export default {
  components: {
    homeTemplate
  },
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
      }
    );
  },
  methods: {
    ...mapMutations({
      setUserRole: MUTATIONS.UPDATE_USERROLE
    })
  }
}
</script>

<style>
</style>