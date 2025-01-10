const sortData = (data, sortBy, order) => {
    return [...data].sort((a, b) => {
      if (order === 'asc') return a[sortBy] - b[sortBy];
      return b[sortBy] - a[sortBy];
    });
  };
  