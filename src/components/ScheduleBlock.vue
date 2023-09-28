<template>
  <div class="schedule-block">
    <div
      :draggable="isBlockInRange(person, day) === 'isStartDayIndex'"
      @drag="$emit('ondrag', $event, block[person], person)"
      v-for="day in days"
      :key="`${person}-${day}`"
      :style="{
        width:
          isBlockInRange(person, day) === 'isStartDayIndex'
            ? `calc(100% / calc(7 - ${block[person]['duration']}))`
            : 'calc(100% / 7)',
      }"
      :class="{
        'schedule-cell': true,
        disabledCell: isWeekEnd(day),
        hidden: !isBlockInRange(person, day),
        isScheduled: isBlockInRange(person, day) === 'isStartDayIndex',
      }"
    >
      <span
        class="block-text w-100"
        @mousemove="$emit('handleMouseMove', $event, day, person)"
        @mousedown="$emit('onMouseDownday', person, $event)"
        @mouseup="$emit('handleMouseUp')"
        @click="$emit('showModal', person, day)"
        v-if="isBlockInRange(person, day) === 'isStartDayIndex'"
      >
        {{ block[person]["subject"] }}
      </span>
      <button
        class="ResizeLeft"
        v-if="canResizeLeft(person, day)"
        @click="GrowRightBlock(person)"
      >
        -
      </button>
      <button
        class="ResizeRight"
        v-if="canResizeRigt(person, day)"
        @click="GrowLeftBlock(person)"
      >
        +
      </button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMainStore } from "../store/mainStore";
import { useBlock } from "../mixins/useBlockMixin";
export default {
  props: {
    person: String,
    isWeekEnd: Function,
  },

  setup() {
    const { isBlockInRange } = useBlock();
    const store = useMainStore();
    const days = store.getDays;
    const block = ref(store.getBlock);

    const canResizeLeft = (person, day) => {
      return (
        days.indexOf(day) > 0 &&
        isBlockInRange(person, day) === "isStartDayIndex"
      );
    };
    const canResizeRigt = (person, day) => {
      const endDay = days.indexOf(day) + block.value[person].duration - 1;
      return (
        days.indexOf(day) + block.value[person].duration - 1 < 4 &&
        isBlockInRange(person, day) == "isStartDayIndex"
      );
    };
    const GrowLeftBlock = (person) => {
      if (store.GrowBlock(person)) {
        console.log("Block growed");
      }
    };

    const GrowRightBlock = (person) => {
      if (store.ShrinkBlock(person)) {
        console.log("Block Shrinked");
      }
    };

    return {
      days,
      block,
      canResizeLeft,
      isBlockInRange,
      canResizeRigt,
      GrowRightBlock,
      GrowLeftBlock,
    };
  },
  // Add your methods here
};
</script>
