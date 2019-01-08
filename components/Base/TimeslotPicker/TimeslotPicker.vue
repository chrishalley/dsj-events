<template>
  <div class="timeslot-picker">
    <h1>Timeslot Picker</h1>
    <table>
      <thead>
        <tr>
          <th>Session</th>
          <th v-for="(day, i) in days" :key=i>{{day | initial}}</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  data() {
    return {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }
  },
  props: {

  }
}
</script>
