module.exports = function(mongoose){
    var PostSchema = mongoose.Schema({
        "Title":String,
        "Year":String,
        "Rated":String,
        "Director":String,
        "Actors":String,
        "Plot":String,
        "Country":String,
        "Awards":String,
        "Poster":String,
        "imdbRating":{type: Number, default: 0.0},
        "imdbID":String,
        "Type":{type: String, enum:['movie', 'series'], default: "movie"}
    },{collection: 'project_post'});
    return PostSchema;
}