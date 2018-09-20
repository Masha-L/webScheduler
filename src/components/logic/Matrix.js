const Matrix = {
  matrix: [[]],
  degrees: [],
  numValid: 0,
  matrixSize: 0,

  build(nodes, numClasses) {
    this.matrixSize = this.numValid = nodes.length;
    this.degrees = [];
    this.matrix = [[]];

    this.initializeMatrix();
    this.fillMatrix(nodes);
    this.assignValidity(numClasses - 1);
    const validNodes = this.validNodes();

    return {
      matrix: this.matrix,
      chooseFrom: validNodes,
    };
  },

  assignValidity(numClasses) {
    let changed = true;

    while (changed) {
			changed = false;
			// Checks if any nodes became invalid during the last iteration
			for (var node = 0; node < this.matrixSize; node++) {
				if (this.becameInvalid(node, numClasses)) {
					changed = true;
				}
			}
		}
  },

  validNodes() {
  		let validNodes = [], currentIndex = 0;

  		// Adds all valid indices to the array
  		for (var node = 0; node < this.matrixSize; node++) {
  			if (this.isValid(node)) {
  				validNodes[currentIndex] = node;
  				currentIndex++;
  			}
  		}
  		return validNodes;
  	},

  becameInvalid(node, numClasses) {

		if (this.isValid(node)) {
			let degree = this.vertexDegree(node);
			if (degree < numClasses) {
				this.setNodeInvalid(node);
				return true;
			}
			else
				this.degrees[node] = degree;
		}

		return false;
	},

  setNodeInvalid(node) {
		this.degrees[node] = -1;
		// Decrements the number of the valid nodes
		this.numValid--;
	},

  // node is an INT
  vertexDegree(node) {
		let degree = 0;
		for (var otherNode = 0; otherNode < this.matrixSize; otherNode++) {
			if (this.isValid(otherNode) && !this.areInConflict(node, otherNode))
				degree++;
		}
		return degree;
	},

  // node is an INT
  isValid(node) {
		return this.degrees[node] !== -1;
	},

  areInConflict(row, col) {
		return this.matrix[row][col];
	},

  fillMatrix(nodes) {
		let nodeOne, nodeTwo;

    for (var row = 0; row < this.matrixSize; row++) {
			nodeOne = nodes[row];
			for (var col = row; col < this.matrixSize; col++) {
				if (row === col)
					this.addConflict(row, col);
				else {
					nodeTwo = nodes[col];
					if(this.noNodeConflict(nodeOne, nodeTwo)){
						this.addNoConflict(row, col);
          }
          else {
            this.addConflict(row, col);
          }
				}
			}
		}
  },

  addConflict(row, col) {
    this.matrix[row][col] = true;
    this.matrix[col][row] = true;
  },

  addNoConflict(row, col) {
    this.matrix[row][col] = false;
    this.matrix[col][row] = false;
  },

  noNodeConflict(nodeOne, nodeTwo) {

    if (nodeOne.subject.id === nodeTwo.subject.id)
			return false;
    if (this.noNodeConflictHelper(nodeOne.lecture, nodeTwo.lecture))
			if (this.noNodeConflictHelper(nodeOne.lecture, nodeTwo.lab))
				if (this.noNodeConflictHelper(nodeOne.lab, nodeTwo.lecture))
					if (this.noNodeConflictHelper(nodeOne.lab, nodeTwo.lab))
						return true;
		return false;
  },

  noNodeConflictHelper(sectionOne, sectionTwo) {
    if (sectionOne !== null && sectionTwo !== null) {
			return this.noSectionConflict(sectionOne.timePeriods, sectionTwo.timePeriods);
    }
    return true;
  },

  noSectionConflict(sectionOne, sectionTwo) {
    return sectionOne.every((periodOne, a) => {
      return sectionTwo.every((periodTwo, b) => {
        return this.noTPConflict(periodOne, periodTwo);
      });
    });
  },

  // see TimePeriod.overlaps
  noTPConflict(periodOne, periodTwo) {
    if (periodOne.weekDay === periodTwo.weekDay) {
      if ((periodOne.startTime <= periodTwo.endTime) && (periodOne.startTime >= periodTwo.startTime))
				return false;
			if ((periodTwo.endTime <= periodOne.endTime) && (periodTwo.startTime >= periodOne.startTime))
				return false;
    }
    return true;
  },

  initializeMatrix() {
    for(var i = 0; i < this.matrixSize; i++){
      this.matrix[i] = [];
      for(var j = 0; j < this.matrixSize; j++)
        this.matrix[i][j] = false;
    }
  },

  nullMatrix() {
    this.matrix= [[]];
    this.degrees= [];
    this.numValid= 0;
    this.matrixSize= 0;
  }
}

export default Matrix;
