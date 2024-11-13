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
- Document ID: Auto-generated
    - **Fields:**<br>
    - trashID(string): Unique identifier for the trash item,<br>
    - trashType(string): Type of trash (e.g., Tetra, Plastic, Glass),<br>
    - trashDate(string): Date when the trash was recorded<br>
    - source(string): URI of the image related to the item<br>
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

#### Collection 3: Recycle Center locations (will be retrieved from the map API):
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
Implemented the authentication and connection flow with Firebase Firestore database and CRUD operations with database. Developed item editor screen, item list screen, item info screen, and categories screen, including functionality implementation.

**Yin-Shan Lin:**<br>
Set up the initial project structure and navigation using React Navigation. Completed CRUD operations in applications. Developed and styled the camera screen, item editor screen, item list screen, item info screen, and categories screen, including functionality implementation.


## Screenshots
![Categories](assets/Categories.png)
![Item List](assets/ItemList.png)
![Edit Item](assets/EditItem.png)


## Version Control and Collaboration
All team members have cloned the repository, created their own branches for features, and merged their changes into the main branch after review. Regular commits and pulls ensure that everyone has the latest updates.

### Note on Contributions
If there are any contributions not directly reflected in GitHub commits (e.g., planning and design discussions), they are noted here along with the responsible team members.

## Demo Video
[Demo](https://www.youtube.com/)