// ==============================
// 房间整理记录
// ==============================

// 获取今天日期
const today = new Date();


// 日期转换成 YYYY-MM-DD
function formatDate(date) {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


// 今天的日期
const todayKey = formatDate(today);


// 显示今天日期
document.getElementById("today").textContent = todayKey;


// ==============================
// 读取保存的数据
// ==============================

let records = {};

try {

    const savedData =
        localStorage.getItem("roomRecords");

    if (savedData) {

        records = JSON.parse(savedData);

    }

} catch (error) {

    console.log("读取旧数据失败，重新开始记录。");

    records = {};

}


// ==============================
// 今天的数量
// ==============================

let todayCount =
    Number(records[todayKey]) || 0;


// ==============================
// 保存数据
// ==============================

function saveRecords() {

    localStorage.setItem(
        "roomRecords",
        JSON.stringify(records)
    );

}


// ==============================
// 修改今天数量
// ==============================

function changeCount(amount) {

    todayCount += amount;


    // 不允许小于0
    if (todayCount < 0) {

        todayCount = 0;

    }


    updatePage();

}


// ==============================
// 保存今天
// ==============================

function saveToday() {

    records[todayKey] = todayCount;

    saveRecords();

    alert("保存成功！");

    updatePage();

}


// ==============================
// 计算本月总数
// ==============================

function getMonthTotal() {

    let total = 0;

    const currentMonth =
        todayKey.substring(0, 7);


    for (const date in records) {

        if (
            date.startsWith(currentMonth)
        ) {

            total +=
                Number(records[date]) || 0;

        }

    }


    return total;

}


// ==============================
// 更新最近7天
// ==============================

function updateRecentHistory() {

    let html = "";


    for (let i = 0; i < 7; i++) {

        const date = new Date();

        date.setDate(
            date.getDate() - i
        );


        const dateKey =
            formatDate(date);


        const displayDate =
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
// 更新整个页面
// ==============================

function updatePage() {

    document.getElementById(
        "todayCount"
    ).textContent = todayCount;


    document.getElementById(
        "monthTotal"
    ).textContent =
        getMonthTotal();


    updateRecentHistory();

}


// ==============================
// 展开 / 收起历史
// ==============================

function toggleHistory() {

    const history =
        document.getElementById("allHistory");

    const button =
        document.querySelector(".expand-button");


    if (
        history.style.display === "none"
    ) {

        history.style.display = "block";

        button.textContent =
            "收起记录 ▲";

        initializeDateSelector();

    } else {

        history.style.display = "none";

        button.textContent =
            "查看更多 ▼";

    }

}


// ==============================
// 初始化日期选择器
// ==============================

function initializeDateSelector() {

    const yearSelect =
        document.getElementById("yearSelect");

    const monthSelect =
        document.getElementById("monthSelect");

    const daySelect =
        document.getElementById("daySelect");


    yearSelect.innerHTML = "";
    monthSelect.innerHTML = "";
    daySelect.innerHTML = "";


    const currentYear =
        today.getFullYear();


    // 年份
    for (
        let year = currentYear - 5;
        year <= currentYear + 1;
        year++
    ) {

        const option =
            document.createElement("option");

        option.value = year;
        option.textContent = year;

        yearSelect.appendChild(option);

    }


    yearSelect.value =
        cu