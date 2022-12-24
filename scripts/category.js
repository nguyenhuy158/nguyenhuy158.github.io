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

// read data
const db = getDatabase();
const starCountRef = ref(db, "Category/");
onValue(starCountRef, (snapshot) => {
        // clear all rows except header
        var mytbl = document.getElementById("tableCategory");
        mytbl.getElementsByTagName("tbody")[0].innerHTML = "";

        const data = snapshot.val();
        console.log(data);
        console.log(typeof data);
        console.log(Object.entries(data));
        const keys = Object.keys(data);
        keys.forEach((element) => {
                console.log(element);
                console.log(data[element]);
                // {name: 'Special Offer', thumbnailUrl: 'https://media.istockphoto.com/id/1182454657/photo/…20&c=qw37MGIiTL_jML3_Tbm4bM-jNLCrocSWj7DanhBr_bY='}
                const category = {
                        id: element,
                        name: data[element].name,
                        thumbnailUrl: data[element].thumbnailUrl,
                };
                console.log(category);
                var table = document
                        .getElementById("tableCategory")
                        .getElementsByTagName("tbody")[0];

                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);

                cell1.innerHTML = category.id;
                cell2.innerHTML = category.name;
                cell3.innerHTML = `<img style=" width: 100px; height: 100px; object-fit: cover; " src='${category.thumbnailUrl}'/>`;
                cell4.innerHTML = `<button class="edit btn btn-primary" type="button" data-toggle="modal" data-target="#modelEdit">edit</button>`;
                cell4.innerHTML += `<button class="delete btn btn-secondary">delete</button>`;
                cell4.dataset.categoryId = category.id;
                cell4.dataset.categoryName = category.name;
                cell4.dataset.categoryThumbnailUrl = category.thumbnailUrl;
        });

        // edit
        Array.from(document.getElementsByClassName("edit")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const id =
                                        e.target.parentNode.dataset.categoryId;
                                console.log(
                                        "🚀 ~ file: category.js:88 ~ id",
                                        id
                                );
                                const name =
                                        e.target.parentNode.dataset
                                                .categoryName;
                                console.log(
                                        "🚀 ~ file: category.js:90 ~ name",
                                        name
                                );
                                const thumbnailUrl =
                                        e.target.parentNode.dataset
                                                .categoryThumbnailUrl;
                                console.log(
                                        "🚀 ~ file: category.js:92 ~ thumbnailUrl",
                                        thumbnailUrl
                                );

                                const model =
                                        document.getElementById("modelEdit");
                                document.getElementById(
                                        "modelCategoryId"
                                ).innerHTML = id;
                                document.getElementById(
                                        "modelCategoryName"
                                ).value = name;
                                document.getElementById(
                                        "modelCategoryTumbnailUrl"
                                ).value = thumbnailUrl;
                        });
                }
        );
        // button update
        document.getElementById("update").addEventListener("click", (e) => {
                const id = document.getElementById("modelCategoryId").innerHTML;
                const name = document.getElementById("modelCategoryName").value;
                const thumbnailUrl = document.getElementById(
                        "modelCategoryTumbnailUrl"
                ).value;
                // update to database
                const db = getDatabase();
                const category = {
                        name,
                        thumbnailUrl,
                };

                const updates = {};
                updates["/Category/" + id] = category;
                const result = update(ref(db), updates);
                console.log(result);
                $("#modelEdit").modal("hide");
        });

        // delete
        Array.from(document.getElementsByClassName("delete")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const id =
                                        e.target.parentNode.dataset.categoryId;
                                const db = getDatabase();

                                const updates = {};
                                updates["/Category/" + id] = null;

                                const result = update(ref(db), updates);
                                console.log(
                                        "🚀 ~ file: category.js:97 ~ result",
                                        result
                                );
                        });
                }
        );
});

// add
document.getElementById("buttonAdd").addEventListener("click", (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const thumbnailUrl = document.getElementById("thumbnailUrl").value;

        console.log(`${name} ${thumbnailUrl}`);
        if (name !== "" && thumbnailUrl !== "") {
                // clear input data
                document.getElementById("name").value = "";
                document.getElementById("thumbnailUrl").value = "";

                // add to database
                const db = getDatabase();
                const category = {
                        name,
                        thumbnailUrl,
                };
                // Get a key for a new Post.
                const newPostKey = push(child(ref(db), "Category")).key;
                // Write the new post's data simultaneously in the posts list and the user's post list.
                const updates = {};
                updates["/Category/" + newPostKey] = category;
                const result = update(ref(db), updates);
                console.log(result);
        }
});
