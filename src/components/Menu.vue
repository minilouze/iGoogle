<template>
  <ul id="iGoogle-menu">
    <li><a href="#gmail">Gmail</a></li>
    <li><a href="#images">Images</a></li>
    <li>
      <a href="#grid"
        ><img class="grid" src="@/assets/grid.svg" title="Google apps"
      /></a>
    </li>
    <li>
      <a class="links" href="#user">
        <md-avatar>
          <img src="@/assets/emile-doyen(NB).jpg" alt="Avatar" />
        </md-avatar>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#iGoogle-menu {
  display: flex;
  list-style: none;
  justify-content: end;
  align-items: center;
  & > li {
    a {
      line-height: 0;
      display: block;
      color: #000;
      text-align: center;
      text-decoration: none;
      font-size: 14px;
      &:hover {
        text-decoration: underline;
      }
    }
    &:first-child {
      margin-left: auto;
    }
    &:not(:last-child) {
      margin-right: 15px;
    }
  }
  .md-avatar img {
    object-fit: cover;
  }
}
.grid {
  width: 20px;
}
</style>