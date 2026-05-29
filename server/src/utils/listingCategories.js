const CATEGORY_TYPES = {
  namai: ['namas', 'vila', 'kotedžas', 'dupleksas', 'kita'],
  butai: ['butas'],
  sklypai: ['sklypas']
};

const getTypesForCategory = (category) => {
  if (!category || category === 'visi') return null;
  return CATEGORY_TYPES[category] || null;
};

module.exports = { CATEGORY_TYPES, getTypesForCategory };
