<template>
    <b-navbar toggleable="md" type="light" variant="light" class="sticky-top navbar-expand-md">
        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <b-navbar-brand href="#/home">devops</b-navbar-brand>
        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item href="#/home">Machine</b-nav-item>
            </b-navbar-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-form v-show="isShowSearch">
                    <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search" :input="updateSearchWords(searchWords)" v-model.lazy="searchWords"/>
                </b-nav-form>
                <b-nav-item-dropdown text="Operate" right>
                    <b-dropdown-item href="#/maintain/editMachine" v-on:click="addNewMachine">add machine</b-dropdown-item>
                    <b-dropdown-item href="#/maintain/importMachine" v-if="isAdmin">import machine</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item-dropdown right>
                    <template slot="button-content">
                        <em>User</em>
                    </template>
                    <b-dropdown-item href="#">Profile</b-dropdown-item>
                    <b-dropdown-item href="#/" v-on:click="logout">Signout</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import MUTATIONS from '../vuex/mutationTypes'
  export default {
    created() {
      this.hasRole('admin').then(() => {
        this.isAdmin = true;
      });
    },
    methods: {
      logout: function () {
        this.qlogout().then(() => {
          return true;
        }).catch(() => {
          return false;
        });
      },
      ...mapMutations({
        updateSearchWords: MUTATIONS.UPDATE_SEARCHWORDS,
        addNewMachine: MUTATIONS.UPDATE_ADDNEWMACHINECOUNT
      })
    },
    data() {
      return {
        searchWords: '',
        isAdmin: false
      }
    },
    computed: {
      ...mapGetters({
        isShowSearch: 'geIsShowSearch'
      })
    }
  }
</script>