const {faker} = require("@faker-js/faker");

//Funzione che restituisce null se l'utente che stiamo cercando è bloccato,
//restituisce l'utente se l'utente non è bloccato.
async function getUserAmplify(){
    const blocked = false;
    var user = null;
    if(!blocked){
        user = {
            privacy: "public",
            username: "User Name",
            nickname: "nickname",
            description: faker.lorem.paragraphs(10),
            counters: {
                vidsCount: 143,
                picsCount: 10999,
                clipsCount: 23,
                followersCount: 400,
                followingCount: 150
            }
        }
    }
    return !blocked ? user : null;
}

//Funzione che restituisce se io seguo l'utente e viceversa e restituisce i due parametri.
async function getRelationshipCheck(){
    const checkFollowing = false;
    const checkFollower = false;
    return {checkFollowing, checkFollower};
}

//Funzione che restituisce se un utente è abbonato al profilo o meno
async function getSubCheck(){
    //simulazione della data 20 giorni prima di adesso
    const date = new Date();
    const daysFromNow = 20;
    date.setDate(date.getDate() - daysFromNow);

    var sub = null;
    //L'utente è sottoscritto
    /*sub = {
        days: 30,
        subDate: date
    }*/
    //L'utente non è sottoscritto
    sub = null;
    return sub;
}

const users = [];

for (let i = 0; i < 70; i++) {
  const user = {
    name: faker.person.fullName(),
    nickname: faker.lorem.word(),
    image: "url",
    follows: Math.random() < 0.5
  };
  users.push(user);
}

async function getFollowerList(index, nUsers){
    var usersSliced;
    usersSliced = users.slice(index, index+nUsers);
    return usersSliced;
}

async function getUserSubs(){
    var subsList = [
        {
            key: 1,
            price: 10,
            days: 30
        },
        {
            key: 2,
            price: 18,
            days: 60
        },
        {
            key: 3,
            price: 25,
            days: 90
        }
    ];
    return subsList 
}

module.exports = {
    getUserAmplify,
    getRelationshipCheck,
    getSubCheck,
    getFollowerList,
    users,
    getUserSubs
}