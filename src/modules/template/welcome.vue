<template>
    <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="adaptation table-responsive">
            {{pageData}}
        </b-col>
    </b-row>
</template>

<script>
  export default {
    data() {
      return {
        pageData: 'Hello World!'
      }
    },
    created() {
      this.welcome((response) => {
        this.pageData = response;
      });
    }
  }
</script>

<style>
    @media (max-width: 500px) {
        .adaptation {
            font-size: 0.4rem;
            padding: 0px !important;
        }
    }
</style>