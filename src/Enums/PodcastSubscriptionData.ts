/* NOTE: *both* the key and the value of this "enum" (in actuality an object)
 * that functions almost identically to an enum) are rendered to the page.
 * The key is used for the link text, and the value is used as the URL. */ 

export const PodcastSubscriptionData: { [key: string]: string } = {
  iTunes:     'https://itunes.apple.com/no/podcast/hello-x/id1380756324&ls=1',
  Android:    'https://www.subscribeonandroid.com/www.blubrry.com/feeds/hello_x.xml',
  Stitcher:   'https://www.stitcher.com/podcast/ice9/hello-x',
  SoundCloud: 'https://soundcloud.com/hello_x',
  RSS:        'https://www.blubrry.com/feeds/hello_x.xml',
};

export default PodcastSubscriptionData;