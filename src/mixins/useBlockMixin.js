import { ref } from 'vue';
import {useMainStore} from '../store/mainStore'
export const useBlock=()=>{
    const store =useMainStore();
    const days = store.getDays;
    const block =ref(store.getBlock)

     // Function to check if a person has a schedule (block) in the 'block' object
     const hasSchedule = (person) => {
        return block.value[person] != undefined;
      };
     // Function to check if a block is within the range on a specific day
     const isBlockInRange = (person, day) => {
        //TODO : Get the block associated with the person
        //TODO : Get the index of the starting day of the block
        //TODO : Get the index of the current day
        //TODO : Calculate the end day of the block
        //TODO : Check if the current day is within the block's range
  
        const personBlock = block.value[person];
  
        const StartdayIndex = days.indexOf(personBlock["startDay"]);
  
        const dayIndex = days.indexOf(day);
  
        let endDay = StartdayIndex + personBlock["duration"] - 1;
  
        const isInBlock = dayIndex <= endDay && dayIndex > StartdayIndex;
        if (isInBlock) {
          return false; //? Not within the block's range
        } else {
          if (dayIndex == StartdayIndex) {
            return "isStartDayIndex"; //? It's the start day of the block
          } else {
            return "isNormalBlock"; //? It's a normal day outside the block's range
          }
        }
      };
      return {isBlockInRange,hasSchedule}
}