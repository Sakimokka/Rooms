let today = new Date();

function formatDate(date) {
    let year = date.getFullYear();
    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// 今天日期

let todayKey = formatDate(today);

document.getElementById("today").textContent = todayKey;


// ==============================
// 读取以前保存的数据
// ==============================

let records = {};

let savedData =
    localStorage.getItem("roomRecords");

if (savedData) {
    records = JSON.parse(savedData);
}


// ==============================
// 今天的数量
// ==============================

let todayCount =
    Number(records[todayKey] || 0);

document.getElementById(
    "todayCount"
).textContent = todayCount;


// ==============================
// 加减数量
// ==============================

function changeCount(number) {

    todayCount += number;

    if (todayCount < 0) {
        todayCount = 0;
    }

    document.getElementById(
        "todayCount"
    ).textContent = todayCount;
}


// ==============================
// 保存今天
// ==============================

function saveToday() {

    records[todayKey] = todayCount;

    localStorage.setItem(
        "roomRecords",
        JSON.stringify(records)
    );

    updatePage();

    alert("保存成功！");
}


// ==============================
// 计算本月总数
// ==============================

function getMonthTotal() {

    let total = 0;

    let currentMonth =
        todayKey.substring(0, 7);

    for (let date in records) {

        if (date.startsWith(currentMonth)) {

            total += Number(records[date]) || 0;
        }
    }

    return total;
}


// ==============================
// 最近7天
// ==============================

function updateRecentHistory() {

    let html = "";

    for (let i = 0; i < 7; i++) {

        let date = new Date();

        date.setDate(
            date.getDate() - i
        );

        let dateKey =
            formatDate(date);

        let displayDate =
            `${date.getMonth() + 1}/${date.getDate()}`;

        if (
            Object.prototype.hasOwnProperty.call(
                records,
                dateKey
            )
        ) {

            html +=
                `${displayDate}：${records[dateKey]} 间<br>`;

        } else {

            html +=
                `${displayDate}：未记录<br>`;
        }
    }

    document.getElementById(
        "recentHistory"
    ).innerHTML = html;
}


// ==============================
// 更新页面
// ==============================

function updatePage() {

    document.getElementById(
        "todayCount"
    ).textContent = todayCount;

    document.getElementById(
        "monthTotal"
    ).textContent = getMonthTotal();

    updateRecentHistory();
}


// ==============================
// 展开 / 收起
// ==============================

function toggleHistory() {

    let history =
        document.getElementById("allHistory");

    let button =
        document.querySelector(".expand-button");

    if (history.style.display === "none") {

        history.style.display = "block";

        button.textContent =
            "收起记录 ▲";

    } else {

        history.style.display = "none";

        button.textContent =
            "查看更多 ▼";
    }
}


// ==============================
// 启动
// ==============================

updatePage();