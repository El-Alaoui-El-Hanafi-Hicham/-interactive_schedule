import { defineStore } from 'pinia';

export const useMainStore = defineStore('MainStore', {
  state: () => ({
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    persons: ['Jack', 'Alexander', 'James','Oliver', 'Henry', 'Noah'],
    block: {
    
    }
  }),
  getters:{
    getDays(){
        return this.days 
    },
    getPersons(){
        return this.persons
    },
    getBlock(){
        return this.block
    }
  }
  ,

  actions: {
    addBlock(person, b) {
      // To update the state, use this context
      this.block[person]=b
      return true
    },
    MoveBlock(oldPerson,newPerson){
        console.log(oldPerson)
this.block[newPerson]=this.block[oldPerson]
delete this.block[oldPerson]
    },
GrowBlock(person){
    this.block[person].duration++
},
ShrinkBlock(person){
    this.block[person].startDay=this.days[this.days.indexOf(this.block[person].startDay)-1]
    this.block[person].duration++

    }

  }
});
