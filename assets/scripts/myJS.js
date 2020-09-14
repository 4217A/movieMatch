'use strict';
//2020-08-19 start
//2020-09-13 update
//2020-09-14

//global renderHook
const renderHook = document.getElementById('renderHook');

//pages
class HomePage {
    
    render() {
        //erase html
        renderHook.textContent = '';
        //add html
        var myEl = document.createElement("h1");
        myEl.classList.add("title", "login");
        myEl.textContent = "MOVIE MATCH";
        renderHook.append(myEl);

        myEl = document.createElement("img");
        myEl.setAttribute("src", "assets/img/logo.png");
        myEl.setAttribute("alt", "movie match logo");
        myEl.setAttribute("style", "width: 200px; height: 200px");
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.classList.add("login");
        myEl.textContent = "Login";
        renderHook.append(myEl);
        renderHook.lastElementChild.addEventListener('click', mySelectUserPage.render);

        myEl = document.createElement("button");
        myEl.textContent = "New User";
        renderHook.append(myEl);
        renderHook.lastElementChild.addEventListener('click', myAddNewUserPage.render);
        myEl = null; //clean
    }
}

class SelectUserPage {

    render() {
        renderHook.textContent = '';
        //add html
        var myEl = document.createElement("h1");
        myEl.classList.add("title", "login");
        myEl.textContent = "SELECT USER";
        renderHook.append(myEl);

        //render user list
        for (const user in userListOne.list) {
            myEl = document.createElement("button");
            myEl.textContent = userListOne.list[user].name;
            renderHook.append(myEl);
        }
        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Back";
        renderHook.append(myEl);
        //listen for buttons
        for (const user in userListOne.list) {
            renderHook.querySelectorAll('button')[user].addEventListener('click', myUserMatchesPage.render.bind(this, user));
        }
        renderHook.querySelectorAll('button')[userListOne.list.length].addEventListener('click', myHomePage.render);
    }
}

class AddNewUserPage {

    render() {
        renderHook.textContent = '';

        var myEl = document.createElement("h1");
        myEl.classList.add("title");
        myEl.textContent = "ADD NEW USER";
        renderHook.append(myEl);

        myEl = document.createElement("h2");
        myEl.textContent = "under construction";
        renderHook.append(myEl);

        myEl = document.createElement("hr");
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Back";
        renderHook.append(myEl);

        //add event listener for back button
        const newName = renderHook.querySelector('input');
        renderHook.querySelectorAll('button')[0].addEventListener('click', myHomePage.render);
    }
}

class UserMatchesPage {

    render(user) {
        renderHook.textContent = '';

        var myEl = document.createElement("h1");
        myEl.classList.add("title");
        myEl.textContent = "HELLO " + userListOne.list[user].name.toUpperCase();
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.textContent = "Your Profile";
        renderHook.append(myEl);

        myEl = document.createElement("hr");
        renderHook.append(myEl);

        myEl = document.createElement("h1");
        myEl.textContent = "YOUR MATCHES";
        renderHook.append(myEl);

        userListOne.list[user].checkMatches();

        //print matches
        if (userListOne.list[user].matchedUsers.length === 0) {
            myEl = document.createElement("h2");
            myEl.textContent = "no matches yet - go to your profile and favorite movies";
            renderHook.append(myEl);
        } else {
            for (const match in userListOne.list[user].matchedUsers) {
                myEl = document.createElement("button");
                myEl.textContent = userListOne.list[userListOne.list[user].matchedUsers[match].id].name;
                renderHook.append(myEl);
            }    
        }
        
        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Back";
        renderHook.append(myEl);

        renderHook.querySelectorAll('button')[0].addEventListener('click', myYourProfilePage.render.bind(this, user));
        for (const match in userListOne.list[user].matchedUsers) {
            renderHook.querySelectorAll('button')[parseInt(match) + 1].addEventListener('click', theOtherProfilePage.render.bind(this, user, match, userListOne.list[user].matchedUsers[match].id));
        }
        renderHook.querySelectorAll('button')[userListOne.list[user].matchedUsers.length + 1].addEventListener('click', myHomePage.render);
    }
}

class YourProfilePage {

    render(user) {
        renderHook.textContent = '';

        userListOne.list[user].favoriteMovies.sort((a, b) => a -b );

        var myEl = document.createElement("h1");
        myEl.classList.add("title");
        myEl.textContent = "YOUR PROFILE";
        renderHook.append(myEl);

        //print favorite movies
        for (const favorite in userListOne.list[user].favoriteMovies) {
            myEl = document.createElement("h2");
            myEl.textContent = movieListOne.list[userListOne.list[user].favoriteMovies[favorite]].title;
            renderHook.append(myEl);
        }

        myEl = document.createElement("button");
        myEl.textContent = "Add Movie";
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.textContent = "Remove Movie";
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Back";
        renderHook.append(myEl);

        renderHook.querySelectorAll('button')[0].addEventListener('click', myUserMovieListAddPage.render.bind(this, user));
        renderHook.querySelectorAll('button')[1].addEventListener('click', myUserMovieListRemovePage.render.bind(this, user));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class OtherProfilePage {

    render(user, match, matchedUser) {
        renderHook.textContent = '';

        var myEl = document.createElement("h1");
        myEl.classList.add("title");
        myEl.textContent = userListOne.list[matchedUser].name.toUpperCase() + " 'S PROFILE";
        renderHook.append(myEl);

        myEl = document.createElement("hr");
        renderHook.append(myEl);

        myEl = document.createElement("h1");
        myEl.textContent = "OUR MOVIE MATCH";
        renderHook.append(myEl);

        //print favorite movies
        for (const favorite in userListOne.list[user].matchedUsers[match].matches) {
            myEl = document.createElement("h2");
            myEl.textContent = movieListOne.list[userListOne.list[user].matchedUsers[match].matches[favorite]].title;
            renderHook.append(myEl);
        }

        myEl = document.createElement("hr");
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.textContent = "Chat";
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.textContent = "Watch Movie";
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Back";
        renderHook.append(myEl);

        renderHook.querySelectorAll('button')[0].addEventListener('click', () => alert('chat under construction'));
        renderHook.querySelectorAll('button')[1].addEventListener('click', () => alert('watch movie under construction'));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class UserMovieListAddPage {

    render(user) {
        const movieOptionsId = [];
        const toAddId = [];

        renderHook.textContent = '';

        var myEl = document.createElement("h1");
        myEl.classList.add("title");
        myEl.textContent = "SELECT YOUR FAVORITES";
        renderHook.append(myEl);

        for (const movie in movieListOne.list) {
            if (userListOne.list[user].favoriteMovies.includes(movieListOne.list[movie].id)) {
                //movie is already in user list
            } else {
                myEl = document.createElement("h2");
                myEl.textContent = movieListOne.list[movie].title;
                renderHook.append(myEl);
    
                movieOptionsId.push(movieListOne.list[movie].id);
            }
        }

        myEl = document.createElement("button");
        myEl.textContent = "Add";
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Cancel";
        renderHook.append(myEl);
        
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

        renderHook.textContent = '';

        var myEl = document.createElement("h1");
        myEl.classList.add("title");
        myEl.textContent = "SELECT TO REMOVE";
        renderHook.append(myEl);
        
        for (const movie in userListOne.list[user].favoriteMovies) {
            myEl = document.createElement("h2");
            myEl.textContent = movieListOne.list[userListOne.list[user].favoriteMovies[movie]].title;
            renderHook.append(myEl);

            movieOptionsId.push(userListOne.list[user].favoriteMovies[movie]);
        }

        myEl = document.createElement("button");
        myEl.textContent = "Remove";
        renderHook.append(myEl);

        myEl = document.createElement("button");
        myEl.classList.add("back");
        myEl.textContent = "Cancel";
        renderHook.append(myEl);

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
        if (myDomInput.value) {
            new User(myDomInput.value, userListOne); 
            myDomInput.value='';
            myHomePage.render();    
        } else {
            alert('this field cannot be blank'); //RR
        }
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