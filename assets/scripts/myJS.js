'use strict';
//2020-08-19 start

// const renderTest = document.getElementById('renderHook');
    
// const render = () => {
//     //erase html
//     renderTest.innerHTML='';
//     //add html
//     renderTest.innerHTML=`
//     <h1>HOME</h1>
//     <button>Login</button>
//     <button>New User</button>
//     `;    
// };

//global renderHook
const renderHook = document.getElementById('renderHook');

//pages
class HomePage {
    
    render() {
        //what the method can see
        console.log(renderHook); //RR
        //erase html
        renderHook.innerHTML = '';
        //add html
        renderHook.innerHTML = `
        <h1>HOME</h1>
        <button>Login</button>
        <button>New User</button>
        `;
        //listen for buttons
        renderHook.querySelectorAll('button')[0].addEventListener('click', mySelectUserPage.render);
        renderHook.querySelectorAll('button')[1].addEventListener('click', myAddNewUserPage.render);
    }
}

class SelectUserPage {

    render() {
        console.log('40 rendering ChooseUser...'); //RR
        console.log(renderHook); //RR

        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1>SELECT USER</h1>
        `;
        //render user list
        for (const user in userListOne.list) {
            console.log('53'); //RR
            console.log(user); //RR
            console.log(userListOne.list[user]); //RR
            //renderHook.innerHTML += `<h2>${userListOne.list[user].name}</h2>`
            renderHook.innerHTML += `
            <button>${userListOne.list[user].name}</button>
            `;
        }
        renderHook.innerHTML += `
        <hr>
        <button>Back</button>
        `;
        //listen for buttons
        for (const user in userListOne.list) {
            renderHook.querySelectorAll('button')[user].addEventListener('click', myUserMatchesPage.render.bind(this, user));
        }
        renderHook.querySelectorAll('button')[userListOne.list.length].addEventListener('click', myHomePage.render);
        console.log('out'); //RR
    }
}

class AddNewUserPage {

    render() {
        console.log('67 rendering AddNewUser...'); //RR
        console.log(renderHook); //RR

        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1>ADD NEW USER</h1>
        <input type="text" placeholder="Enter User Name Here" id="name" name="name">
        <button>Register</button>
        <hr>
        <button>Back</button>
        `;
        //add event listener for back button
        const newName = renderHook.querySelector('input');
        console.log(newName); //RR
        renderHook.querySelectorAll('button')[0].addEventListener('click', userListOne.addNewUser.bind(this, newName));
        renderHook.querySelectorAll('button')[1].addEventListener('click', myHomePage.render);
    }
}

class UserMatchesPage {

    render(user) {
        console.log('98 rendering UserMatches...'); //RR
        console.log(renderHook); //RR

        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1>HELLO ${userListOne.list[user].name.toUpperCase()}</h1>
        <button>Your Profile</button>
        <h1>YOUR MATCHES</h1>
        `;
        //console.log(`user ${userListOne.list[user]}`); //RR
        userListOne.list[user].checkMatches();
        //print matches
        for (const match in userListOne.list[user].matchedUsers) {
            //console.log(`match: ${userListOne.list[userListOne.list[user].matchedUsers[match].id].name}`); //RR
            renderHook.innerHTML += `
            <button>${userListOne.list[userListOne.list[user].matchedUsers[match].id].name}</button>
            `;
        }

        renderHook.innerHTML += `
        <hr>
        <button>Log Out</button>
        `;

        renderHook.querySelectorAll('button')[0].addEventListener('click', myYourProfilePage.render.bind(this, user));
        for (const match in userListOne.list[user].matchedUsers) {
            //console.log(parseInt(match) + 1); //RR
            renderHook.querySelectorAll('button')[parseInt(match) + 1].addEventListener('click', theOtherProfilePage.render.bind(this, user, userListOne.list[user].matchedUsers[match].id));
        }
        renderHook.querySelectorAll('button')[userListOne.list[user].matchedUsers.length + 1].addEventListener('click', myHomePage.render);
    }
}

class YourProfilePage {

    render(user) {
        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1>${userListOne.list[user].name.toUpperCase()}'S PROFILE</h1>
        <h1>PICTURE HERE</h1>
        <h1>YOUR MOVIE QUOTE</h1>
        <h2>'...'</h2>
        <h1>YOUR FAVORITE MOVIES</h1>
        `;
        //print favorite movies
        for (const favorite in userListOne.list[user].favoriteMovies) {
            renderHook.innerHTML += `
            <h2>${movieListOne.list[userListOne.list[user].favoriteMovies[favorite]].title}</h2>
            `;
        }

        renderHook.innerHTML += `
        <button>Add Favorite Movie</button>
        <hr>
        <button>Back to Matches</button>
        `;
        renderHook.querySelectorAll('button')[0].addEventListener('click', myUserMovieListAddPage.render.bind(this, user));
        renderHook.querySelectorAll('button')[1].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class OtherProfilePage {

    render(user, matchedUser) {
        renderHook.innerHTML = '';
        renderHook.innerHTML = `
        <h1>${userListOne.list[matchedUser].name.toUpperCase()}'S PROFILE</h1>
        <h1>PICTURE HERE</h1>
        <h1>GUESS MY MOVIE QUOTE</h1>
        <h2>'...'</h2>
        <h1>OUR MOVIE MATCH</h1>
        `;
        //print favorite movies
        for (const favorite in userListOne.list[matchedUser].favoriteMovies) {
            renderHook.innerHTML += `
            <h2>${movieListOne.list[userListOne.list[matchedUser].favoriteMovies[favorite]].title}</h2>
            `;
        }

        //movieListOne.list[userListOne.list[user].favoriteMovies[favorite]].name

        renderHook.innerHTML += `
        <hr>
        <button>Chat</button>
        <button>Watch Movie</button>
        <button>Back</button>
        `;

        renderHook.querySelectorAll('button')[0].addEventListener('click', () => console.log('loading chat...'));
        renderHook.querySelectorAll('button')[1].addEventListener('click', () => console.log('opening movie...'));
        renderHook.querySelectorAll('button')[2].addEventListener('click', myUserMatchesPage.render.bind(this, user));
    }
}

class UserMovieListAddPage {

    render(user) {
        const movieOptionsId = [];
        const toAddId = [];
        renderHook.innerHTML = '';
        renderHook.innerHTML += '<h1>SELECT YOUR FAVORITE MOVIES</h1>'
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
        renderHook.innerHTML += '<button>Cancel</button>'
        //add event listeners
        for (const movie in movieOptionsId) {
            renderHook.querySelectorAll('h2')[movie].addEventListener('click', () => 
            {
            const movieEl=renderHook.querySelectorAll('h2')[movie];
            movieEl.classList.toggle("movie-selected");
            if (movieEl.classList.contains("movie-selected")) {
                toAddId.push(movieOptionsId[movie]);
                console.log(toAddId); //RR
            } else {
                console.log(toAddId.indexOf(movieOptionsId[movie])); //RR
                toAddId.splice(toAddId.indexOf(movieOptionsId[movie]), 1);
                console.log(toAddId); //RR
            }
            })
        }
        renderHook.querySelectorAll('button')[0].addEventListener('click', () => {
            console.log(toAddId); //RR
            userListOne.list[user].favoriteMovies = userListOne.list[user].favoriteMovies.concat(toAddId);
            userListOne.list[user].favoriteMovies.sort((a, b) => a -b );
            console.log(`add: ${userListOne.list[user].favoriteMovies}`); //RR
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
        console.log('42 new user added to list...'); //RR
        console.log(userList.list); //RR
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
            console.log('181'); //RR
            console.log(this); //RR
            console.log(userListOne.list[potentialMatch]); //RR
            //console.log('start check'); //RR
            if (this === userListOne.list[potentialMatch]) {
                //console.log(`${this.name} and potential match ${userListOne.list[potentialMatch].name} are the same`); //RR
            } else {
                //console.log(`checking potential match ${userListOne.list[potentialMatch].name}`); //RR
                var matchFound = 0;
                const match = {
                    id: '',
                    matches: []
                }
                for (const movie in this.favoriteMovies) {
                    for (const matchMovie in userListOne.list[potentialMatch].favoriteMovies) {
                        //console.log(this.favoriteMovies[movie]); //RR
                        //console.log(userListOne.list[potentialMatch].favoriteMovies[matchMovie]); //RR
                        //console.log('start check'); //RR
                        //console.log(match); //RR
                        if (this.favoriteMovies[movie] === userListOne.list[potentialMatch].favoriteMovies[matchMovie] && !matchFound) {
                            //console.log(`first match found with ${userListOne.list[potentialMatch].name}`); //RR
                            //console.log(this.favoriteMovies[movie]); //RR
                            match.id = userListOne.list[potentialMatch].id;
                            match.matches.push(userListOne.list[potentialMatch].favoriteMovies[matchMovie]);
                            //console.log(`match id: ${match.id}`); //RR
                            //console.log(match); //RR
                            matchFound = 1;
                        } else if (this.favoriteMovies[movie] === userListOne.list[potentialMatch].favoriteMovies[matchMovie] && matchFound) {
                            //console.log(`second match found with ${userListOne.list[potentialMatch].name}`); //RR
                            //console.log(this.favoriteMovies[movie]); //RR
                            match.matches.push(userListOne.list[potentialMatch].favoriteMovies[matchMovie]);
                        }
                    }
                }
                if (matchFound === 0) {
                    console.log(`sorry no matches found with ${userListOne.list[potentialMatch].name}`); //RR
                } else {
                    console.log(match); //RR
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
            console.log(myDomInput.value); //RR
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
const userListOne = new UserList([]);
const movieListOne = new MovieList([]);
console.log('53 new user list object created...'); //RR
console.log(userListOne); //RR
//push button to start
const pushMe = document.getElementById('pushMe');
pushMe.addEventListener('click', myHomePage.render);

//create new movies
new Movie('Star Wars', '1977', movieListOne.list);
new Movie('Empire Strikes Back', '1980', movieListOne.list);
new Movie('Return of the Jedi', '1983', movieListOne.list);
new Movie('Episode I The Phantom Menace', '1999', movieListOne.list);
new Movie('Episode II Attack of the Clones', '2002', movieListOne.list);
new Movie('Episode III Revenge of the Sith', '2005', movieListOne.list);
new Movie('Star Wars: Episode VII - The Force Awakens', '2015', movieListOne.list);
//create new users
new User('Bob', userListOne);
new User('Mary', userListOne);
new User('Jose', userListOne);
//make this random later, assign favorite movies
userListOne.list[0].addFavoriteMovie(0, 1, 2);
userListOne.list[1].addFavoriteMovie(2, 3, 4);
userListOne.list[1].addFavoriteMovie(1, 5, 6);
userListOne.list[2].addFavoriteMovie(4, 5, 6);
console.log('190 favorite movie added...')
console.log(movieListOne.list[userListOne.list[1].favoriteMovies[0]]);
console.log(movieListOne.list[2]);

console.log('61 new user object added...'); //RR
console.log(userListOne); //RR


