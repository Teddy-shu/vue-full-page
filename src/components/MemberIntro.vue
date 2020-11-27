<template>
  <div :style="{ 'background-image': getBgImg() }" id="main-div">
    <div class="relative" >
        <v-sheet
          width="100vw"
          class="no-bg"
          id="main-view"
        >
          <div
            class='enname noselect'
          >
            {{ this.getSelectedMember.enName }}
          </div>
          <v-img
            class="member-img"
            :src= 'getImgUrl(this.getSelectedMember.avatar)'
            max-height="320"
            max-width="253"
          ></v-img>
        </v-sheet>
    </div>
    <div v-if="this.windowWidth < 1000">
      <v-sheet
        width="100vw"
        style="height: calc((100vh - 216px) * 0.3)"
        class="px-8 py-2 blur-bg"
      >
        <div class="member-content">
          <p class="float-left member-name">{{ this.getSelectedMember.name }}</p>
          <p class="float-right">{{ '出生地 : ' + this.getSelectedMember.portfolio.placeOfBirth }}</p>
        </div>
        <div class="member-content">
          <p class="float-left">{{ '身長 : ' + this.getSelectedMember.portfolio.height }}</p>
          <p class="float-right">{{ '星座 : ' + this.getSelectedMember.portfolio.constellation }}</p>
        </div>
        <div class="member-content">
          <p class="float-left">{{ '生年月日 : ' + this.getSelectedMember.portfolio.birthday }}</p>
          <p class="float-right">{{ '血液型 : ' + this.getSelectedMember.portfolio.bloodType }}</p>
        </div>
      </v-sheet>
    </div>
    <div v-else>
      <v-sheet
        width="300px"
        style="height: calc((100vh - 216px))"
        class="px-8 py-2 no-bg column-member-info"
      >
        <div class="member-name">
          {{ this.getSelectedMember.name }}
        </div>
        <div class="member-content">
          <p>{{ '生年月日 : ' + this.getSelectedMember.portfolio.birthday }}</p>
        </div>
        <div class="member-content">
          <p class="float-left">{{ '身長 : ' + this.getSelectedMember.portfolio.height }}</p>
        </div>
        <div class="member-content">
          <p class="float-left">{{ '星座 : ' + this.getSelectedMember.portfolio.constellation }}</p>
        </div>
        <div class="member-content">
          <p class="float-left">{{ '出生地 : ' + this.getSelectedMember.portfolio.placeOfBirth }}</p>
        </div>
        <div class="member-content">
          <p class="float-left">{{ '血液型 : ' + this.getSelectedMember.portfolio.bloodType }}</p>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MemberIntro',
  data: () => ({
    imgUrl: '../material/bg/purple3.png',
    test: true,
    windowWidth: 0
  }),
  computed: mapGetters(['getSelectedMember', 'getSelectedTeam']),
  methods: {
    bgImgUrl () {
      return require('../material/bg/' + 'white3.png')
    },
    getImgUrl (pet) {
      if (!pet) {
        return ''
      }
      return require('../material/img/' + pet)
    },
    getBgImg () {
      let bgUrl = ''
      if (this.getSelectedTeam === 'nogizaka46') {
        bgUrl = require('../material/bg/' + 'purple3.png')
      } else if (this.getSelectedTeam === 'hinatazaka46') {
        bgUrl = require('../material/bg/' + 'blue3.png')
      } else if (this.getSelectedTeam === 'sakurazaka46') {
        bgUrl = require('../material/bg/' + 'white3.png')
      }
      return "url('" + bgUrl + "')"
      // return require('../material/bg/' + this.getSelectedMember.avatar)
    },
    handleResize () {
      this.windowWidth = window.innerWidth
    }
  },
  created () {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style lang="css" scoped>
#main-view {
  height: calc((100vh - 216px) * 0.7) ;
}
.no-bg {
  background: transparent !important;
}
.blur-bg {
  background: rgba(255,255,255,0.2) !important;
  box-shadow: inset 0px 0px 20px rgba(0,0,0,0.2);
}
.white_bg {
  background: url('../material/bg/white3.png') !important;
}
.white_card {
  background: url('../material/bg/white4.png') !important;
}
.relative {
  position: relative;
  overflow: hidden;
}
.enname {
  position: absolute;
  bottom: 0;
  width: 300px;
  white-space: nowrap;
  text-align: right;
  right: 280px;
  font-size: 5vh;
  color: rgba(0,0,0,0.2);
  font-family: dancing-Lobster !important;
  transform-origin: top left;
  transform: rotate(-46deg);
  pointer-events: none;
}
.column-member-info {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.member-img {
  position: absolute;
  right: 0;
  bottom: 0;
}
.member-name {
  font-family: ' Noto Serif JP', serif !important;
  font-size: 4vh;
  font-weight: 800;
  letter-spacing: 2px;
  color: #1E1A23 !important;
}
.member-content {
  font-family: 'Saira', sans-serif;
  font-weight: 600;
  width: 100%;
  height: 2rem;
  margin: 0.25rem 0;
  position: relative;
}
.member-content p {
  position: absolute;
  line-height: 1.5rem;
  color: #3D3546;
}
.float-right {
  right: 0;
}
.float-left {
  left: 0;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome and Opera */
}
@font-face {
  font-family: dancing-Lobster;
  src: url('../assets/DancingScript-VariableFont_wght.ttf');
}

@media only screen and (max-width: 500px) {
  .enname {
    font-size: 4vh;
    transform: rotate(-46deg) translate(150px,200%);
  }
}

@media only screen and (min-width: 1000px) {
  #main-view {
    height: calc((100vh - 216px)) ;
  }
}
</style>
