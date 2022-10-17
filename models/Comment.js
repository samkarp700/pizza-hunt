const { Schema, model, Types, } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReplySchema = new Schema(
    {
        //set custom id to avoid confusion with parent comment _id
        replyId: {
            type: Schema.Types.ObjectId, 
            default: () => new Types.ObjectId()
        },
        replyBody: {
            type: String
        },
        writtenBy: {
            type: String
        }, 
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    }, 
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

const CommentSchema = new Schema({
    writtenBy: {
        type: String
    }, 
    commentBody: {
        type: String
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }, 
    // use replyschema to validate data for a reply
    replies: [ReplySchema]

}, 
    {
        toJSON: {
            virtuals: true,
            getters: true
        } ,
        id: false
    }
);

const Comment = model('Comment', CommentSchema);

//get total count of replies
CommentSchema.virtual('replyCount').get(function() {
    return this.replies.length;
});

module.exports = Comment;