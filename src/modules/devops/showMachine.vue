<template>
    <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="adaptation table-responsive">
            <b-table responsive striped hover :items="machines" :fields="fields" :filter="filter"></b-table>
        </b-col>
    </b-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { mapMutations } from 'vuex'
  import MUTATIONS from '../../vuex/mutationTypes'
  export default {
    data() {
      return {
        count: 9,
        machines: [],
        isShow: false,
        fields: [
          {
            key: 'ip',
            sortable: true
          },
          {
            key: 'sshPort',
            sortable: true
          },
          {
            key: 'loginUser',
            sortable: true
          },
          {
            key: 'tags',
            sortable: true
          }
        ]
      }
    },
    created() {
      this.updateIsShowSearch(true);
      var func = this.GLOBAL.func;
      func.post('/security/getAllMachine.do').then(
        (response) => {
          var show = func.postSuccessCallback(response.data, this.$router);
          if (show.isSuccess) {
            if (show.data.length > 0 && show.data[0].belong != null) {
              this.fields.push({key: 'belong', sortable: true});
            }
            this.machines = show.data;
          } else {
            this.$emit('msg', show);
          }
        }
      ).catch(
        (response) => {
          var show = func.postFailedCallback(response.data);
          this.$emit('msg', show);
        }
      );
    },
    computed: {
      ...mapGetters({
        filter: 'getSearchWords'
      })
    },
    methods: {
      ...mapMutations({
        updateIsShowSearch: MUTATIONS.UPDATE_ISSHOWSEARCH
      })
    },
    beforeDestroy() {
      this.updateIsShowSearch(false);
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