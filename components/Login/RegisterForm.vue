<template>
    <div>
        <form class="login-form text-center">
      <p>Mode: {{mode}}</p>
      <div class="login-form__input-group" :class="{invalid: $v.user.firstName.$error}">
        <label class="login-form__label" for="firstName">First Name</label>
        <input class="login-form__input" id="firstName" type="text" v-model="user.firstName" placeholder="eg. John" @blur="$v.user.firstName.$touch()">
      </div>
      <div class="login-form__input-group">
        <label class="login-form__label" for="lastName">Last Name</label>
        <input class="login-form__input" id="lastName" type="text" v-model="user.lastName" placeholder="eg. Smith" @blur="$v.user.lastName.$touch()">
      </div>
      <div class="login-form__input-group">
        <label class="login-form__label" for="email">Email</label>
        <input class="login-form__input" id="email" type="text" v-model.lazy="user.email" placeholder="eg. username@gmail.com" @blur="$v.user.email.$touch()">
      </div>
      <div class="input-group">
        <button class="login-form__button" @click.prevent="submitRegistration" :disabled="$v.$invalid">{{mode.toUpperCase()}}</button>
      </div>
    </form>
    </div>
</template>

<script>
import { required, minLength, email } from 'vuelidate/lib/validators'

export function emailCheck(value, parentVm) {
    if (value === '') {
        return true
    }
    return this.$axios.get(`${process.env.baseURL}users.json?orderBy="email"&equalTo="${value}"`)
        .then(res => {
            return Object.keys(res.data).length === 0
        })
        .catch(e => console.log(e))
}

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
    props: ['mode'],
    methods: {
        submitRegistration() {
            this.$emit('submitRegistration', this.user)
        }
    },
    created() {
        console.log(this)
    },
    validations: {
        user: {
            firstName: {
                required: required,
                minLength: minLength(3)
            },
            lastName: {
                required,
                minLength: minLength(3)
            },
            email: {
                required,
                email,
                emailCheck: emailCheck
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
