## Rate my chonk

You can rate the cats on a subreddit called chonkers

DEMO: https://rate-my-chonk.firebaseapp.com/

Todo:
Don't forget to take out redux dev tools

You should be able to go to a single chonk's page and rate that single chonk

Different options to get chonks for voting, ie. recent
If the user signs out as a guest, just do a delete in firebase
Use lighthouse to see the performance of my site
Responsive last

More flexible ways of getting chonks

Recent reddit alltime posts, this week 30 days, 1 year.

handle User Favorites:
Get the obj and update redux with it, then update the user route on firebase, then do checks if the user favorites the cat, have the button be un-favorite. If the hasPropertyOf the handleName in their fav, then unfav the cat and update the fav array. In the user profile, get the fav array, and use the array keys to identify the keys in the object and get their src to display.

Low Prio:
Anon auth, As guest, signup is shown on the user page as well as navbar
Comments, likes, and
Once the user logs in with their account/ created new account, they will have their favorite cats
Possible updates to the way averages are calculated, instead of arrays, we can use 2 keys, starting average, and vote count. But it might complicate things.
Enlarge chonk scale with magnify with slider change

For the reddit api, I need to load the pictures and push them into my data, all the need is the old structure so I can do my usual calculations.

Change the way I get images. It will be getting all images from reddit and storage, then(I need to think about how my data store will look like, I will need the imageUrl, and key for the firebase cats db). Then show them all one by one on the page.

For favorite, I will need the src in state or somewhere for the user to just save the url.

Scrape chonker from reddit and get their id as keys
user is able to upload a picture of their cat once they sign in
Name the cat and favorite it
Having a sort method so the user can sort the cat images with: popularity, avg score
Chonk profile, user profile

Simplistic UI, usability first. Making the few pages I have looking good.
3 major UI designs: mobile first, Tablet second, and desktop last

User experience:
Within the same session of voting chonks, i want a state that keeps the current cat image position incase they escape the loop and want to continue voting,

UI:
Loading state

current favorites, once they register, they can even upload pictures. that means the upload component will be nested in the user profile page.

once the user login, we need to get the saved cats from firebase to display it on the user's page,

Flow:
Get a list of 10 chonkers from reddit, and add them into Redux, then we can display each piece of data later, ideally we can then start populating the data with firebase storage pictures. Once the state is populated with all the data (key: {catId: xxx, imageUrl: xxx}) , we can use arr.length to get an randomNumber to start, and set the catCount to that, and use the max number to rerun the entire database.

Pages
Prio:
Home - Chonder
Tinder like rating UI
Hall - Hall of chonks
List of all chonkers
Chonkfile - Chonk Profile
Profile of a single chonk

Second:
Signup
login
User Profile

Components
Prio:
Swipe Card
Navbar
Uploading

Second:

Public Route
Login path = “/”
Signup path = “/signup”

Private Route
User profile path = “/user”
Chonder
Hall of Chonks
Chonk profile
