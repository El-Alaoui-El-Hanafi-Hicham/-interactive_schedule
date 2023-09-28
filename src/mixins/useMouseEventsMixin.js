import { ref, computed, watch } from "vue";
import { useMainStore } from "../store/mainStore";
import { useModal } from "./useModalMixin";

export const useMouseEvents = (formData, showModal, Alert) => {
  const store = useMainStore();
  let dndBlock = ref({});
  const days = store.getDays;
  //? Variable to store draged block in it temporarly
  let isDragging = ref(false);
  let isMouseDown = ref(false);
  let hoveredDays = ref(new Set());
  let hoveredDivs = ref(new Set());
  let SelectedPerson = ref("");

  const isWeekEnd = (day) => {
    //TODO : Check if the day is either "Saturday" or "Sunday"

    return day == "Saturday" || day === "Sunday";
  };

  //**********************************************************************/
  //************Mouse Events (down, drag, drop, Up, Move)************** */
  //**********************************************************************/

  // Function to handle drag-and-drop events when an element is dragged
  const Ondrag = (event, block, person) => {
    //TODO : Set the drag-and-drop properties for the event

    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    dndBlock.value = block;
    isDragging.value = true;
    SelectedPerson.value = person;
  };

  // Function to handle the drop event when a block is dropped onto a person's schedule
  const OnDrop = (event, person) => {
    //TODO: Add the dragged block to the person's schedule in the store
    //TODO: Reset the dndBlock object
    //TODO: Display a success alert indicating that the block has been moved
    //TODO: Update the displayed schedule
    isDragging.value = false;
    store.MoveBlock(SelectedPerson.value, person);
    dndBlock = {};
    Alert("Success!", "Block Moved to " + person + " successfully", "success");
    // getBlock();
  };

  // Function to handle mouse down event when clicking on a day in the schedule
  const onMouseDown = (day, person) => {
    //TODO : indicate that the mouse button is pressed
    //TODO : Store the selected person
    //TODO : Check if the selected day is not a weekend day and add it to hovered days

    isMouseDown = true;
    SelectedPerson.value = person;
    if (!isWeekEnd(day)) {
      hoveredDays.value.add(days.indexOf(day));
      hoveredDivs.value.add(days.indexOf(day) + "-" + person);
    }
  };

  // Function to handle mouse up event when releasing the mouse button
  const handleMouseUp = () => {
    //TODO : Reset the flag indicating that the mouse button is pressed
    //TODO : Calculate the start and end days based on the hovered days
    //TODO : Update the form data with the selected start day and duration
    //TODO : Show the modal for the selected person
    //TODO : Clear the set of hovered days and divs
    //TODO : Reset the selected person

    isMouseDown = false;
    let startDay = Math.min(...hoveredDays.value);
    let endDay = Math.max(...hoveredDays.value);

    formData.value.startDay = days[startDay];
    formData.value.duration = startDay == endDay ? 1 : endDay + 1;
    showModal(SelectedPerson.value);
    hoveredDays.value.clear();
    hoveredDivs.value.clear();
    SelectedPerson.value = "";
  };

  // Function to handle mouse move events when the mouse is moved over days in the schedule
  const handleMouseMove = (event, day, person) => {
    //TODO Check if the mouse button is pressed and update hovered days and divs

    if (isMouseDown) {
      if (SelectedPerson.value == person && !isWeekEnd(day)) {
        hoveredDays.value.add(days.indexOf(day));
        hoveredDivs.value.add(days.indexOf(day) + "-" + person);
      }
    }
  };
  //**********************************************************************/
  //************ End Mouse Events (down, drag, drop, Up, Move)************** */
  //**********************************************************************/
 
  return {
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
  };
};
