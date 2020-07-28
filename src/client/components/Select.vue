<template lang="pug">
  div.select
    div.select__selected(@click="showOptions = !showOptions" :class="{'select__selected_no-bottom-border' : showOptions}")
      span {{ text }}
      i.select__arrow-icon(:class="{'select__arrow-icon_up': showOptions}")
    transition(name="fade")
      div.select__options(v-if="showOptions")
        span(v-for="(value, index) in values" :key="index" @click="setSelected(value)" class="select__option" :class="{'select__option_selected': value === selected}") {{ value }}
</template>

<script>
export default {
  props: {
    values: {
      type: Array,
      required: true
    },
    placeholder: {
      type: String,
      required: false,
      default: ''
    }
  },
  data() {
    return  {
      selected: '',
      showOptions: false
    }
    
  },
  computed: {
    text() {
      return this.selected || this.placeholder
    }
  },
  methods: {
    setSelected(value) {
      this.selected = value
      this.$emit('select', value)
      this.showOptions = false
    }
  }
}
</script>

<style lang="sass">
  .select
    position: relative
    min-width: 200px
    &__selected
      width: 100%
      background: #fff
      display: flex
      align-items: center
      padding: 0.5rem
      border: 1px solid #222
      color: #222
      border-radius: 2px
      cursor: pointer
      &_no-bottom-border
        border-bottom: none
        
    &__arrow-icon
      width: 15px
      height: 15px
      position: relative
      margin-left: auto
      transition: transform 0.2s ease-in
      &::before, &::after 
        content: ''
        position: absolute
        width: 10px
        height: 2px
        background: #222
        top: 50%
      &::after
        transform: rotate(45deg)
      &::before
        transform: rotate(-45deg)
        left: 6px
      &_up
        transform: rotate(180deg)
        transition: transform 0.2s ease-in
    &__options
      width: 100%
      background: #fff
      display: flex
      flex-direction: column
      color: #222
      padding-top: 0.5rem
      padding-bottom: 0.5rem
      border-radius: 2px
      border: 1px solid #222
      border-top: none
      position: absolute
      max-height: 300px
      overflow-y: auto
    &__option
      cursor: pointer
      padding-top: 0.5rem
      padding-left: 0.5rem
      padding-bottom: 0.5rem
      &:hover
        background: #138fdd
        color: #fff
      &_selected
        background: #138fdd
        color: #fff
  .fade-enter-active, .fade-leave-active 
    transition: opacity .3s
  .fade-enter, .fade-leave-to
    opacity: 0

</style>