/*
 * © Jordan Tart https://github.com/jtart
 * https://github.com/jtart/react-universal-app
 */
import getArticleInitialData from '../getInitialData/article';

// eslint-disable-next-line no-unused-vars
const loadInitialData = async (url, routes) => getArticleInitialData(url);

export default loadInitialData;
