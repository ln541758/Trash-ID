export const items = [
  {
    email: "user1@example.com",
    username: "user1",
    phone: "1234567890",
    id: "1",
    address: { city: "City1", street: "Street1", zip: "12345" },
    geo: { lat: "40.7128N", long: "74.0060W" },
    trash: [
      {
        trashID: "t1",
        trashType: "Tetra",
        trashDate: "2024-11-10",
      },
    ],
    source: require("../assets/bottle.jpg"),
  },
  {
    email: "user2@example.com",
    username: "user2",
    phone: "0987654321",
    id: "2",
    address: { city: "City2", street: "Street2", zip: "54321" },
    geo: { lat: "34.0522N", long: "118.2437W" },
    trash: [
      {
        trashID: "t2",
        trashType: "Plastic",
        trashDate: "2024-11-11",
      },
    ],
    source: require("../assets/bottle.jpg"),
  },
  {
    email: "user3@example.com",
    username: "user3",
    phone: "1122334455",
    id: "3",
    address: { city: "City3", street: "Street3", zip: "67890" },
    geo: { lat: "51.5074N", long: "0.1278W" },
    trash: [
      {
        trashID: "t3",
        trashType: "Glass",
        trashDate: "2024-11-12",
      },
    ],
    source: require("../assets/bottle.jpg"),
  },
];
