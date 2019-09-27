"""
Scrape reddit comments that refer to VPN products
"""

# TODO: vpn name detection is naive: "pivpn" is detected as an iVPN mention.
# tokens cannot be part of another word

# TODO: text-processing.com SA is not great. "no major issue" returned negative.

# pylint: disable=invalid-name
import sqlite3
import time
import datetime
import requests
import praw
import vpnlist


#UNIX_TIMESTAMP_1_1_2017 = int(time.mktime(datetime.date(2017, 1, 1).timetuple()))

TEST_TIMESTAMP = int(time.mktime(datetime.date(2017, 5, 12).timetuple()))

def get_sentiment_analysis(text):
    """
    Basic sentiment analysis from text-processing.com
    Return -1 for negative, 0 for neutral and 1 for positive
    """

    r = requests.post('http://text-processing.com/api/sentiment/', data={'text': text})
    print(text, ": ", r.json())
    label = r.json()['label']
    if label == 'neg':
        return -1
    if label == 'pos':
        return 1
    return 0



def main():
    """ main """

    # open sqlite connection
    db = sqlite3.connect('mined.db')
    cursor = db.cursor()
    # created date is stored as a unix time stamp
    cursor.execute('''CREATE TABLE IF NOT EXISTS comments (
                comment_id text, submission_id text, comment_body text, 
                sentiment integer, score integer,
                created integer, vpn_name text, unique(comment_id, submission_id))''')

    #timestamp = UNIX_TIMESTAMP_1_1_2017
    timestamp = TEST_TIMESTAMP

    reddit = praw.Reddit('bot_vpn') #reference to praw.ini
    #vpn_subreddit = reddit.subreddit('vpn')
    subreddits = ['vpn']#, 'privacy', 'technology', 'piracy']
    # 'techsupport', 'sysadmin', 'china'"""]

    vpn_list = vpnlist.VPNList()

    # all submissions from the start of 2017
    for subr in subreddits:
        print("Subreddit: {0}".format(subr))
        submissions = reddit.subreddit(subr).submissions(timestamp)
        submission_ids = []
        print("Getting submission ids")
        counter = 0
        for submission in submissions:
            submission_ids.append(submission.id)
            counter += 1
        print("Finished {0} ids".format(counter))

        print("Getting comments")
        mined_comments = []
        mined_vpns = {}
        counter, comments_counter = 0, 0
        for vpn in vpn_list.VPN_LIST:
            mined_vpns[vpn] = 0
        for submission_id in submission_ids:
            counter += 1
            print("Going over submission #{0}".format(counter))
            submission = reddit.submission(id=submission_id)
            submission.comments.replace_more(limit=0)
            for comment in submission.comments.list():
                comments_counter += 1
                search_vpn = vpn_list.find_vpn_in_body(comment.body)
                if search_vpn != "":
                    print("Found VPN ref {0} in comment id {1}".
                          format(search_vpn, comment.permalink(fast=True)))
                    cursor.execute("INSERT INTO comments VALUES(?,?,?,?,?,?,?)",
                                   (comment.permalink(fast=True), submission_id, comment.body,
                                    get_sentiment_analysis(comment.body),
                                    comment.score, submission.created, search_vpn))
                    mined_comments.append(comment)
                    mined_vpns[search_vpn] += 1

        print("Mined {0} comments referring to VPN".format(len(mined_comments)))
        print("Analysed total {0} comments".format(comments_counter))
        print(mined_vpns)
    db.commit()
    db.close()

if __name__ == "__main__":
    main()
