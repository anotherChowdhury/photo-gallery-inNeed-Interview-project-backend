# photo-gallery-inNeed-Interview-project-backend


## How to Run:
  1. yarn dev // will start the server at localhost:5000
  optional: yarn dbReset to create the database again
  


## Endpoints:
   
  ## User Endpoints
    #### url -  /users/register
    #### method - POST
    #### Required Fields - name(string),email(string),password(string)
  
  
    #### url -  /users/login
    #### method - POST
    #### Required Fields - email(string),password(string)
    #### returns - accessToken, userId
  
  ## Album Endpoint
    
    #### url -  /albums
    #### method - POST
    #### Required Fileds - name(string),description(string)
    #### Opional parameters - is_public(boolean) // set to false if album is private // by default creates a public album
    #### returns - album(aid,name,user_id,is_public,created_at,updated_at)
    
    
    #### url -  /albums/:albumId
    #### method - GET
    #### Opional Header - {Authorization : token } // to get user's private album
    #### returns - album(aid,name,user_id,is_public,created_at,updated_at) || Error(No album Found/ Not Allowed) 
 
    #### url -  /albums/public
    #### method - GET
    #### Query Parameters - lastReceivedId 
    #### Opional Header - {Authorization : token }  // filters users public album from public albums
    #### returns - albums(aid,name,user_id,is_public,created_at,updated_at)
    ### Limit - 50
    
    
    #### url -  /albums/user/:userId
    #### method - GET
    #### Query Parameters - lastReceivedId 
    #### returns - all public albums by user(aid,name,user_id,is_public,created_at,updated_at)
    #### Limit - 50
    
    
    #### url -  /albums/user/all
    #### method - GET
    #### Query Parameters - lastReceivedId 
    #### Header - {Authorization : token }  
    #### returns - all albums by a user(aid,name,user_id,is_public,created_at,updated_at)
    #### Limit - 50
    
    
    #### url -  /albums/:albumId
    #### method - PATCH
    #### Parameters - name, description (at least one is required) 
    #### Header - {Authorization : token }  
    #### returns - updated album(aid,name,user_id,is_public,created_at,updated_at)


    #### url -  /albums/:albumId
    #### method - DELETE
    #### Header - {Authorization : token }  
    #### returns - status code 200
    
    
  ## Photo Endpoint
 
    #### url -  /photos    
    #### method - POST
    #### parameters - FORMDATA(albumId:int, photos:array of files) 
    #### Header - {Authorization : token }  
    #### returns - all uploaded photos(image_link,album_id,pid)
  
  
    #### url -  /photos/:photoId
    #### method - DELETE 
    #### Header - {Authorization : token }  
    #### returns - stauts code 200
  
  
  
  ##Wokrs to be done:
      1. Adding getphotosbyAlbumId to photo route (already added in controller & service)
      2. Cache first public albums request data and next public albums request data in redis 
      


    
   
