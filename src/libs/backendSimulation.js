const {faker} = require("@faker-js/faker");

const AuthUserCover = require("../libs/images/profile/frasco.97/frasco.97Cover.jpg");
const GuestUserCover = require("../libs/images/profile/feli.mici/feli.miciCover.jpg");
const AuthUserAvatar = require("../libs/images/profile/frasco.97/frasco.97Avatar.jpg");
const GuestUserAvatar = require("../libs/images/profile/feli.mici/feli.miciAvatar.jpg");

const getAuthenticatedUserDelay = 100;
const getUserProfileDelay = 100;
const getNotificationsDelay = 100;
const getUserPostDelay = 2000;
const getUserSubsDelay = 2000;
const simulateNotificationDelay = 10000;
const setSeenNotificationsDelay = 10000;


async function getAuthenticatedUser() {
    const auth = true; // true
    var user = null;
    if (auth) {
        user = {
            privacy: "public",
            username: "Francesco Scognamiglio",
            nickname: "frasco.97",
            description: faker.lorem.words(300),
            cover: AuthUserCover,
            avatar: AuthUserAvatar,
            type: "creator",
            counters: {
                vidsCount: 143,
                picsCount: 10999,
                clipsCount: 23,
                followersCount: 400,
                followingCount: 150
            },
            coverCrop: {
                width: 920,
                height: 307,
                x: 0,
                y: 285
            }
        };
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(user);
        }, getAuthenticatedUserDelay);
    });
}

//Funzione che restituisce null se l'utente che stiamo cercando è bloccato,
//restituisce l'utente se l'utente non è bloccato.
async function getUserProfile(nickname) {
    const blocked = false;
    const follow = false;
    const following = false;
    const type = "creator";
    const subscribed = false;

    return new Promise((resolve) => {
        setTimeout(() => {
            var user = null;
            if (blocked) {
                resolve({
                    user,
                    blocked,
                    follow: false,
                    following: false
                });
            } else {
                var result = {};
                if (nickname === "feli.mici") {
                    result = {
                        user: {
                            privacy: "public",
                            username: "Felice Micillo",
                            nickname: nickname,
                            description: faker.lorem.paragraphs(5),
                            type,
                            counters: {
                                vidsCount: faker.number.int({ max: 4000000 }),
                                picsCount: faker.number.int({ max: 4000000 }),
                                clipsCount: faker.number.int({ max: 4000000 }),
                                followersCount: faker.number.int({ max: 4000000 }),
                                followingCount: faker.number.int({ max: 4000000 })
                            },           
                            coverCrop: {
                                width: 960,
                                height: 320,
                                x: 0,
                                y: 127
                            },
                            cover: GuestUserCover
                        },
                        blocked,
                        follow,
                        following
                    };
                    if (type === "creator") {
                        result.subscribed = subscribed;
                    } else {
                        result.subscribed = false;
                    }
                } else {
                    result = {
                        user,
                        blocked,
                        follow: false,
                        following: false
                    };
                }
                resolve(result);
            }
        }, getUserProfileDelay);
    });
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

async function getFollowerList(index, nUsers) {
    var usersSliced;
    usersSliced = users.slice(index, index + nUsers);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(usersSliced);
        }, 2000);
    });
}

async function getUserSubs() {
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
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(subsList);
        }, getUserSubsDelay);
    });
}

const posts = [];

for (let i = 0; i < 75; i++) {
  const post = {
    key: i
  };
  posts.push(post);
}

async function getUserPost(index, nPosts) {
    var postsSliced;
    postsSliced = posts.slice(index, index + nPosts);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(postsSliced);
        }, getUserPostDelay);
    });
}

const notifications = [];



for (let i = 0; i < 7; i++) {
    const notificationTypes = [
        {id: Math.floor(Math.random()* 1000), type: "follow", message: `L'utente ${faker.person.fullName()} ha iniziato a seguirti`, seen: false},
        {id: Math.floor(Math.random()* 1000), type: "like", message: `L'utente ${faker.person.fullName()} ha messo like al tuo post`, seen: false},
        {id: Math.floor(Math.random()*1000), type: "subs", message: `L'utente ${faker.person.fullName()} si è abbonato al tuo profilo`, seen: false}
    ]
    const randomIndex = Math.floor(Math.random() * notificationTypes.length);
    notifications.push(notificationTypes[randomIndex]);
}

async function getNotifications(index, num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const slicedNotifications = notifications.slice(index, index + num);
            resolve(slicedNotifications);
        }, getNotificationsDelay);
    });
}

const simulateNotification = (callback) => {
    setInterval(() => {
        const notificationTypes = [
            {id: Math.floor(Math.random()* 1000), type: "follow", message: `L'utente ${faker.person.fullName()} ha iniziato a seguirti`, seen: false},
            {id: Math.floor(Math.random()* 1000), type: "like", message: `L'utente ${faker.person.fullName()} ha messo like al tuo post`, seen: false},
            {id: Math.floor(Math.random()*1000), type: "subs", message: `L'utente ${faker.person.fullName()} si è abbonato al tuo profilo`, seen: false}
        ]
        const randomIndex = Math.floor(Math.random() * notificationTypes.length);
        const newNotification = notificationTypes[randomIndex];
        callback(newNotification);
    }, simulateNotificationDelay);
};

async function setSeenNotifications(notificationsArray) {
    for (let i = 0; i < notificationsArray.length; i++) {
        if (notificationsArray[i].seen === false) {
            notificationsArray[i].seen = true;
        }
    }
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(notificationsArray);
        }, setSeenNotificationsDelay);
    });
}

module.exports = {
    getUserProfile,
    getFollowerList,
    getUserSubs,
    getUserPost,
    getAuthenticatedUser,
    simulateNotification,
    getNotifications,
    setSeenNotifications
}