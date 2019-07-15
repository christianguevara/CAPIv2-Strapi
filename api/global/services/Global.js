'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/services.html#core-services)
 * to customize this service
 */

const boom = require('boom');

module.exports = {

  /**
   * Promise to deny reports that are missing required data.
   *
   * @return {Promise}
   */

  checkReport: async (values, model) => {

    let reportModel = await strapi.models[model].allAttributes;

    console.log(reportModel);

    // Check userType has a value and is in the enum
    // ["console", "pc"]
    if (reportModel.userType.required == true) {
      if (values.userType == undefined) {
        throw boom.notAcceptable('You are missing a userType, this value should be either "pc" or "console".');
      } else if (reportModel.userType.enum.includes(values.userType) == false) {
        throw boom.notAcceptable(`The userType: "${values.userType}" you sent is not a valid one, your options are either "pc" or "console".`);
      }
    }

    // Check reportType has a value and is in the enum
    // ["new", "update", "error"]
    if (reportModel.reportType.required == true) {
      if (values.reportType == undefined) {
        throw boom.notAcceptable('You are missing a reportType, this value should be "new", "update", or "error".');
      } else if (reportModel.reportType.enum.includes(values.reportType) == false) {
        throw boom.notAcceptable(`The reportType: "${values.reportType}" you sent is not a valid one, your options are "new", "update", or "error".`);
      }
    }

    // Check systemName has a value
    if (values.systemName == undefined) {
      throw boom.notAcceptable('You are missing a systemName, the system is required and should exist in EDSM.');
    }

    // Check bodyName has a value if required
    if (reportModel.bodyName.required != undefined && reportModel.bodyName.required == true) {
      if (values.bodyName == undefined) {
        throw boom.notAcceptable('You are missing a bodyName, the body is required and should exist in EDSM.');
      }
    }

    // Check latitude has a value if required that is between -90 & 90
    if (reportModel.latitude.required != undefined && reportModel.latitude.required == true) {
      if (values.latitude == undefined) {
        throw boom.notAcceptable('You are missing a latitude value, this is a body POI which requires latitude/longitude.');
      } else if (values.latitude < -90 || values.latitude > 90) {
        throw boom.notAcceptable('Your latitude value falls outside the possible range of -90 to 90.');
      }
    }

    // Check longitude has a value if required that is between -180 & 180
    if (reportModel.longitude.required != undefined && reportModel.longitude.required == true) {
      if (values.longitude == undefined) {
        throw boom.notAcceptable('You are missing a longitude value, this is a body POI which requires longitude/longitude.');
      } else if (values.longitude < -180 || values.longitude > 180) {
        throw boom.notAcceptable('Your longitude value falls outside the possible range of -180 to 180.');
      }
    }

    // Check reportStatus has a value and is in the enum
    // ["pending", "updated", "verified", "accepted", "declined", "issue", "duplicate"]
  },
};
