Secret Family Recipes Cookbook API 

API URL: https://familysecretrecipes.herokuapp.com/
____________________________________________________________________
Endpoints: 

Method:	 Endpoint	:                         Purpose:

POST	    /api/auth/register	          Register user

POST	    /api/auth/login	                  Login

GET	            /api/recipes/allRecipes       Get all recipes

GET 	    /api/recipes/:id	                  Gets a specific recipe

POST	    /api/recipes	                  Add a new recipe

PUT	    /api/recipes/:id	                  Edit a recipe

DELETE	    /api/recipes/:id	                  Delete a recipe

________________________________________________________________________

Registration:

POST to /api/auth/register

{

  “username”: “string”, //required, unique
  
  “password”: “string” //required
  
}

Login:

POST to /api/auth/login

{

  “username”: “string”, //required
  
  “password”: “string” //required
  
}
___________________________________________________________________________
View All Recipes:

GET from /api/recipes/allRecipes

Returns an array containing the details of each recipe




View a Specific Recipe:

GET from /api/recipes/:id

Will return details of the specified recipe


______________________________________________________________________________
Adding a Recipe:

POST to /api/recipes

{

  “title”: “string”, //required
  
  “source”: “string”, //required
  
  “ingredients”: “text”, //required
  
  “instructions”: “text”, //required
  
  “private”: “true or false”, //optional, defaults to “true”  ( For use if we are able to attempt stretch the goal “add ability to invite another user”)
  
  “user_id”: “number” //optional
  
}

Will return the details of new created recipe

___________________________________________________________________________________
Editing a Recipe:

PUT on /api/recipes/:id

Will return message “Recipe Updated!” if successful

____________________________________________________________________________________
Deleting a Recipe:

DELETE from /api/recipes/:id

Will return message “Recipe Deleted!” if successful
