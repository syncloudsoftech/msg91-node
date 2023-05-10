const axios = require('axios');

const baseUrl = 'https://control.msg91.com/api/v5';

const defaultHeaders = {
  accept: 'application/json',
  'content-type': 'application/json',
};

/**
 * Send OTP to given phone number
 * @param {string} key
 * @param {string} number
 * @param {string} templateId
 * @returns {Promise<boolean>}
 */
async function sendOTP(key, number, templateId) {
  if (!key) {
    throw new Error('API key cannot be empty.');
  }

  if (!number) {
    throw new Error('Number cannot be empty.');
  } else if (!number.match(/^\d+/)) {
    throw new Error('Number must be numeric.');
  }

  if (!templateId) {
    throw new Error('Template ID cannot be empty.');
  }

  const headers = { ...defaultHeaders, authkey: key };
  const params = {
    template_id: templateId,
    mobile: number,
  };
  const { status, data } = await axios.post(`${baseUrl}/otp`, null, { headers, params });
  return status === 200 && data.type === 'success';
}

/**
 * Verify OTP to given phone number with given otp
 * @param {string} key
 * @param {string} number
 * @param {string} otp
 * @returns {Promise<boolean>}
 */
async function verifyOTP(key, number, otp) {
  if (!key) {
    throw new Error('API key cannot be empty.');
  }

  if (!number) {
    throw new Error('Number cannot be empty.');
  } else if (!number.match(/^\d+/)) {
    throw new Error('Number must be numeric.');
  }

  if (!otp) {
    throw new Error('OTP cannot be empty.');
  } else if (!otp.match(/^\d+/)) {
    throw new Error('OTP must be numeric.');
  }

  const headers = { ...defaultHeaders, authkey: key };
  const params = {
    mobile: number,
    otp,
  };
  const { status, data } = await axios.post(`${baseUrl}/otp/verify`, null, { headers, params });
  return status === 200 && data.type === 'success';
}

/**
 * Resend OTP to given phone number
 * @param {string} key
 * @param {string} number
 * @param {boolean} voice
 * @returns {Promise<boolean>}
 */
async function resendOTP(key, number, voice = true) {
  if (!key) {
    throw new Error('API key cannot be empty.');
  }

  if (!number) {
    throw new Error('Number cannot be empty.');
  } else if (!number.match(/^\d+/)) {
    throw new Error('Number must be numeric.');
  }
  
  if (!(typeof voice === 'boolean')) {
    throw new Error('Voice must be boolean.');
  }

  const headers = { ...defaultHeaders, authkey: key };
  const params = {
    mobile: number,
    retrytype: voice ? 'voice' : 'text',
  };
  const { status, data } = await axios.post(`${baseUrl}/otp/retry`, null, { headers, params });
  return status === 200 && data.type === 'success';
}

module.exports = { sendOTP, verifyOTP, resendOTP };
