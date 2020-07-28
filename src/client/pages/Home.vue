<template lang="pug">
  div.container
    h2 Создание клиента
    div.form
      div
        div.form-group(:class="{ 'form-group--error': $v.form.name.$error }")
          label.form__label Имя*
          input.form__input(v-model.trim="$v.form.name.$model")
        p.error(v-if="!$v.form.name.required && $v.form.name.$error") Введите ваше имя

        div.form-group(:class="{ 'form-group--error': $v.form.lastName.$error }")
          label.form__label Фамилия*
          input.form__input(v-model.trim="$v.form.lastName.$model")
        p.error(v-if="!$v.form.lastName.required && $v.form.lastName.$error") Введите вашу фамилию

        div.form-group(:class="{ 'form-group--error': $v.form.patronymic.$error }")
          label.form__label Отчество
          input.form__input(v-model.trim="$v.form.patronymic.$model")
        p.error(v-if="$v.form.patronymic.$invalid && $v.form.patronymic.$model.length > 0") Неверный формат
        div.form-group
          label.form__label Пол
          select-vue(:values="['Мужской', 'Женский']" :placeholder="'Выберите пол'" @select="setSex($event)")
        div.form-group(:class="{ 'form-group--error': $v.form.birthDate.$error }")
          label.form__label Дата рождения*
          date(@input="setDate($event)").form__input-data
        p.error(v-if="$v.form.birthDate.$invalid && $v.form.birthDate.$error") Некоректный формат даты
        div.form-group(:class="{ 'form-group--error': $v.form.clientGroup.$error }")
          label.form__label Группа клиентов*
          multi-select(:values="['VIP', 'Проблемные', 'ОМС']" @select="setClientGroup($event)")
        p.error(v-if="$v.form.clientGroup.$invalid && $v.form.clientGroup.$error") Выберите группу
        div.form-group
          label.form__label Лечащий врач
          select-vue(:values="['Иванов', 'Захаров', 'Чернышева']" :placeholder="'Выберите врача'" @select="setDoctor($event)")
        div.form-group.form-group_checkbox
          label.form__label Не отправлять смс
          input.form__input-checkbox(type="checkbox" v-model="$v.form.sendMessage.$model")
      div
        div.form-group(:class="{ 'form-group--error': $v.form.index.$error }")
          label.form__label Индекс
          input.form__input(v-model.trim="$v.form.index.$model")
        p.error(v-if="$v.form.index.$error && $v.form.index.$model.length > 0") Неверный формат
        div.form-group(:class="{ 'form-group--error': $v.form.country.$error }")
          label.form__label Страна
          input.form__input(v-model.trim="$v.form.country.$model")
        p.error(v-if="$v.form.country.$error && $v.form.country.$model.length > 0") Неверный формат
        div.form-group(:class="{ 'form-group--error': $v.form.region.$error }")
          label.form__label Область
          input.form__input(v-model.trim="$v.form.region.$model")
        p.error(v-if="$v.form.region.$error && $v.form.region.$model.length > 0") Неверный формат
        div.form-group(:class="{ 'form-group--error': $v.form.city.$error }")
          label.form__label Город*
          input.form__input(v-model.trim="$v.form.city.$model")
        p.error(v-if="$v.form.city.$error && $v.form.city.$model.length > 0") Неверный формат
        p.error(v-if="$v.form.city.$error && $v.form.city.$model.length === 0") Укажите свой город
        div.form-group(:class="{ 'form-group--error': $v.form.street.$error }")
          label.form__label Улица
          input.form__input(v-model.trim="$v.form.street.$model")
        p.error(v-if="$v.form.street.$error && $v.form.street.$model.length > 0") Неверный формат
        div.form-group(:class="{ 'form-group--error': $v.form.house.$error }")
          label.form__label Дом
          input.form__input(v-model.trim="$v.form.house.$model")
        p.error(v-if="$v.form.house.$error && $v.form.house.$model.length > 0") Неверный формат
      div
        div.form-group(:class="{ 'form-group--error': $v.form.documentType.$error }")
          label.form__label Тип документа*
          select-vue(:values="['Паспорт', 'Свидетельство о рождении', 'Вод. удостоверение']" :placeholder="'Выберите тип документа'" @select="setDocumentType($event)")
        p.error(v-if="$v.form.documentType.$error") Укажите тип документа 
        div.form-group(:class="{ 'form-group--error': $v.form.documentType.$error }")
          label.form__label Серия
          input.form__input(v-model.trim="$v.form.series.$model")
        p.error(v-if="$v.form.series.$error && $v.form.series.$model.length > 0") Неверный 
        div.form-group(:class="{ 'form-group--error': $v.form.documentType.$error }")
          label.form__label Номер
          input.form__input(v-model.trim="$v.form.pasportNumber.$model")
        p.error(v-if="$v.form.pasportNumber.$error && $v.form.pasportNumber.$model.length > 0") Неверный формат
        div.form-group(:class="{ 'form-group--error': $v.form.documentType.$error }")
          label.form__label Кем выдан
          input.form__input(v-model.trim="$v.form.issuedBy.$model")
        p.error(v-if="$v.form.issuedBy.$error && $v.form.issuedBy.$model.length > 0") Неверный формат
        div.form-group(:class="{ 'form-group--error': $v.form.issueDate.$error }")
          label.form__label Дата выдачи*
          date(@input="setIssueDate($event)").form__input-data
        p.error(v-if="$v.form.issueDate.$invalid && $v.form.issueDate.$error") Некоректный формат даты
      button(@click.prevent="submitForm" :disabled="$v.form.$invalid" class="form__button") Создать клиента
    popup(:text="'Клиент создан'" ref="popup")
</template>

<script>
import { required, minLength, between, numeric, helpers	} from 'vuelidate/lib/validators'


import select from '@components/Select.vue'
import date from '@components/InputDate.vue'
import multiSelect from '@components/MultiSelect.vue'
import popup from '@components/Popup.vue'

const alphaCyrillic = helpers.regex('alphaCyrillic', /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ]+$/);
const alphaNumCyrillic = helpers.regex('alphaCyrillic', /^[аАбБвВгГдДеЕёЁжЖзЗиИйЙкКлЛмМнНоОпПрРсСтТуУфФхХцЦчЧшШщЩъЪыЫьЬэЭюЮяЯ0123456789]+$/);

export default {
  components: {
    selectVue: select,
    date,
    popup,
    'multi-select': multiSelect
  },
  data() {
    return {
      formSubmited: false,
      form: {
        name: '',
        lastName: '',
        patronymic: '',
        sex: '',
        birthDate: {
          day: '',
          month: '',
          year: '',
        },
        clientGroup: [],
        sendMessage: false,
        doctor: '',
        index: '',
        country: '',
        region: '',
        city: '',
        street: '',
        house: '',
        documentType: '',
        series: '',
        pasportNumber: '',
        issuedBy: '',
        issueDate: {
          day: '',
          month: '',
          year: ''
        }
      }
    }
  },
  validations: {
    form:{
      name: {
        alphaCyrillic,
        required
      },
      lastName: {
        alphaCyrillic,
        required,
      },
      patronymic: {
        alphaCyrillic
      },
      sex: {
      },
      birthDate: {
        day: {
          required,
          between: between(1, 31)
        },
        month: {
          required,
          between: between(1, 12)
        },
        year: {
          required,
          between: between(1950, 2020)
        }
      },
      clientGroup: {
        required
      },
      index: {
        numeric
      },
      country: {
        alphaCyrillic
      },
      sendMessage: {},
      region: {
        alphaCyrillic
      },
      city: {
        alphaCyrillic, required
      },
      street: {
        alphaNumCyrillic,        
      },
      house: {
        alphaNumCyrillic
      },
      documentType: {
        required
      },
        series: {
          alphaNumCyrillic
        },
        pasportNumber: {
          numeric
        },
        issuedBy: {
          alphaCyrillic
        },
        issueDate:{
          day: {
            required,
            between: between(1, 31)
          },
          month: {
            required,
            between: between(1, 12)
          },
          year: {
            required,
            between: between(1950, 2020)
          }
      },
    }
  },
  methods: {
    submitForm() {
      this.formSubmited = true
      this.$refs.popup.show()
    },
    setIssueDate(value) {
      console.log(value)
      this.form.issueDate = value
      this.$v.form.issueDate.$touch()
    },
    setDocumentType(value) {
      this.form.documentType = value
      this.$v.form.documentType.$touch()
    },
    setDoctor(value) {
      this.form.doctor = value
    },
    setClientGroup(value) {
      this.form.clientGroup = value
      this.$v.form.clientGroup.$touch()
    },
    setSex(value) {
      this.form.sex = value
      this.$v.form.sex.$touch()  
    },
    setDate(value) {
      this.form.birthDate = value
      this.$v.form.birthDate.$touch()  
    }
  }
}
</script>

<style lang="sass" scoped>
  @keyframes shake
    0%
      transform: translateX(10px)
    50%
      transform: translateX(-10px)
    75%
      transform: translateX(5px)
    90%
      transform: translateX(-5px)
    100%
      transform: translateX(0px)
  .container
    width: 100%
    background: #222
    color: #fff
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    min-height: 100vh
    padding-top: 1rem
    padding-bottom: 1rem
  .error
    color: #ff7979
    margin-left: 1.5rem
  .form-group
    display: flex
    flex-direction: column 
    margin: 0.4rem
    margin-left: 1rem
    &_checkbox
      flex-direction: row
      align-items: center
    &--error
      
      .form
        &__label
          color: #ff7979
        &__input
          border: 1px solid #ff7979
          animation: shake 0.3s ease-in
          &-data
            animation: shake 0.3s ease-in
  .form
    display: grid
    grid-template-columns: repeat(3, 1fr)
    column-gap: 1rem
    margin-top: 1rem
    
    @media (max-width: 800px)
      grid-template-columns: repeat(2, 1fr)
    @media (max-width: 500px)
      grid-template-columns: repeat(1, 1fr)
    &__input
      padding: 0.5rem
      border-radius: 3px
    
      &-checkbox
        margin-left: 0.5rem
    &__label
      margin-bottom: 0.2rem
    &__button
      background: #0505fe
      outline: none
      border: none
      color: #fff
      font-size: 16px
      border-radius: 5px
      padding: 0.5rem
      padding-left: 2rem
      padding-right: 2rem
      justify-self: flex-end
      grid-column: span 3
      cursor: pointer
      user-select: none
      @media (max-width: 800px)
        grid-column: span 2
      @media (max-width: 500px)
        grid-column: span 1
        justify-self: center
        margin-top: 1rem
      &:hover
        background: #0202e6
      &:active, &:focus
        background: #0101b6
      &:disabled
        background: #c9c9c9
        cursor: none
        pointer-events: none
</style>