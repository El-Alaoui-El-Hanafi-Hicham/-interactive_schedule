
<template>

  <div :class="{ 'modal': true ,'show': isModalVisible,'fade':true }"  tabindex="-1">
     <div class="modal-dialog">
    <div class="modal-content">
            <div class="modal-header">
           <!-- Modal content goes here -->
        <h2>ADD BLOCK </h2>
            </div>
        <form @submit.prevent="emit('addBlockToSchedule')">
            <div class="modal-body">
              <div class="alert alert-danger text-uppercase " v-if="formErrors" role="alert">
  {{formErrors}}
</div>
            <div class="mb-3 d-flex flex-column align-items-start ">
  <label for="name" class="form-label">Person:</label>
          <input type="text" class="form-control" id="person" name="person" v-model="formData.person" />
  </div>
         <div class="mb-3 d-flex flex-column align-items-start ">

    <label for="startDay"  class="form-label">Start Day:</label>
<select  class="form-select" name="" id="" v-model="formData.startDay" >
<option  :selected="day === formData.startDay" :value="day" v-for="day in days.filter(day=>day!='Saturday' && day !='Sunday')" :key="day">{{day }}</option>

</select>
  </div>
        <div class="mb-3 d-flex flex-column align-items-start ">
     <label for="duration"  class="form-label">Duration:</label>
          <input type="number" id="duration"  class="form-control" name="duration" v-model="formData.duration" />
    <div id="EndDay" class="form-text text-success"> <span v-if="days[formData.duration  -1 + days.indexOf(formData.startDay)]"> End date will be  {{days[formData.duration  -1 + days.indexOf(formData.startDay)]}}</span></div>
  </div>  
         <div class="mb-3 d-flex flex-column align-items-start ">
    <label for="Subject"  class="form-label">Subject:</label>
          <input type="text" id="Subject"  class="form-control"  name="subject" v-model="formData.subject" />
    
  </div>
        
          
            </div>
          <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="emit('close')" data-bs-dismiss="modal">Close</button>
          <button type="submit"  class="btn btn-primary"   :disabled="!isValidForm">{{isValidForm ?"Add Block" : "Fix Errors"}}</button>
      </div>
        </form>
    </div>
      </div>
  </div>
</template>
<script setup>
const props = defineProps([
  'formData',
  'days',
  "persons",
  "isModalVisible",
  "isValidForm",
  "formErrors"

 ])
 const emit = defineEmits(["addBlockToSchedule","close"])
</script>
<script>

import { computed, onMounted, watch } from 'vue';
export default {

  setup:()=>{
 this.$emit('addBlockToSchedule')
 this.$emit('close');

  },
};
</script>

<style scoped>
/* Add your modal styles here */

</style>
