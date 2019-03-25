import Matrix from './Matrix';
import Grouper from './Grouper';
const Solver = {

  matrixData: {},
  numClasses: 0,
  scheduleOptions: [],

  findSchedules(classes, numClasses, startTime) {
    // let start = startTime;
    // let finish;
    //
    // console.log("for length " + numClasses);
    // console.log("number of subjects is: " + classes.length);

    let allNodes = this.classesToNodes(classes);
    // console.log(allNodes);
    // console.log("number of nodes: " + allNodes.length);
    this.numClasses = numClasses;
    this.matrixData = Matrix.build(allNodes, numClasses);

    // finish = performance.now();
    // console.log("matrix built in " + (finish-start).toPrecision(4) + " milliseconds");
    // start = finish;

    this.traverseGraph([], this.matrixData.chooseFrom, numClasses, 0, 0);

    // finish = performance.now();
    // console.log("graph traversed in " + (finish-start).toPrecision(4) + " milliseconds");
    // start = finish;

    const finalSchedules = this.indicesToNodes(allNodes);

    // finish = performance.now();
    // console.log("converted indices to nodes in " + (finish-start).toPrecision(4) + " milliseconds");
    // console.log("number of schedule options: " + finalSchedules.length);
    // console.log("total runtime: " + (finish-startTime).toPrecision(4) + " milliseconds");
    this.matrixData = {};
    this.scheduleOptions = [];
    this.numClasses = 0;
    const grouped = Grouper.group(finalSchedules);
    // console.log("number of groups: " + grouped.length);
    //
    return grouped;
    // return finalSchedules;
  },

  classesToNodes(classes) {
    let allNodes = [];

    classes.forEach((subject, i) => {
      allNodes = allNodes.concat(this.getAllNodes(subject))
    })

    return allNodes;
  },

  getAllNodes(subject) {
  let nodeList = [];

  // ИФЫ ДЛЯ ИНДЕПЕНДЕНТ СТАДИ !

  if (!subject.lectures.length) {
    subject.labs.forEach((item, i) => {
      nodeList.push(new this.Node(null, item, subject));
    });
  }

  else if (!subject.labs.length) {
    subject.lectures.forEach((item, i) => {
      nodeList.push(new this.Node(item, null, subject));
    });
  }

  else {
    subject.lectures.forEach((lecture, i) => {
      subject.labs.forEach((lab, i) => {
        if(Matrix.noSectionConflict(lecture.timePeriods, lab.timePeriods)) {
          nodeList.push(new this.Node(lecture, lab, subject));
        }
      });
    });
  }

  return nodeList;
  },

  Node(lecture, lab, subject) {
   this.lecture = lecture;
   this.lab = lab;
   this.subject = subject;
 },

 traverseGraph(scheduleArray, optionsArray, leftToAdd, numCycle, startFrom) {
  	if (numCycle < this.numClasses && startFrom < optionsArray.length) {

			for (var newElm = numCycle; newElm < this.numClasses; newElm++) {
				for (var nextElm = startFrom; nextElm < optionsArray.length; nextElm++) {
					scheduleArray[newElm] = optionsArray[nextElm];
					if (leftToAdd === 1) {
						if (this.isComplete(scheduleArray, 0)) {
							this.scheduleOptions.push(Array.from(scheduleArray));
						}
					}
					this.traverseGraph(scheduleArray, optionsArray, leftToAdd - 1, newElm + 1, nextElm + 1);
				}
			}
		}
	},

  isComplete(schedule, numCycle) {
    let optionConflicts = this.matrixData.matrix[schedule[numCycle]];

		for (var i = numCycle + 1; i < schedule.length; i++) {
			if (optionConflicts[schedule[i]] === true) {
				return false;
      }
		}
		// If the method hasn't checked all the elements, recursion
		if (numCycle < schedule.length - 1) {
      return true && this.isComplete(schedule, numCycle + 1);
    }
    return true;
	},

  indicesToNodes(allNodes) {
    let finalSchedules = [];

    this.scheduleOptions.forEach((schedule, i) => {
      let tempArray = [];
      schedule.forEach((nodeNum, i) => {
        tempArray.push(allNodes[nodeNum]);
      });
      finalSchedules.push(tempArray);
    });
    return finalSchedules;
  }
}

export default Solver;
