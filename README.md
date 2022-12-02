# JWT_Authentication
User Authentication using jwt tokens and uploading and fetching file from S3 Buckets of AWS

### Setup

Clone the repositry using `git clone https://github.com/AyushTripathi-sketch/JWT_Authentication.git` </br>
Change into the project directory</br>

### Dependencies

Run the command `npm i` to install all dependencies</br></br>
Make a `.env` file in the project root directory and add the following variables in the file</br>
```
MONGODB_URI = URI of the mogodb databse
JWT_SECRET =  Run the command "require('crypto').randomBytes(36).toString('hex')" in the node terminal to generate the JWT Secret and store in this variable
AWS_IAM_USER_KEY = ACCESS_ID of AWS
AWS_IAM_USER_SECRET = SECRET ACCESS KEY OF AWS
AWS_BUCKET_NAME = name of Bucket of S3 to store files
EMAIL_USERNAME = email of the account from which confirmation mail has to be sent
EMAIL_PASSWORD = password of the account

```

### Testing the Routes

You can use Postman to test all the routes
