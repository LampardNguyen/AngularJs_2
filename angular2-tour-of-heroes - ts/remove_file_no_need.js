var glob = require("glob");
var fs = require('fs');
var filePath = "./app/**/*.+(js|map)";
// glob(filePath,function(err,files){
//      if (err) throw err;
//      files.forEach(function(item,index,array){
//           console.log(item + " found");
//      });
//      // Delete files
//      files.forEach(function(item,index,array){
//           fs.unlink(item, function(err){
//                if (err) throw err;
//                console.log(item + " deleted");
//           });
//      });
// });
// 
var globule = require('globule');
var result = globule.find([filePath]);
result.forEach(function(item, index, array) {
     fs.unlink(item, function(err) {
          if (err) throw err;
          console.log(item + " deleted");
     });
});