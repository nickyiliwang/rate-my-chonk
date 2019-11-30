// MVP pseudo

// navbar 
// if else statement, in my state, ill have UI states, like welcome, rating, and hall, to route the page for the user. 

// We have 3 pages/components
// component 1 welcome
// component 1 is a welcome page with instructions about the app and how to use it. (h1, h2, and button)
// the user clicks to continue, will set the state of welcome to false. the user is lead to the second component (if statement on what to render) called rate my chonk 

// component 2 rate my chonk
// on page load
// grabs the array of  chonk score on componentDidMount and set the state with the array, so we can push the user rating into the array for calculating the average chonkiness for the cat.
// The user is presented with an img of a chubby cat, a slider, and a button call rate and go next(placeholder),
{/* <input type="range" min="1" max="100" value="50"></input> */}

// slider
// the slider value onChange method that would update the state of slider, and when the  and will be pushed and sent to firebase.
//  the slider will have an overlay image that indicates how chonky they cat is. 

// button
// upon hitting and the rate and go next button, we capture the value from the slider and sending what we saved in the state, send the user's rating of that cat up to firebase, the image tag will change to the next cat, and the slider will reset. The user has a choice of continuing with rating, or they can exit the loop by going to the third component: Hall of chonks.

// component 3 hall of chonks
// once the user is done with rating cats, they can check out how their rating compares to the masses, there is an hall of chonks section, the last component, that will take all the data from firebase, and display it onto the page as a leader-board of chonks. It will be an list of li elements, nested in the li's we will have an smaller picture of that cat and the average chonk scale score of that cat displayed, maybe also the number of ratings.

// Stretch Goals
// The stretch goals would be:
// 1. having a user profile page so the user can favorite a cat image
// 2. having a sort method so the user can sort the cat images with 
// 3. vote for the cat name / give the cat a name, cat name suggestions
// user is able to upload a picture of their cat

// this is a mobile first app.

// basic flow is:

// mobile

// sign page without any auth
// Continue as guest main
// get firebase auth working or
// signup

// user interacts with how ever many pictures of cats, they can vote, favorite(has an info about only registered users can save chonks), and 

// maybe they can have an default user Profile with name of guest, and current favorites, once they register, they can even upload pictures. that means the upload component will be nested in the user profile page.






