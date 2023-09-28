

<template>
  <div class="card">
    <div class="card-header">
      <span class="display-6 ">Interactive Schedule</span>
      </div>
    <main class="card-body">
      <header-row></header-row>
      <div v-for="person in persons" :key="person" class="person-row">
        <person-row-vue :person="person"></person-row-vue>

        <schedule-block
          v-if="hasSchedule(person)"
          :person="person"
          v-on:ondrag="Ondrag"
          v-on:showModal="showModal"
          v-on:handleMouseMove="handleMouseMove"
          v-on:onMouseDown="onMouseDown"
          v-on:handleMouseUp="handleMouseUp"
          :isWeekEnd="isWeekEnd"
        ></schedule-block>

        <EmptyScheduleBlock
          v-else
          :person="person"
          :isWeekEnd="isWeekEnd"
          :isSelected="isSelected"
          v-on:onDrop="OnDrop"
          v-on:handleMouseMove="handleMouseMove"
          v-on:onMouseDown="onMouseDown"
          v-on:handleMouseUp="handleMouseUp"
          v-on:showModal="showModal"
        ></EmptyScheduleBlock>
      </div>

      <!-- <button @click="showModal">Open Modal</button> -->
      <!-- Use the Modal component -->
      <NewBlockModal
        @addBlockToSchedule="addBlockToSchedule"
        :days="days"
        :persons="persons"
        :block="block"
        v-if="isModalVisible"
        :formData="formData"
        :isModalVisible="isModalVisible"
        @close="closeModal"
        :isValidForm="isValidForm"
        :formErrors="formErrors"
      >
      </NewBlockModal>
    </main>
    <div class="card-footer">
      Check documentation to understand better how the application works
    </div>
  </div>
</template>
<script>
import { onMounted, ref, watch } from "vue";
import NewBlockModal from "./components/NewBlockModal.vue";
import HeaderRow from "./components/HeaderRow.vue";
import Swal from "sweetalert2";
import { useMainStore } from "./store/mainStore";
import PersonRowVue from "./components/PersonRow.vue";
import ScheduleBlock from "./components/ScheduleBlock.vue";
import EmptyScheduleBlock from "./components/EmptyScheduleBlock.vue";
import { useModal } from "./mixins/useModalMixin";
import { useMouseEvents } from "./mixins/useMouseEventsMixin";
import { useBlock } from "./mixins/useBlockMixin";
export default {
  components: {
    NewBlockModal,
    HeaderRow,
    PersonRowVue,
    ScheduleBlock,
    EmptyScheduleBlock,
  },

  setup() {
    /*************************************** */
    ///****  Variables Declaration ****///
    /*************************************** */

    //? decration the store and data stored in it
    const store = useMainStore();
    const days = store.getDays;
    const persons = store.getPersons;
    let block = ref([]);

    //? Variable To Display Form Errors

    // Function to display an alert with a custom title, text, and icon
    const Alert = (title, text, icon) => {
      Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: "OK",
      });
    };
    const {
      formErrors,
      isValidForm,
      isModalVisible,
      formData,
      isValidFormF,
      showModal,

      closeModal,
    } = useModal();
    const {
      isMouseDown,
      hoveredDays,
      hoveredDivs,
      SelectedPerson,
      isWeekEnd,

      handleMouseUp,
      onMouseDown,
      OnDrop,
      Ondrag,
      handleMouseMove,
    } = useMouseEvents(formData, showModal, Alert);
    const { hasSchedule } = useBlock();
    /*************************************** */
    ///**** End Variable Declaration  ******/
    /*************************************** */

    const getBlock = () => {
      //TODO : Store blocks from store in a local variable
      //! Function should run when the component is mounted and after store actions

      block.value = store.getBlock;
    };

    // Function to validate the form data and set isValidForm accordingly

    // Function to add a block to the schedule
    const addBlockToSchedule = () => {
      //TODO : Extract form data
      //TODO : Get the index of the start day
      //TODO : Calculate the end day based on the start day and duration
      //TODO : Check if the block falls within a valid schedule
      //TODO : Create a temporary block object
      //TODO : Attempt to add the block to the schedule through the store
      //TODO : If successful, show a success alert
      //TODO : Refresh the schedule
      //TODO : If the block is not within a valid schedule, show an error alert
      //TODO : Clean the form and close the modal

      let person = formData.value.person;
      let startDay = formData.value.startDay;
      let subject = formData.value.subject;
      let duration = formData.value.duration;

      const dayIndex = days.indexOf(startDay);

      let endDay = days.indexOf(formData.value.startDay) + duration - 1;

      const isInBlock =
        dayIndex <= endDay && duration <= days.indexOf("Saturday");

      let TempBlock = {
        startDay: startDay,
        duration: duration,
        subject: subject,
      };

      if (isInBlock) {
        if (store.addBlock(person, TempBlock)) {
          Alert("Success!", "Block Added Succesfully", "success");

          getBlock();
        }
      } else {
        Alert("Error!", "Week-end can't be selected", "error");
      }

      cleanForm();
      closeModal();
    };
    // Function to reset the form data to its initial state
    const cleanForm = () => {
      formData.value = {
        startDay: "",
        person: "",
        subject: "",
        duration: 1,
      };
    };
    const isSelected = (day, person) => {
      const id = days.indexOf(day) + "-" + person;

      return hoveredDivs.value.has(id);
    };

    onMounted(() => {
      getBlock();
    });
    watch(formData.value, () => {
      isValidFormF();
    });
    console.log(hoveredDivs);

    return {
      days,
      persons,
      block,
      formData,
      onMouseDown,
      closeModal,
      Ondrag,
      OnDrop,
      formErrors,
      onclick,
      isModalVisible,
      showModal,
      hasSchedule,
      isValidForm,
      isWeekEnd,
      addBlockToSchedule,
      handleMouseUp,
      handleMouseMove,
      isSelected,
    };
  },
};
</script>