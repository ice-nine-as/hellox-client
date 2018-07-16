import * as React from 'react';

// @ts-ignore
import _styles from '../Styles/Components/HomeBackgroundImage.less';
const styles = _styles || {};

export const homeBackgroundRootUrl = 'NOT_CURRENTLY_USED';

/* Do NOT add a slash between the end of homeBackgroundRootUrl and the image
 * name. This will break the link. */
export class HomeBackgroundImage extends React.PureComponent {
  render() {
    return (
      <picture className={styles.HomeBackgroundImage}>
        <source
          media="(max-aspect-ratio: 1/1)"
          srcSet=
            {`${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_400.jpg 400w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_515.jpg 515w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_614.jpg 614w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_702.jpg 702w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_782.jpg 782w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_859.jpg 859w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_927.jpg 927w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_995.jpg 995w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1062.jpg 1062w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1123.jpg 1123w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1179.jpg 1179w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1237.jpg 1237w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1295.jpg 1295w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1351.jpg 1351w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1404.jpg 1404w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1452.jpg 1452w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1502.jpg 1502w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1532.jpg 1532w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_1_1,c_fill,g_auto__c_scale,w_1534.jpg 1534w`}
        />

        <source
          media="(aspect-ratio: 4/3)"
          srcSet=
            {`${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_538.jpg 538w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_613.jpg 613w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_680.jpg 680w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_743.jpg 743w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_802.jpg 802w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_859.jpg 859w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_918.jpg 918w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_971.jpg 971w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1016.jpg 1016w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1065.jpg 1065w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1116.jpg 1116w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1160.jpg 1160w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1208.jpg 1208w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1249.jpg 1249w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1290.jpg 1290w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1330.jpg 1330w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1369.jpg 1369w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1382.jpg 1382w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_4_3,c_fill,g_auto__c_scale,w_1388.jpg 1388w`}
        />

        <source
          media="(min-aspect-ratio: 16/9)"
          srcSet=
            {`${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_596.jpg 596w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_681.jpg 681w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_761.jpg 761w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_833.jpg 833w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_902.jpg 902w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_970.jpg 970w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1033.jpg 1033w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1090.jpg 1090w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1154.jpg 1154w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1211.jpg 1211w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1266.jpg 1266w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1318.jpg 1318w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1369.jpg 1369w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1416.jpg 1416w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1439.jpg 1439w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_ar_16_9,c_fill,g_auto__c_scale,w_1440.jpg 1440w`}
        />

        <img
          srcSet=
            {`${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_480.jpg 480w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_1132.jpg 1132w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_1558.jpg 1558w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_1905.jpg 1905w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_2230.jpg 2230w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_2506.jpg 2506w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_2759.jpg 2759w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_2992.jpg 2992w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_3218.jpg 3218w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_3451.jpg 3451w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_3645.jpg 3645w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_3849.jpg 3849w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4039.jpg 4039w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4234.jpg 4234w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4416.jpg 4416w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4600.jpg 4600w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4782.jpg 4782w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4953.jpg 4953w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_4985.jpg 4985w,
            ${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_5000.jpg 5000w`}
          src={`${homeBackgroundRootUrl}home_background_ojn7bb_c_scale,w_1132.jpg`}
          alt="A hexagon-filled pictorial illustration showing fragments of fishscales, bird feathers, water, and other aspects of sea life."
        />
      </picture>
    );
  }
}