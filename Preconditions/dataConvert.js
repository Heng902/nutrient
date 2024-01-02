

//    在 NutrientData/result/ 裡產生一份 json 檔 後續用以寫入 database


const fs = require("fs");
const path = require("path");


const NC_csv = fs.readFileSync("Preconditions/materials/食品營養成分資料庫2022版(UPDATE1).csv", "utf-8");


//把頭尾的雙引號去掉
const markClean = (string)=>{
    if(typeof string == "string"){
        const firstMark = string.indexOf('"');
        const lastMark = string.indexOf('"', 1);
        if(firstMark == -1 && lastMark == -1){
            return string
        }
        else{
            return string.substring(firstMark+1, lastMark);
        }
    }
};

//將csv檔轉成json
const CSVtoJSON = (CSVdata)=>{
    const dataLines = CSVdata.split("\n");
    //整理過的 資料行 因前2行是不需要的
    const dataLinesOrganized = dataLines.slice(2);
    let dataJSON = {
        data: dataLinesOrganized.map((item, index)=>{
            const itemArray = item.split(",");
            return {
                id: itemArray[0],
                foodName: itemArray[2],
                commonName: markClean(itemArray[4]),
                calorie: Number(itemArray[6]),
                protein: Number(itemArray[9]),
                fat: Number(itemArray[10]),
                carbohydrate: Number(itemArray[13]),
            };
        })
    };

    return JSON.stringify(dataJSON);
};

const ncJSON = CSVtoJSON(NC_csv);

fs.writeFileSync(path.join(__dirname, "/result/NC.json"), ncJSON, "utf-8")