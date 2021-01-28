# Genshin Impact Character Tracker
A browser-based app for manually tracking your Genshin Impact characters and their stats, and for managing your in-game goals.

The purpose of this project is to have all your character information stored online, which you can bookmark or keep open in a tab, and which takes less time to load than the actual game itself. You can also aggregate your goals in your dashboard so that you can see which daily domains are relevant to your characters' ascensions and weapon ascensions, as well as keep track of which artifacts you have and need for your characters. No need to flip through pages of crossed out notes anymore! 

## Link to Live Project:

## How to Setup After Cloning:

## Project Planning:
Entity Relationship Diagram: https://lucid.app/lucidchart/invitations/accept/18a984d6-26ce-4ce0-a51e-ee6e22bc8714
Wireframes: https://www.figma.com/file/YYpdBfzQkJaAiz9c5pFhUF/Genshin-Character-Tracker-Wireframes?node-id=0%3A1

## Background:
Whenever I talk about anything related to my characters in Genshin Impact on Reddit or with my friends--such as character builds or team compositions--I find that I oftentimes have to open the game just to see what my character's stats are, the name and level of their weapon they're using, or which artifacts (plus their main- and sub- stats) they have equipped. 

I also keep forgetting if I can use my resin (i.e. Genshion's stamina currency) on artifacts, or whether I should use them on today's ascension domains. 

And I'll forget which specific artifacts I'm farming for each character (in order to fulfill artifact set bonuses): Whenever I see my domain drops, I have to find my physical list of artifacts so I can know whether I'm done running a domain or whether I should continue to do another run.

This app arose from the intersection of the pain points above, and the exigence below. 

## Exigence: 
This app is my unit 2 project for General Assembly's Software Engineering Intensive (GA SEI). [Requirements](https://github.com/patricia-pan/project2_ideas) include:
- Have at least 2 models (more if they make sense) that represents the main functional idea for your app. This doesn't include join tables or the user model which should be part of your class's boilerplate code.
- Include sign up/log in functionality, with hashed passwords & an authorization flow
- Incorporate at least one API. Examples include Yelp, Tumblr, Facebook, and others on Mashape. Maybe grab an API from this list of free APIs
- Have complete RESTful routes for at least one of your resources with GET, POST, PUT, and DELETE
- Utilize an ORM to create a database table structure and interact with your relationally-stored data
- Include a readme file that explains how to use your app
- Have semantically clean HTML, CSS, and back-end code
- Be deployed online and accessible to the public

The above is why the local database (stockCharacter) was seeded with an API (which took a while to calibrate) instead of manually populated.

## Timeline
1/20/21 - Found and added Genshin custom font
1/21/21 - Added background and EJS layout scss, 404 page
1/23/21 - Minimized scope of project, added user model
1/25/21 - Added login authentication, password hashing, flash messages, navbar, character and goal models  
1/26/21 - Populated stockCharacter model with API, added bootstrap-select multi-select+search form for adding user's characters, incorporated ability to view all and delete myCharacters on the /characters page, aligned link formatting in the navigation bar.
1/27/20 - Added multi-select form with user-specific character options to dashboard page, added ability to add comments/notes for each user's specific characters and have them show up on the dashboard page, grouped by character.

## Credit:

