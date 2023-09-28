<!-- PersonRow.vue -->
<template>
    <div class="person-cell">{{ person }}</div>
    <!-- Schedule content goes here -->
</template>

<script>
export default {
  props: {'person':String},
};
</script>