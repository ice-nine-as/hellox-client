export interface IForumTopic {
  id: number;
  title: string;
  fancy_title: string;
  slug: string;
  posts_count: number;
  reply_count: number;
  highest_post_number: number;
  image_url: string;
  created_at: Date;
  last_posted_at: Date;
  bumped: boolean;
  bumped_at: Date;
  unseen: boolean;
  pinned: boolean;
  
  /* null as of 07/18. */
  unpinned: any;
  
  excerpt: string;
  visible: boolean;
  closed: boolean;
  archived: boolean;
  /* null as of 07/18. */
  bookmarked: any;
  /* null as of 07/18. */  
  liked: any;
  views: number;
  like_count: number;
  has_summary: boolean;
  archetype: string;
  last_poster_username: string;
  category_id: number;
  pinned_globally: boolean;
  
  /* null as of 07/18. */
  featured_link: any;
  
  posters: Array<{
    extras: string | null;
    description: string;
    user_id: number;
    
    /* null as of 07/18. */
    primary_group_id: any;
  }>;
};