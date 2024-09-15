## Endpoints

### `PUT` /api/signUp <br>

#### Request Headers

| Header     | Type | Description   |
|-----------|-----|--------------|
| username     | string  | username (duh)   |
| password       | string  | password |

#### Response

| Status Code | Meaning |
|-------------|---------|
| 201  | succesfully created the user |
| 400 | username or password not provided |


### `GET` /api/login

#### Request Headers 
| Header     | Type | Description   |
|-----------|-----|--------------|
| username     | string  | username (duh)   |
| password       | string  | password |


#### Response

| Status Code | Meaning |
|-------------|---------|
| 201  | succesfully created the user |
| 400 | username or password not provided |
| 404 | user not found | 


### `POST` /api/logout

#### Request Headers 

> None

#### Response

| Status Code | Meaning |
|-------------|---------|
| 200  | succesfully logged out |


### `POST` /api/generateLink

#### Request Body

##### JSON
```json
{
    "link": "your-link-here"
}
```

#### Response

Example Response

```json
{
    "status": 200,
    "message": "endpoints created successfully",
    "origin": "https://izumicypherx.github.io",
    "link": "example.com/Lz4cWfbdqk",
    "qrCode": "example.com/media/qr/Lz4cWfbdqk.png"
}
```

here's the example QR (points at localhost, so not usable by you):

![QRCode](./controllers/public/dT9e2KtCD3.png)