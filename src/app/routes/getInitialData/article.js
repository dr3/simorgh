import onClient from '../../helpers/onClient';
import getBaseUrl from './utils/getBaseUrl';
import fetchData from './utils/fetchData';
import Routes from '../index';
import getRouteProps from './utils/getRouteProps';

const getArticleInitialData = async path => {
  const { id, service } = getRouteProps(Routes, path).match.params;

  const baseUrl = onClient()
    ? getBaseUrl(window.location.origin)
    : process.env.SIMORGH_BASE_URL;

  const url = `${baseUrl}/${service}/articles/${id}.json`;

  return fetchData({ url });
};

export default getArticleInitialData;
