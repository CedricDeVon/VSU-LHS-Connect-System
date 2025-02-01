import { addCollection } from "@iconify/vue/dist/iconify.js";

// CRUD Functions
export const getAdvisers = () => adviser;

export const getAdviserByName = (firstname, lastname) => {
  const index = adviser.findIndex(
    (adv) => adv.firstName === firstname && adv.lastName === lastname
  );
  if (index !== -1) {
    return adviser[index];
  }
};

export const getFacultyIdBYName = (firstname, lastname) => {
  const index = adviser.findIndex(
    (adv) => adv.firstName === firstname && adv.lastName === lastname
  );
  if (index !== -1) {
    return adviser[index].facultyId;
  }
};

export const getUserId = (firstname, lastname) => {
  const index = adviser.findIndex(
    (adv) => adv.firstName === firstname && adv.lastName === lastname
  );
  try {
    if (index !== -1) {
      return adviser[index].userId;
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
};

export const addadviser = (adv) => {
  adviser.push(adv);
  console.log(adviser);
};

export const updateAdviserThruFacID = (id, newData) => {
  const index = adviser.findIndex((adv) => adv.facultyId === id);
  if (index !== -1) {
    adviser[index] = { ...adviser[index], ...newData };
  }
};

export const updateAdviserStatus = (facId, stat) => {
  const index = adviser.findIndex((adv) => adv.facultyId === facId);
  if (index !== -1) {
    adviser[index].status = stat;
  }
};

export const deleteAdviserThruFacID = (id) => {
  const index = adviser.findIndex((adv) => adv.facultyId === id);
  if (index !== -1) {
    adviser.splice(index, 1);
  }
};

export const getAdviserCount = () => {
  return adviser.filter((adv) => adv.status === "active").length;
};

export const getPendingAdviserCount = () => {
  return adviser.filter((adv) => adv.status === "pending").length;
};

export const adviser = [
  {
    id: "adviserid1",
    userId: "userid1",
    sectionId: "sectionid1",
    facultyId: "sample22-1-01056",
    firstName: "Jedo",
    lastName: "Gonzales",
    middleName: "Protacio",
    suffix: "",
    bdate: "07-07-2005",
    profilePic:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/b5405d40c1f23d177b539d3e88802af2603a97825b67a47cd1bc8409f6d0d664?placeholderIfAbsent=true&apiKey=a61ecd0d5bec4c4f94bc2ce5eda3f7bc",
    status: "active",
  },
  {
    id: "adviserid2",
    userId: "userid2",
    sectionId: null,
    facultyId: "sample22-1-01098",
    firstName: "Pawwy",
    lastName: "Rawwy",
    middleName: "Wee",
    suffix: "",
    bdate: "07-07-2006",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "inActive", // Status is inActive because sectionId is null
  },
  {
    id: "adviserid3",
    userId: "userid3",
    sectionId: "sectionid3",
    facultyId: "sample22-1-01034",
    firstName: "Ysmile",
    lastName: "jeejeje",
    middleName: "Jon",
    suffix: "Sr.",
    bdate: "07-07-2007",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "active",
  },
  {
    id: "adviserid4",
    userId: "userid4",
    sectionId: "sectionid4",
    facultyId: "sample22-1-01009",
    firstName: "Von",
    lastName: "Neuman",
    middleName: "Arch",
    suffix: "Jr.",
    bdate: "07-07-2008",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "pending",
  },
  {
    id: "adviserid5",
    userId: "userid5",
    sectionId: "sectionid5",
    facultyId: "sample22-1-01012",
    firstName: "michael",
    lastName: "Jakston",
    middleName: "Pdiddy",
    suffix: "III",
    bdate: "07-07-2009",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "pending",
  },
  {
    id: "adviserid6",
    userId: "userid6",
    sectionId: null,
    facultyId: "sample22-1-01044",
    firstName: "Romeo",
    lastName: "Rero",
    middleName: "Dsa",
    suffix: "II",
    bdate: "07-07-2010",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "inActive",
  },
  {
    id: "adviserid7",
    userId: "userid7",
    sectionId: "sectionid7",
    facultyId: "sample22-1-01068",
    firstName: "rods",
    lastName: "manns",
    middleName: "Db",
    suffix: null,
    bdate: "07-07-2011",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "active",
  },
  {
    id: "adviserid8",
    userId: "userid8",
    sectionId: "sectionid8",
    facultyId: "sample22-1-01035",
    firstName: "euj",
    lastName: "Wang",
    middleName: "Cal",
    suffix: null,
    bdate: "07-07-2019",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "active",
  },
  {
    id: "adviserid9",
    userId: "userid9",
    sectionId: "sectionid9",
    facultyId: "sample22-1-01029",
    firstName: "FirstName9",
    lastName: "LastName9",
    middleName: "MiddleName9",
    suffix: null,
    bdate: "07-07-2000",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "active",
  },
  {
    id: "adviserid10",
    userId: "userid10",
    sectionId: null,
    facultyId: "sample22-1-01045",
    firstName: "FirstName10",
    lastName: "LastName10",
    middleName: "MiddleName10",
    suffix: "Jr.",
    bdate: "07-07-2001",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "inActive",
  },
  {
    id: "adviserid11",
    userId: "userid11",
    sectionId: "sectionid11",
    facultyId: "sample22-1-01087",
    firstName: "FirstName11",
    lastName: "LastName11",
    middleName: "MiddleName11",
    suffix: null,
    bdate: "07-07-2002",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "active",
  },
  {
    id: "adviserid12",
    userId: "userid12",
    sectionId: "sectionid12",
    facultyId: "sample22-1-01010",
    firstName: "FirstName12",
    lastName: "LastName12",
    middleName: "MiddleName12",
    suffix: "Jr.",
    bdate: "07-07-2003",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "active",
  },
  {
    id: "adviserid13",
    userId: "userid13",
    sectionId: null,
    facultyId: "sample22-1-01089",
    firstName: "FirstName13",
    lastName: "LastName13",
    middleName: "MiddleName13",
    suffix: "Sr.",
    bdate: "07-07-2004",
    profilePic:
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNpcmNsZS11c2VyLXJvdW5kIj48cGF0aCBkPSJNMTggMjBhNiA2IDAgMCAwLTEyIDAiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEwIiByPSI0Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
    status: "inActive",
  },
  {
    id: "adviserid14",
    userId: "userid14",
    sectionId: "sectionid14",
    facultyId: "sample22-1-01025",
    firstName: "FirstName14",
    lastName: "LastName14",
    middleName: "MiddleName14",
    suffix: null,
    bdate: "07-07-2005",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid15",
    userId: "userid15",
    sectionId: null,
    facultyId: "sample22-1-01023",
    firstName: "FirstName15",
    lastName: "LastName15",
    middleName: "MiddleName15",
    suffix: null,
    bdate: "07-07-2006",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid16",
    userId: "userid16",
    sectionId: "sectionid16",
    facultyId: "sample22-1-01020",
    firstName: "FirstName16",
    lastName: "LastName16",
    middleName: "MiddleName16",
    suffix: "Sr.",
    bdate: "07-07-2007",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid17",
    userId: "userid17",
    sectionId: "sectionid17",
    facultyId: "sample22-1-01011",
    firstName: "FirstName17",
    lastName: "LastName17",
    middleName: "MiddleName17",
    suffix: null,
    bdate: "07-07-2008",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid18",
    userId: "userid18",
    sectionId: "sectionid18",
    facultyId: "sample22-1-01038",
    firstName: "FirstName18",
    lastName: "LastName18",
    middleName: "MiddleName18",
    suffix: "Jr.",
    bdate: "07-07-2009",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid19",
    userId: "userid19",
    sectionId: null,
    facultyId: "sample22-1-01052",
    firstName: "FirstName19",
    lastName: "LastName19",
    middleName: "MiddleName19",
    suffix: "Sr.",
    bdate: "07-07-2010",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid20",
    userId: "userid20",
    sectionId: "sectionid20",
    facultyId: "sample22-1-01080",
    firstName: "FirstName20",
    lastName: "LastName20",
    middleName: "MiddleName20",
    suffix: null,
    bdate: "07-07-2011",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid21",
    userId: "userid21",
    sectionId: "sectionid21",
    facultyId: "sample22-1-01091",
    firstName: "FirstName21",
    lastName: "LastName21",
    middleName: "MiddleName21",
    suffix: null,
    bdate: "07-07-2002",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid22",
    userId: "userid22",
    sectionId: null,
    facultyId: "sample22-1-01092",
    firstName: "FirstName22",
    lastName: "LastName22",
    middleName: "MiddleName22",
    suffix: "Jr.",
    bdate: "07-07-2003",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid23",
    userId: "userid23",
    sectionId: "sectionid23",
    facultyId: "sample22-1-01093",
    firstName: "FirstName23",
    lastName: "LastName23",
    middleName: "MiddleName23",
    suffix: null,
    bdate: "07-07-2004",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid24",
    userId: "userid24",
    sectionId: "sectionid24",
    facultyId: "sample22-1-01094",
    firstName: "FirstName24",
    lastName: "LastName24",
    middleName: "MiddleName24",
    suffix: "Sr.",
    bdate: "07-07-2005",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid25",
    userId: "userid25",
    sectionId: null,
    facultyId: "sample22-1-01095",
    firstName: "FirstName25",
    lastName: "LastName25",
    middleName: "MiddleName25",
    suffix: null,
    bdate: "07-07-2006",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid26",
    userId: "userid26",
    sectionId: "sectionid26",
    facultyId: "sample22-1-01096",
    firstName: "FirstName26",
    lastName: "LastName26",
    middleName: "MiddleName26",
    suffix: null,
    bdate: "07-07-2007",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid27",
    userId: "userid27",
    sectionId: "sectionid27",
    facultyId: "sample22-1-01097",
    firstName: "FirstName27",
    lastName: "LastName27",
    middleName: "MiddleName27",
    suffix: "Jr.",
    bdate: "07-07-2008",
    profilePic: null,
    status: "pending",
  },
  {
    id: "adviserid28",
    userId: "userid28",
    sectionId: null,
    facultyId: "sample22-1-01098",
    firstName: "FirstName28",
    lastName: "LastName28",
    middleName: "MiddleName28",
    suffix: "Sr.",
    bdate: "07-07-2009",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid29",
    userId: "userid29",
    sectionId: "sectionid29",
    facultyId: "sample22-1-01099",
    firstName: "FirstName29",
    lastName: "LastName29",
    middleName: "MiddleName29",
    suffix: null,
    bdate: "07-07-2010",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid30",
    userId: "userid30",
    sectionId: "sectionid30",
    facultyId: "sample22-1-01100",
    firstName: "FirstName30",
    lastName: "LastName30",
    middleName: "MiddleName30",
    suffix: null,
    bdate: "07-07-2011",
    profilePic: null,
    status: "active",
  },

  {
    id: "adviserid31",
    userId: "userid31",
    sectionId: "sectionid31",
    facultyId: "sample22-1-01101",
    firstName: "FirstName31",
    lastName: "LastName31",
    middleName: "MiddleName31",
    suffix: null,
    bdate: "07-07-2002",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid32",
    userId: "userid32",
    sectionId: null,
    facultyId: "sample22-1-01102",
    firstName: "FirstName32",
    lastName: "LastName32",
    middleName: "MiddleName32",
    suffix: "Jr.",
    bdate: "07-07-2003",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid33",
    userId: "userid33",
    sectionId: "sectionid33",
    facultyId: "sample22-1-01103",
    firstName: "FirstName33",
    lastName: "LastName33",
    middleName: "MiddleName33",
    suffix: null,
    bdate: "07-07-2004",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid34",
    userId: "userid34",
    sectionId: "sectionid8",
    facultyId: "sample22-1-01104",
    firstName: "FirstName34",
    lastName: "LastName34",
    middleName: "MiddleName34",
    suffix: "Sr.",
    bdate: "07-07-2005",
    profilePic: null,
    status: "pending",
  },
  {
    id: "adviserid35",
    userId: "userid35",
    sectionId: null,
    facultyId: "sample22-1-01105",
    firstName: "FirstName35",
    lastName: "LastName35",
    middleName: "MiddleName35",
    suffix: null,
    bdate: "07-07-2006",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid36",
    userId: "userid36",
    sectionId: "sectionid36",
    facultyId: "sample22-1-01106",
    firstName: "FirstName36",
    lastName: "LastName36",
    middleName: "MiddleName36",
    suffix: null,
    bdate: "07-07-2007",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid37",
    userId: "userid37",
    sectionId: "sectionid37",
    facultyId: "sample22-1-01107",
    firstName: "FirstName37",
    lastName: "LastName37",
    middleName: "MiddleName37",
    suffix: "Jr.",
    bdate: "07-07-2008",
    profilePic: null,
    status: "pending",
  },
  {
    id: "adviserid38",
    userId: "userid38",
    sectionId: null,
    facultyId: "sample22-1-01108",
    firstName: "FirstName38",
    lastName: "LastName38",
    middleName: "MiddleName38",
    suffix: "Sr.",
    bdate: "07-07-2009",
    profilePic: null,
    status: "inActive",
  },
  {
    id: "adviserid39",
    userId: "userid39",
    sectionId: "sectionid39",
    facultyId: "sample22-1-01109",
    firstName: "FirstName39",
    lastName: "LastName39",
    middleName: "MiddleName39",
    suffix: null,
    bdate: "07-07-2010",
    profilePic: null,
    status: "active",
  },
  {
    id: "adviserid40",
    userId: "userid40",
    sectionId: "sectionid40",
    facultyId: "sample22-1-01110",
    firstName: "FirstName40",
    lastName: "LastName40",
    middleName: "MiddleName40",
    suffix: null,
    bdate: "07-07-2011",
    profilePic: null,
    status: "active",
  },
];
