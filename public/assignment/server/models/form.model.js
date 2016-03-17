/**
 * Created by Alex on 3/14/2016.
 */
var forms = require("./form.mock.json");

module.exports = function(app, db){
    var api = {
        'FindAll': findAll,
        'FindById': findById,
        'Create': create,
        'Delete': remove,
        'Update': update,
        'findFormByTitle': findByTitle,
        'findFormsByUserId': findByUserId,
        'findFieldById': findField,
        'removeField': removeField,
        'addField': addField,
        'updateField':updateField,
    }
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
        var f = {'_id': Uuid.raw(), 'userId': form.userId, 'fields': form.fields};
        forms.push(f);
        return forms;
    }
    function remove(id){
        for(var i = 0; i < forms.length; i++){
            var formId = forms[i]._id;
            if(formId == id){
                forms.splice(i, 1);
                break;
            }
        }
        return forms;
    }
    function update(id, form){
        var f = findById(id);
        if(f){
            f.title = form.title;
            f.userId = form.userId;
            f.fields = form.fields;
        }
        return forms;
    }
    function findByTitle(title){
        for(var i = 0; i < forms.length; i++){
            if(forms[i].title == title){
                return forms[i];
            }
        }
        return null;
    }
    function findField(formId, fieldId){
        var form = findById(formId);
        if(form){
            var fields = form.fields;
            for(var i = 0; i < fields.length; i++){
                if(fieldId == fields[i]._id){
                    return fields[i];
                }
            }
        }
        return null;
    }
    function removeField(formId, fieldId){
        var form = findById(formId);
        if(form){
            var fields = form.fields;
            for(var i = 0; i < fields.length; i++){
                if(fields[i]._id == fieldId){
                    fields.splice(i, 1);
                }
            }
        }
        return form;
    }
    function addField(formId, field){
        var form = findById(formId);
        var f = {"_id": Uuid.raw()};
        for((key, value) in field){
            if(!f.key){
                f.key = value;
            }
        }
        form.fields.push(f);
        return form;
    }
    function updateField(formId, fieldId, newfield){
        var field = findField(formId, fieldId);
        if(field){
            for((key, value) in newfield){
                field.key = value;
            }
        }
        return field;
    }
}