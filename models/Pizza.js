const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
        type: String, 
        required: true,
        trim: true
    }, 
    createdBy: {
        type: String, 
        required: true,
        trim: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    }, 
    size: {
        type: String, 
        required: true,
        enum: ['Personal', 'Small', 'Medium', 'Large', 'Extra Large'],
        default: 'Large'
    }, 
    toppings: [], 
    //ref property tells the Pizza model which documents to search and find the right comments
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    },
    //set id to false because virtuals returned by mongoose do not need id's. 
    id: false
}
);


//create the pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    //use reduce method to tally up the total of every comment with its replies. 
    return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

//export the Pizza model
module.exports = Pizza;