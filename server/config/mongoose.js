var path = require('path');
var fs = require('fs')
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/VirtualClassroomFive'); //Just change database name here

let models_path = path.join(__dirname, './../models');
console.log('rabbit')
//iterates through the models folder and searches for all the model js files
fs.readdirSync(models_path).forEach(function(file){
    
    if(file.indexOf('.js')>=0){
        console.log('rrrrr', models_path)
        require(models_path + '/' + file)();
    }
});
