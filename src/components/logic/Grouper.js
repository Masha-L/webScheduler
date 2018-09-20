const Grouper = {
  groupedOptions: [],

  group(schedules) {

    let currentGroup = [];
    let masterNum = 0, currentNum = 1;

    if(schedules.length) {
      currentGroup.push(schedules[masterNum]);

      while(currentNum < schedules.length)
      {
        if(this.compare(schedules[masterNum], schedules[currentNum]))
          {
              currentGroup.push(schedules[currentNum]);
          }
        else {
          this.groupedOptions.push(Array.from(currentGroup));
          masterNum = currentNum;
          currentGroup = [];
          currentGroup.push(schedules[masterNum]);
        }
        currentNum++;
      }
      this.groupedOptions.push(currentGroup);
    }
    var temp = this.groupedOptions;
    this.groupedOptions = [];

    return Array.from(temp);
  },

  compare(a, b) {
    if(a.length !== b.length)
      return false;

    for(var i = 0; i <a.length; i++)
    {
      if(a[i].subject.id !== b[i].subject.id)
        return false;
    }

    return true;
  }

}

export default Grouper;
