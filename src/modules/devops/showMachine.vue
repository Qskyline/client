<template>
    <b-row>
        <b-col cols="12" sm="12" md="12" lg="12" xl="12" class="adaptation table-responsive">
            <b-table responsive hover :items="machines" :fields="fields" :filter="filter">
                <template slot="password" slot-scope="row">
                    <input class="password" readonly type="password" :ref="row.item.id" :id="row.item.id" :value="row.item.password" v-on:click="showPassword(row.item.id)" />
                </template>
                <template slot="actions" slot-scope="row">
                    <b-button size="sm" @click.stop="machineEdit(row.item)" class="mr-1">
                        Edit
                    </b-button>
                    <b-button size="sm" @click.stop="row.toggleDetails">
                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                    </b-button>
                </template>
                <template slot="row-details" slot-scope="row">
                    <b-card>
                        <ul>
                            <li v-for="(value, key) in row.item" :key="key" v-if="detailShow(key)">{{key}}: {{value}}</li>
                        </ul>
                    </b-card>
                </template>
            </b-table>
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
        isAdmin: false,
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
            key: 'password'
          },
          {
            key: 'tags',
            sortable: true
          },
          {
            key: 'actions'
          }
        ]
      }
    },
    created() {
      this.updateIsShowSearch(true);
      this.getAllMachine().then((response) => {
        this.hasRole('admin').then(() => {
          this.fields.splice(-1, 0, {key: 'belong', sortable: true});
        });
        this.machines = response;
      });
    },
    computed: {
      ...mapGetters({
        filter: 'getSearchWords'
      })
    },
    methods: {
      ...mapMutations({
        updateIsShowSearch: MUTATIONS.UPDATE_ISSHOWSEARCH,
        actionEdit: MUTATIONS.UPDATE_EDITMACHINEINFO
      }),
      showPassword: function (id) {
        this.$refs[id].type = 'text';
        var count = 6;
        var tt = setInterval(() => {
          count --;
          if (count == 0) {
            this.$refs[id].type = 'password';
            clearInterval(tt);
          }
        }, 1000);
      },
      machineEdit: function (data) {
        this.actionEdit(data);
        this.$router.push({path: '/maintain/editMachine'});
      },
      detailShow: function (key) {
        var showKeys = ['ip', 'sshPort', 'loginUser', 'password', 'tags', 'desc', 'belong'];
        if (showKeys.indexOf(key) >= 0) return true;
        return false;
      }
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

    .password{
        border: none !important;
        background-color: transparent !important;
        width: 8rem !important;
    }

    @media (max-width: 500px) {
        .password{
            border: none !important;
            background-color: transparent !important;
            width: 3rem !important;
        }
    }
</style>