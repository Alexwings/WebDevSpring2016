module.exports = function(mongoose){
    var fieldSchema = mongoose.Schema(
        {
            label: String,
            type: {
                type:String,
                enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES'],
                default: 'TEXT'},
            placeholder: String,
            options: [{label: String, value: String}]
        });
    return fieldSchema;
}