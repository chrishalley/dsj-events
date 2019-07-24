<template>
  <div>
    <form class="form event-form">
      <FormSection :formSectionProps="formSectionProps"/>
      <FormSection :formSectionProps="eventSectionProps" />
      <h3 class="form-section__heading">Event Details</h3>
      <section class="form-section">
        <div class="form-section__group form-section__group--row">
          <!-- <FormFieldset label="Event title" id="event.title" type="text" placeholder="eg. My Awesome Event" @input="inputHandler"></FormFieldset> -->
        </div>
        <div class="form-section__group form-section__group--row">
          <!-- <FormFieldset :fieldsetProps="{label: 'Description', placeholder: 'Please add a short description', type: 'textarea', id: 'event.description', validate: false }" @input="inputHandler"></FormFieldset> -->
          <!-- <FormFieldset label="Event description" id="event.description" type="textarea" rows="10" placeholder="Add a description to let people know what your event is about" @input="inputHandler"></FormFieldset> -->
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
        </div>
        <div class="form-section__group form-section__group-column">
          <TimeslotPicker allowPastWeeksProp="false"></TimeslotPicker>
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
import { required, email, minLength } from 'vuelidate/lib/validators'

import marked from 'marked'
import Toast from '~/components/Base/Toast.vue'
import ImageUpload from '~/components/Base/ImageUpload.vue'
import TimeslotPicker from '~/components/Base/TimeslotPicker/TimeslotPicker.vue'
// import FormFieldset from '~/components/Base/UI/FormFieldset/FormFieldset.vue'
// import FormFieldGroup from '~/components/Base/UI/FormFieldGroup/FormFieldGroup.vue'
import FormSection from '~/components/Base/UI/FormSection/FormSection.vue'
import FormFieldsetInput from '~/components/Base/UI/FormSection/FormFieldGroup/FormFieldset/Inputs/FormFieldsetInput.vue'
import FormFieldsetTextarea from '~/components/Base/UI/FormSection/FormFieldGroup/FormFieldset/Inputs/FormFieldsetTextarea.vue'


  export default {
    name: 'eventForm',
    data() {
      return {
        formSectionProps: {
          sectionTitle: 'Your Details',
          fieldGroups: [
            {
              fieldsets: [
                { label: 'First name', placeholder: 'eg. John', type: 'text', id: 'client.firstName', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetInput },
                { label: 'Last name', placeholder: 'eg. Smith', type: 'text', id: 'client.lastName', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetInput }
              ]
            },
            {
              fieldsets: [
                { label: 'Email address', placeholder: 'eg. john@example.com', type: 'email', id: 'client.emailAddress', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetInput },
                { label: 'Phone number', placeholder: 'eg. 0712345678', type: 'text', id: 'client.phoneNumber', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetInput }
              ]
            },
          ]
        },
        eventSectionProps: {
          sectionTitle: 'Event Details',
          fieldGroups: [
            {
              fieldsets: [
                { label: 'Event title', placeholder: 'eg. My awesome event', type: 'text', id: 'event.title', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetInput },
                { label: 'Event description', placeholder: 'Give your event a description', type: 'textarea', id: 'event.description', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetTextarea }
              ]
            },
            {
              fieldsets: [
                { label: 'Featured image', placeholder: 'Give your event an image!', type: 'text', id: 'event.img', validate: false, classes: ['form-fieldset__input'], component: FormFieldsetInput }
              ]
            }
          ]

        },
        client: {
          firstName: 'Geoff',
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
        termsAndConditions: null,
        errorMessages : {
          client: {
            firstName: {
              required: 'Please provide a first name'
            },
            lastName: {
              required: 'Please provide a last name'
            },
            emailAddress: {
              required: 'Please provide a valid email',
              email: 'Please provide a valid email'
            },
            phoneNumber: {
              required: 'Please provide a phone number'
            }
          },
          event: {
            title: {
              required: 'Please give your event a title'
            },
            description: {
              required: 'Please give your event a description'
            }
          }
        }
      }
    },
    components: {
      Toast,
      ImageUpload,
      TimeslotPicker,
      // FormFieldGroup,
      FormSection
    },
    props: ['toast'],
    methods: {
      saveEvent() {
        const event = {
          ...this.event,
          ...this.unixTime
        }
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
      },
      inputHandler(data, resolve) {

        // Updates data property with value from input event
          function updateObject(object, newValue, path){
            var stack = path.split('.');
            while(stack.length>1){
              object = object[stack.shift()];
            }
            object[stack.shift()] = newValue;
          }
        
        // Retrieves validation object for data property that has been updated
          function fetchFromObject(obj, prop) {
            if(typeof obj === 'undefined') {
              return false;
              }
              var _index = prop.indexOf('.')
              if(_index > -1) {
                return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
              }
              return obj[prop];
          }

        const promValidator = new Promise((resolve, reject) => {
          resolve(this.$v, data.property)
        })

        promValidator.then(result => {
          const prevValidator = result

          updateObject(this, data.value, data.property)
          
          const newValidator = fetchFromObject(this.$v, data.property)
          // const errorMessages = fetchFromObject(this.errorMessages, data.property)

          if (newValidator.$invalid === true) {
            const validator = Object.keys(newValidator).filter(key => {
              return newValidator[key] !== prevValidator[key] && !key.startsWith('$')
            })
            let errorMessages = []
  
            validator.forEach(rule => {
              const message = fetchFromObject(this.errorMessages, `${data.property}.${rule}`)

              const duplicates = errorMessages.map(errorMessage => {
                if (errorMessage.message === message) {
                  return errorMessage
                }
              })

              if (duplicates.length === 0) {
                errorMessages.push({
                  rule,
                  message
                })
              }
            })

            resolve(errorMessages)
          } else {
            resolve()
          }

        })
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
    validations: {
      client: {
        firstName: {
          required
        },
        lastName: {
          required
        },
        emailAddress: {
          required,
          email
        },
        phoneNumber: {
          required
        }
      },
      event: {
        title: {
          required
        },
        description: {
          required
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
