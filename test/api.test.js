const { sendOTP, verifyOTP, resendOTP } = require('../src/api');

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

  test.skip('should fail if key is wrong', async () => {
    const sent = await sendOTP('abcd1234', '9876543210', 'abcdef1234');
    expect(sent).toBe(false);
  });

  test.skip('should fail if template ID wrong', async () => {
    const sent = await sendOTP(apiKey, '9876543210', 'abcdef1234');
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

describe('verifyOTP', () => {
  test('should fail if key is empty', async () => {
    try {
      await verifyOTP('', '9876543210', '1234');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('API key cannot be empty.');
    }
  });

  test('should fail if number is empty', async () => {
    try {
      await verifyOTP('abcdef1234', '', '1234');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number cannot be empty.');
    }
  });

  test('should fail if number is empty', async () => {
    try {
      await verifyOTP('abcdef1234', '', '1234');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number cannot be empty.');
    }
  });

  test('should fail if number is not numeric', async () => {
    try {
      await verifyOTP('abcd1234', 'abcdefghij');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number must be numeric.');
    }
  });

  test('should fail if OTP is empty', async () => {
    try {
      await verifyOTP('abcdef1234', '9876543210', '');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('OTP cannot be empty.');
    }
  });

  test('should fail if OTP is not numeric', async () => {
    try {
      await verifyOTP('abcd1234', '9876543210', 'abcd');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('OTP must be numeric.');
    }
  });

  test.skip('should fail if key is wrong', async () => {
    const sent = await verifyOTP('abcd1234', '9876543210', '1234');
    expect(sent).toBe(false);
  });

  test.skip('should fail if otp is not verify', async () => {
    if (!apiKey) {
      throw Error('Please set MSG91_KEY in environment.');
    }

    await sendOTP(apiKey, '9876543210', apiTemplateId);
    const verify = await verifyOTP(apiKey, '9876543211', '1234');
    expect(verify).toBe(false);
  });

  test.skip('should verify otp', async () => {
    if (!apiKey) {
      throw Error('Please set MSG91_KEY in environment.');
    }

    await sendOTP(apiKey, '9876543210', apiTemplateId);
    const verify = await verifyOTP(apiKey, '9876543210', '1234');
    expect(verify).toBe(false);
  });

})

describe('resendOTP', () => {
  test('should fail if key is empty', async () => {
    try {
      await resendOTP('', '9876543210');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('API key cannot be empty.');
    }
  });

  test('should fail if number is empty', async () => {
    try {
      await resendOTP('abcd1234', '');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number cannot be empty.');
    }
  });

  test('should fail if number is not numeric', async () => {
    try {
      await resendOTP('abcd1234', 'abcd1234');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Number must be numeric.');
    }
  });

  test('should fail if voice is not boolean', async () => {
    try {
      await resendOTP('abcd1234', '9876543210', 'string');
      expect(true).toBe(false);
    } catch (e) {
      expect(e.message).toBe('Voice must be boolean.');
    }
  });

  test.skip('should fail if key is wrong', async () => {
    const sent = await resendOTP('abcd1234', '9876543210');
    expect(sent).toBe(false);
  });

  test.skip('should resend OTP', async () => {
    if (!apiKey) {
      throw Error('Please set MSG91_KEY in environment.');
    }

    const resent = await resendOTP(apiKey, '9876543210');
    expect(resent).toBe(true);
  });
})
