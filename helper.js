import {
  GREEN_COLOR_CODE,
  END_COLOR_CODE,
  RED_COLOR_CODE
} from './constants.js';

export const getGreenLogText = (text) => {
  return `${GREEN_COLOR_CODE}${text}${END_COLOR_CODE}`; 
}

export const logText = ({ text, value = '', colorCode = GREEN_COLOR_CODE, error = false }) => {
  const textColor = error ? RED_COLOR_CODE : colorCode;
  console.log(`${textColor}${text} ${END_COLOR_CODE}${value}`);
}
