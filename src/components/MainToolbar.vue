<template>
<div>
  <v-app-bar app dense class="grey lighten-4">
    <v-img
    alt="logo"
    contain
    src="@/material/img/LOGO.svg"
    height="90%"
    max-width="100px"
    position='center left'
    >
    </v-img>

    <v-spacer></v-spacer>

    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
  </v-app-bar>

  <v-navigation-drawer
      v-model="drawer"
      absolute
      bottom
      temporary
      right
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item href="/#/main">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item href="/#/member">
            <v-list-item-title>Member</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
</div>
</template>

<script>
export default {
  name: 'MainToolbar',
  data: () => ({
    drawer: false,
    group: null
  }),
  watch: {
    group () {
      this.drawer = false
    }
  }
}
</script>

<style lang="css" scoped>
.full-screen{
  width:100vw;
  height:100vh;
}
</style>
