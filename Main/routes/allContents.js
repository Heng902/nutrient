

const express = require('express');
const router = express.Router();
const NCmodel = require("../database/model/NCmodel");
const NCsuccess = require("../module/NCsuccess");
const NCerror = require("../module/NCerror");


//rules
// {
//  (queryString)
//   頁數 page
//   搜索 search (使用搜索也要有 page)
// }

router.get('/', function(req, res) {

  const {page, search} = req.query;
  //設置忽略非目標頁數的資料
  const ignore = (page-1)*8;

  //有搜尋時的特定目標資料 每8筆為一頁
  if(search){
    NCmodel.find()
    .then((dataJSON)=>{
      //將食品名稱跟俗名統整後與id一起形成一個json
      const allName = dataJSON.map(item=>{
        if(item.commonName){
          return {
            id: item.id,
            name: `${item.foodName}，${item.commonName}`
          };
        }
        else if(item.foodName){
          return {
            id: item.id,
            name: item.foodName
          };
        }
      });
      //目標id
      let targetId = [];
      //將目標的id找出並推入陣列
      allName.forEach(item=>{
        const confirm = item.name.indexOf(search);
        if(confirm > -1){
          targetId.push(item.id);
        }
      });
      //用目標id重新查詢資料
      NCmodel.find({id:{$in: targetId}})
      .then(data=>{
        if(!data.length){
          NCsuccess(res, {
            ERROR: `並無關於 ${search} 的資料`
          })
          return;
        }
        //設置每八個為一頁
        const targetData = data.slice(ignore, ignore+7);
        NCsuccess(res, targetData, data.length);
      }).catch(()=>{
        NCerror(res, "Data not found", 400);
      })
    }).catch(()=>{
      NCerror(res, "find", 400);
    })
    return;
  }
  
  // 沒有搜尋時的一般資料 每8筆為一頁
  if(page > 1){
    NCmodel.find()
    .then((dataJSON)=>{
      const targetPagesData = dataJSON.slice(ignore, ignore+8);
      NCsuccess(res, targetPagesData, dataJSON.length);
    }).catch(()=>{
      NCerror(res, "find", 400);
    })
  }
  else{
    NCmodel.find()
    .then((dataJSON)=>{
      const targetPagesData = dataJSON.slice(0, 8);
      NCsuccess(res, targetPagesData, dataJSON.length);
    }).catch(()=>{
      NCerror(res, "find", 400);
    })
  }

});

module.exports = router;
