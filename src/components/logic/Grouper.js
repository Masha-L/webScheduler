const Grouper = {
  groupedOptions: [],

  /*
   * Groups schedules that have the same elements.
   * Bruteforce. Think of a more efficient solution later.
   */
  group(schedules) {
    let currentNum = 0;
    let counter = 0;
    let masterSchedule;
    let visited = [];
    let updated = 0;

    for (let i = 0; i < schedules.length; i++) {
      visited.push(0);
    }

    while (counter < schedules.length) {

      updated = 0;

      if (!visited[currentNum]) {
        let currentGroup = [];

        masterSchedule = schedules[currentNum];
        currentGroup.push(masterSchedule);
        visited[currentNum] = 1;
        counter++;

        for (let i = currentNum + 1; i < schedules.length; i++) {
          if (this.compare(schedules[i], masterSchedule)) {
            currentGroup.push(schedules[i]);
            visited[i] = 1;
            counter++;

            if (i === currentNum + 1) {
              currentNum = i;
              updated = 1;
            }
          }
        }

        this.groupedOptions.push(currentGroup);
      }

      if (!updated) {
        currentNum++;
      }
    }

    var temp = this.groupedOptions;
    this.groupedOptions = [];

    return Array.from(temp);
  },

  compare(a, b) {
    if (a.length !== b.length)
      return false;

    for (var i = 0; i < a.length; i++) {
      if (a[i].subject.id !== b[i].subject.id) {
        return false;
      }
    }

    return true;
  }
}

export default Grouper;
