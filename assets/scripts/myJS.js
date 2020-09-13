'use strict';
//2020-08-19 start
//2020-09-13 update

//global renderHook
const renderHook = document.getElementById('renderHook');

//pages
class HomePage {
    
    render() {
        //erase html
        renderHook.innerHTML = '';
        //add html
        renderHook.innerHTML = `
        <h1 class="title login">MOVIE MATCH</h1>
        <img src="assets/img/logo.png" alt="movie match logo" style="width: 200px; height: 200px"/>
        <button class="login">Login</button>
        <button>New User</button>
        `;
        //listen for buttons
        renderHook.querySelectorAll('button')[0].addEventListener('click', mySelectUserPage.render);
        renderHook.querySelectorAll('button')[1].addEventListener('click', myAddNewUserPage.render);
    }
}

class SelectUserPage {

    render() {
        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1 class="title">SELECT USER</h1>
        `;
        //render user list
        for (const user in userListOne.list) {
            renderHook.innerHTML += `
            <button>${userListOne.list[user].name}</button>
            `;
        }
        renderHook.innerHTML += `
        <hr>
        <button class="back">Back</button>
        `;
        //listen for buttons
        for (const user in userListOne.list) {
            renderHook.querySelectorAll('button')[user].addEventListener('click', myUserMatchesPage.render.bind(this, user));
        }
        renderHook.querySelectorAll('button')[userListOne.list.length].addEventListener('click', myHomePage.render);
    }
}

class AddNewUserPage {

    render() {
        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1 class="title">ADD NEW USER</h1>
        <h2>under construction</h2>
        <hr>
        <button class="back">Back</button>
        `;
        //add event listener for back button
        const newName = renderHook.querySelector('input');
        renderHook.querySelectorAll('button')[0].addEventListener('click', myHomePage.render);
    }
}

class UserMatchesPage {

    render(user) {
        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1 class="title">HELLO ${userListOne.list[user].name.toUpperCase()}</h1>
        <button>Your Profile</button>
        <hr>
        <h1>YOUR MATCHES</h1>
        `;
        userListOne.list[user].checkMatches();
        //print matches
        if (userListOne.list[user].matchedUsers.length === 0) {
            renderHook.innerHTML += `
            <h2>no matches yet - go to your profile and favorite movies</h2>
            `;        
        } else {
            for (const match in userListOne.list[user].matchedUsers) {
                renderHook.innerHTML += `
                <button>${userListOne.list[userListOne.list[user].matchedUsers[match].id].name}</button>
                `;
            }    
        }
        
        renderHook.innerHTML += `
        <hr>
        <button class="back">Log Out</button>
        `;

        renderHook.querySelectorAll('button')[0].addEventListener('click', myYourProfilePage.render.bind(this, user));
        for (const match in userListOne.list[user].matchedUsers) {
            renderHook.querySelectorAll('button')[parseInt(match) + 1].addEventListener('click', theOtherProfilePage.render.bind(this, user, match, userListOne.list[user].matchedUsers[match].id));
        }
        renderHook.querySelectorAll('button')[userListOne.list[user].matchedUsers.length + 1].addEventListener('click', myHomePage.render);
    }
}

class YourProfilePage {

    render(user) {
        renderHook.innerHTML = '';
        userListOne.list[user].favoriteMovies.sort((a, b) => a -b );
        renderHook.innerHTML = `
        <h1 class="title">${userListOne.list[user].name.toUpperCase()}'S PROFILE</h1>
        <hr>
        <h1>FAVORITE MOVIES</h1>
        `;
        //print favorite movies
        for (const favorite in userListOne.list[user].favoriteMovies) {
            renderHook.innerHTML += `
            <h2>${movieListOne.list[userListOne.list[user].favoriteMovies[favorite]].title}</h2>
            `;
        }

        renderHook.innerHTML += `
        <button>Add Movie</button>
        <button>Remove Movie</button>
        <hr>
        <button class="back">Back to Matches</button>
        `;
        renderHook.querySelectorAll('button')[0].addEventListener('click', myUserMovieListAddPage.render.bind(this, user));
        renderHook.querySelectorAll('button')[1].addEventListener('click', myUserMovieListRemovePage.render.bind(this, user));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class OtherProfilePage {

    render(user, match, matchedUser) {
        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1 class="title">${userListOne.list[matchedUser].name.toUpperCase()}'S PROFILE</h1>
        <hr>
        <h1>OUR MOVIE MATCH</h1>
        `;
        //print favorite movies
        for (const favorite in userListOne.list[user].matchedUsers[match].matches) {
            renderHook.innerHTML += `
            <h2>${movieListOne.list[userListOne.list[user].matchedUsers[match].matches[favorite]].title}</h2>
            `;
        }

        renderHook.innerHTML += `
        <hr>
        <button>Chat</button>
        <button>Watch Movie</button>
        <button class="back">Back</button>
        `;

        renderHook.querySelectorAll('button')[0].addEventListener('click', () => alert('chat under construction'));
        renderHook.querySelectorAll('button')[1].addEventListener('click', () => alert('watch movie under construction'));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class UserMovieListAddPage {

    render(user) {
        const movieOptionsId = [];
        const toAddId = [];
        renderHook.innerHTML = '';
        renderHook.innerHTML += '<h1 class="title">SELECT YOUR FAVORITES</h1>'
        for (const movie in movieListOne.list) {
            if (userListOne.list[user].favoriteMovies.includes(movieListOne.list[movie].id)) {
                //movie is already in user list
            } else {
                renderHook.innerHTML +=`
                <h2>${movieListOne.list[movie].title}</h2>
                `;
                movieOptionsId.push(movieListOne.list[movie].id);
            }
        }
        renderHook.innerHTML += '<button>Add</button>'
        renderHook.innerHTML += '<button class="back">Cancel</button>'
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
        renderHook.innerHTML = '';
        renderHook.innerHTML += '<h1 class="title">SELECT TO REMOVE</h1>'
        for (const movie in userListOne.list[user].favoriteMovies) {
            renderHook.innerHTML +=`
            <h2>${movieListOne.list[userListOne.list[user].favoriteMovies[movie]].title}</h2>
            `;
            movieOptionsId.push(userListOne.list[user].favoriteMovies[movie]);
        }
        renderHook.innerHTML += '<button>Remove</button>'
        renderHook.innerHTML += '<button class="back">Cancel</button>'
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