<template>
  <div>
    <nav class="main-menu">
      <ul>
        <li class="fa">
        </li>
        <li>
          <a href>
            <router-link to="/dashboard">
              <i class="fa fa-home fa-2x" style="color: rgba(255, 255, 255, 0.699)"></i>
              <span class="nav-text" style="color: rgba(255, 255, 255, 0.699)">Dashboard</span>
            </router-link>
          </a>
        </li>
        <li>
          <a href>
            <router-link to="/addProduct">
              <i class="fa fa-list fa-2x" style="color: rgba(255, 255, 255, 0.699)"></i>
              <span class="nav-text" style="color: rgba(255, 255, 255, 0.699)">Add Product</span>
            </router-link>
          </a>
        </li>
        <li>
            <span class="fa "></span>
        </li>
        <li>
          <a href>
            <router-link to="/banner">
              <i class="fa fa-laptop fa-2x" style="color: rgba(255, 255, 255, 0.699)"></i>
              <span class="nav-text" style="color: rgba(255, 255, 255, 0.699)">Banner</span>
            </router-link>
          </a>
        </li>
        <li>
          <a href>
            <router-link to="/addBanner">
              <i class="fa fa-list fa-2x" style="color: rgba(255, 255, 255, 0.699)"></i>
              <span class="nav-text" style="color: rgba(255, 255, 255, 0.699)">Add Banner</span>
            </router-link>
          </a>
        </li>
        <li>
            <span class="fa "></span>
        </li>
        <li class="logout">
          <a @click.prevent="logout">
            <i class="fa fa-power-off fa-2x" style="color: #B22222"></i>
            <span class="nav-text">Logout</span>
          </a>
        </li>
        <!-- <li class="has-subnav">
                    <a href="#">
                        <i class="fa fa-laptop fa-2x"></i>
                        <span class="nav-text">
                            Banner
                        </span>
                    </a>

                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-list fa-2x"></i>
                        <span class="nav-text">
                            Forms
                        </span>
                    </a>

                </li>
                <li class="has-subnav">
                    <a href="#">
                       <i class="fa fa-folder-open fa-2x"></i>
                        <span class="nav-text">
                            Pages
                        </span>
                    </a>

                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-bar-chart-o fa-2x"></i>
                        <span class="nav-text">
                            Graphs and Statistics
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i class="fa fa-font fa-2x"></i>
                        <span class="nav-text">
                           Quotes
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i class="fa fa-table fa-2x"></i>
                        <span class="nav-text">
                            Tables
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                        <i class="fa fa-map-marker fa-2x"></i>
                        <span class="nav-text">
                            Maps
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                       <i class="fa fa-info fa-2x"></i>
                        <span class="nav-text">
                            Documentation
                        </span>
                    </a>
        </li>-->
      </ul>
<!--
      <ul class="logout">
        <li>
          <a @click.prevent="logout">
            <i class="fa fa-power-off fa-2x"></i>
            <span class="nav-text">Logout</span>
          </a>
        </li>
      </ul> -->
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        this.$router.push('/')
      })
    }
  }
}
</script>

<style>

@import url(//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css);

@import url(https://fonts.googleapis.com/css?family=Titillium+Web:300);
.fa-2x {
  font-size: 2em;
}
.fa {
  position: relative;
  display: table-cell;
  width: 60px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  font-size: 20px;
}

.main-menu:hover,
nav.main-menu.expanded {
  width: 210px;
  overflow: visible;
}

.main-menu {
  background: #212121;
  color:rgba(255, 255, 255, 0.699);
  border-right: 1px solid #e5e5e5;
  position: absolute;
  top: 0;
  bottom: 0;
  height: 111%;
  left: 0;
  width: 50px;
  overflow: hidden;
  -webkit-transition: width 0.05s linear;
  transition: width 0.05s linear;
  -webkit-transform: translateZ(0) scale(1, 1);
  z-index: 1000;
}

.main-menu > ul {
  margin: 7px 0;
}

.main-menu li {
  position: relative;
  display: block;
  width: 210px;
}

.main-menu li > a {
  position: relative;
  display: table;
  border-collapse: collapse;
  border-spacing: 0;
  /* color: #999; */
  color: #fff;
  font-family: arial;
  font-size: 14px;
  text-decoration: none;
  -webkit-transform: translateZ(0) scale(1, 1);
  -webkit-transition: all 0.1s linear;
  transition: all 0.1s linear;
}

.main-menu .nav-icon {
  position: relative;
  display: table-cell;
  width: 60px;
  height: 36px;
  text-align: center;
  vertical-align: middle;
  font-size: 18px;
}

.main-menu .nav-text {
  position: relative;
  display: table-cell;
  vertical-align: middle;
  width: 190px;
  font-family: "Titillium Web", sans-serif;
}

.main-menu > ul.logout {
  position: absolute;
  left: 0;
  bottom: 0;
}

.no-touch .scrollable.hover {
  overflow-y: hidden;
}

.no-touch .scrollable.hover:hover {
  overflow-y: auto;
  overflow: visible;
}

a:hover,
a:focus {
  text-decoration: none;
}

nav {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

nav ul,
nav li {
  outline: 0;
  margin: 0;
  padding: 0;
}

.main-menu li:hover > a,
nav.main-menu li.active > a,
.dropdown-menu > li > a:hover,
.dropdown-menu > li > a:focus,
.dropdown-menu > .active > a,
.dropdown-menu > .active > a:hover,
.dropdown-menu > .active > a:focus,
.no-touch .dashboard-page nav.dashboard-menu ul li:hover a,
.dashboard-page nav.dashboard-menu ul li.active a {
  color: #fff;
  background-color: #5fa2db;
}
</style>
