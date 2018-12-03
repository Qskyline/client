<template>
  <b-navbar toggleable="md" type="light" variant="light" class="sticky-top navbar-expand-md">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand href="#/home">devops</b-navbar-brand>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav>
        <b-nav-item href="#/home">Machines</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Operate" right>
          <b-dropdown-item href="#/maintain/addMachine">add machine</b-dropdown-item>
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
export default {
	methods: {
	    logout: function() {
	      var _logoutStatus = this.GLOBAL.logoutStatus;
        var prefix = this.GLOBAL.config.prefix;
	      this.$http.post(prefix + '/security/logout.do').then(
	        (response) => {
	          if(response.body == _logoutStatus.LOGOUT_SUCCES) return true
	          else return false
	        },
	        (response) => {
	          return false
	        }
	      );
	    }
  	}
}
</script>