<script setup>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<template>
  <div class="container_geral">
    <TheHeader />
    <main>
      <router-view v-slot="{ Component }">
        <transition mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

#app {
  max-width: 100%;
  padding: 0;
}

:root {
  --cor-geral: #345;
  --cor-secundaria: #87f;
  --sombra: 0 4px 0px rgba(30, 60, 90, 0.2);
  --font: 'Poppins', Helvetica, Arial, sans-serif;
  --hover: #65d;
  --prize-color: #e80;
  --disabled: #a99dfa;
}

* {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
  background: url('./assets/pattern.svg') repeat top;
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

.container_geral {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

main {
  flex: 1;
}

label {
  margin-bottom: 5px;
}

input,
textarea {
  border-radius: 4px;
  border: none;
  padding: 15px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.3s;
  font-size: 1rem;
  font-family: 'Poppins', Arial, Helvetica, sans-serif;
  margin-bottom: 15px;
  width: 100%;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  outline: none;
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  border: 1px solid var(--cor-secundaria);
}

.invalido {
  border: 1px solid red;
}

.v-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.v-enter-from {
  transform: translate3d(0, -20px, 0);
}

.v-leave-to {
  transform: translate3d(0, 20px, 0);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
