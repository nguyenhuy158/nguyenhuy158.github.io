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
const starCountRef = ref(db, "Request/");
onValue(starCountRef, (snapshot) => {
        // clear all rows except header
        var mytbl = document.getElementById("tableOrder");
        mytbl.getElementsByTagName("tbody")[0].innerHTML = "";

        const data = snapshot.val();
        const keys = Object.keys(data);
        keys.forEach((element) => {
                // {name: 'Special Offer', thumbnailUrl: 'https://media.istockphoto.com/id/1182454657/photo/…20&c=qw37MGIiTL_jML3_Tbm4bM-jNLCrocSWj7DanhBr_bY='}
                const order = {
                        id: element,
                        bookTime: data[element].bookTime,
                        endDate: data[element].endDate,
                        phone: data[element].phone,
                        startDate: data[element].startDate,
                        status: data[element].status,
                        studioId: data[element].studioId,
                        total: data[element].total,
                        totalHour: data[element].totalHour,
                };
                var table = document
                        .getElementById("tableOrder")
                        .getElementsByTagName("tbody")[0];

                var row = table.insertRow(0);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                var cell5 = row.insertCell(4);
                var cell6 = row.insertCell(5);
                var cell7 = row.insertCell(6);
                var cell8 = row.insertCell(7);
                var cell9 = row.insertCell(8);
                var cell10 = row.insertCell(9);

                cell1.innerHTML = order.id;
                cell2.innerHTML = order.bookTime;
                cell3.innerHTML = order.endDate;
                cell4.innerHTML = order.phone;
                cell5.innerHTML = order.startDate;
                cell6.innerHTML = getStatus(order.status);
                cell7.innerHTML = order.studioId;
                cell8.innerHTML = getDisplayMoney(order.total);
                cell9.innerHTML = order.totalHour;

                cell10.innerHTML = `<button class="edit btn btn-primary" type="button" data-toggle="modal" data-target="#modelEdit">edit</button>`;
                cell10.innerHTML += `<button class="delete btn btn-secondary">delete</button>`;
                cell10.dataset.orderId = order.id;
                cell10.dataset.orderBookTime = order.bookTime;
                cell10.dataset.orderEndDate = order.endDate;
                cell10.dataset.orderPhone = order.phone;
                cell10.dataset.orderStartDate = order.startDate;
                cell10.dataset.orderStatus = order.status;
                cell10.dataset.orderStudioId = order.studioId;
                cell10.dataset.orderTotal = order.total;
                cell10.dataset.orderTotalHour = order.totalHour;
        });

        var order;
        // edit
        Array.from(document.getElementsByClassName("edit")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const orderId =
                                        e.target.parentNode.dataset.orderId;
                                const orderBookTime =
                                        e.target.parentNode.dataset
                                                .orderBookTime;
                                const orderEndDate =
                                        e.target.parentNode.dataset
                                                .orderEndDate;
                                const orderPhone =
                                        e.target.parentNode.dataset.orderPhone;
                                const orderStartDate =
                                        e.target.parentNode.dataset
                                                .orderStartDate;
                                const orderStatus =
                                        e.target.parentNode.dataset.orderStatus;
                                const orderStudioId =
                                        e.target.parentNode.dataset
                                                .orderStudioId;
                                const orderTotal =
                                        e.target.parentNode.dataset.orderTotal;
                                const orderTotalHour =
                                        e.target.parentNode.dataset
                                                .orderTotalHour;
                                order = {
                                        id: orderId,
                                        bookTime: orderBookTime,
                                        endDate: orderEndDate,
                                        phone: orderPhone,
                                        startDate: orderStartDate,
                                        status: parseInt(orderStatus),
                                        studioId: orderStudioId,
                                        total: orderTotal,
                                        totalHour: orderTotalHour,
                                };
                                $("#modelEdit #modelOrderId").text(orderId);
                                $("#modelEdit #orderBookTime").val(
                                        orderBookTime
                                );
                                $("#modelEdit #orderEndDate").val(orderEndDate);
                                $("#modelEdit #orderPhone").val(orderPhone);
                                $("#modelEdit #orderStartDate").val(
                                        orderStartDate
                                );
                                $("#modelEdit #orderStatus").val(orderStatus);
                                $("#modelEdit #orderStudioId").val(
                                        orderStudioId
                                );
                                $("#modelEdit #orderTotal").val(orderTotal);
                                $("#modelEdit #orderTotalHour").val(
                                        orderTotalHour
                                );
                        });
                }
        );
        // button update
        document.getElementById("update").addEventListener("click", (e) => {
                // update to database
                const db = getDatabase();
                order.status = parseInt($("#modelEdit #orderStatus").val());
                const updates = {};
                updates["/Request/" + order.id] = order;
                const result = update(ref(db), updates);
                console.log(
                        "🚀 ~ file: order.js:168 ~ document.getElementById ~ result",
                        result
                );
                $("#modelEdit").modal("hide");
        });

        // delete
        Array.from(document.getElementsByClassName("delete")).forEach(
                (element) => {
                        element.addEventListener("click", function (e) {
                                const id = e.target.parentNode.dataset.orderId;
                                const db = getDatabase();

                                const updates = {};
                                updates["/Request/" + id] = null;

                                const result = update(ref(db), updates);
                                console.log(
                                        "🚀 ~ file: category.js:97 ~ result",
                                        result
                                );
                        });
                }
        );
});

function getStatus(status) {
        console.log("🚀 ~ file: order.js:193 ~ getStatus ~ status", status);
        const badgePrimary = `<span class="badge badge-pill badge-primary">Done</span>`;
        const badgeSecondary = `<span class="badge badge-pill badge-secondary">Waiting</span>`;
        const badgeSuccess = `<span class="badge badge-pill badge-success">Success</span>`;
        const badgeDanger = `<span class="badge badge-pill badge-danger">Cancelled</span>`;
        const badgeWarning = `<span class="badge badge-pill badge-warning">Warning</span>`;
        const badgeInfo = `<span class="badge badge-pill badge-info">Info</span>`;
        const badgeLight = `<span class="badge badge-pill badge-light">Light</span>`;
        const badgeDark = `<span class="badge badge-pill badge-dark">Dark</span>`;

        if (status == -1) return badgeDanger;
        if (status == 0) return badgeSecondary;
        if (status == 1) return badgeSuccess;
        if (status == 2) return badgePrimary;
}

function getDisplayMoney(money) {
        const locales = "vi-VI";
        const formatter = new Intl.NumberFormat(locales, {
                style: "currency",
                currency: "VND",
        });

        return formatter.format(money);
}
