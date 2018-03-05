import {
  homeBackgroundRootUrl,
} from '../Properties/homeBackgroundRootUrl';

import * as React from 'react';

// @ts-ignore
import styles from '../Styles/Components/HomeBackgroundImage.less';
const _styles = styles || {};

/* Do NOT add a slash between the end of homeBackgroundRootUrl and the image
 * name. This will break the link. */
export class HomeBackgroundImage extends React.PureComponent {
  render() {
    return (
      <picture className={_styles.HomeBackgroundImage}>
        <source
          media="(max-width: 767px)"
          sizes="(max-width: 1080px) 100vw, 1080px"
          type="image/webp"
          srcSet={`
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_1_1,c_fill,g_auto__c_scale,w_500.webp 500w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_1_1,c_fill,g_auto__c_scale,w_865.webp 865w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_1_1,c_fill,g_auto__c_scale,w_1073.webp 1073w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_1_1,c_fill,g_auto__c_scale,w_1080.webp 1080w`}
        />

        <source
          media="(min-width: 768px) and (max-width: 991px)"
          sizes="(max-width: 1983px) 100vw, 1388px"
          type="image/webp"
          srcSet={`
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_4_3,c_fill,g_auto__c_scale,w_538.webp 538w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_4_3,c_fill,g_auto__c_scale,w_969.webp 969w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_4_3,c_fill,g_auto__c_scale,w_1344.webp 1344w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_4_3,c_fill,g_auto__c_scale,w_1388.webp 1388w`}
        />

        <source
          media="(min-width: 992px) and (max-width: 1199px)"
          sizes="(max-width: 2400px) 100vw, 1440px"
          type="image/webp"
          srcSet={`
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_16_9,c_fill,g_auto__c_scale,w_596.webp 596w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_16_9,c_fill,g_auto__c_scale,w_1092.webp 1092w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_ksa0fy_ar_16_9,c_fill,g_auto__c_scale,w_1440.webp 1440w`}
        />

        <img
          alt="A background image with wabi-sabi hexagons containing images of the ocean and seabirds."
          sizes="(max-width: 4800px) 40vw, 1920px"
          srcSet={`
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_480.jpg 480w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_651.jpg 651w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_792.jpg 792w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_918.jpg 918w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1037.jpg 1037w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1137.jpg 1137w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1235.jpg 1235w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1328.jpg 1328w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1412.jpg 1412w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1495.jpg 1495w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1576.jpg 1576w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1656.jpg 1656w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1729.jpg 1729w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1802.jpg 1802w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1874.jpg 1874w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1919.jpg 1919w,
            ${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1920.jpg 1920w`}
          src={`${homeBackgroundRootUrl}HelloX_Landing_textures01_redigert_test_cxnveg_c_scale,w_1920.jpg`}
        />
      </picture>
    );
  }
}