<template lang="pug">
  div.multi-select
    div(v-for="(value, index) in values" :key="index" :class="{'multi-select__option_selected' : selected.indexOf(value) !== -1}" @click="select(value)").multi-select__option
      span {{ value }}
</template>

<script>
export default {
 props: {
   values: {
     type: Array,
     required: true
   }
 },
 data() {
   return {
     selected: []
   }
   
 },
 methods: {
   select(value) {
     if(this.selected.indexOf(value) === -1) {
       this.selected.push(value)
     } else {
       this.selected.splice(this.selected.indexOf(value), 1)
     }
     this.$emit('select', this.selected)
   }
 }
}
</script>

<style lang="sass">
  .multi-select
    display: flex
    &__option
      padding: 0.5rem
      background: #fff
      color: #222
      border-radius: 3px
      margin: 0.1rem
      cursor: pointer
      user-select: none
      &_selected
        background: #26c80f
        color: #fff
</style>