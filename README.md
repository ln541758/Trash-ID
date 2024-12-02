# Trash-ID - Smart Waste Management App


## Project Overview
TrashID is a smart waste management app that helps users take control of their trash through AI- powered image analysis. Simply snap a photo of any waste item, and the app will instantly identify and categorize it into Garbage, Recyclables, or Organic Waste.

## App Functionality
- **AI-Powered Trash Identification:**<br>
Take a photo of your waste, and the app will automatically classify it into the correct category.<br><br>

- **Category Management:**<br>
Track your waste collection across categories like Food, Recycling, Hazardous and Organic.<br><br>

- **Personalized Disposal Plans:**<br>
Set reminders for when and where to dispose of your trash effectively.<br><br>

- **Map Integration:**<br>
Interactive maps help you find nearby recycling centers and appropriate waste disposal locations.<br><br>

- **Garbage Collection Schedule:**<br>
Get updated garbage truck schedules based on your location, so you never miss a pickup.<br><br>

- **CRUD Operations:**<br>
Easily create, view, update, or delete information related to your waste management.<br><br>


## Data Model and Firebase Collections

### Firestore Collections

#### Collection 1: trash data:
- Collection name: trashData <br>
- Document ID: userInfo( will be added in authentication component)<br>
    - **Fields:**<br>
    - username(string): Username of the user,<br>
    - email(string): Email address of the user,<br>
    - phone(string): Phone number,<br>
    - id(string): Unique identifier for the user,<br>
    - address:<br>
        - city(string): City of the user,<br>
        - street(string): Street address,<br>
        - zip(string): Zip code,<br>
    - geo:<br>
        - lat(string): Latitude,<br>
        - long(string): Longitude,<br>
    - **sub-collection: trash**<br>
    -  **Fields:**<br>
    - Document ID: Auto-generated
      - trashID(string): Unique identifier for the trash item,<br>
      - trashType(string): Type of trash (e.g., Tetra, Plastic, Glass),<br>
      - trashDate(string): Date when the trash was recorded<br>
      - source(string): URI of the image related to the item<br>

- **CRUD Operations (in collection 1: trashData):**<br>
    - Create: Post new waste item<br>
    - Read: View item info<br>
    - Update: Edit item info<br>
    - Delete: Delete item<br>


#### Collection 2: Trash Key Words: used to categorize trash items
- Collection name: trashKey <br>
- Document ID: Auto-generated
- **Fields:**
- category(object)<br>
    - organic(array): Type of organic trash keywords,<br>
    - recyclable(array): Type of recyclable trash keywords,<br>
    - hazardous(array): Type of hazardous trash keywords,<br>
    - justGarbage(array): Type of general garbage keywords,<br>
- **NO CRUD Operations in collection 2**

#### Collection 3: Recycle Center locations (will be built using API):
- Document ID: Auto-generated
- **Fields:**
- recycleLocation(array)<br>
    - center 1(object):<br>
        - name(string): Name of the recycling center,<br>
        - openHour(string): opening and closing time,<br>
        - geo(object):<br>
            - lat(string): Latitude,<br>
            - long(string): Longitude,<br>
- **NO CRUD Operations in collection 2**


#### Collection 4 Schedule of garbage collection trucks:(optional: depending on the availability of the API)
- Document ID: Auto-generated
- **Fields:**
- collectionSchedule(object)<br>
    - area 1(object):<br>
        - day(string): Day of the week,<br>
        - time(string): Time of collection,<br>
        - range(string): Area of collection,<br>
    - area 2(object):<br>
        - day(string): Day of the week,<br>
        - time(string): Time of collection,<br>
        - range(string): Area of collection,<br>
    - area 3(object):<br>
        - day(string): Day of the week,<br>
        - time(string): Time of collection,<br>
        - range(string): Area of collection,<br>
    - area 4(object):<br>
        - day(string): Day of the week,<br>
        - time(string): Time of collection,<br>
        - range(string): Area of collection,<br>



## Contributions

### Team Members:

- Hao Pei
- Yin-Shan Lin

### Contributions Summary:

**Hao Pei:**<br>
*Iteration 1:*<br>
Implemented authentication and connection flow with Firebase Firestore, including CRUD operations with the database. Developed item editor, item list, item info, and categories screens with full functionality.<br>
*Iteration 2:*<br>
Utilized Firebase authentication with email and password to ensure secure access to protected resources. Designed a login screen with features like password strength validation and account recovery options. Anonymous users does not have access to the data or use of APP, while account and profile details are available to logged-in users. Implemented the profile screen to enable users to view and edit their account information. Users can also log out of the app securely and reset their password if needed.<br>
*Iteration 3:*<br>

**Yin-Shan Lin:**<br>
*Iteration 1:*<br>
Set up the initial project structure and navigation using React Navigation. Completed CRUD operations in the application. Developed and styled the camera screen, item editor screen, item list screen, item info screen, and categories screen, including functionality implementation.<br>
*Iteration 2:*<br>
Successfully implemented and handled camera permissions and usage, as well as location permissions and interactive map functionality with features such as displaying the user's current location, searching for places, and navigating through map markers.<br>
*Iteration 3:*<br>
Integrated the Google Vision API to identify item categories based on images, ensuring accurate classification. Implemented local notifications, allowing users to schedule meaningful reminders related to waste management functionality. Resolved bugs in the Search Item feature.<br>

## Screenshots
Categories
![Categories](assets/Categories.png)
Item List
![Item List](assets/ItemList.png)
Edit Item
![Edit Item](assets/EditItem.png)
Map
![Map](assets/Map.png)
Camera
![Camera](assets/Camera.png)
Signin
![Camera](assets/Signin.png)
Profile
![Camera](assets/Profile.png)
Notif
![Camera](assets/Notif.png)



## Version Control and Collaboration
All team members have cloned the repository, created their own branches for features, and merged their changes into the main branch after review. Regular commits and pulls ensure that everyone has the latest updates.

### Note on Contributions
If there are any contributions not directly reflected in GitHub commits (e.g., planning and design discussions), they are noted here along with the responsible team members.

## Demo Video
[Demo 7 minutes](https://www.youtube.com/watch?v=HSr4WFZ8oRA)
<br>
[Demo 5 mintues](https://youtu.be/-1CpOphaBr8)
<br>

