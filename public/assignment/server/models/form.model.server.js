/**
 * Created by Alex on 3/14/2016.
 */
module.exports = function(db, mongoose){
    var forms = require("./form.mock.json");
    var uuid = require('node-uuid');


    var api = {
        'FindAll': findAll,
        'FindById': findById,
        'Create': create,
        'Delete': remove,
        'Update': update,
        'findFormByTitle': findByTitle,
        'findFormsByUserId': findByUserId,
    }
    return api;

    function findAll(){
        return forms;
    }
    function findById(id){
        for(var i = 0; i < forms.length; i++){
            var f = forms[i];
            if(f._id == id){
                return f;
            }
        }
        return null;
    }
    function findByUserId(id){
        var fs = [];
        for(var i = 0; i < forms.length; i++){
            var f = forms[i];
            if(f.userId == id){
                fs.push(f);
            }
        }
        return fs;
    }
    function create(form){
        if(!findByTitle(form.title)){
            var f = {'_id': uuid.v1(), 'title': form.title, 'userId': form.userId, 'fields': form.fields};
            forms.push(f);
        }
    }
    function remove(id){
        for(var i = 0; i < forms.length; i++){
            var formId = forms[i]._id;
            if(formId == id){
                forms.splice(i, 1);
            }
        }
    }
    function update(id, form){
        var f = findById(id);
        if(f){
            f.title = form.title;
            f.userId = form.userId;
        }
    }
    function findByTitle(title){
        for(var i = 0; i < forms.length; i++){
            if(forms[i].title == title){
                return forms[i];
            }
        }
        return null;
    }
}