<template>
    <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12">
            <b-card overlay
                    img-src="https://picsum.photos/900/250/?image=36"
                    img-alt="Card Image"
                    text-variant="white"
                    title="Image Overlay"
                    sub-title="Subtitle">
                <p class="card-text">
                    {{pageData}}
                </p>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    data() {
      return {
        pageData: 'Hello World ...'
      }
    },
    created() {
      var func = this.GLOBAL.func;
      func.post(this.$http, '/security/getHomePageData.do').then(
        (response) => {
          console.log(response.body)
          var show = func.postSuccessCallback(response, this.$router);
          if(show.isSuccess) {
            this.pageData = show.data;
          } else {
            this.$emit('msg', show);
          }
        },
        (response) => {
          var show = func.postFailedCallback(response);
          this.$emit('msg', show);
        }
      )
    }
  }
</script>

<style scoped>

</style>