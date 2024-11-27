![image](https://github.com/user-attachments/assets/396f9102-c8ad-4b02-a46f-ddda513415bd)

A mock Attendance Manangement App. The Backend will handle REST API Request to MongoDB Server and use it to monitor the employee's attendance. Meanwhile, the Kotlin Android Apk will be used to change the status of attendance from Present -> Absent and vice versa.

Including an ExpressJS backend and a Kotlin Android application.

# Table of Content
1. [Techstack](#tech-stack)
2. [Deployment](#deployment)
3. [Installation](#installation)
   - [Prerequisite](#prerequisite)
   - [ExpressJS Backend](#expressjs-backend)
   - [Kotlin Android](#kotlin-android)
5. [Functionality](#functionality)
   - [Backend](#backend)
   - [Android](#android) 
8. [Developer](#developer)
   
# Tech Stack
![Generic badge](https://img.shields.io/badge/node-v.20.6.1-339933.svg)
![Generic badge](https://img.shields.io/badge/nodemon-v.3.1.7-cyan.svg)
![Generic badge](https://img.shields.io/badge/express.js-v.4.21.1-47A248.svg)
![Generic badge](https://img.shields.io/badge/mongoose-v.1.57-800000.svg)
![Generic badge](https://img.shields.io/badge/kotlin-v.2.0.0-7F52FF.svg)
![Generic badge](https://img.shields.io/badge/gradle-v.7.0.0-02303A.svg)
![Generic badge](https://img.shields.io/badge/ZXing-v.4.3.0-pink.svg)

# Deployment
The backend is deployed at Vercel, free version. If the link does not work, you can deploy this project locally.
```https://sipherus-62.vercel.app/```

And the .apk is attached in this Repo.

# Installation
## Prerequisite
Before starting the project's installation, you need both Node and Android Studio installed on your computer first.

Node: [>= 20.6.1](https://developer.android.com/studio/install).

Android Studio: [SDK >= 21, Android version >= 5.1](https://developer.android.com/studio/install).

You must also install IDE, such as [Visual Studio Code](https://code.visualstudio.com/).

## ExpressJS Backend
Now you can start installing the project. First, you will open the ``backend`` directory with VSCode and run this command in the Terminal (Top Left button -> Terminal -> New Terminal)
```
npm install
```
This will install all the dependencies needed for the backend server. Then to run the project in production mode, you can use
```
npm run start
```
or
```
npm run dev
```
If you change anything in the ``backend``, remember to run this command line to build it in api folder
```
npx tsc
```

## Kotlin Android
After you install Android Studio, Gradle and SDK (I am currently using SDK 31, but the application's requirement is >= 21). Then you have to Sync the project in the option on the top corner. With this, Android Studio will install all dependancies in the ``build.gradle`` files.

Next, check if you have the correct SDK. If not, change it at Tools > SDK Manager.

Now, you can deploy the APK in 3 ways. First, you can build the .apk file for your Android device by going to ``Build -> Build Bundle / APK -> Build APK``. After building, you can click on the text box on the lower right of the screen to see the .apk file you created. If you do not change anything in the files, you can use the .apk file attached in this repo.

Second, you can connect to your Android phone with USB connection. [Turn on USB Debugging ](https://developer.android.com/studio/debug/dev-options#:~:text=Enable%20USB%20debugging%20on%20your%20device,-Before%20you%20can&text=Enable%20USB%20debugging%20in%20the,Advanced%20%3E%20Developer%20Options%20%3E%20USB%20debugging) and look at the toolbar on the far right side. When you connect your phone with USB cable, your device will appear in Device Manager. You can also pair your device with Wifi in here.

Finally, you can click on the + icon from that same Device Manager to add a new Virtual Device. Please note that this will consume a lot of computer resources.

# Functionality
## Backend
You can use your browser or Postman to test the functionality. Please note that, if you run the project locally, change ``https://sipherus-62.vercel.app/`` into ``http://localhost:3210``.

GET All Employees 
```
https://sipherus-62.vercel.app/api/employees/
```

Response 
```
[
    {
        "_id": "67395fdb73c3503a80fc112a",
        "name": "Henry Pham",
        "email": "henry.pham@example.com",
        "employeeId": "EMP001",
        "qrSecret": "random-secret1",
        "currentStatus": "Absent",
        "lastStatusUpdate": "2024-11-17T03:15:39.110Z",
        "createdAt": "2024-11-17T03:15:39.110Z",
        "updatedAt": "2024-11-17T03:15:39.110Z",
        "__v": 0
    },
    {
        "_id": "67395fe073c3503a80fc112c",
        "name": "Quan Nguyen",
        "email": "quan.nguyen@example.com",
        "employeeId": "EMP002",
        "qrSecret": "random-secret2",
        "currentStatus": "Present",
        "lastStatusUpdate": "2024-11-18T19:56:38.813Z",
        "createdAt": "2024-11-17T03:15:44.212Z",
        "updatedAt": "2024-11-17T03:15:44.212Z",
        "__v": 0
    },
    {
        "_id": "673b9bf0bf8da56c3fbdfd72",
        "name": "Poloan Nguyen",
        "email": "poloan.nguyen@example.com",
        "employeeId": "EMP003",
        "qrSecret": "placeholder-EMP003-f2f7fddb-7c5e-4333-add5-31300f77a059",
        "currentStatus": "Absent",
        "lastStatusUpdate": "2024-11-18T19:56:32.715Z",
        "createdAt": "2024-11-18T19:56:32.716Z",
        "updatedAt": "2024-11-18T19:56:32.716Z",
        "__v": 0
    }
]
```
GET Specific Employee
```
https://sipherus-62.vercel.app/api/employees/<_id of the employee>
```
POST Create Employee (require name, email, employeeId)
```
{
  "name": "Poloan Nguyen",
  "email": "poloan.nguyen@example.com",
  "employeeId": "EMP003",
}
```
Response
```
{
    "name": "Poloan Nguyen",
    "email": "poloan.nguyen@example.com",
    "employeeId": "EMP003",
    "qrSecret": "placeholder-EMP003-f2f7fddb-7c5e-4333-add5-31300f77a059",
    "currentStatus": "Absent",
    "_id": "673b9bf0bf8da56c3fbdfd72",
    "lastStatusUpdate": "2024-11-18T19:56:32.715Z",
    "createdAt": "2024-11-18T19:56:32.716Z",
    "updatedAt": "2024-11-18T19:56:32.716Z",
    "__v": 0
}
```
POST Toggle Employee
```
https://sipherus-62.vercel.app/api/employees/toggle-attendance
```
Response
```
{
    "_id": "67395fe073c3503a80fc112c",
    "name": "Quan Nguyen",
    "email": "quan.nguyen@example.com",
    "employeeId": "EMP002",
    "qrSecret": "random-secret2",
    "currentStatus": "Present",
    "lastStatusUpdate": "2024-11-18T02:00:20.531Z",
    "createdAt": "2024-11-17T03:15:44.212Z",
    "updatedAt": "2024-11-17T03:15:44.212Z",
    "__v": 0
}
```

## Android
In order to change the employee's attendance status, you need a QR Code. The QRCode must be a text, which contains 2 fields, _id and qrSecret.

For example,
```
{
    "id": "673b9bf0bf8da56c3fbdfd72",
    "qrSecret": "placeholder-EMP003-f2f7fddb-7c5e-4333-add5-31300f77a059"
}
```

Using [QRCode Generator](https://www.qr-code-generator.com/), you can easily create QR Codes like this. You can also send a POST or DELETE request to the backend to create your desired employee and use QRCode Generator to get the QRCode to toggle their status.

After that, click on the Scan button on the apk and scan this QR Code. The APK will return text to show the updated status of employees.

# Developer
Quan Nguyen: quan.nguyen.suomea@gmail.com
