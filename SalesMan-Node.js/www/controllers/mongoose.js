/**
 * Created by QASEEM WAKEEL on 1/20/2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Email: {type: String, unique: true},
    Password: String,
    CreatedOn: { type: Date, default: Date.now() },
    FirebaseToken: String
});

var UserModel = mongoose.model('users', UserSchema);
function saveUser(userFields) {
    var user = new UserModel(userFields);

    user.save(function (err, data) {
        if (err) {
            console.log('Error Occured in Save' + err);
        }
        else {
            console.log('Successfully Save Data' + data);
        }
    });
}
exports.saveUser = saveUser;

function findUser(query) {
    UserModel.findOne(query, function (err, data) {
        if (err) {
            console.log('Error Occured in Find' + err);
        }
        else {
            console.log('Successfully Find Data' + data);
        }
    });
}
exports.findUser = findUser;