<template>
  <div
  :style="{ 'background-image': getBgImg() }"
  >
    <v-carousel v-model="model"
      v-resize="OnResizeHandler"
      class="no-bg"
      height="fill-content"
      background="transparent"
      hide-delimiter-background
      hide-delimiters
    >
      <v-carousel-item
        v-for="(member_group, i) in this.getMembeGroups"
        :key="i"
        class="no-bg"
      >
        <v-sheet class="fill-height no-bg">
          <v-row
            class="fill-height px-16 no-bg"
            align="center"
            justify="center"
            max-width="100"
          >
            <v-col
              align="center"
              justify="top"
              class="fill-height no-bg"
              v-for="(members, j) in member_group"
              :key="j"
            >
              <v-avatar
                color="transparent"
                size="56"
                :class="{ selectedAvatar: isSelected(members.enName) }"
                >
                <img
                  :src=getImgUrl(members.avatar)
                  :alt="members.avatar"
                  v-on:click="avatarClickHandler(members.enName)"
                  class="hoverable"
                  >
              </v-avatar>
              <div v-text="members.name"
                class="mt-2 black--text" id="member-name">
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Carousel',
  data: () => ({
    model: 0,
    groupNumber: 0
  }),
  computed: mapGetters(['getSakurazaka', 'getMembeGroups', 'getSelectedTeam', 'getSelectedMember']),
  methods: {
    ...mapActions(['initialSakaMember', 'setup', 'setSelectedMember']),
    OnResizeHandler () {
      this.setup({
        groupMemberCount: this.getChangedGroupNumber(),
        selectedTeam: this.getSelectedTeam
      })
    },
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
    },
    getBgImg () {
      let bgUrl = ''
      if (this.getSelectedTeam === 'nogizaka46') {
        bgUrl = require('../material/bg/' + 'purple4.png')
      } else if (this.getSelectedTeam === 'hinatazaka46') {
        bgUrl = require('../material/bg/' + 'blue4.png')
      } else if (this.getSelectedTeam === 'sakurazaka46') {
        bgUrl = require('../material/bg/' + 'white4.png')
      }
      return "url('" + bgUrl + "')"
      // return require('../material/bg/' + this.getSelectedMember.avatar)
    },
    getImgUrl (pet) {
      return require('../material/img/' + pet)
    },
    isSelected (name) {
      if (this.getSelectedMember.enName === name) {
        return true
      } else {
        return false
      }
    },
    avatarClickHandler (name) {
      if (name) {
        this.setSelectedMember(name)
      }
    }
  },
  mounted () {
    console.log('mounted')
  },
  created () {
    console.log('created')
    // this.windowHeight = window.innerHeight
    /*
    this.initialSakaMember({
      groupMemberCount: this.getChangedGroupNumber(),
      selectedTeam: 'hinatazaka46'
    })
    */
    // console.log(this.getMembeGroups)
  }
}
</script>

<style lang="css" scoped>
.no-bg {
  background: transparent !important;
  overflow: hidden;
}
.selectedAvatar::before {
  content:"";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: -1;
  animation-name: wave;
  animation-duration: 3.5s;
  animation-iteration-count: infinite;
}
.hoverable {
  cursor: pointer;
  padding: 1px;
}
#member-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@keyframes wave {
  0% {
    border : 2px solid #A259FF;
  }
  30% {
    border : 2px solid #A259FF;
  }
  36% {
    border : 2px solid #5BBEE4;
  }
  65% {
    border : 2px solid #5BBEE4;
  }
  71% {
    border : 2px solid #FFF;
  }
  95% {
    border : 2px solid #FFF;
  }
  100% {
    border : 2px solid #A259FF;
  }
}
</style>
