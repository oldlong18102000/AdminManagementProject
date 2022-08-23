import { APIHost, APIHost2 } from "../ultis/constants";

enum APIService {
  auth,
  protected,
  public,
  public2,
  product,
  productDetail,
}

function getBaseUrl(service: APIService) {
  if (service === APIService.auth) {
    return `${APIHost}/authentication`;
  } else if (service === APIService.protected) {
    return `${APIHost}/protected`;
  } else if (service === APIService.public) {
    return `${APIHost}`;
  } else if (service === APIService.public2) {
    return `${APIHost2}`;
  } else if (service === APIService.product) {
    return `${APIHost}/products`;
  } else if (service === APIService.productDetail) {
    return `${APIHost2}/products`;
  }

  return '';
}

export const API_PATHS = {
  signIn: `${getBaseUrl(APIService.auth)}/login`,
  signUp: `${getBaseUrl(APIService.auth)}/register`,
  userProfile: `${getBaseUrl(APIService.public)}/user`,
  getLocation: `${getBaseUrl(APIService.public)}/location`,
  getCategory: `${getBaseUrl(APIService.public)}/categories/list`,
  getVendor: `${getBaseUrl(APIService.public2)}/vendors/list`,
  getBrand: `${getBaseUrl(APIService.public2)}/brands/list`,
  getCountry: `${getBaseUrl(APIService.public2)}/commons/country`,
  getStateByLocation: `${getBaseUrl(APIService.public)}/location?pid=`,
  getProductListData: `${getBaseUrl(APIService.product)}/list`,
  getProductDetailData: `${getBaseUrl(APIService.productDetail)}/detail`,
};
