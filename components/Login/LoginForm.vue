<template>
    <div>
        <form class="login-form text-center">
      <p>Mode: {{mode}}</p>
      <div class="login-form__input-group" :class="{invalid: $v.user.email.$error}">
        <label class="login-form__label" for="email">Email</label>
        <input class="login-form__input" id="email" type="text" v-model="user.email" placeholder="eg. username@gmail.com" @blur="$v.user.email.$touch()">
      </div>
      <div class="login-form__input-group" :class="{invalid: $v.user.password.$error}">
        <label class="login-form__label" for="password">Password</label>
        <input class="login-form__input" id="password" type="password" v-model="user.password" placeholder="Pssst... don't use 'password'" @blur="$v.user.password.$touch()">
      </div>
      <div class="input-group">
        <button class="login-form__button" @click.prevent="submitLogin" :disabled="$v.$invalid">{{mode.toUpperCase()}}</button>
      </div>
    </form>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        formValid() {
            return true
        }
    },
    props: ['mode'],
    methods: {
        submitLogin() {
            this.$emit('submitLogin', this.user)
        }
    },
    validations: {
        user: {
            email: {
                required: required,
                email: email
            },
            password: {
                required: required,
                minLength: minLength(6)
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

