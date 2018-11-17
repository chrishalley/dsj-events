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
            <!-- <div class="input-group">
                <button class="login-form__button" @click.prevent="signOut">Sign Out</button>
            </div>
            <div class="input-group">
                <button class="login-form__button" @click.prevent="checkUser">Check User</button>
            </div>
            <div class="input-group">
                <button class="login-form__button" @click.prevent="addCookie">Add Cookie</button>
            </div> -->
            <toast :toast="toast"></toast>
        </form>
    </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import Toast from '~/components/Base/Toast.vue'
import firebase from 'firebase'

export default {
    data() {
        return {
            user: {
                email: '',
                password: ''
            },
            toast: {
                status: null,
                message: null
            }
        }
    },
    computed: {
        formValid() {
            return true
        }
    },
    components: {
        toast: Toast
    },
    props: ['mode'],
    methods: {
        submitLogin() {
                // Check whether user exists
                this.$store.dispatch('login', this.user)
                    .then(user => {
                        console.log('Successful login!')
                        this.$router.push('/')
                    })
                    .catch(e => {
                        console.log(e)
                        this.toast = {
                            status: 'error',
                            message: 'Login details incorrect'
                        }
                        setTimeout(() => {
                            this.toast = {
                                status: null,
                                message: null
                            }
                        }, 2000)
                    })
                // Check whether user is permitted

                // Check password matches

                // Push to dashboard
        },
        // signOut() {
        //     this.$store.dispatch('logUserOut')
        // },
        // checkUser() {
        //     console.log(firebase.auth().currentUser)
        // },
        // addCookie() {
        //     this.$store.dispatch('addCookie', 'kjdkhassadiasoijoijijowqoij')
        // }
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
