<!-- EmptyScheduleBlock.vue -->
<template>
  <div :class="{'schedule-block':true,'droppable': isDragging}" @dragover.prevent>
    <div
      v-for="day in days"
      :key="`${person}-${day}`"
      :class="{
        'schedule-cell': true,
        'disabledCell': isWeekEnd(day),
        'selected': isSelected(day, person),
        
      }"
      :id="days.indexOf(day) + '-' + person"
      @drop.prevent="$emit('onDrop',$event, person,day)"
      @click="$emit('showModal',person, day)"
      @mousemove="$emit('handleMouseMove',$event, day, person)"
      @mousedown="$emit('onMouseDown',day, person, $event)"
      @mouseup="$emit('handleMouseUp')"
    >{{isDragging?"drop Here" :""}}</div>
  </div>
</template>

<script>
    import {defineProps, ref, watch} from 'vue';
    import {useMainStore} from '../store/mainStore'
import {useMouseEvents} from '../mixins/useMouseEventsMixin';

export default {
  props: {person:String,isDragging: Boolean, isWeekEnd:Function,isSelected:Function},
  // Add your methods here
  setup(){
      const {   isMouseDown,
    hoveredDays,
    hoveredDivs,
    SelectedPerson,
    isWeekEnd,
    handleMouseUp,
    onMouseDown,

   
    handleMouseMove,} = useMouseEvents()
    const store =useMainStore();
    const days = store.getDays;
    const block =ref(store.getBlock)

    

    return{ days,handleMouseMove,handleMouseUp,onMouseDown}
  },
  
};
</script>
