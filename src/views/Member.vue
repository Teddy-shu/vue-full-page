<template>
  <v-app>
    <v-main>
      <v-container
      fluid
      class="pa-0"
      >
        <MainToolbar/>
        <MemberIntro/>
        <Carousel/>
        <BottomNav/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex'
import MainToolbar from '@/components/MainToolbar.vue'
import MemberIntro from '@/components/MemberIntro.vue'
import Carousel from '@/components/Carousel.vue'
import BottomNav from '@/components/BottomNav.vue'

export default {
  name: 'Member',

  components: {
    MainToolbar,
    MemberIntro,
    Carousel,
    BottomNav
  },

  data: () => ({
    //
  }),

  methods: {
    ...mapActions(['initialSakaMember']),

    getChangedGroupNumber () {
      let ChangedGroupNumber = 0
      if (window.innerWidth < 600) {
        ChangedGroupNumber = 3
      } else if (window.innerWidth < 960) {
        ChangedGroupNumber = 4
      } else {
        ChangedGroupNumber = 5
      }
      return ChangedGroupNumber
    }
  },

  created () {
    this.initialSakaMember({
      groupMemberCount: this.getChangedGroupNumber(),
      selectedTeam: 'nogizaka46'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
