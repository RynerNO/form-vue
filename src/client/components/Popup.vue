<template lang="pug">
  transition(name="fade")
    div(v-if="showPopup")
      div.container
        div.bg
        div.popup
          span.popup__text  {{ text }}
          button(@click="close" class="popup__button") Ок
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      showPopup: this.display
    }
  },
  methods: {
    show() {
      this.showPopup = true
    },
    close() {
      this.showPopup = false
    }
  }
}
</script>

<style lang="sass" scoped>
  .fade-enter 
    opacity: 1
    transition: 0.5s ease-in-out
  .fade-leave
    opacity: 0
    transition: 0.5s ease-in-out
  .container
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
  .bg
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: #000000
    opacity: 0.4
    pointer-events: none
    z-index: 5
  .popup
    display: flex
    flex-direction: column
    color: #222
    border-radius: 6px
    background: #f2f2f2
    padding: 0.3rem
    z-index: 10
    min-width: 200px
    max-width: 400px
    width: 90%
    min-height: 90px
    justify-content: center
    &__text
      font-size: 17px
      margin-top: auto
      margin-left: 0.5rem
    &__button
      margin-top: auto
      background: #3db3eb
      outline: none
      border: none
      color: #fff
      font-size: 16px
      border-radius: 5px
      padding: 0.3rem
      padding-left: 2rem
      padding-right: 2rem
      cursor: pointer
      user-select: none
      align-self: flex-end
      &:hover
        background: #2626fd
      &:active, &:focus
        background: #0101f3
</style>