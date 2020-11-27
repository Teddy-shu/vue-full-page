<template>
  <v-app>
    <div class="banner">

      <div class="bg">
        <div class="bg-pic"></div>
        <div class="layer1">

        </div>
        <div class="layer3">

        </div>
        <div class="layer2">

        </div>
      </div>
      <a class="text-zone" ref="box" href="/#/main">
        <P>Follow Now</P>
        <span><img src="../assets/downArrow.svg" alt="&#8595;"></span>
      </a>
    </div>
  </v-app>
</template>

<script>
// import MainToolbar from '@/components/MainToolbar.vue'
import { gsap, TimelineLite } from 'gsap/all'
gsap.registerPlugin(TimelineLite)

export default {
  name: 'Home',
  components: {
    // MainToolbar
  },
  mounted: function () {
    // const { box } = this.$refs
    const layer1 = document.querySelector('.layer1')
    const layer2 = document.querySelector('.layer2')
    const layer3 = document.querySelector('.layer3')
    // const bg = document.querySelector('.bg')
    const bgPic = document.querySelector('.bg-pic')
    const textZone = document.querySelector('.text-zone')

    const timeline = new TimelineLite()

    timeline.fromTo(layer1, { x: -1 * layer1.offsetWidth }, { duration: 2, x: 0 })
    timeline.fromTo(layer3, { x: layer3.offsetWidth }, { duration: 2, x: 0 })
    timeline.fromTo(layer2, { x: -1 * layer3.offsetWidth }, { duration: 2, x: 0 })
    timeline.from(bgPic, { duration: 1, opacity: 0 })

    // timeline.to(bg, { duration: 1, transform: 'scale(2.5) rotate(-46deg)' })
    timeline.from(textZone, { duration: 1, opacity: 0 })
  }
}
</script>

<style lang="css" scoped>
.banner {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background: black;
}

.bg-pic {
  position: absolute;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  background-image: url('../material/bg/Group 9.png');
  background-position: center;
  background-size:  cover;
  background-repeat: no-repeat;
}

.bg {
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: center;
  /*transform: scale(2.5) rotate(-46deg);*/
  animation-delay: 1s;
}

.layer1, .layer2, .layer3 {
  position: relative;
  width: 100%;
  opacity: 0.7;
  /*height: calc(100% / 3);*/
}

.layer1, .layer2 {
  height: calc(40%);
}
.layer3 {
  height: calc(20%);
}

.layer1 {
  background:#5BBEE4;
}

.layer3 {
  background:#A259FF;

}

.layer2 {
  background:#DFCCE0;

}

.text-zone {
  position: absolute;
  top: 82.5%;
  left: 50%;
  transform: translate(-50%,-50%);
  overflow: hidden;
  color: #333;
  text-align: center;
  z-index: 3;
}

.text-zone p {
  position: relative;
  font-size: 50px;
  z-index: 10;
  margin: 0 50px;
}

.text-zone span {
  position: relative;
}

.text-zone span img {
  animation: moving_arrow 1s infinite;
}

@media screen and (max-width: 600px) {
  .bg-pic {
    background-image: url('../material/bg/Group 7.png') !important;
  }
}

@media screen and (min-width: 1000px) {
  .layer1, .layer2, .layer3 {
    height: calc(100% / 3);
  }
}

@keyframes bg_animation {
  from: {
    transform: scale(1) rotate(0deg);
  }
  to {
    transform: scale(2.25) rotate(-46deg);
  }
}

@keyframes layer2_animation {
  from: {
    clip-path: polygon(50% 0, 100% 0, 50% 100%, 0% 100%);
  }
  to {
    clip-path: polygon(100% 33%, 100% 66%, 0 66%, 0 34%);
  }
}

@keyframes moving_arrow {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(10px);
  }
}
</style>
