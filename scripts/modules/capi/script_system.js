import { fetch_retry } from '../script_fetchRetry';

// Fetch System from CAPIv2
export const getSystem = async (url, system, systemID) => {
  var systemURL;
  if (systemID && (!system || system === null || typeof system === 'undefined')) {
    systemURL = url + `/systems/${systemID}`;
  } else {
    systemURL = url + '/systems?systemName=' + encodeURIComponent(system);
  }

  let response = await fetch_retry(5, systemURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  let systemData = await response.json();
  return systemData;
};

// Create System in CAPIv2
export const createSystem = async (url, systemData, jwt) => {
  let systemURL = url + '/systems';

  if (systemData.systemName === null || typeof systemData.systemName === 'undefined') {
    return {};
  } else {
    let response = await fetch_retry(5, systemURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(systemData),
    });

    let newSystem = await response.json();
    return newSystem;
  }
};
