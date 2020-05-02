W5D5 Mid-term Project Kickoff
### Pick a Project
[x]Wiki Map

### User Stories

[]users can see a list of the available maps
[]users can view a map
[]a map can contain many points
[]each point can have: a title, description, and image
[]authenticated users can create maps
[]authenticated users can modify maps (add, edit, remove points)
[]users can favourite a map
[]users have profiles, indicating their favourite maps and maps they've contributed to

USERS, MAPS, FAVOURITES(hearted), USER_MAPS(maps user has contributed to) LOCATIONS(theme id, flags )


### A user scenario is a syntactic alternative to user stories

They have the form: Given _____, when ______, then ______.
[] Given that I am logged in, when I click favourite on a post, then it is added to my favourites and heart is lit up.
[] When user arrives to the page, there are example maps and instructions on how to use them.
[] Users created maps can contain multiple locations
[] You can also chain on an and to user stories/scenarios

eg. Given that I am logged in, when I click favourite on a post, then it is added to my favourites and the save icon will change to indicate success.
### ERD
The user stories provide you with nouns (eg. user, posts, favourites)
Use these nouns/entities to build out your database (ie. tables are the nouns from the stories)
### Routes
url/, (home)
url/favourites/:user_id,
url/:map_id, (edit/view)
url/:user_id, (users contributions and users maps)

//CREATING END POINTS FOR APIS

 CREATE
 READ
 UPDATE
 DELETE
R B browse GET / GET /create
R R read GET /favorites/:id GET map/:map_id GET mymaps/:user_id
U E edit POST map/:map_id
C A add POST url/create
D D delete POST /favorites/:map_id/(DELETE) POST /map/:marker_id/(DELETE)



Once you know the resources that you'll have, write out the routes that you'll need to perform BREAD operations on those resources
Remember RESTful conventions (they make it much easier)
### MVP vs MVD
Most Valuable Primate
There is a concept in development of an MVP, the Minimum Viable Product
An MVP has just enough features to be useful to a user
This concept helps streamline the development process and help keep the team on target
For mid-terms, we want to focus on the MVD, the Minimum Viable Demo
If you aren't going to demo it, don't build it
### Wireframes
Draw out the structure of your web pages
This will make it much easier to build out these pages later
This is also a great opportunity to get input from all of the team members
Design matters... however you are a developer, not a designer
Get inspiration from websites you visit
User Login
Don't do it
Seriously, don't do it
We know that you know how to register and login users

// do this instead

app.get('/login/:id', (req, res) => {
  req.session.user_id = req.params.id;
  res.redirect('/');
});
### Tech Choices
We have made all the tech choices for you
Back End: Node and Express
Front End: HTML, CSS, JS, jQuery, Bootstrap
### The Mid-term Skeleton
Use the provided node-skeleton as a template for your project
This will get you up and running quickly
SPA vs Multi-page App
These concepts are not mutually exclusive
You can choose one or the other or both
Git
Use Git best practices (ask a mentor for clarification if you need it)
Use branches
### DO NOT CODE ON MASTER
I repeat, do not code on master
### Splitting up the Work
Horizontally - whole team working on front-end or back-end at the same time
Vertically - divide the work between front-end and back-end
Pair Programming - working together on the same tasks
### Communication
Make sure to communicate with your team members
Use Slack, iMessage, Google Hangouts, whatever... just make sure that everyone is on the same page
Github Projects
Github has a built-in project board (similar to a kanban board)
### Deployment
Decide if you want/need to deploy your application to the cloud
Ask a mentor for assistance/advice if your team decides to deploy
