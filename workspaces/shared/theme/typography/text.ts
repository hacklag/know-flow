import fontFamilies from './font-families'

export default {
  /**
   * It's useful to have 600 because `Link` uses the `Text` component.
   * A `Link` could be used as 600 in the context of a breadcrumb.
   */
  '600': `
    fontSize: 20px;
    fontWeight: 400;
    lineHeight: 24px;
    letterSpacing: -0.07px;
    /**
     * Use font family display because the font-size is 20px.
     */
    fontFamily: ${fontFamilies.display};
  `,
  '500': `
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.05px;
  `,
  '400': `
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: -0.05px;
  `,
  '300': `
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0;
  `,
}
