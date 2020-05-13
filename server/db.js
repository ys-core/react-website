const mongoose =  require('mongoose');
<<<<<<< HEAD
mongoose.connect('mongodb://127.0.0.1:27017/React', { useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true });
=======
mongoose.connect('mongodb://127.0.0.1:27017/React');
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a

const db = mongoose.connection;
db.once('error',()=>console.log('mongo connection error'));
db.once('open',()=>console.log('mongo connection successed'));


/*
   the schema for all admins, the tag always be 1  , in /React/admins collection
*/
const adminSchema = mongoose.Schema({
	username: String,
	password: String,
	gender: String,
	email: String,
	tag: Number       // 1--->administrator.
},{
   collection:'admins'
});
/*
   the schema for all common users, the tag always be 0 ,   in /React/users collection
*/
const userSchema = mongoose.Schema({
	username: String,
	password: String,
	gender: String,
	email: String,
	tag: Number       // 0--->ordinary usre
},{
<<<<<<< HEAD
    collection:'users'
=======
   collection:'users'
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
});
/*
   the schema for all comments on article or comment board,  in /React/comments collection
*/
const commentSchema = mongoose.Schema({
<<<<<<< HEAD
	username: String,
	avatar: String,
	commentDate: Date,
	comment: String,
	likes: Number,
	dislikes: Number
=======
	     comment: String,
         username: String,
         commentTime: Date
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
},{
	collection:'comments'
});
/*
<<<<<<< HEAD
   the schema for all articles or logs which contains their own comments,  in /React/articles collection
*/
const articleSchema = mongoose.Schema({    
	articleTitle: String,    
	articleType: String,          
	content: String,
	author: String,
	createDate: Date,
	starsNum: Number,
	views: Number
=======
   the schema for all articles or logs ,  in /React/articles collection
*/
const articleSchema = mongoose.Schema({                  
	content: String,
	author: String,
	category: String,
	createDate: Date,
	starstNum: Number,

>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
},{
    collection:'articles'
});


const Models = {
<<<<<<< HEAD
	Admin: mongoose.model('admins',adminSchema),   //NAME,SCHEMA,[COLLECTION_NAME]
	User: mongoose.model('users',userSchema),   //NAME,SCHEMA,[COLLECTION_NAME]
	Comment: mongoose.model('board_comments',commentSchema),     
	Article: mongoose.model('articles',articleSchema)
=======
	    Admin: mongoose.model('admins',adminSchema),   //NAME,SCHEMA,[COLLECTION_NAME]
	    User: mongoose.model('users',userSchema),   //NAME,SCHEMA,[COLLECTION_NAME]
		Comments: mongoose.model('board_comments',commentSchema),
		Articles: mongoose.model('articles',articleSchema)
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
}

module.exports = Models;
