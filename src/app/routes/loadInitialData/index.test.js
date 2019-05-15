/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import getArticleInitialData from '../getInitialData/article';
import loadInitialData from '.';

jest.mock('../getInitialData/article');

describe('loadInitialData', () => {
  it('should call getArticleInitialData', () => {
    const articlePath = '/news/articles/c0000000001o';
    loadInitialData(articlePath);
    expect(getArticleInitialData).toHaveBeenCalledWith(articlePath);
  });
});
