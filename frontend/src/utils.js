const sortByStringAsc = (filterData, columnName) => {

  filterData.sort((a, b) => {
      let data;
      if(columnName === 'name')data = getAscData(a.name,b.name)
      else if (columnName === 'email') data=getAscData(a.email,b.email);
      else if (columnName === 'position') data=getAscData(a.work,b.work);

      return data
  })
  return filterData;
};

const sortByStringDesc = (filterData, columnName) => {
  filterData.sort((a, b) => {
    let data;
    if(columnName === 'name') data = getDescData(a.name, b.name);
    else if (columnName === 'email') data=getDescData(a.email,b.email);
    else if(columnName === 'position') data=getDescData(a.work, b.work)

    return data;
  });
  return filterData;
};

const getDescData = (a,b) => {
  console.log("descd",a,b)
  if (a.toLowerCase() > b.toLowerCase()) {
    return -1;
  }
  if (a.toLowerCase() < b.toLowerCase()) {
    return 1;
  }
  return 0;
};

const getAscData = (a,b) => {
  console.log("asc",a,b)
  if (a.toLowerCase() < b.toLowerCase()) {
    return -1;
  }
  if (a.toLowerCase() > b.toLowerCase()) {
    return 1;
  }
  return 0;
};
export { sortByStringAsc, sortByStringDesc };
