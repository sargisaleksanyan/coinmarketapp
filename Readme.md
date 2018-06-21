# CoinmarketApp
Application scraps given topics from twitter and displays in Charter.
It scrapps given topics in every 20-25 seconds( to avoid getting blocked)
## Getting Started
Install git-bash in your computer follow instructions in the link

 * ** https://www.atlassian.com/git/tutorials/install-git#windows
   ```
## Download source code from git hub
Download source code from git hub from this link https://github.com/sargisaleksanyan/coinmarketapp.git

   ```  https://help.github.com/articles/cloning-a-repository/
* **Chart viewer** . To view tweets in chart go to suburl from navigation , in /graph page to view statiscs about topic that
exists in our database just search topic name , to view all topics click All-Topics button.
* **Scrapper** .To scrap data from twitter go to Scrapper from Navigation menu. To scrap topics
enter the name of topic in input and then click Add-Topic button. You can add much topics as you want.
the , there are 3 ways to scrap data .
*Current-Scrap -Scrapes latest tweets .
*Restart-Old-Scrapper -Scrapes all missed twitts from since last scrapped data to current date .
 For example  if data had been scrapped till yesterday and stopped by this way it will scrap from current time tommore to yesterday.
*Back-Date-Scrapper -Scrapes oldest tweet from database up to oldest tweet in tweeter.
##  End points
  * **/twitterScrapper/current** - Method -Post ,  Scrapes latest tweets
   ```
   request params {topics:["Trump","ISIS"]}
   ```
  * **/twitterScrapper/back**  -  Method -Post ,  Scrapes all missed twitts
   ```
   request params {topics:["Trump","ISIS"]}
   ```
  * **/twitterScrapper/oldest** -  Method -Post ,Scrapes oldest tweet
   ```
   request params {topics:["Trump","ISIS"]}
   ```
  * **/api/twitter** -Method -Get return  statistcs about all topics from database
  * **/api/twitter/:topic** -Method -Get return  statistc about given topics from database

## How scrapper works.
Every tweet has certain id , the newer is tweet the bigger is id , to I scrap I can restart or scrapped
old data based on tweet id .






