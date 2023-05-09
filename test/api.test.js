const { sendOTP } = require('../src/api');

const apiKey = process.env.MSG91_KEY || false;
const apiTemplateId = process.env.MSG91_TEMPLATE_ID || false;

describe('sendOTP', () => {
  test('should fail if key is empty', async () => {
    try {
      await sendOTP('', '9876543210');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('API key cannot be empty.');
    }
  });

  test('should fail if number is empty', async () => {
    try {
      await sendOTP('abcd1234', '');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number cannot be empty.');
    }
  });

  test('should fail if number is not numeric', async () => {
    try {
      await sendOTP('abcd1234', 'abcd1234');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number must be numeric.');
    }
  });

  test('should fail if template ID is empty', async () => {
    try {
      await sendOTP('abcd1234', '9876543210');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Template ID cannot be empty.');
    }
  });

  test.skip('should fail if template ID wrong', async () => {
    const sent = await sendOTP(apiKey, '9876543210', 'abcdef1234');
    expect(sent).toBe(false);
  });

  test.skip('should fail if key is wrong', async () => {
    const sent = await sendOTP('abcd1234', '9876543210', 'abcdef1234');
    expect(sent).toBe(false);
  });

  test.skip('should send OTP', async () => {
    if (!apiKey) {
      throw Error('Please set MSG91_KEY in environment.');
    }

    if (!apiTemplateId) {
      throw Error('Please set MSG91_TEMPLATE_ID in environment.');
    }

    const sent = await sendOTP(apiKey, '9876543210', apiTemplateId);
    expect(sent).toBe(true);
  });
});
