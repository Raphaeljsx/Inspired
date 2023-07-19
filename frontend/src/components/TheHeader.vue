<template>
  <header>
    <nav>
      <router-link to="/" class="logo"> 1NSPIRED </router-link>
      <router-link to="/" class="btn"> Vender / Login </router-link>
    </nav>
  </header>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  font-size: 1.35rem;
  font-weight: bolder;
  letter-spacing: 1px;
  color: #65d;
}
</style>
