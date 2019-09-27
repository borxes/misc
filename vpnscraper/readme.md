# Project Notes

- Going from a comment to parent submission and getting its title is a very expensive operation. Better to work with ids (for post and comment).

- praw issues API requests every 2 secs, if you work raw json via request_json method, it's 1000 per minute.
[article about speeding up praw](http://blog.thehumangeo.com/2014/09/23/supercharging-your-reddit-api-access/)
also use ```python comment.permalink(fast=True)```

- submission.selftext, submission.url

- results from running the script over all /r/vpn 2017 submissions?
Mined 45 comments referring to VPN (out of 583 submissions)
Analysed total 6133 comments

```python 
{'hotspot shield': 1, 'pia': 17, 'vpnarea': 0, 'hide my ass': 3, 'vypr vpn': 1, 'purevpn': 4, 
'ipvanish': 1, 'nordvpn': 9, 'torguard': 4, 'expressvpn': 5}
```

real	11m34.283s

text search speed is about 8 comments per second. very slow! but good enough for security products.

# Plan

- (Done)Scrape all /r/vpn submissions and comments in 2017, store everything that mentions vpns into a db.

    [v] iterate over all subreddit submissions

    [v] store submission ids into a list + db

    [v] iterate over submissions, get all comments, store all relevant comments into db:
       comment text, comment date, submission id, vpn mentioned 

- Now add a field for sentiment analysis of the text (positive, neutral, negative?)   