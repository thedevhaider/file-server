# File Management API Server

# Routes
1. GET    ```/api/users/healthcheck``` - For Checking the Users endpoints health
2. POST   ```/api/users/login``` - Login with the registered user and use the JWT token from response for other requests
3. POST   ```/api/users/register``` - Register the user
4. GET    ```/api/files/healthcheck``` - For Checking the Files endpoints health
5. GET    ```/api/files/``` - For listing all uploaded files filtered by logged in user
6. POST   ```/api/files/``` - For uploading file
7. DELETE ```/api/files/``` - For deleting file from the S3 storage and database

# Setup Guide

To setup the project please follow these guidelines

1. Make sure that you have nodejs and npm installed in your system.
2. Run command ```npm install``` in the project root directory to install all the dependencies from the ```package.json``` file.
3. Create a file ```.env``` in the project root directory and add these environments ```MONGO_URI```, ```SECRET_OR_KEY```, ```PORT```, ```AWS_ACCESS_KEY```, ```AWS_SECRET_KEY```, ```S3_BUCKET_NAME```, ```AWS_REGION```, and ```UPLOAD_ROOT```.
4. Place the MongoDB connection string in the ```MONGO_URI```. You can refer to ```https://www.mongodb.com/cloud/atlas``` which i have used.
5. ```SECRET_OR_KEY``` is the secret key for your password. Make sure this is strong enough to not get cracked easily.
6. ```PORT``` is the port on which you want to run the server. If this is not provided then application will run on default port ```3000```.
7. ```AWS_ACCESS_KEY```, ```AWS_SECRET_KEY```, ```S3_BUCKET_NAME```, and ```AWS_REGION``` are the credentials required to access AWS services.
8. ```UPLOAD_ROOT``` is the directory where the files will be uploaded.
7. After setting up the ```.env``` file run ```npm run server``` or ```npm start``` in the root to run the nodemon server or normal server respectively.
8. Refer to this Postman collection for testing the endpoints ```https://www.getpostman.com/collections/d48a66d19fe7a80282e0```

Don't forget to Star and Fork the repository.

Have fun!


