import getApiClient from './getApiClient';

const getProductsByCategoryIdAndText = (catId: string, text: string, sort: 'asc' | 'desc') => {
  console.log(text);
  return getApiClient()
    .productProjections()
    .search()
    .get({
      queryArgs: {
        fuzzy: true,
        filter: [`categories.id:"${catId}"`],
        'text.en': `"${text}}"`,
        sort: [`name.en ${sort}`],
        asdf: '123',
      },
    })
    .execute();
};

export default getProductsByCategoryIdAndText;
