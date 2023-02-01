import puppeteer from 'puppeteer';
import askQuestion from './askQuestion.js';

import {
  GREY_THR_URL,
  KEYBOARD_TYPING_DELAY_TIME,
  SELECTOR_WAIT_TIME,
  SUBMIT_BUTTON_WAIT_TIME,
  USERNAME,
  PASSWORD,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
  HEADLESS_MODE,
  DEFAULT_TIMEOUT
} from './config.js';

import {
  USERNAME_INPUT_FIELD_ID_TEXT,
  PASSWORD_INPUT_FIELD_ID_TEXT,
  PINK_COLOR_CODE,
  SIGN_IN,
  SIGN_OUT
} from './constants.js';

import { getGreenLogText, logText } from './helper.js';

const init = async () => {
  const text = getGreenLogText('Press 1 for signIn and 2 for signout.\n');
  const answer = await askQuestion(text);
  
  if (!(answer == 1 || answer == 2 )) {
    logText({ text: 'Invalid option selected. Please press 1 or 2.', error: true });
    process.exit(0);
  }

  const selectedChoice = answer == 1 ? SIGN_IN : SIGN_OUT;
  
  logText({ text: 'Selected Choice ===>', value: selectedChoice });
  const browser = await puppeteer.launch({ headless: HEADLESS_MODE });
  const page = await browser.newPage();

  logText({ text: 'Open URL ===>', value: GREY_THR_URL });
  await page.goto(GREY_THR_URL);

  // Set screen size
  await page.setViewport({ width: SCREEN_WIDTH, height: SCREEN_HEIGHT });

  await page.waitForTimeout(SELECTOR_WAIT_TIME);

  logText({ text: 'Entering username:', value: "*".repeat(USERNAME.length), colorCode: PINK_COLOR_CODE });
  const usernameSelector = await page.waitForSelector(`input[id="${USERNAME_INPUT_FIELD_ID_TEXT}"]`, { timeout: DEFAULT_TIMEOUT });
  await usernameSelector.type(USERNAME, {delay: KEYBOARD_TYPING_DELAY_TIME})

  logText({ text: 'Entering password:', value: "*".repeat(PASSWORD.length), colorCode: PINK_COLOR_CODE });
  const passwordSelector = await page.waitForSelector(`input[id="${PASSWORD_INPUT_FIELD_ID_TEXT}"]`, { timeout: DEFAULT_TIMEOUT });
  await passwordSelector.type(PASSWORD, {delay: KEYBOARD_TYPING_DELAY_TIME})

  logText({ text: 'Submitting the form...', colorCode: PINK_COLOR_CODE });
  await page.click("button[type=submit]", { waitForTimeout: SUBMIT_BUTTON_WAIT_TIME });

  logText({ text: 'Waiting for sign In/sign Out button...' });
  await page.waitForNetworkIdle({ timeout: DEFAULT_TIMEOUT });
  logText({ text: 'In progress...' });
  await page.waitForTimeout(5000);
  
  logText({ text: 'Performing action now...' });
  const button = await page.evaluateHandle(`document.querySelector("body > app > ng-component > div > div > div.container-fluid.app-container.px-0 > div > ghr-home > div.page.page-home.ng-star-inserted > div > gt-home-dashboard > div > div:nth-child(3) > gt-component-loader > gt-attendance-info > div > div > div.btn-container.mt-3x.flex.flex-row-reverse.justify-between.ng-star-inserted > gt-button:nth-child(1)").shadowRoot.querySelector("button")`);
  button.click();

  logText({ text: `${selectedChoice} Action has been successfully executed! press ctrl + c to close the script.`});
  await page.waitForTimeout(8000);
}

try {
  init();
} catch(error) {
  logText({ text: 'Error while executing the script!!', error: true });
  process.exit(0);
}
