---
title: Fixing blank pages on a Wordpress custom post type archive
description: This is a post on My Blog about agile frameworks.
date: 2022-03-08
tags:
  - wordpress
layout: layouts/post.njk
---
I ran into an interesting problem this week. I placed a standard pagination list on an archive page for a custom post type. The pagination kept including an additional blank page, no matter how many posts were available on the archive. 

## TL;DR

If you have a custom query loop with a different number of posts per page than the WordPress default, you need to modify the total argument in your loop. Like so:

```php/3
the_posts_pagination(array(
	'mid_size' => 2,
	'next_text' => 'Next Page',
	'total' => $your_posts_per_page_value
));
```

