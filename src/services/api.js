import { stringify } from 'qs';
import request from '../utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
export async function probSource() {
  return request('http://127.0.0.1:8088/api/hello', {
    method: 'GET',
    dataType: 'jsonp',
  });
}

// export async function create (params) {
//   return request({
//     url: Config.baseURL+'/csm_prob/rest/probinfo/createissue',
//     method: 'post',
//     data: params,
//   })
// }

export async function UserLogin(params) {
  // console.log("dddddddddddddd"+JSON.stringify(params))
  return request('http://127.0.0.1:8088/api/userlogin', {
    method: 'POST',
    body: params,
  });
}

export async function selectAntd() {
  return request('http://127.0.0.1:8088/api/ANTDList', {
    method: 'POST',
  });
}

export async function submitantd(params) {
  console.log('params' + JSON.stringify(params));
  return request('http://127.0.0.1:8088/api/addANTD', {
    method: 'POST',
    body: params,
  });
}

export async function addANTD(params) {
  // console.log("params"+JSON.stringify(params))
  return request('http://127.0.0.1:8088/api/addANTD', {
    method: 'POST',
    body: params,
  });
}

export async function removeAntd(params) {
  return request('http://127.0.0.1:8088/api/removeAntd', {
    method: 'POST',
    body: params,
  });
}

export async function tubiao(params) {
  return request('http://127.0.0.1:8088/api/tubiao', {
    method: 'POST',
    dataType: 'jsonp',
  });
}

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}
