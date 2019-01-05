<template>
  <div>
    <form class="event-form">
      <h3 class="section-heading">Your Details</h3>
      <fieldset>
        <label class="event-form__label" for="clientFirstName">First name</label>
        <input class="event-form__input" v-model="event.title" id="clientFirstName" type="text" placeholder="John">
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="clientLastName">Last name</label>
        <input class="event-form__input" v-model="client.firstName" id="clientLastName" type="text" placeholder="Smith">
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="clientEmailAddress">Email address</label>
        <input class="event-form__input" v-model="client.emailAddress" id="clientEmail" type="text" placeholder="johnsmith@example.com">
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="clientPhoneNumber">Phone number</label>
        <input class="event-form__input" v-model="client.phoneNumber" id="clientPhoneNumber" type="text" placeholder="0712345678">
      </fieldset>
      <h3 class="section-heading">Event Details</h3>
      <fieldset>
        <label class="event-form__label" for="event-title">Title</label>
        <input class="event-form__input" v-model="client.lastName" id="event-title" type="text" placeholder="Event title">
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="event-description">Description</label>
        <textarea class="event-form__input" v-model="event.description" id="event-description" placeholder="Event description" rows=10></textarea>
      </fieldset>
      <fieldset>
        <label class="event-form__label">Featured image</label>
        <image-upload></image-upload>
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="event-type">Event type</label>
        <div class="radio-group">
          <input type="radio" v-model="event.recurring" name="event-type" :value="false" checked>
          <p>Single</p>
          <input type="radio" v-model="event.recurring" name="event-type" :value="true">
          <p>Recurring</p>
        </div>
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="event-start-date">Date</label>
        <input class="event-form__input" v-model="formStartDate" id="event-start-date" type="date" placeholder="Event start date">
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="event-start-time">Start time</label>
        <input class="event-form__input" v-model="formStartTime" id="event-start-time" type="time" placeholder="Event start time">
        <DatePicker v-model="formStartDate"></DatePicker>
        <p>{{formStartDate}}</p>
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="event-end-time">End time</label>
        <input class="event-form__input" v-model="formEndTime" id="event-end-time" type="time" placeholder="Event end time">
      </fieldset>
      <fieldset>
        <label class="event-form__label" for="private">Public / Private</label>
        <div class="radio-group">
          <input type="radio" v-model="event.private" name="event-type" :value="false" checked>
          <p>Public</p>
          <input type="radio" v-model="event.private" name="event-type" :value="true">
          <p>Private</p>
        </div>
      </fieldset>
      <h3 class="section-heading">Terms &amp; Conditions</h3>
      <fieldset>
        <label class="event-form__label" for="terms-and-conditions">Standard Conditions of Hire</label>
        <div class="terms-conditions">{{termsAndConditions}}</div>
        <div class="checkbox-group">
          <input type="checkbox" v-model="event.acceptedTerms">
          <p>I accept the Standard Conditions of Hire</p>
        </div>
      </fieldset>
      <button @click.prevent="saveEvent()">Create Event</button>
    </form>
    <toast :toast="toast"></toast>
  </div>
</template>

<script>
import Toast from '~/components/Base/Toast.vue'
import ImageUpload from '~/components/Base/ImageUpload.vue'
import DatePicker from '~/components/Base/DatePicker/DatePicker.vue'

  export default {
    name: 'eventForm',
    data() {
      return {
        client: {
          firstName: null,
          lastName: null,
          emailAddress: null,
          phoneNumber: null
        },
        formTitle: 'Request a booking',
        formStartDate: null,
        formStartTime: null,
        formEndTime: null,
        // formRecurringEvent: null,
        event: {
          title: '',
          description: '',
          recurring: false,
          private: false,
          acceptedTerms: false
        },
        termsAndConditions: null
      }
    },
    components: {
      Toast,
      ImageUpload,
      DatePicker
    },
    props: ['toast'],
    methods: {
      saveEvent() {
        const event = {
          ...this.event,
          ...this.unixTime
        }
        console.log('Event: ', event)
        this.$store.dispatch('createEvent', event)
          .then(res => {
            console.log(res)
          })
          .catch(e => {
            console.log(e)
          })
        // singleEvent = {...singleEvent, ...unixTime}
        // this.$store.dispatch('saveEvent', singleEvent)
        // .then(() => {
        //   this.$emit('addEvent', singleEvent)
        //   this.toast.status = 'good'
        //   this.toast.message = 'Event successfully saved!'
        // })
        // .catch((e) => {
        //   console.log('event push error')
        //   console.log(e)
        //   this.toast.status = 'error'
        //   this.toast.message = 'Something went wrong!'
        // })
      }
    },
    computed: {
      unixTime() {
        return {
          startDateTime: Date.parse(`${this.formStartDate} ${this.formStartTime}`),
          endDateTime: Date.parse(`${this.formStartDate} ${this.formEndTime}`)
        }
      },
      recurringEvent() {

        return this.formRecurringEvent === 'true'
      }
    },
    created() {
      this.$emit('created', {
        title: this.formTitle
      })
      this.$store.dispatch('getTermsAndConditions')
        .then(res => {
          this.termsAndConditions = res;
        })
        .catch(e => {
          console.log(error)
        })
    }
  }
</script>
