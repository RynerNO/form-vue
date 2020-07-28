<template lang="pug">
  div.date
    input(type="text" ref="day" class="date__input date__input-day" placeholder="ДД" maxlength="2" @keypress="checkNumberInput($event)" @paste="checkNumberPaste($event)" @input="sendDate; changeFocus($event)" v-model="date.day")
    input(type="text" ref="month" class="date__input date__input-month" placeholder="ММ" maxlength="2"  @keypress="checkNumberInput($event)" @input="sendDate; changeFocus($event)" v-model="date.month")
    input(type="text" ref="year" class="date__input date__input-year" placeholder="ГГГГ" maxlength="4"  @keypress="checkNumberInput($event)" @input="sendDate" v-model="date.year")
</template>

<script>
export default {
  data() {
    return {
      date: {
        day: '',
        month: '',
        year: '',
      }
      
    }
    
  },
  methods: {
    sendDate() {
      if(this.date.day.length === 2 && this.date.month.length === 2 && this.date.year.length === 4) {
         this.$emit('input', this.date)
      }
     
    },
    changeFocus(e) {
      const dayInput = this.$refs.day
      const monthInput = this.$refs.month
      const yearInput = this.$refs.year
      const inputs = [dayInput, monthInput, yearInput]
      if(+e.target.getAttribute('maxlength') === e.target.value.length) {
        inputs[inputs.indexOf(e.target)+1].focus()
      }
    },
    checkNumberPaste(e) {
     if(Number.isNaN(+e.clipboardData.getData("text"))) {
       e.preventDefault();
     }
    },
    checkNumberInput(e) {

      if(Number.isNaN(+e.key)) {
        e.preventDefault();
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.date
  display: flex
  &__input
    padding: 0.5rem
    
    &-day
      max-width: 40px
      border-radius: 3px 0px 0px 3px
    &-month
      max-width: 40px
    &-year
      max-width: 50px
      border-radius: 0px 3px 3px 0px
</style>