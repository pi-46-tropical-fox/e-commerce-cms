<template>
  <div class="container">
    <div class="container__item landing-page-container">
      <div class="content__wrapper">
        <header class="header">
          <div class="menu-icon header__item">
            <router-link to="/login" class="btn btn-1">
              <svg>
                <rect x="0" y="0" fill="none" width="100%" height="100%" />
              </svg>
              LOGIN
            </router-link>
          </div>

          <h1 class="heading header__item">ECommerce - CMS</h1>
        </header>

        <p class="coords">N 49° 16' 35.173" / W 0° 42' 11.30"</p>

        <div class="ellipses-container">
          <h2 class="greeting">HELLO</h2>

          <div class="ellipses ellipses__outer--thin">
            <div class="ellipses ellipses__orbit"></div>
          </div>

          <div class="ellipses ellipses__outer--thick"></div>
        </div>

        <div class="scroller">
          <p class="page-title">home</p>

          <div class="timeline">
            <span class="timeline__unit"></span>
            <span class="timeline__unit timeline__unit--active"></span>
            <span class="timeline__unit"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Landing',
  components: {}
}
</script>

<style scoped>
html {
  font-size: 62.5%;
}

body {
  font-size: 1.4rem;
}

/* =14px */
h1 {
  font-size: 2.4rem;
}

/* =24px */
.container__item {
  margin: 0 auto 40px;
}

.landing-page-container {
  width: 100%;
  min-height: 100%;
  height: 90rem;
  background-image: url("https://s29.postimg.org/vho8xb2pj/landing_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  overflow: hidden;
  font-family: "Montserrat", sans-serif;
  color: #09383e;
}

.content__wrapper {
  max-width: 1200px;
  width: 90%;
  height: 100%;
  margin: 0 auto;
  position: relative;
}

.header {
  width: 100%;
  height: 2rem;
  padding: 4.5rem 0;
  display: block;
}

.menu-icon {
  width: 5rem;
  height: 1.5rem;
  display: inline-block;
  cursor: pointer;
}

.header__item {
  display: inline-block;
  float: left;
}

.menu-icon__line {
  width: 1.5rem;
  height: 0.2rem;
  background-color: #0c383e;
  display: block;
}
.menu-icon__line:before,
.menu-icon__line:after {
  content: "";
  width: 1.5rem;
  height: 0.2rem;
  background-color: #0c383e;
  display: inline-block;
  position: relative;
}
.menu-icon__line:before {
  left: 0.5rem;
  top: -0.6rem;
}
.menu-icon__line:after {
  top: -1.8rem;
}

.heading {
  width: 90%;
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  line-height: 1.7rem;
  margin: 0 auto;
  text-align: center;
}

.social-container {
  width: 7.25rem;
  list-style: none;
  overflow: hidden;
  padding: 0;
  margin: 0;
  float: right;
}
.social-container .social__icon {
  float: left;
  cursor: pointer;
}
.social-container .social__icon.social__icon--dr {
  margin-left: 0.5rem;
}
.social-container .social__icon.social__icon--dr img {
  height: 2rem;
}
.social-container .social__icon.social__icon--in {
  margin-left: 0.75rem;
}
.social-container .social__icon.social__icon--in img {
  height: 2rem;
}
.social-container .social__icon.social__icon--fb img {
  height: 2rem;
  margin: 0rem;
}

.coords {
  font-size: 1rem;
  display: inline-block;
  -webkit-transform: rotate(-90deg) translateY(50%);
  transform: rotate(-90deg) translateY(50%);
  float: left;
  position: relative;
  top: 40%;
  letter-spacing: 0.2rem;
  left: -11.5rem;
  margin: 0;
}

.ellipses-container {
  width: 50rem;
  height: 50rem;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  top: 10.5rem;
}
.ellipses-container .greeting {
  position: absolute;
  top: 11.6rem;
  left: 13rem;
  right: 0;
  margin: 0 auto;
  text-transform: uppercase;
  letter-spacing: 4rem;
  font-size: 2.2rem;
  font-weight: 400;
  opacity: 0.5;
}
.ellipses-container .greeting:after {
  content: "";
  width: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  display: inline-block;
  background-color: #0c383e;
  position: relative;
  top: -0.65rem;
  left: -5.05rem;
}

.ellipses {
  border-radius: 50%;
  position: absolute;
  top: 0;
  border-style: solid;
}

.ellipses__outer--thin {
  width: 100%;
  height: 100%;
  border-width: 1px;
  border-color: rgba(9, 56, 62, 0.1);
  -webkit-animation: ellipsesOrbit 15s ease-in-out infinite;
  animation: ellipsesOrbit 15s ease-in-out infinite;
}
.ellipses__outer--thin:after {
  content: "";
  background-image: url("https://s29.postimg.org/5h0r4ftkn/ellipses_dial.png");
  background-repeat: no-repeat;
  background-position: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  position: absolute;
  opacity: 0.15;
}

.ellipses__outer--thick {
  width: 99.5%;
  height: 99.5%;
  border-color: #09383e transparent;
  border-width: 2px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -webkit-animation: ellipsesRotate 15s ease-in-out infinite;
  animation: ellipsesRotate 15s ease-in-out infinite;
}

.ellipses__orbit {
  width: 2.5rem;
  height: 2.5rem;
  border-width: 2px;
  border-color: #09383e;
  top: 5rem;
  right: 6.75rem;
}
.ellipses__orbit:before {
  content: "";
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  display: inline-block;
  background-color: #09383e;
  margin: 0 auto;
  left: 0;
  right: 0;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}

.scroller {
  width: 7.5rem;
  display: inline-block;
  float: right;
  position: relative;
  top: -15%;
  -webkit-transform: translateY(50%);
  transform: translateY(50%);
  overflow: hidden;
}
.scroller .page-title {
  font-family: "Playfair Display", serif;
  letter-spacing: 0.5rem;
  display: inline-block;
  float: left;
  margin-top: 1rem;
}
.scroller .timeline {
  width: 1.5rem;
  height: 9rem;
  display: inline-block;
  float: right;
}
.scroller .timeline .timeline__unit {
  width: 100%;
  height: 0.1rem;
  display: block;
  background-color: #0c383e;
  margin: 0 0 2rem;
  opacity: 0.2;
}
.scroller .timeline .timeline__unit.timeline__unit--active {
  opacity: 1;
}
.scroller .timeline .timeline__unit.timeline__unit--active:after {
  opacity: 0.2;
}
.scroller .timeline .timeline__unit:after {
  content: "";
  width: 70%;
  height: 0.1rem;
  display: block;
  position: relative;
  float: right;
  background-color: #0c383e;
  top: 1rem;
}

@-webkit-keyframes ellipsesRotate {
  0% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  100% {
    -webkit-transform: rotate(-405deg);
    transform: rotate(-405deg);
  }
}

@keyframes ellipsesRotate {
  0% {
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
  100% {
    -webkit-transform: rotate(-405deg);
    transform: rotate(-405deg);
  }
}
@-webkit-keyframes ellipsesOrbit {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes ellipsesOrbit {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

* {
  box-sizing: inherit;
  -webkit-transition-property: all;
  transition-property: all;
  -webkit-transition-duration: 0.6s;
  transition-duration: 0.6s;
  -webkit-transition-timing-function: ease;
  transition-timing-function: ease;
}

.buttons {
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  height: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.btn {
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 400;
  line-height: 45px;
  margin: 0 0 2em;
  max-width: 160px;
  position: relative;
  text-decoration: none;
  text-transform: uppercase;
  width: 100%;
}
@media (min-width: 600px) {
  .btn {
    margin: 0 1em 2em;
  }
}
.btn:hover {
  text-decoration: none;
}

.btn-1 {
  background: #0e0d0d;
  font-weight: 100;
}
.btn-1 svg {
  height: 45px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
}
.btn-1 rect {
  fill: none;
  stroke: #fff;
  stroke-width: 2;
  stroke-dasharray: 422, 0;
  -webkit-transition: all 0.35s linear;
  transition: all 0.35s linear;
}

.btn-1:hover {
  background: rgba(225, 51, 45, 0);
  font-weight: 900;
  letter-spacing: 1px;
}
.btn-1:hover rect {
  stroke-width: 5;
  stroke-dasharray: 15, 310;
  stroke-dashoffset: 48;
  -webkit-transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
  transition: all 1.35s cubic-bezier(0.19, 1, 0.22, 1);
}
</style>
