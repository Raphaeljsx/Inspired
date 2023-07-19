<template>
  <footer>
    <p>1NSPIRED. Direitos Reservados</p>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  setup() {
    return {};
  },
};
</script>

<style scoped>
footer {
  top: 80px;
  background: var(--cor-secundaria);
  padding: 25px 0;
  text-align: center;
  font-size: 1.2rem;
  color: #fff;
  position: relative;
}
</style>
