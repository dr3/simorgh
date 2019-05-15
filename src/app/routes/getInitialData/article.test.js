import baseUrl from './utils/getBaseUrl';
import onClient from '../../helpers/onClient';
import fetchData from './utils/fetchData';
import getRouteProps from './utils/getRouteProps';

process.env.SIMORGH_BASE_URL = 'https://www.SIMORGH_BASE_URL.com';

const getBaseUrlMockOrigin = 'https://www.getBaseUrl.com';
jest.mock('./utils/getBaseUrl', () => jest.fn());
baseUrl.mockImplementation(() => getBaseUrlMockOrigin);

let onClientMockResponse = true;
jest.mock('../../helpers/onClient', () => jest.fn());
onClient.mockImplementation(() => onClientMockResponse);

const fetchDataMockResponse = {
  pageData: 'foo',
  status: 123,
};
jest.mock('./utils/fetchData', () => jest.fn());
fetchData.mockImplementation(() => fetchDataMockResponse);

const routes = [{ default: [] }];
jest.mock('../index', () => [{ default: [] }]);

jest.mock('./utils/getRouteProps');

const getArticleInitialData = require('./article').default;

const id = 'c0000000001o';
const service = 'news';
const articlePath = '/news/articles/c0000000001o';

describe('getArticleInitialData', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    getRouteProps.mockReturnValue({
      match: { id, service },
    });
  });

  it('fetches data and returns expected object', async () => {
    const response = await getArticleInitialData(articlePath);

    expect(getRouteProps).toHaveBeenCalledWith(routes, articlePath);

    expect(fetchData).toHaveBeenCalledWith({
      url: 'https://www.getBaseUrl.com/news/articles/c0000000001o.json',
    });

    expect(response).toEqual({
      pageData: 'foo',
      status: 123,
    });
  });

  describe('When not on client', () => {
    beforeEach(() => {
      onClientMockResponse = false;
    });

    it('fetches data from SIMORGH_BASE_URL enviroment variable origin', async () => {
      const response = await getArticleInitialData(articlePath);

      expect(getRouteProps).toHaveBeenCalledWith(routes, articlePath);

      expect(fetchData).toHaveBeenCalledWith({
        url: 'https://www.SIMORGH_BASE_URL.com/news/articles/c0000000001o.json',
      });

      expect(response).toEqual({
        pageData: 'foo',
        status: 123,
      });
    });
  });
});
