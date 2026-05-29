export const LISTING_CATEGORIES = [
  {
    id: 'namai',
    label: 'Namai',
    defaultType: 'namas',
    types: ['namas', 'vila', 'kotedžas', 'dupleksas', 'kita'],
    formTitle: 'Pridėti namą',
    editTitle: 'Redaguoti namą',
    listTitle: 'Namų sąrašas'
  },
  {
    id: 'butai',
    label: 'Butai',
    defaultType: 'butas',
    types: ['butas'],
    formTitle: 'Pridėti butą',
    editTitle: 'Redaguoti butą',
    listTitle: 'Butų sąrašas'
  },
  {
    id: 'sklypai',
    label: 'Sklypai',
    defaultType: 'sklypas',
    types: ['sklypas'],
    formTitle: 'Pridėti sklypą',
    editTitle: 'Redaguoti sklypą',
    listTitle: 'Sklypų sąrašas'
  }
];

export const PORTFOLIO_FILTERS = [
  { id: 'visi', label: 'Visi' },
  ...LISTING_CATEGORIES.map(({ id, label }) => ({ id, label }))
];

export const getCategoryForHouseType = (houseType) => {
  if (houseType === 'butas') return 'butai';
  if (houseType === 'sklypas') return 'sklypai';
  return 'namai';
};

export const getCategoryConfig = (categoryId) =>
  LISTING_CATEGORIES.find((c) => c.id === categoryId) || LISTING_CATEGORIES[0];
