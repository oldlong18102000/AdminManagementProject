import { APIHost, APIHost2, APIHostVendor } from "../ultis/constants";

enum APIService {
  auth,
  protected,
  public,
  public2,
  product,
  deleteProduct,
  productDetail,
  user,
  userDetail
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
  } else if (service === APIService.deleteProduct) {
    return `${APIHost2}/products`;
  } else if (service === APIService.user) {
    return `${APIHost2}/users`;
  } else if (service === APIService.userDetail) {
    return `${APIHostVendor}/profile`;
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
  deleteProductData: `${getBaseUrl(APIService.deleteProduct)}/edit`,
  getUserListData: `${getBaseUrl(APIService.user)}/list`,
  getUserDetailData: `${getBaseUrl(APIService.userDetail)}/detail`,
  deleteUserData: `${getBaseUrl(APIService.user)}/edit`,
};
