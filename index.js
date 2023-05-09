const api = require('./src/api');

/**
 * Initialize the Msg91 with auth key.
 * @param {string} key
 * @returns {object}
 */
function init(key) {
  return {
    sendOTP: async (number, templateId) => api.sendOTP(key, number, templateId),
    verifyOTP: async (number, otp) => api.verifyOTP(key, number, otp),
    resendOTP: async (number, voice = true) => api.resendOTP(key, number, voice),
  };
}

module.exports = init;
