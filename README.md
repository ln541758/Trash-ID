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

#### Items:
**Fields:**
- username: Username of the user.<br>
- email: Email address of the user.<br>
- phone: Phone number.<br>
- id: Unique identifier for the user.<br>
- address: <br>
    - city: City of the user<br>
    - street: Street address<br>
    - zip: Zip code<br>
- geo:<br>
    - lat: Latitude<br>
    - long: Longitude<br>
- trash: <br>
    - trashID: Unique identifier for the trash item,<br>
    - trashType': Type of trash (e.g., Tetra, Plastic, Glass),<br>
    - trashDate': Date when the trash was recorded<br>
- source: URI of the image related to the item<br>

**CRUD Operations:**
- Create: Post new waste item<br>
- Read: View item info<br>
- Update: Edit item info<br>
- Delete: Delete item<br>

#### Trash Key Words: 
**Fields:**
- ketTrashWords:<br>
    - organic: Type of organic trash keywords,<br>
    - recyclable: Type of recyclable trash keywords,<br>
    - hazardous: Type of hazardous trash keywords,<br>
    - justGarbage: Type of general garbage keywords,<br>

**CRUD Operations:**
- 


#### Collection Station Info: 
**Fields:**


**CRUD Operations:**



## Contributions

## Team Members:

- Hao Pei
- Yin-Shan Lin

## Contributions Summary:

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