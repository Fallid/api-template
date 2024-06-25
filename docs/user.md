# User API Spec

## Register User API

Endpoint : POST /api/users

Request Body :

```json 
{
    "username" : "opal",
    "password" : "rahasia",
    "name"     : "Naufal"
}
```
Response Body Success :
```json
{
    "data" : {
        "username": "opal",
        "name" : "Naufal"
    },
}
```
Response Body Error : 
```json
{
    "errors": "Username already registered"
}
```

## Login User API

Endpoint : POST /api/users/login

Request Body :
```json
{
    "username" : "opal",
    "password" : "rahasia"
}
``` 

Response Body Success :
```json
{
    "data":{
        "token" : "unique-token"
    }
}
```

Response Body Error : 
```json
{
    "errors" : "Username or password wrong"
}
```

## Update User API

Endpoint : PATCH /api/users/current

Headers : 
- Authorization : token

Request Body : 
```json
{
    "name" : "nopal", //optional
    "password" : "new pass" //optional
}
```

Response Body Success : 
```json 
{
    "data" : {
        "username" : "opal",
        "name" : "nopal"
    }
}
```

Response Body Error : 
```json 
{
    "errors" : "Name length maax 100"
}
```

## Get User API

Endpoint : GET /api/users/current

Headers : 
- Authorization : token


Response Body Success : 
```json 
{
    "data" : {
        "username" : "opal",
        "name" : "nopal"
    }
}
```

Response Body Error : 
```json 
{
    "errors" : "Unauthorized"
}
```

## Logout User API

Endpoint : DELETE /api/users/logout

Headers : 
- Authorization : token

Response Body Success : 
```json
{
    "data" : "OK"
}
```

Response Body Error : 
```json 
{
    "errors" : "Unauthorized"
}
```

