/* from posts.json */

export interface IForumPost {
  id: number;
  name: string;
  username: string;
  avatar_template: string;
  created_at: Date;
  cooked: string;
  post_number: number;
  post_type: number;
  updated_at: Date;
  reply_count: number;
  reply_to_post_number: number;
  quote_count: number;
  
  /* null when I queried posts.json, not sure what it is. */
  avg_time: any;

  incoming_link_count: number;
  reads: number;
  score: number;
  yours: boolean;
  topic_id: number;
  topic_slug: string;
  topic_title: string;
  topic_html_title: string;
  category_id: number;
  display_username: string;

  /* null when I queried posts.json, not sure what it is. */  
  primary_group_name: any;
  primary_group_flair_url: any;
  primary_group_flair_bg_color: any;
  primary_group_flaire_color: any;

  version: number;
  can_edit: boolean;
  can_delete: boolean;

  /* null when I queried posts.json, not sure what it is. */  
  can_recover: any;

  can_wiki: boolean;
 
  /* null when I queried posts.json, not sure what it is. */  
  user_title: null;

  raw: string;
  actions_summary: Array<{
    id: number;
    hidden?: boolean;
    can_act: boolean;
  }>;

  moderator: boolean;
  admin: boolean;
  staff: boolean;
  user_id: number;
  hidden: boolean;
  trust_level: number;

  /* null when I queried posts.json, not sure what it is. */  
  deleted_at: any;

  user_deleted: boolean;

  /* null when I queried posts.json, not sure what it is. */  
  edit_reason: any;
  
  can_view_edit_history: boolean;
  wiki: boolean;
};