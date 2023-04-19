<template>
    <div >
        <transition name="fade-page" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
export default {
    
}
</script>

<style>
.fade-page-enter-active,
.fade-page-leave-active {
  transition: all 0.5s;
}
.fade-page-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-page-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>