<template>
    <div>
        <form class="login-form text-center">
      <p>Mode: {{mode}}</p>
      <div class="login-form__input-group" :class="{invalid: $v.user.email.$error}">
        <label class="login-form__label" for="email">Email</label>
        <input class="login-form__input" id="email" type="text" v-model.lazy="user.email" placeholder="eg. username@gmail.com" @blur="$v.user.email.$touch()">
        <p v-if="!$v.user.email.emailCheck">An account with this email already exists</p>
      </div>
      <div class="login-form__input-group" :class="{invalid: $v.user.firstName.$error}">
        <label class="login-form__label" for="firstName">First Name</label>
        <input class="login-form__input" id="firstName" type="text" v-model="user.firstName" placeholder="eg. John" @blur="$v.user.firstName.$touch()">
      </div>
      <div class="login-form__input-group" :class="{invalid: $v.user.lastName.$error}">
        <label class="login-form__label" for="lastName">Last Name</label>
        <input class="login-form__input" id="lastName" type="text" v-model="user.lastName" placeholder="eg. Smith" @blur="$v.user.lastName.$touch()">
      </div>
      <div class="input-group">
        <button class="login-form__button" @click.prevent="submitRegistration" :disabled="$v.$invalid">{{mode.toUpperCase()}}</button>
      </div>
    </form>
    <toast :toast="toast"></toast>
    </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'
import Toast from '~/components/Base/Toast.vue'

// export function emailCheck(value, parentVm) {
//     if (value === '') {
//         return true
//     }
//     return this.$axios.get(`${process.env.baseURL}users.json?orderBy="email"&equalTo="${value}"`)
//         .then(res => {
//             return Object.keys(res.data).length === 0
//         })
//         .catch(e => console.log(e))
// }

export default {
    data() {
        return {
            user: {
                firstName: '',
                lastName: '',
                email: '',
            }
        }
    },
    props: ['mode', 'toast'],
    components: {
        Toast
    },
    methods: {
        submitRegistration() {
            this.$store.dispatch('applyUser', this.user)
                .then((res) => {
                    this.toast.status = 'good'
                    this.toast.message = 'User applied'
                    this.clearForm()
                    setTimeout(() => {
                        this.toast = {}
                    }, 2000)
                })
                .catch(e => {
                    console.log('Error: ', e)
                    this.toast.status = 'error'
                    this.toast.message = e.message 
                    setTimeout(() => {
                        this.toast = {}
                    }, 2000)
                })
        },
        clearForm() {
            this.user = {
                firstName: '',
                lastName: '',
                email: ''
            }
            this.$nextTick(() => { this.$v.$reset() })
        }
    },
    created() {
    },
    validations: {
        user: {
            firstName: {
                required: required
            },
            lastName: {
                required: required
            },
            email: {
                required: required,
                email
                // emailCheck: emailCheck
            }
        }
    }
}
</script>

<style scoped>
.invalid {
    border: red solid 1px;
}

.invalid label{
    color: red;
}
</style>
