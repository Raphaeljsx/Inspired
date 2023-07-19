<template>
  <div id="app">
    <TheHeader />
    <main>
      <router-view></router-view>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
export default {
  setup() {
    return {};
  },
  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

:root {
  --cor-geral: #345;
  --cor-secundaria: #87f;
  --sombra: 0 4px 0px rgba(30, 60, 90, 0.2);
  --font: "Poppins", Helvetica, Arial, sans-serif;
  --hover: #65d;
}

* {
  box-sizing: border-box;
}

body,
ul,
li,
h1,
h2,
p {
  padding: 0;
  margin: 0;
}

ul {
  list-style: none;
}

body {
  font-family: var(--font);
  color: var(--cor-geral);
  background: url("./assets/pattern.svg") repeat top;
}

a {
  color: var(--cor-geral);
  text-decoration: none;
}

img,
picture,
svg {
  max-width: 100%;
  display: block;
}

.btn {
  display: block;
  padding: 10px 30px;
  background: var(--cor-secundaria);
  border-radius: 4px;
  color: #fff;
  text-align: center;
  font-size: 1rem;
  box-shadow: var(--sombra);
  transition: all 0.3s;
  border: none;
  font-family: var(--font);
  cursor: pointer;
}

.btn:hover {
  background: var(--hover);
  transform: scale(1.1);
}

#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}

input,
textarea {
  border-radius: 4px;
  border: none;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
}

input:hover,
textarea:hover,
input:focus,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border-color: var(--cor-secundaria);
}
</style>
