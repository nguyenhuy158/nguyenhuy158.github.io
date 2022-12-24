// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import {
        getDatabase,
        ref,
        set,
        onValue,
        get,
        child,
        push,
        update,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import {
        getFirestore,
        collection,
        getDocs,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
        apiKey: "AIzaSyD33teXFSQYSI-nldLMRG5G01QLlHUhh68",
        authDomain: "rent-studio-2002.firebaseapp.com",
        databaseURL: "https://rent-studio-2002-default-rtdb.firebaseio.com",
        projectId: "rent-studio-2002",
        storageBucket: "rent-studio-2002.appspot.com",
        messagingSenderId: "108046001171",
        appId: "1:108046001171:web:bbead9206edab42f2c8be6",
        measurementId: "G-KQHHNXD8RS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

document.getElementById("btnSubmit").onclick = function (e) {
        e.preventDefault();
        console.log("button was clicked");
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const dbRef = ref(getDatabase());
        get(child(dbRef, `User/${username}`))
                .then((snapshot) => {
                        if (snapshot.exists()) {
                                // user exists
                                console.log(snapshot.val());
                                const user = {
                                        username: username,
                                        isAdmin: snapshot.val().isAdmin,
                                        password: snapshot.val().password,
                                };
                                console.log(user);

                                if (user.isAdmin) {
                                        window.location.replace("./index.html");
                                        localStorage.setItem(
                                                "user",
                                                JSON.stringify(user)
                                        );
                                }
                        } else {
                                console.log("No data available");
                        }
                })
                .catch((error) => {
                        console.error(error);
                });
};

// // update
// function writeNewPost(uid, username, picture, title, body) {
//         const db = getDatabase();

//         // A post entry.
//         const postData = {
//                 author: username,
//                 uid: uid,
//                 body: body,
//                 title: title,
//                 starCount: 0,
//                 authorPic: picture,
//         };

//         // Get a key for a new Post.
//         const newPostKey = push(child(ref(db), "posts")).key;

//         // Write the new post's data simultaneously in the posts list and the user's post list.
//         const updates = {};
//         updates["/posts/" + newPostKey] = postData;
//         updates["/user-posts/" + uid + "/" + newPostKey] = postData;

//         return update(ref(db), updates);
// }
// writeNewPost(123, 123, 123, 123, 123);

// // read
// const dbRef = ref(getDatabase());
// const userId = "123";
// get(child(dbRef, `User/${userId}`))
//         .then((snapshot) => {
//                 if (snapshot.exists()) {
//                         console.log(snapshot.val());
//                 } else {
//                         console.log("No data available");
//                 }
//         })
//         .catch((error) => {
//                 console.error(error);
//         });

// // read data
// const db = getDatabase();
// const starCountRef = ref(db, "Studio/");
// onValue(starCountRef, (snapshot) => {
//         const data = snapshot.val();
//         console.log(data);
// });

// // write data
// function writeUserData(userId, name, email, imageUrl) {
//         const db = getDatabase();
//         set(ref(db, "/users" + userId), {
//                 username: name,
//                 email: email,
//                 profile_picture: imageUrl,
//         });
// }
