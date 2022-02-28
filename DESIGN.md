# SSW345 Design Milestone:
### Finance Bot


## Group 7
1. Mikayla Mount
2. Matthew Mandelbaum
3. Dylan James
4. Jack Corridon


### “ I pledge my honor that I have abided by the Stevens Honors System.”

## Problem Statement

Finance will forever be an integral facet of our daily lives. It is a virtually important
subject matter to be familiar with in theory and in our own personal applications. While financial
savviness may come easy to those with experience and education, most people can afford to have
greater awareness of their equity trends and habits. This financial apprehension applies to both
user spending and the various types of income or assets they may have. With greater knowledge
of one’s trends and standings, the user may, and hopefully will make wiser financial decisions.
Our lives depend on balancing finances, and everyone deserves to and should have services and
applications dedicated to aid in such responsibility. However, besides five select states, the


American education system has not emphasized financial literacy as a necessary requirement,
and as a result of overlooking the subject Fortune Magazine reports that “nearly two thirds of
Americans can’t calculate interest payments correctly” - which is considered to be a basic
element of finances.
Thankfully, there are easy and accessible ways for the average person to gain control over
their finances. The power of data and how it is represented is incredible - the impact of being
able to visualize routines and tendencies of the past is more powerful than a stack of receipts
could ever achieve. Whether it be from having too many online subscriptions or splurging a daily
cup of coffee, there are always opportunities, whether they be great or small, for one to better
themselves and their spending habits. On the other hand, there are also incredibly beneficial
advantages of having greater awareness of one’s assets as well, from stock performance and their
next pay day. Financial advisory business SmartAsset confirms that “individuals with higher
levels of financial literacy tend to adhere to better financial practices – such as having an
emergency fund and planning for retirement – and are also more likely to build wealth further”.

## Bot Description

Our bot performs a variety of services for its user, the bot will have the ability to accept
the user’s spending data. The bot can accept the users accounts receivable (income) and accounts
payable (spending, saving, etc.), and then categorize them based on their type, for the income it
would be categorized based upon continual or single case income (gifts, tax reimbursements,
etc.). With spending it will categorize based upon use like food, rent, entertainment, travel, and
many other ways that you can spend or save money. From there the bot will take all the inputted
data and then perform visualizations with it like pie charts and graphs. With these visualizations,
the bot will also recommend the user to change their spending habits.
We believe this will be an incredibly beneficial solution to help people as we believe the
problem of peoples’ finances can be alleviated through appropriate spending habits that the bot
can help the customer achieve. However, this is just our minimum viable product. We also have
additional desirable features for the bot such as being able to take pictures of receipts and having
the bot read them to input the data automatically. We also want to include a brokerage tracker to
help track our users stocks, and give investment advice as well. Our most important additional
feature is to help direct our customer to potential savings like coupons, cheaper stores that sell
the same product in their area, and possible website promotions for other products. Our app is
about “Money efficiency at its finest.”

## Use Cases


● Use Case 1 - User inputs their spending of the day:


**Pre condition**
- [S0] User must have a registered account and be logged in
**Main flow**
- [S1] Starting with the first expense, the user tells the bot the amount spent
- [S2] User then specifies the category and memo associated with the purchase
- [S3] User submits report
**Subflow**
- [S1]User provides information in text box in $XX.XX
- [S2] Bot suggests previously used category information - accepts text fields for
both the category and purchase memo
- [S3] Bot prompts user to either submit another purchase report or to review past
data
**Alternative flow**
- [E1] User decides to not use the purchase report feature




● Use Case 2 - User wants to look at their past data trends and visuals :



**Pre condition**
- [S0] User must have a registered account and be logged in
- [S1] User must have previous data stored in their account
**Main flow**
- [S1] User selects the the ‘Trends and Analytics’ feature within our bot
- [S2] GUI presents a variety of bar, pie and line graphs to represent the trends in
spending over time and/or per category. User can select a different periods of
time in which they can see these trends.
- [S3] By clicking on or hovering over these infographics, users can see the
specific data that those graphs were compiled from.
**Subflow**
- [S1] Bot brings user to the Trends and Analytics page
- [S2] The bot presents a variety of different interactable infographics based on
stored user data and a specified time period
- [S3] Bot calls data being represented and gives the user specific values when the
graphs are interacted with
**Alternative flow**
- [E1] No previous user data stored
- [E2] User decides to not interact with the Trends and Graphics feature


## Design Sketches


### Sequence

This sequence diagram shows the relationship betweenthe main objects for our finance
bot. User financial information will be stored in objects. Each bank account will be stored in a
bank account object. These objects hold information such as interest, balance, and type of
account. After the user creates their account, they will be prompted to add their financial
information. What they input will automatically be converted into Bank Account and Spending
Info objects. These objects will then be aggregated and sent to the bot. The bot takes this
information in to create suggestions on how the user can improve their financial set up. The user
can call the bot object to get the suggestions for spending and how they have their accounts set
up.

![Sequence Diagram](https://github.com/mmandelb2201/finance-bot/blob/main/Sequence%20Diagram%20.png)

### Storyboard


This storyboard illustrates the way the user willnavigate through the website connected
to the bot. First, the user needs to create an account. This account will take in data such as email,
password, and their main bank. Next, the user will be directed to the Add Financial Data Page.
Here, the user will input data such as their monthly income, and their typical monthly expenses.
Lastly, the user inputs their bank accounts, their interest rate, and their balance. After creating an
account the user can access the account view page to view a specific bank account. The bot will
give suggestions on this page. Once financial data is inputted, the home screen will show their
monthly expenses breakdown, recent transactions, and an indicator showing how well the user is
sticking to their budget. The bot will give suggestions about how the user can change their
spending habits on this page as well as other suggestions.

![Storyboard Diagram](https://github.com/mmandelb2201/finance-bot/blob/main/Storyboard%20Diagram%20.png)

### Architecture Design


![Bot Diagram and Suggestion Service Diagram](https://github.com/mmandelb2201/finance-bot/blob/main/Architecture%20Design%20-%20Bot%20and%20Suggestion%20Diagram.png)

![Statistics Service Diagram](https://github.com/mmandelb2201/finance-bot/blob/main/Architecture%20Design%20-%20Statistics%20Service%20Diagram.png)



The architecture design that the bot development team will use was created with in
consideration of time allotted for the project, developer experience, expected user size, and
future planning. Important software development qualities such as feasibility and maintainability
of the project were discussed. The team found it appropriate to utilize the layered architecture
design shown in Figure 1 to create the platform that the bot will be embedded in. The bot is
responsible for performing statistics and providing suggestions through business-rules. These
responsibilities are illustrated as components in the _Business Logic/Service Layer._ The data
visualization which can be in the form of charts or tables are a part of the _Presentation Layer_ as
components. Information in Amazon DynamoDB database, outside the scope of our minimum
viable product, pictures of receipts will be stored in Amazon S3 Buckets and use Amazon
Textract to extract data in a structured manner.

Software development is a time consuming endeavor, and so for the group to add as
many properly-tested, and stable features as possible, we chose the layered architecture over the
microservices architecture. Implementation of the project and additional learning-curve for the
team will make developing separately deployed units difficult. There is no concern of scalability
issues and while the team does desire to go beyond the minimum viable product, further
maintenance and additional frequent features is not foreseen in the future. Thus, it is imperative
to create a well-defined scope for the bot and this architecture benefits from being easily testable
with high ease of development at the beginning. The team understands that this architecture may
struggle with maintainability, performance, and ease of deployment. The development team
believes that well-documented code and design and layered architecture's benefits will outweigh
the negatives for the team’s use case.

The bot consists of two major services: suggestion service and statistics service. The
suggestion service will generate suggestions based on specific rules. These rules will govern
what type of suggestions the user will give. User information from the Amazon DynamoDB
database will be used with the Statistics Service and Amazon OpenSearch Service to query and
analyze data. Amazon OpenSearch Service is a web service of AWS which manages clusters
created to index information. The intelligent search engine OpenSearch (an open-source forked
search engine of ElasticSearch) will make searching for relevant information and data
aggregation easier. The statistics service will use a number of libraries which can be called by
not just the suggestion service but also be used to power data visualizers such as pie charts.

The development team has decided to use Amazon Lambda, an event-driven cloud
compute service. AWS Lambda will be used to manage specific functions of each service.
Instead of creating a monolithic function for each service, the team has decided to split each
responsibility into its own Lambda function following the Single Responsibility Principle.
An important business requirement for the bot is to ensure that user financial information
secure. In order to uphold the confidentiality, integrity, and availability of user data, the team will
use Amazon security services such as Amazon Key Management service (data encryption
service). Also, AWS provides data protection guidelines for each web service provided.
