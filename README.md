# MSG91 for Node.js
 Unoffocial client for [MSG91](https://msg91.com/in) to send, resend and verify OTPs over SMS.

## Usage

```javascript

const msg91 = require("msg91-node")("MSG91_KEY");
const number = "XXXXXXXXXX";

/**
 * Send OTP to given phone number
 * @param {string} number
 * @param {string} templateId
 * @returns {Promise<boolean>}
 */
const sent = await msg91.send(number, "MSG91_TEMPLATE_ID");

/**
 * Verify OTP to given phone number with given otp
 * @param {string} number
 * @param {string} otp
 * @returns {Promise<boolean>}
 */
const verify = await msg91.verify(number, otp);

/**
 * Resend OTP to given phone number
 * @param {string} number
 * @param {boolean} voice
 * @returns {Promise<boolean>}
 */
const resend = await msg91.resend(number);
```

## License

See the [LICENSE](LICENSE.txt) file.
