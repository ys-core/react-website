

------------------------------------------------------------------------------------------
    get:

	   /getAllArticles						// get all the articles from database
<<<<<<< HEAD
	   /getOneArticle/:_id                  // obtain the specific artilce by _Id 
	   /getArticles/:_category              // obtain articles which have specified catogory.


       /getAllBoardComments					// get all the comments from database

	   /deleteArticle                       // admin to delete one article
	   /deleteBoardComment                  // admin to delete one board comment
       
=======
	   /getAllBoardComments					// get all the comments from database
	   /deleteArticle                       // admin to delete one article
	   /deleteBoardComment                  // admin to delete one board comment


>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a



    post:
		 /add_user                              // register new common user
		 /add_admin                             // register new administrator
	     /verify_admin                          //  verify admin for login, return true or false
		 /verify_user							// verify the common user, return true or false
<<<<<<< HEAD
		 /add_article                           // create an new article and add it to articles collection
		 /update_views/:_id                     // update the the views of a specific article.
		 /add_board_comment                          // add user's board comment into comments collection

         /board/comment_likes                               // likes ++ for someone comment 
		 /board/comment_dislikes				// dislikes ++ for someone comment 

		 <!-- /article/:index						// post the new created article to the database, return true or false -->
		 /admini_center
		 /user_center
		 /forget_password							
		 <!-- /commitComment							// commit the user's comment to database, reuturn true or false -->
=======
		 
		 /article/:index						// post the new created article to the database, return true or false
		 /admini_center
		 /user_center
		 /forget_password							
		 /commitComment							// commit the user's comment to database, reuturn true or false
>>>>>>> b6fcfa1f62f44ab41c66004ddce4d2f243888b1a
		 


创建一篇文章必须包含以下内容

   title, author, key, editTime, category, content

<Link to={`/article/${this.props.content.key}?username=yongsongLee`}> 在to属性中插入动态值和传参
this.props.match.params.index***将获得this.props.content.key的值
this.props.location.search将获得参入的参数?username=yongsongLee