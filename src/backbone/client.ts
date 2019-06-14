const token_name: string = 'chef-city-token';

export function send_request(route: string, method: string, data: {} | FormData, content_type: string) {
  const obj: any = {
    method: method || "GET",
    credentials: 'include',
    headers: {
      "Authorization": window.localStorage.getItem(token_name),
      "Accept": "application/json"
    }
  }
  if(data) {
    if(data.constructor === Object) {
      obj.body = JSON.stringify(data);
      obj.headers["Content-Type"] = content_type || "application/json";
    }
    if(data.constructor === FormData) {
      obj.body = data;
    }
  }

  const url_1 = `/api${route}`;
  const url_2 = `http://localhost:6700/api${route}`;

  return fetch(url_1, obj).then((resp) => resp.json());
}

export function sign_up (data: any) {
  return send_request("/sign_up", "POST", data, null).then(json => {
    if(json.error) {
      return json;
    }
    window.localStorage.setItem(token_name, json.token);
    return json;
  });
}

export function sign_in (data: any) {
  return send_request("/sign_in", "PUT", data, null).then(json => {
    if(json.error) {
      window.localStorage.removeItem(token_name);
      return json;
    }
    window.localStorage.setItem(token_name, json.token);
    return json;
  });
}

export function sign_out () {
  return send_request("/sign_out", "PUT", null, null).then(json => {
    if(json.error) {
      return json;
    }
    window.localStorage.removeItem(token_name);
    return json;
  });
}

export function check_session () {
  return send_request("/check_session", "GET", null, null).then(json => {
    console.log(json);
    if(json.error) {
      window.localStorage.removeItem(token_name);
      return json;
    }
    window.localStorage.setItem(token_name, json.token);
    return json;
  }).catch(error => {
    console.log(error);
  });
}

export function get_user_by_username (username: string) {
  return send_request(`/get_user_by_username/${username}`, "GET", null, null).then(json => {
    return json;
  }).catch(error => {
    console.log(error);
  });
}

export function get_user_reviews(user_id: number, review_id: number) {
  const promise = review_id ? 
  send_request(`/get_user_reviews/${user_id}/${review_id}`, "GET", null, null) :
  send_request(`/get_user_reviews/${user_id}`, "GET", null, null);
  return promise.then(json => {
    return json;
  }).catch(error => {
    console.log(error);
  });
}