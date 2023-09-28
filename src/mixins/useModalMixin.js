import { ref, watch } from "vue";
import { useMainStore } from "../store/mainStore";

export const useModal = () => {
  const formErrors = ref("");
  const isValidForm = ref(false);
  const store = useMainStore();

  const block = ref(store.getBlock);
  const persons = store.getPersons;
  const days = store.getDays;
  const isModalVisible = ref(false);
  const formData = ref({
    startDay: "",
    person: "",
    subject: "",
    duration: 1,
  });

  // Function to check if a given day is a weekend (Saturday or Sunday)
  const isWeekEnd = (day) => {
    //TODO : Check if the day is either "Saturday" or "Sunday"

    return day == "Saturday" || day === "Sunday";
  };
  const isValidFormF = () => {
    //TODO :  Check if the person is empty or not included in the persons list
    //TODO : Check if the duration is less than 1 day
    //TODO : Check if the selected days are valid days of the week
    //TODO : Check if the selected day is a weekend
    //TODO : Check if the subject is empty
    //TODO : If all checks pass, clear form errors and set isValidForm to true

    if (
      formData.value.person == " " ||
      !persons.includes(formData.value.person)
    ) {
      formErrors.value = "Unknown person ";
      return (isValidForm.value = false);
    }
    if (formData.value.duration < 1) {
      formErrors.value = "duration must be 1 day or more";
      return (isValidForm.value = false);
    }
    if (
      !days[formData.value.duration - 1] ||
      !days[formData.value.duration - 1 + days.indexOf(formData.value.startDay)]
    ) {
      formErrors.value = " days out of this week can't be selected";

      return (isValidForm.value = false);
    }
    if (
      isWeekEnd(
        days[
          formData.value.duration - 1 + days.indexOf(formData.value.startDay)
        ]
      )
    ) {
      formErrors.value = " Week-ends can't be selected";

      return (isValidForm.value = false);
    }
    if (formData.value.subject == "") {
      formErrors.value = "enter a valid subject";
      return (isValidForm.value = false);
    }
    formErrors.value = "";
    return (isValidForm.value = true);
  };

  /*************************************** */
  ///****  Modal Functions ****///
  /*************************************** */

  // Function to close the modal by setting isModalVisible to false
  const closeModal = () => {
    isModalVisible.value = false;
  };

  const showModal = (person, day) => {
    //TODO : change isModalVisible to true
    // Assuming you have some parameters like person, startDay, subject, and duration
    // These parameters can be either null or have values
    isModalVisible.value = true;
    formData.value.person = person;
    //? If startDay is not already set in formData, assign it to the parameter day day
    //? This line ensures that if startDay is not provided, it defaults to the current day

    formData.value.startDay = !formData.value.startDay
      ? day
      : formData.value.startDay;

    //TODO : Check if there is an existing block for the person
    if (block.value[person]) {
      //? If there is a block, set the duration, startDay, subject, and person in formData
      formData.value.duration = block.value[person].duration;
      formData.value.startDay = day;
      formData.value.subject = block.value[person].subject;
      formData.value.person = person;
    }
  };

  watch(formData.value, () => {
    isValidFormF();
    console.log("changing")
  });
  /*************************************** */
  ///**** End Modal Functions  ******/
  /*************************************** */

  return {
    formErrors,
    isValidForm,
    isModalVisible,
    formData,
    isValidFormF,
    showModal,
    isWeekEnd,
    closeModal,
  };
};
