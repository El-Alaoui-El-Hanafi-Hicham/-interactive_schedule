
<template>
  <div class="header-row">
    <div class="details-cell">Persons</div>
    <div class="schedule-block">
      <div v-for="day in days" :key="day" class="header-cell">{{ day }}</div>
    </div>
  </div>
</template>

<script>
import {useMainStore} from '../store/mainStore'
export default {
setup(){
    const store =useMainStore();
    const days = store.getDays
    return {days}
}
};
</script>
