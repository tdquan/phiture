const setAuthHeaders = (headers) => {
  if (localStorage.getItem('phiture_token')) {
    return {
      ...headers,
      'Authorization': localStorage.getItem('phiture_token')
    }
  } else {
    return headers;
  }
}

export default setAuthHeaders;
