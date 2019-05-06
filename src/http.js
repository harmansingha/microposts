/**
 * HTTP Library
 */

class EasyHttp {
  //Get Request for Http
  async get(url) {
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData;
  }

  async post(url, data){
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const jsonData = await response.json();
    return jsonData;
  }

  async put(url, data){
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const jsonData = await response.json();
    return jsonData;
  }

  async delete(url){
    const response = await fetch(url, {
      method: 'DELETE',
      header: {
        'Content-type': 'application/json'
      }
    });

    const jsonData = await response.json();
    return jsonData;

  }
}


export const http = new EasyHttp;