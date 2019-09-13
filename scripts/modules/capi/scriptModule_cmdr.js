const fetchTools = require('../scriptModule_fetchRetry');

// Fetch CMDR from CAPIv2
const getCMDR = async (url, cmdr, cmdrID) => {
  var cmdrURL;
  if (cmdrID && (!cmdr || cmdr === null || typeof cmdr === 'undefined')) {
    cmdrURL = url + `/cmdrs/${cmdrID}`;
  } else {
    cmdrURL = url + '/cmdrs?cmdrName=' + encodeURIComponent(cmdr);
  }

  let response = await fetchTools.fetch_retry(5, cmdrURL, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });

  let cmdrData = await response.json();
  return cmdrData;
};

// Create a CMDR who doesn't exist
const createCMDR = async (url, cmdrData, jwt) => {
  let cmdrURL = url + '/cmdrs';

  if (cmdrData.cmdrName === null || typeof cmdrData.cmdrName === 'undefined') {
    return {};
  } else {
    let response = await fetchTools.fetch_retry(5, cmdrURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(cmdrData),
    });

    let newCMDR = await response.json();
    return newCMDR;
  }
};

module.exports = { getCMDR, createCMDR };