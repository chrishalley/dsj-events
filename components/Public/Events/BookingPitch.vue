<template>
  <div class="booking-pitch">
    <h2 class="booking-pitch__title">Hire our space!</h2>
    <p>Marzipan apple pie gingerbread lemon drops oat cake oat cake gummies wafer donut. Brownie marzipan topping candy canes lemon drops candy canes liquorice. Muffin chocolate bar carrot cake sugar plum candy canes sweet sweet jelly beans.</p>
    <p>Liquorice jelly beans sweet. Cookie toffee toffee candy canes cake bear claw icing gingerbread. Tart tootsie roll brownie danish jelly beans candy brownie powder sesame snaps.</p>
    <p>Cake candy canes cake brownie. Biscuit liquorice croissant candy canes. Powder gummies chocolate gummies lollipop. Sweet cotton candy cake danish biscuit candy ice cream carrot cake jujubes.</p>
    <button class="booking-pitch__button" @click="requestBooking">Request booking</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  methods: {
    requestBooking() {
      this.$emit('requestBooking');
    }
  }
}
</script>

