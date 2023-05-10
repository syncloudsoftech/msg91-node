# MSG91 v5 NodeJs Wrapper 
 The node js library for msg91 to send, verify and resend OTP.

## Usage

```javascript

const msg91 = require("msg91-node")("MSG91_KEY");
const phoneNumber = "XXXXXXXXXX";

/**
 * Send OTP to given phone number
 * @param {string} number
 * @param {string} templateId
 * @returns {Promise<boolean>}
 */
const sent = await msg91.send(phoneNumber, "MSG91_TEMPLATE_ID");

/**
 * Verify OTP to given phone number with given otp
 * @param {string} number
 * @param {string} otp
 * @returns {Promise<boolean>}
 */
const verify = await msg91.verify(phoneNumber, otp);

/**
 * Resend OTP to given phone number
 * @param {string} number
 * @param {boolean} voice
 * @returns {Promise<boolean>}
 */
const resend = await msg91.resend(phoneNumber);
```
## Update .env variables
MSG91_KEY={Your key}

MSG91_TEMPLATE_ID={Your template ID}

## License

See the [LICENSE](LICENSE.txt) file.