import { formatAllDateProperties } from "./vault";

const token_name: string = 'chef-city-token';

const isProd = process.env.NODE_ENV === 'production';
const api_domain = isProd ? 'https://rmw-chef-city-server.herokuapp.com/api' : `http://localhost:6700/api`;

console.log({ isProd, api_domain });

export function send_request(route: string, method: string, data: {} | FormData, content_type: string) {
  const obj: any = {
    method: method || "GET",
    credentials: 'include',
    headers: {
      "Authorization": window.localStorage.getItem(token_name),
      "Accept": "application/json"
    }
  }
  if (method !== 'GET') {
    obj.credentials = 'include';
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

  const url = api_domain + route;

  return fetch(url, obj).then((resp) => resp.json()).then(json => {
    // console.time('recursive date modify...');
    formatAllDateProperties(json, 'date_created');
    // console.timeEnd('recursive date modify...');

    return json;
  });
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
    // console.log(json);
    json.online ? 
      window.localStorage.setItem(token_name, json.token) :
      window.localStorage.removeItem(token_name);
    return json;
  })
}

export function get_user_by_username (username: string) {
  return send_request(`/get_user_by_username/${username}`, "GET", null, null).then(json => {
    return json;
  });
}

export function get_user_by_id(id: number) {
  return send_request(`/users/${id}`, "GET", null, null).then(json => {
    return json;
  });
}

export function get_user_reviews(user_id: number, review_id: number) {
  const promise = review_id ? 
  send_request(`/get_user_reviews/${user_id}/${review_id}`, "GET", null, null) :
  send_request(`/get_user_reviews/${user_id}`, "GET", null, null);
  return promise.then(json => {
    return json;
  })
}

export function get_user_recipes(creator_id: number, recipe_id: number) {
  const promise = recipe_id ? 
  send_request(`/get_user_recipes/${creator_id}/${recipe_id}`, "GET", null, null) :
  send_request(`/get_user_recipes/${creator_id}`, "GET", null, null);
  return promise.then(json => {
    return json;
  })
}

export function create_recipe(data: FormData) {
  return send_request(`/recipes`, "POST", data, null).then(json => {
    json.date
    return json
  });
}

export function update_profile_icon(data: FormData, id: number) {
  return send_request(`/users/${id}`, "PUT", data, null).then(json => {
    return json
  });
}

export function get_recipe_by_id(id: number) {
  return send_request(`/recipes/${id}`, "GET", null, null).then(json => {
    return json
  });
}

export function get_random_recipes() {
  return send_request(`/get_random_recipes`, "GET", null, null).then(json => {
    return json
  });
}