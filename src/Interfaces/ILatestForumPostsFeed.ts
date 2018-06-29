import {
  IForumTopic,
} from './IForumTopic';

export interface ILatestForumPostsFeed {
  users: Array<{
    id: number;
    username: string;
    avatar_template: string;
  }>;

  /* Empty when I query forum.hellox.me/latest.json as of 07/18. */ 
  primary_groups: Array<any>;

  topic_list: {
    can_create_topic: boolean;
    more_topics_url: string;
    /* null as of 07/18. */
    draft: any;
    draft_key: string;
    draft_sequence: number;
    per_page: number;
    topics: Array<IForumTopic>;
  }
}

export default ILatestForumPostsFeed;