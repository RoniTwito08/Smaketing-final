import avi from "../assets/people/avi.jpg";
import yoav from "../assets/people/yoav.jpg";
import sasha from "../assets/people/sasha.jpg";
import ela from "../assets/people/ela.jpg";
import mohamad from "../assets/people/mohamad.jpg";

export const mockPosts = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "מוחמד השביעי",
      profilePicture: avi,
    },
    image: mohamad,
    comments: [
      {
        id: "c1",
        text: "יא אפס",
        user: {
          id: "u2",
          name: "דדי",
          profilePicture: ela,
        },
      },
      {
        id: "c2",
        text: "נראה גיי",
        user: {
          id: "u3",
          name: "פטרוב",
          profilePicture: sasha,
        },
      },
    ],
  },
  {
    id: "2",
    user: {
      id: "u4",
      name: "עדי קוטלר",
      profilePicture: sasha,
    },
    image: ela,
    comments: [
      {
        id: "c3",
        text: "איזה שווה את",
        user: {
          id: "u5",
          name: "שימי תמיר",
          profilePicture: sasha,
        },
      },
      {
        id: "c3",
        text: "חיים שלי",
        user: {
          id: "u5",
          name: "אייל גולן",
          profilePicture: sasha,
        },
      },
      {
        id: "c3",
        text: "מטוס קרב",
        user: {
          id: "u5",
          name: "אבי ניסים",
          profilePicture: sasha,
        },
      },
    ],
  },
  {
    id: "1",
    user: {
      id: "u1",
      name: "מוחמד",
      profilePicture: yoav,
    },
    image: sasha,
    comments: [
      {
        id: "c1",
        text: "יא אפס",
        user: {
          id: "u2",
          name: "דדי",
          profilePicture: yoav,
        },
      },
      {
        id: "c2",
        text: "נראה גיי",
        user: {
          id: "u3",
          name: "פטרוב",
          profilePicture: sasha,
        },
      },
    ],
  },
];
