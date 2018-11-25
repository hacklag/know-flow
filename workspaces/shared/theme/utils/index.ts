import {colors} from '../foundational-styles'
import {fontFamilies, headings, paragraph, text} from '../typography'

const themedProperty = (object, keyOrValue) => {
  if (Object.prototype.hasOwnProperty.call(object, keyOrValue)) {
    return object[keyOrValue]
  }

  return keyOrValue
}

export const getTextColor = color => {
  return themedProperty(colors.text, color)
}

export const getFontFamily = fontFamily => {
  return themedProperty(fontFamilies, fontFamily)
}

export const getHeadingStyle = style => {
  return themedProperty(headings, style)
}

export const getTextStyle = style => {
  return themedProperty(text, style)
}

export const getParagraphStyle = style => {
  return themedProperty(paragraph, style)
}
