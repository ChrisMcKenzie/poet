var Post = new require('./schemas/post').Post({tableName:'poet_posts'});

exports.getPostsFromDb = function(callback){
    Post.find({}).sort({id : 1}).exec(function(err, posts){
        callback(null, posts.map(function(post){ return post.render()}));
    });
}

exports.registerPostSaveMiddleware = function(poet, cb){
    Post.post('save', function(){
        poet.init();
        return cb();
    });
}


exports.getTags = function() {
    return Post.getAllTagsAsTextArray();
}

exports.getCategories = function() {
    return Post.getAllCategoriesAsTextArray();
}

