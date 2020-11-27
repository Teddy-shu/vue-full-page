<template>
  <div>
    <v-bottom-navigation
    fixed grow
    class="grey lighten-4"
    >

      <v-btn value="nogizaka46" v-on:click="changeTeam">
        <v-img
          :src= "require('../material/bg/Nogizaka46_logo.svg.png')"
          max-height="30"
          max-width="30"
        ></v-img>
      </v-btn>

      <v-divider
        class="mx-4"
        vertical
      ></v-divider>

      <v-btn value="hinatazaka46" v-on:click="changeTeam">
        <v-img
          :src= "require('../material/bg/Hinatazaka46_logo.svg.png')"
          max-height="30"
          max-width="30"
        ></v-img>
      </v-btn>

      <v-divider
        class="mx-4"
        vertical
      ></v-divider>

      <v-btn value="sakurazaka46" v-on:click="changeTeam">
        <v-img
          :src= "require('../material/bg/Sakurazaka46_logo.svg.png')"
          max-height="30"
          max-width="30"
        ></v-img>
      </v-btn>

    </v-bottom-navigation>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'BottomNav',

  data: () => ({
    model: 0
  }),

  computed: mapGetters(['getGroupMemberCount']),
  methods: {
    ...mapActions(['setup']),
    changeTeam (event) {
      const team = event.currentTarget.value
      this.setup({
        groupMemberCount: this.getGroupMemberCount,
        selectedTeam: team
      })
    }
  },

  created () {
  }
}
</script>

<style lang="css" scoped>
</style>
