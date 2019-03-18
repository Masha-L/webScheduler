const DataAPI = {

  //пропарси базу - найди все департаменты
  findAllDepartments(data) {
    let set = new Set();
    //parses the database by key and adds departments in list if they haven't been there before
    data.forEach((item, i) => {
        set.add(item.department)
    });
    let depList = Array.from(set);
    depList.sort();
    return depList;
  },

  createMap(data){
    let classesTable = new Map();

    data.forEach((item, i) => {
      classesTable.set(item.id, item);
    });
    //console.log(classesTable);
    return classesTable;
  }
}
export default DataAPI;
