<template>
  <div>
    <form class="form event-form">
      <h3 class="form-section__heading">Your Details</h3>
      <section class="form-section">
        <div class="form-section__group form-section__group--row">
          <div class="form-section__group form-section__group--column">
            <fieldset class="form__fieldset">
              <label class="form__fieldset-label" for="clientFirstName">First name</label>
              <input class="form__fieldset-input" v-model="event.title" id="clientFirstName" type="text" placeholder="eg. John">
            </fieldset>
            <fieldset class="form__fieldset">
              <label class="form__fieldset-label" for="clientLastName">Last name</label>
              <input class="form__fieldset-input" v-model="client.firstName" id="clientLastName" type="text" placeholder="eg. Smith">
            </fieldset>
          </div>
          <div class="form-section__group form-section__group--column">
            <fieldset class="form__fieldset">
              <label class="form__fieldset-label" for="clientEmailAddress">Email address</label>
              <input class="form__fieldset-input" v-model="client.emailAddress" id="clientEmail" type="text" placeholder="eg. johnsmith@example.com">
            </fieldset>
            <fieldset class="form__fieldset">
              <label class="form__fieldset-label" for="clientPhoneNumber">Phone number</label>
              <input class="form__fieldset-input" v-model="client.phoneNumber" id="clientPhoneNumber" type="text" placeholder="eg. 0712345678">
            </fieldset>
          </div>
        </div>
      </section>
      <h3 class="form-section__heading">Event Details</h3>
      <section class="form-section">
        <div class="form-section__group form-section__group--row">
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="event-title">Title</label>
            <input class="form__fieldset-input" v-model="client.lastName" id="event-title" type="text" placeholder="eg. My Awesome Event">
          </fieldset>
        </div>
        <div class="form-section__group form-section__group--row">
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="event-description">Description</label>
            <textarea class="form__fieldset-input" v-model="event.description" id="event-description" placeholder="Add a description to let people know what your event is about" rows=10></textarea>
          </fieldset>
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label">Featured image</label>
            <image-upload></image-upload>
          </fieldset>
        </div>
        <div class="form-section__group form-section__group--row">
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="private">Public / Private</label>
            <div class="radio-group">
              <input type="radio" v-model="event.private" name="event-private" :value="false" checked>
              <p>Public</p>
              <input type="radio" v-model="event.private" name="event-private" :value="true">
              <p>Private</p>
            </div>
          </fieldset>
        </div>
      </section>
      <h3 class="form-section__heading">Date &amp; Time</h3>
      <section class="form-section">
        <div class="form-section__group form-section__group--row">
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="event-type">Event schedule</label>
            <div class="radio-group">
              <input type="radio" v-model="event.recurring" name="event-type" :value="false" checked>
              <p>Single</p>
              <input type="radio" v-model="event.recurring" name="event-type" :value="true">
              <p>Recurring</p>
            </div>
          </fieldset>
          <fieldset class="form__fieldset event-form__fieldset--date">
            <label class="form__fieldset-label" for="event-start-date">Event Date</label>
            <DatePicker v-model="formStartDate"></DatePicker>
          </fieldset>
        </div>
        <div class="form-section__group form-section__group--row">
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="event-start-time">Start time</label>
            <TimePicker v-model="formStartTime" id="event-start-time"></TimePicker>
          </fieldset>
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="event-end-time">End time</label>
            <TimePicker v-model="formEndTime" id="event-end-time"></TimePicker>
          </fieldset>
        </div>
      </section>
      <h3 class="form-section__heading">Terms &amp; Conditions</h3>
      <section class="form-section">
        <div class="form-section__group form-section__group--row">
          <fieldset class="form__fieldset">
            <label class="form__fieldset-label" for="terms-and-conditions">Standard Conditions of Hire</label>
            <div class="terms-conditions" v-html="parsedStandardConditions"></div>
            <div class="checkbox-group">
              <input type="checkbox" v-model="event.acceptedTerms">
              <p>I accept the Standard Conditions of Hire</p>
            </div>
          </fieldset>
        </div>
      </section>
      <section class="form-section">
        <div class="form-section__group form-section__group--column">
          <div class="form-section__group form-section__group--row">
            <button @click.prevent="saveEvent()">Create Event</button>
          </div>
          <toast :toast="toast"></toast>
        </div>
      </section>
    </form>
  </div>
</template>

<script>
import marked from 'marked'
import Toast from '~/components/Base/Toast.vue'
import ImageUpload from '~/components/Base/ImageUpload.vue'
import DatePicker from '~/components/Base/DatePicker/DatePicker.vue'
import TimePicker from '~/components/Base/TimePicker/TimePicker.vue'

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
      DatePicker,
      TimePicker
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
      },
      parsedStandardConditions() {
        if (this.termsAndConditions) {
          return marked(this.termsAndConditions, {sanitized: true})
        }
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
