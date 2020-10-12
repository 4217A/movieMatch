'use strict';
//2020-08-19 start
//2020-09-13 update
//2020-09-14
//2020-10-10 update add new helper, add new user

//global renderHook
const renderHook = document.getElementById('renderHook');

//render helper
class RenderHelper {

    render(element, classes, attributeType, attributeVal, content, renderHook) {
        //receives: 
        //element type 
        //classes - one string OR array for multiple OR blank array for none
        //attribute type - one string OR array for multiple OR blank array for none
        //attribute val - one string OR array for multiple OR blank array for none
        //  note attribute type and value index should be paired with each other
        //  [src, alt] [fileloc, alt title]
        //text content - "" for none
        //where to render

        //console.log(`hi! ${content} ${element} being created`); //RR
        //console.log(this); //RR
        //console.log(Array.isArray(classes) + ' - ?got array input for classes?'); //RR

        //build
        let myEl = document.createElement(element);
        Array.isArray(classes) ? 
            classes.forEach(c => {
                myEl.classList.add(c);
                }) : //false - no array
                myEl.classList.add(classes);
        Array.isArray(attributeType) ? 
            attributeType.forEach((a, index) => {
                myEl.setAttribute(a, attributeVal[index]);
                }) : //false - no array
                myEl.setAttribute(attributeType, attributeVal);
        myEl.textContent = content;
        renderHook.append(myEl);
        myEl = null;
    }
}

//pages
class HomePage {
    
    render() {
        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title", "login", "fadein1"], [], [], "MOVIE MATCH", renderHook);

        //img
        myRenderHelper.render("img", ["fadein1"], ["src", "alt", "style"], ["assets/img/logo.png", "movie match logo", "width: 200px; height: 200px"], "", renderHook);

        //login
        myRenderHelper.render("button", ["login", "fadein2"], [], [], "Login", renderHook);
        renderHook.lastElementChild.addEventListener('click', mySelectUserPage.render);

        //new user
        myRenderHelper.render("button", ["fadein2"], [], [], "New User", renderHook);
        renderHook.lastElementChild.addEventListener('click', myAddNewUserPage.render);
    }
}

class SelectUserPage {

    render() {
        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title", "login"], [], [], "SELECT USER", renderHook);

        //user list
        for (const user in userListOne.list) {
            myRenderHelper.render("button", [], [], [], userListOne.list[user].name, renderHook);
        }

        //back
        myRenderHelper.render("button", ["back"], [], [], "Back", renderHook);

        //listen for buttons
        for (const user in userListOne.list) {
            renderHook.querySelectorAll('button')[user].addEventListener('click', myUserMatchesPage.render.bind(this, user));
        }
        renderHook.querySelectorAll('button')[userListOne.list.length].addEventListener('click', myHomePage.render);
    }
}

class AddNewUserPage {

    render() {
        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title"], [], [], "ADD NEW USER", renderHook);

        //input
        myRenderHelper.render("input", [], ["type", "placeholder", "id", "name"], ["text", "Enter User Name Here", "name", "name"], "ADD NEW USER", renderHook);

        //register
        myRenderHelper.render("button", [], [], [], "Register", renderHook);
        
        //line
        myRenderHelper.render("hr", [], [], [], "", renderHook);

        //back
        myRenderHelper.render("button", ["back"], [], [], "Back", renderHook);

        //add event listener for back button
        const newName = renderHook.querySelector('input');
        renderHook.querySelectorAll('button')[0].addEventListener('click', userListOne.addNewUser.bind(this, newName));
        renderHook.querySelectorAll('button')[1].addEventListener('click', myHomePage.render);
    }
}

class UserMatchesPage {

    render(user) {
        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title"], [], [], "HELLO " + userListOne.list[user].name.toUpperCase(), renderHook);

        //your profile
        myRenderHelper.render("button", [], [], [], "Your Profile", renderHook);

        //line
        myRenderHelper.render("hr", [], [], [], "", renderHook);

        //your matches
        myRenderHelper.render("h1", [], [], [], "YOUR MATCHES", renderHook);

        userListOne.list[user].checkMatches();

        //print matches
        if (userListOne.list[user].matchedUsers.length === 0) {
            myRenderHelper.render("h2", [], [], [], "no matches yet - go to your profile and favorite movies", renderHook);
        } else {
            for (const match in userListOne.list[user].matchedUsers) {
                myRenderHelper.render("button", [], [], [], userListOne.list[userListOne.list[user].matchedUsers[match].id].name, renderHook);
            }    
        }
        
        //log out
        myRenderHelper.render("button", ["back"], [], [], "Log Out", renderHook);

        //add event listeners
        renderHook.querySelectorAll('button')[0].addEventListener('click', myYourProfilePage.render.bind(this, user));
        for (const match in userListOne.list[user].matchedUsers) {
            renderHook.querySelectorAll('button')[parseInt(match) + 1].addEventListener('click', theOtherProfilePage.render.bind(this, user, match, userListOne.list[user].matchedUsers[match].id));
        }
        renderHook.querySelectorAll('button')[userListOne.list[user].matchedUsers.length + 1].addEventListener('click', myHomePage.render);
    }
}

class YourProfilePage {

    render(user) {
        //erase prev html
        renderHook.textContent = '';

        //sort
        userListOne.list[user].favoriteMovies.sort((a, b) => a -b );

        //title
        myRenderHelper.render("h1", ["title"], [], [], "YOUR PROFILE", renderHook);

        //print favorite movies
        for (const favorite in userListOne.list[user].favoriteMovies) {
            myRenderHelper.render("h2", [], [], [], movieListOne.list[userListOne.list[user].favoriteMovies[favorite]].title, renderHook);
        }

        //add
        myRenderHelper.render("button", [], [], [], "Add Movie", renderHook);

        //remove
        myRenderHelper.render("button", [], [], [], "Remove  Movie", renderHook);

        //back
        myRenderHelper.render("button", ["back"], [], [], "Back", renderHook);

        //add event listeners
        renderHook.querySelectorAll('button')[0].addEventListener('click', myUserMovieListAddPage.render.bind(this, user));
        renderHook.querySelectorAll('button')[1].addEventListener('click', myUserMovieListRemovePage.render.bind(this, user));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class OtherProfilePage {

    render(user, match, matchedUser) {
        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title"], [], [], userListOne.list[matchedUser].name.toUpperCase() + " 'S PROFILE", renderHook);

        //line
        myRenderHelper.render("hr", [], [], [], "", renderHook);

        //title
        myRenderHelper.render("h1", [], [], [], "OUR MOVIE MATCH", renderHook);

        //print favorite movies
        for (const favorite in userListOne.list[user].matchedUsers[match].matches) {
            myRenderHelper.render("h2", [], [], [], movieListOne.list[userListOne.list[user].matchedUsers[match].matches[favorite]].title, renderHook);
        }

        //line
        myRenderHelper.render("hr", [], [], [], "", renderHook);

        //chat
        myRenderHelper.render("button", [], [], [], "Chat", renderHook);

        //watch
        myRenderHelper.render("button", [], [], [], "Watch Movie", renderHook);

        //back
        myRenderHelper.render("button", ["back"], [], [], "Back", renderHook);

        //add event listeners
        renderHook.querySelectorAll('button')[0].addEventListener('click', () => alert('chat under construction'));
        renderHook.querySelectorAll('button')[1].addEventListener('click', () => alert('watch movie under construction'));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class UserMovieListAddPage {

    render(user) {
        const movieOptionsId = [];
        const toAddId = [];

        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title"], [], [], "SELECT YOUR FAVORITES", renderHook);

        for (const movie in movieListOne.list) {
            if (userListOne.list[user].favoriteMovies.includes(movieListOne.list[movie].id)) {
                //movie is already in user list
            } else {
                myRenderHelper.render("h2", [], [], [], movieListOne.list[movie].title, renderHook);
    
                movieOptionsId.push(movieListOne.list[movie].id);
            }
        }

        //add
        myRenderHelper.render("button", [], [], [], "Add", renderHook);

        //cancel
        myRenderHelper.render("button", ["back"], [], [], "Cancel", renderHook);
        
        //add event listeners
        for (const movie in movieOptionsId) {
            renderHook.querySelectorAll('h2')[movie].addEventListener('click', () => 
            {
            const movieEl=renderHook.querySelectorAll('h2')[movie];
            movieEl.classList.toggle("movie-selected");
            if (movieEl.classList.contains("movie-selected")) {
                toAddId.push(movieOptionsId[movie]);
            } else {
                toAddId.splice(toAddId.indexOf(movieOptionsId[movie]), 1);
            }
            })
        }
        renderHook.querySelectorAll('button')[0].addEventListener('click', () => {
            userListOne.list[user].favoriteMovies = userListOne.list[user].favoriteMovies.concat(toAddId);
            userListOne.list[user].favoriteMovies.sort((a, b) => a -b );
            myYourProfilePage.render(user);
        }); 
        renderHook.querySelectorAll('button')[1].addEventListener('click', myYourProfilePage.render.bind(this, user));         
    }
}

class UserMovieListRemovePage {

    render(user) {
        const movieOptionsId = [];
        const toRemoveId = [];

        //erase prev html
        renderHook.textContent = '';

        //title
        myRenderHelper.render("h1", ["title"], [], [], "SELECT TO REMOVE", renderHook);
        
        for (const movie in userListOne.list[user].favoriteMovies) {
            myRenderHelper.render("h2", [], [], [], movieListOne.list[userListOne.list[user].favoriteMovies[movie]].title, renderHook);

            movieOptionsId.push(userListOne.list[user].favoriteMovies[movie]);
        }

        //remove
        myRenderHelper.render("button", [], [], [], "Remove", renderHook);

        //cancel
        myRenderHelper.render("button", ["back"], [], [], "Cancel", renderHook);

        //add event listeners
        for (const movie in movieOptionsId) {
            renderHook.querySelectorAll('h2')[movie].addEventListener('click', () => 
            {
            const movieEl=renderHook.querySelectorAll('h2')[movie];
            movieEl.classList.toggle("movie-selected");
            if (movieEl.classList.contains("movie-selected")) {
                toRemoveId.push(movieOptionsId[movie]);
            } else {
                toRemoveId.splice(toRemoveId.indexOf(movieOptionsId[movie]), 1);
            }
            })
        }
        renderHook.querySelectorAll('button')[0].addEventListener('click', () => {
            //remove from list
            for (const movie in toRemoveId) {
                userListOne.list[user].favoriteMovies.splice(userListOne.list[user].favoriteMovies.indexOf(toRemoveId[movie]), 1);
            }
            //sort
            userListOne.list[user].favoriteMovies.sort((a, b) => a -b );
            myYourProfilePage.render(user);
        }); 
        renderHook.querySelectorAll('button')[1].addEventListener('click', myYourProfilePage.render.bind(this, user));         
    }
}

//objects
class User {
    constructor (name, userList) {
        this.id = userList.list.length;
        this.name = name;
        this.favoriteMovies = [];
        this.matchedUsers = [];
        userList.list.push(this);
    }

    addFavoriteMovie (...ids) {
        for (const id in ids) {
            this.favoriteMovies.push(ids[id]);
        }
    }

    checkMatches () {
        //first clear matches (later this logic can be improved to check for already matched below)
        this.matchedUsers = [];

        for (const potentialMatch in userListOne.list) {
            if (this === userListOne.list[potentialMatch]) {
                //console.log(`${this.name} and potential match ${userListOne.list[potentialMatch].name} are the same`); //RR
            } else {
                var matchFound = 0;
                const match = {
                    id: '',
                    matches: []
                }
                for (const movie in this.favoriteMovies) {
                    for (const matchMovie in userListOne.list[potentialMatch].favoriteMovies) {
                        if (this.favoriteMovies[movie] === userListOne.list[potentialMatch].favoriteMovies[matchMovie] && !matchFound) {
                            match.id = userListOne.list[potentialMatch].id;
                            match.matches.push(userListOne.list[potentialMatch].favoriteMovies[matchMovie]);
                            matchFound = 1;
                        } else if (this.favoriteMovies[movie] === userListOne.list[potentialMatch].favoriteMovies[matchMovie] && matchFound) {
                            match.matches.push(userListOne.list[potentialMatch].favoriteMovies[matchMovie]);
                        }
                    }
                }
                if (matchFound === 0) {
                    //no match
                } else {
                    this.matchedUsers.push(match);
                }
            }
        }
    }
}

class UserList {
    constructor (list) {
        this.list = list;
    }

    addNewUser(myDomInput) {
        //validate input
        if (myDomInput.value.length > 8) {
            alert('username must be less than 8 characters');
            myAddNewUserPage.render();
            return;
        }
        if (!myDomInput.value) {
            alert('username cannot be blank');
            myAddNewUserPage.render();
            return;
        }
        if (myDomInput.value.includes("<") || myDomInput.value.includes(">")) {
            alert('sorry no "<" or ">" characters allowed, please try again');
            myAddNewUserPage.render();
            return;
        }

        //later check if user name already exists

        //create new user
        new User(myDomInput.value, userListOne); 
        myDomInput.value='';
        alert('created! you may now login');
        myHomePage.render();    
    }
}

class Movie {
    constructor (title, year, movieList) {
        this.title = title;
        this.year = year;
        this.id = movieList.length;

        movieList.push(this);
    }
}

class MovieList {
    constructor (list) {
        this.list = list;
    }
}

//create new home page and other objects
const myRenderHelper = new RenderHelper();
const myHomePage = new HomePage();
const mySelectUserPage = new SelectUserPage();
const myAddNewUserPage = new AddNewUserPage();
const myUserMatchesPage = new UserMatchesPage();
const myYourProfilePage = new YourProfilePage();
const theOtherProfilePage = new OtherProfilePage();
const myUserMovieListAddPage = new UserMovieListAddPage();
const myUserMovieListRemovePage = new UserMovieListRemovePage();
const userListOne = new UserList([]);
const movieListOne = new MovieList([]);
//start
myHomePage.render();
//create new movies
new Movie('Star Wars', '1977', movieListOne.list);
new Movie('Harry Potter', '2001', movieListOne.list);
new Movie('Indiana Jones', '1984', movieListOne.list);
new Movie('Superman', '1978', movieListOne.list);
new Movie('Spiderman', '2002', movieListOne.list);
new Movie('Batman', '1989', movieListOne.list);
new Movie('The Wedding Singer', '1998', movieListOne.list);
new Movie('Ace Ventura: Pet Detective', '1994', movieListOne.list);
//create new users
new User('Luke', userListOne);
new User('Lily', userListOne);
new User('Henry', userListOne);
new User('Drew', userListOne);
//make this random later, assign favorite movies
userListOne.list[0].addFavoriteMovie(0);
userListOne.list[1].addFavoriteMovie(1);
userListOne.list[2].addFavoriteMovie(2);
userListOne.list[3].addFavoriteMovie(0, 1, 2, 3, 4, 5, 6, 7);