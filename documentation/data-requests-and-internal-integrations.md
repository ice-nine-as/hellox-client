# Data requests and internal integrations

## Diagram

![Data request and internal integration diagram](https://s3.eu-central-1.amazonaws.com/hellox/images/data-requests-and-internal-integrations.svg)

## Overview

There are three primary services, in addition to the webserver, that are owned and administered by Ice 9. A [CMS server](cms.hellox.me), a server running Drupal 7, which provides content authors a simple storage interface and rich editing experience, a [server running a Discourse forum](forum.hellox.me), which allows team members and customers a public arena in which to converse and plot future directions of the project, and a PostgreSQL database server, hosted on Amazon's Relational Database Service, which stores non-file data for both of the aforementioned services.

The CMS site is intended to be entirely team-focused, and nothing hosted on that site will be shown to customers on that site. Rather, each piece of content on the CMS is syndicated through a series of RSS feeds. These feeds are as follows:

* News feed
    * Full articles
        * Hosted at https://cms.hellox.me/feeds/news-feed-full.xml and https://cms.hellox.me/feeds/%/news-feed-full-single.xml, where `%` denotes the node ID of the news item.
        * Syndicated at https://hellox.me/article/:id, where `:id` denotes the node ID of the news item, and https://hellox.me/archives.
    * Article titles
        * Hosted at https://cms.hellox.me/feeds/news-feed-title.xml
        * Currently unsyndicated anywhere on the website
    * Teaser synopses
        * Hosted at https://cms.hellox.me/feeds/news-feed-teaser.xml
        * Syndicated at https://hellox.me, https://hellox.me/article/:id, and https://hellox.me/archives.
* Story templates for the story generator
    * Hosted at https://cms.hellox.me/feeds/%/%/story-template-feed.xml, where the first `%` denotes the language of the content (en, nb, ru), and the second denotes the story part (A, B, C)
    * Syndicated at https://hellox.me/write
* Team members
    * Hosted at https://cms.hellox.me/feeds/team-members-feed.xml
    * Syndicated at https://hellox.me/about
* Quotes
    * Hosted at https://cms.hellox.me/feeds/quotes-feed.xml
    * Syndicated at https://hellox.me
* Story template validator (not shown in diagram, not intended to be customer-facing)
    * Hosted at https://cms.hellox.me/feeds/%/story-template-validator.xml. where `%` denotes the node ID of the story template to be validated.
    * Syndicated at https://hellox.me/storyTemplateValidator

Note that the news feed items have a custom paging module which allows an offset URL argument to be provided, e.g. https://cms.hellox.me/feeds/news-feed-teaser.xml?offset=3. However, this is not used anymore given that the podcast RSS feed does not support paging.

There is a single additional endpoint, https://cms.hellox.me/feeds/podcast-feed.xml, which relies on a very simple custom module which merely downloads an RSS feed from the Blubrry podcast host's endpoint and forwards it to the requester. This was done because, when these systems were originally developed and configured, Blubrry had not configured their CORS rules such that external requests could be performed, and server-side requests are not bound by CORS.

The Discourse forum is intended to be viewed and used as a normal web page by customers, but is also syndicated into a widget on the front page. There is only a single [endpoint](https://forum.hellox.me/latest.rss) we use at present.