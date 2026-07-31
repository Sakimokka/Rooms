// 当前日期
let today = new Date();

let dateText =
    today.getFullYear() +
    "-" +
    String(today.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(today.getDate()).padStart(2, "0");


// 显示今天日期
document.getElementById("today").innerText = dateText;


// 当前记录数量
let todayCount = 0;


// 本月所有记录
let records = JSON.parse(
    localStorage.getItem("roomRecords")
) || {};


// 如果今天已经记录过，读取出来
if (records[dateText]) {

    todayCount = records[dateText];

}


// 更新页面
updatePage();



function changeCount(number) {

    todayCount += number;


    if(todayCount < 0){

        todayCount = 0;

    }


    updatePage();

}



function saveToday(){


    records[dateText] = todayCount;


    localStorage.setItem(
        "roomRecords",
        JSON.stringify(records)
    );


    alert("保存成功！");


    updatePage();

}




function updatePage(){


    // 显示今天数量

    document.getElementById(
        "todayCount"
    ).innerText = todayCount;



    // 计算本月总数

    let total = 0;


    for(let day in records){

        if(day.startsWith(
            today.getFullYear() +
            "-" +
            String(today.getMonth()+1).padStart(2,"0")
        )){

            total += records[day];

        }

    }


    document.getElementById(
        "monthTotal"
    ).innerText = total;



    // 显示历史

    let historyHTML = "";


    let days = Object.keys(records)
        .sort()
        .reverse();



    for(let day of days.slice(0,7)){


        historyHTML +=
        day +
        " ： " +
        records[day] +
        " 间<br>";

    }


    if(historyHTML === ""){

        historyHTML = "暂无记录";

    }


    document.getElementById(
        "history"
    ).innerHTML = historyHTML;


}
