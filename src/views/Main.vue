<template>
<div id="main">
  <MainToolbar />
  <div class="space"></div>
  <div class="banner">
    <h1 class="title">Merge three official website's information</h1>
    <h1>
      <span>日向坂46</span>
      <span>櫻坂46</span>
      <span>乃木坂46</span>
    </h1>
  </div>
  <div class="link-area">
    <a @click="scrollTo('news-subtitle')"><span>news</span></a>
    <a @click="scrollTo('blog-subtitle')"><span>blog</span></a>
    <a href="/#/member"><span>member</span></a>
  </div>
  <div id="list-area">
    <h1 class="subtitle" id="news-subtitle">news</h1>
    <table cellspacing="0" cellpadding="0">
      <tr v-for="(news, index) in newses" :key="index" :style="{ color: groupsColor[news.group]}">
        <th>{{ news.date }}</th>
        <th>
          {{ news.differ.length > 0 ?  news.differ : 'ニュース'}}
        </th>
        <th><a :href="news.url" target=_blank>{{ news.title }}</a></th>
      </tr>
    </table>
    <div class="btn-area">
      <h3>see more</h3>
      <a href="https://www.hinatazaka46.com/s/official/news/list" target=_blank>
        日向坂46</a>
      <a href="https://sakurazaka46.com/s/s46/news/list" target=_blank>
        櫻坂46</a>
      <a href="http://www.nogizaka46.com/news/" target=_blank>
        乃木坂46</a>
    </div>
    <h1 class="subtitle" id="blog-subtitle">blog</h1>
    <table cellspacing="0" cellpadding="0">
      <tr v-for="(blog, index) in blogs" :key="index" :style="{ color: groupsColor[blog.group] }">
        <th>{{ blog.time }}</th>
        <th>{{ blog.name }}</th>
        <th><a :href="blog.url">{{ blog.title }}</a></th>
      </tr>
    </table>
    <div class="btn-area">
      <h3>see more</h3>
      <a href="https://www.hinatazaka46.com/s/official/diary/member" target=_blank>
        日向坂46</a>
      <a href="https://sakurazaka46.com/s/s46/diary/blog" target=_blank>
        櫻坂46</a>
      <a href="http://blog.nogizaka46.com/" target=_blank>
        乃木坂46</a>
    </div>
  </div>
  <div class="footer">
    <ul class="footer-col">
      <img src="@/material/img/LOGO-white.svg" alt="logo"/>
      <a @click="scrollTo('main')" id="to-top-btn">back to top</a>
    </ul>
    <ul class="footer-col">
      <li>
        <p>vue application produced by Teddy-SHU</p>
      </li>
      <li>
        <p>all data powerd by:</p>
      </li>
      <li>
        <p>©乃木坂46LLC</p>
      </li>
      <li>
        <p>©日向坂46LLC</p>
      </li>
      <li>
        <p>©櫻坂46LLC</p>
      </li>
    </ul>
    <ul class="footer-col">
      <li>
        <p>official website:</p>
      </li>
      <li>
        <a href="http://www.nogizaka46.com/">乃木坂46</a>
      </li>
      <li>
        <a href="https://www.hinatazaka46.com/">日向坂46</a>
      </li>
      <li>
        <a href="https://sakurazaka46.com/">櫻坂46</a>
      </li>
    </ul>
    <ul class="footer-col">
      <li>
        <p>official twitter:</p>
      </li>
      <li>
        <a href="https://twitter.com/nogizaka46">乃木坂46</a>
      </li>
      <li>
        <a href="https://twitter.com/hinatazaka46">日向坂46</a>
      </li>
      <li>
        <a href="https://twitter.com/sakurazaka46">櫻坂46</a>
      </li>
    </ul>
    <ul class="footer-col">
      <li>
        <p>contact me:</p>
      </li>
      <li>
        <p>mail: wne333wne@gmail.com</p>
      </li>
    </ul>
    <ul class="footer-col" id="copyright">
      <li>
        <p>Please inform me, if I infringement of patent. I will shout down this web immediately.</p>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import MainToolbar from '@/components/MainToolbar.vue'

export default {
  name: 'Main',
  data () {
    return {
      newses: [],
      blogs: [],
      isUpdatae: false,
      groupsColor: {
        Hinatazaka46: '#67b7b2',
        Sakurazaka46: '#F19DB5',
        Nogizaka46: '#7e1083'
      }
    }
  },
  components: {
    MainToolbar
  },
  created: async function () {
    new Promise((resolve, reject) => {
      let data
      try {
        data = axios.get('/crawl')
      } catch (e) {
        reject(e)
      }
      resolve(data)
    }).then((value) => {
      var rawNews = []
      var rawBlogs = []
      const rawData = value.data

      rawData.forEach((item) => {
        rawNews = rawNews.concat(item.newsDatas.slice(0, 3))
        rawBlogs = rawBlogs.concat(item.blogsDatas.slice(0, 3))
      })
      this.newses = [...rawNews]
      this.blogs = [...rawBlogs]
    }).catch(err => console.log(err))
  },
  methods: {
    scrollTo (elementId) {
      var bodyRect = document.body.getBoundingClientRect()
      var elemRect = document.getElementById(elementId).getBoundingClientRect()
      var offset = elemRect.top - elemRect.height - bodyRect.top
      document.scrollingElement.scrollTop = offset
    }
  }
}
</script>

<style lang="css" scoped>
* {
  scroll-behavior: smooth;
}
.space {
  width: 100%;
  height: 48px;
  background: transparent;
}
.banner {
  position: relative;
  margin: 3vh auto;
  width: 90vw;
  height: 65vh;
  border: 5px solid #7e1083;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.banner::before {
  content: '';
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  margin: 5px;
  width: calc(90vw - 20px);
  height: calc(65vh - 20px);
  border: 5px solid #F19DB5;
}

.banner::after {
  content: '';
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  margin: 15px;
  width: calc(90vw - 40px);
  height: calc(65vh - 40px);
  border: 5px solid #67b7b2;
}
.banner .title {
  font-size: 4vw;
  margin-bottom: 5vh;
}
.banner span {
  margin-right: 5vw;
  font-size: 3.6vw;
}
.banner span:nth-child(1) {
  border-bottom: 5px solid #67b7b2;
}
.banner span:nth-child(2) {
  border-bottom: 5px solid #F19DB5;
}
.banner span:nth-child(3) {
  border-bottom: 5px solid #7e1083;
}
.link-area {
  width: 100vw;
  height: fit-content;
  display: flex;
  justify-content: space-evenly;
  margin: 5vh 0;
}
.link-area a {
  position: relative;
  width: fit-content;
  height: fit-content;
  overflow:hidden !important;
  cursor: pointer;
}
.link-area a span {
  position: relative;
  padding: 8px 20px;
  font-size: 5vw;
  letter-spacing: 2px;
  color: transparent;
  -webkit-text-stroke: 2px white;
  text-transform: uppercase;
}
.link-area a span::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -5px;
  width: calc(100% + 10px);
  height: calc(100% + 10px);
  background: linear-gradient(134deg, rgba(103,183,178,1) 0%, rgba(103,183,178,1) 33%,
              rgba(241,157,181,1) 33%, rgba(241,157,181,1) 66%, rgba(126,16,131,0.8) 66%);
  z-index: -1;
  transition : 0.3s linear;
}
.link-area a:hover span::before {
  background: linear-gradient(134deg, #418B86 0%, #418B86 33%,
              #E85E85 33%, #E85E85 66%, rgba(126,16,131,1) 66%);
}
.subtitle {
  margin: 0 2.5vw;
  display:inline-block;
  text-transform: uppercase;
  background: linear-gradient(134deg, rgba(103,183,178,1) 0%, rgba(103,183,178,1) 33%,
              rgba(241,157,181,1) 33%, rgba(241,157,181,1) 66%, rgba(126,16,131,1) 66%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
table {
   width: 100%;
   overflow-x:auto;
   padding: 0 2.5vw;
   border-top: 1px solid rgba(0,0,0,0.3);
}
tr:hover {
  background: #eee;
}
tr:hover a:link {
  text-decoration: underline;
}
tr th:nth-child(1) {
  width: 20%;
  text-align: right;
}
tr th:nth-child(2) {
  width: 20%;
}
tr th:nth-child(3) {
  width: 60%;
  text-align: left;
}
th {
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin: 0;
}
a {
  width: auto;
  height: auto;
}
a:link {
  text-decoration: none;
  color: inherit;
}

a:visited {
  text-decoration: none;
  color: inherit;
}

.btn-area {
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}
.btn-area h3 {
  text-transform: uppercase;
  flex-basis: 100%;
  text-align: center;
  margin: 1rem 0;
  letter-spacing: 4px;
  opacity: 0.8;
}

.btn-area a {
  position: relative;
  padding: 10px;
  overflow: hidden;
  background: rgba(255,255,255,0.1);
  box-shadow: 0 5px 5px rgba(0,0,0,0.2);
  color: white;
}

.btn-area a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent,
                rgba(255,255,255,0.4), transparent);
  transition: 0.5s;
}

.btn-area a:hover::before {
  left: 100%;
}

.btn-area a:nth-child(2) {
  background: rgb(103, 183, 178);
}
.btn-area a:nth-child(3) {
  background: rgb(241, 157, 181);
}
.btn-area a:nth-child(4) {
  background: rgb(126, 16, 131);
}

.footer {
  position: relative;
  margin-top: 2vh;
  padding: 2vh 0;
  width: 100vw;
  height: fit-content;
  display: flex;
  align-items: start;
  justify-content: space-evenly;
  flex-wrap: wrap;
  /*background : rgba(0,0,0,1);*/
  background: #0B090B;
  color: rgba(255,255,255,0.8);
}
.footer ul {
  list-style-type: none;
}
.footer li {
  margin-top: 1rem;
}
.footer li:nth-child(1) {
  border-bottom: 1px solid rgba(255,255,255,0.2);
  font-size: 1.25rem;
  font-weight: bold;
  color: rgba(255,255,255,0.9);
}
.footer-col {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  margin: 20px;
}
.footer-col a {
  z-index: 2;
}
.footer-col a:hover {
  text-decoration: underline;
}
#to-top-btn {
  display: block;
  width: 100%;
  text-align: end;
  margin-top: 1rem;
  cursor: pointer;
}
#copyright {
  flex-basis: 100%;
}
@media only screen and (hover: none) and (pointer: coarse){
  a:link {
    text-decoration: underline;
  }
}
</style>
