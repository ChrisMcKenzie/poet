var Waterline = require('waterline');

var Post = Waterline.Collection.extend({
  tableName: 'poet_posts',
  attributes: {
    title    : { type : 'string', required: true },
    tags     : { type : 'array' },
    category : { type : 'string' },
    template : { type : 'string' },
    body     : { type : 'string' },

    toJSON: function(){
        var self = this.toObject();;

        var obj = {
            title : self.title,
            tags : self.tags,
            category : self.category,
            body : self.body,
            post_id : self._id.toString(),
            date : self._id.getTimestamp()
        }

        return obj;
    }
  }
});

/**
 * Returns all tags in array format, ignoring tag ID
 */
function getAllTagsAsTextArray(callback){
    exports.Post.find({}).sort({title : 1}).exec(function(err, posts){
        if (err)
            return callback(err);

        var tagArray = [];

        posts.forEach(function(post){
            post.tags.forEach(function(tag){
                if (tagArray.indexOf(tag) === -1)
                    tagArray.push(tag);
            });
        });

        return callback(null, tagArray)
    })
}

/**
 * Returns all categories in array format, ignoring category ID
 */
function getAllCategoriesAsTextArray(callback){
    exports.Post.distinct('category').sort({category : 1}).exec(function(err, posts){
        if (err)
            return callback(err);

        return callback(null, posts.map(function(post){return post.category}));
    });
}

exports.Post = Post;
exports.Post.getAllTagsAsTextArray = getAllTagsAsTextArray;
exports.Post.getAllCategoriesAsTextArray = getAllCategoriesAsTextArray;
