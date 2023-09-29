import { defineStore } from "pinia";

export const useMainStore = defineStore("MainStore", {
  state: () => ({
    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    persons: ["Jack", "Alexander", "James", "Oliver", "Henry", "Noah"],
    block: {},
  }),
  getters: {
    getDays() {
      return this.days;
    },
    getPersons() {
      return this.persons;
    },
    getBlock() {
      return this.block;
    },
  },
  actions: {
    addBlock(person, b) {
      this.block[person] = b;
      return true;
    },


    MoveBlock(oldPerson, newPerson, day) {
        //TODO : Take Block from the first person and give it to the second person
        //TODO : check if end day is in weekends or after IT 
      this.block[newPerson] = this.block[oldPerson];
      let endDay =this.days.indexOf(day) + this.block[newPerson]["duration"] - 1;
      if (endDay >= 5) {
        this.block[newPerson]["duration"] = 5 - this.days.indexOf(day);
      }
      this.block[newPerson]["startDay"] = day;
      delete this.block[oldPerson];
    },
    GrowBlockLeft(person) {
      this.block[person].duration++;
    },
    GrowBlockRight(person) {
      this.block[person].startDay =
        this.days[this.days.indexOf(this.block[person].startDay) - 1];
      this.block[person].duration++;
    },
  },
});
