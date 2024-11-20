
export const verifyLogin = (userName, pass) =>{
    const index  = users.findIndex((usr)=>usr.username === userName && usr.password === pass && usr.canAccess);
    if(index !== -1){
        return true;
    }
    return false;
};

export const usernameAvailable = (userName) =>{
    const index  = users.findIndex((usr)=>usr.username === userName);
    if(index !== -1){
        return false;
    }
    return true;
};

export const existingEmail = (email) =>{
    const index  = users.findIndex((usr)=>usr.emailAdd === email);
    if(index !== -1){
        return true;
    }
    return false;
};

export const blockUserAccess = (id) =>{
    const index  = user.findIndex((usr)=>usr.userId === id);
    if(index !== -1){
        users[index].canAccess = false;
        return true;
    }
    return true;
};

export const createUser = (newUser) => {
  const userExists = users.some(user => user.emailAdd === newUser.emailAdd || user.username === newUser.username);
  
  if (userExists) {
    console.error('User already exists with the same email or username.');
    return;
  }

  // Push the new user object into the users array
  users.push(newUser);
  console.log('User added successfully:', newUser);
  console.log(users);
};

export const getUserCount = () => {
return (users).length;
};



export const users = [
    {
      userId: 'userid1',
      emailAdd: 'sample22-1-01056@vsu.edu.ph',
      username: 'Jedo',
      password: 'Jajaja',
      canAccess: true,
  },
  {
      userId: 'userid2',
      emailAdd: 'sample22-1-01098@vsu.edu.ph',
      username: 'Pawwy',
      password: 'Rawwy',
      canAccess: false, // canAccess is inActive because sectionId is null
  },
  {
      userId: 'userid3',
      emailAdd: 'sample22-1-01034@vsu.edu.ph',
      username: 'Ysmile',
      password: 'jeejeje',
      canAccess: true,
  },
  {
      userId: 'userid4',
      emailAdd: 'sample22-1-01009@vsu.edu.ph',
      username: 'Von',
      password: 'Neuman',
      canAccess: true,
  },
  {
      userId: 'userid5',
      emailAdd: 'sample22-1-01012@vsu.edu.ph',
      username: 'michael',
      password: 'Jakston',
      canAccess: true,
  },
  {
      userId: 'userid6',
      emailAdd: 'sample22-1-01044@vsu.edu.ph',
      username: 'bars',
      password: 'Rers',
      canAccess: false, 
  },
  {
      userId: 'userid7',
      emailAdd: 'sample22-1-01068@vsu.edu.ph',
      username: 'rods',
      password: 'manns',
      canAccess: true,
  },
  {
      userId: 'userid8',
      emailAdd: 'sample22-1-01034@vsu.edu.ph',
      username: 'euj',
      password: 'Wang',
      canAccess: true,
  },
  {
      userId: 'userid9',
      emailAdd: 'sample22-1-01029@vsu.edu.ph',
      username: 'FirstName9',
      password: 'LastName9',
      canAccess: true,
  },
  {
      userId: 'userid10',
      emailAdd: 'sample22-1-01045@vsu.edu.ph',
      username: 'FirstName10',
      password: 'LastName10',
      canAccess: false,
  },
  {
      userId: 'userid11',
      emailAdd: 'sample22-1-01087@vsu.edu.ph',
      username: 'FirstName11',
      password: 'LastName11',
      canAccess: true,
  },
  {
      userId: 'userid12',
      emailAdd: 'sample22-1-01010@vsu.edu.ph',
      username: 'FirstName12',
      password: 'LastName12',
      canAccess: true,
  },
  {
      userId: 'userid13',
      emailAdd: 'sample22-1-01089@vsu.edu.ph',
      username: 'FirstName13',
      password: 'LastName13',
      canAccess: false,
  },
  {
      userId: 'userid14',
      emailAdd: 'sample22-1-01025@vsu.edu.ph',
      username: 'FirstName14',
      password: 'LastName14',
      canAccess: true,
  },
  {
      userId: 'userid15',
      emailAdd: 'sample22-1-01099@vsu.edu.ph',
      username: 'FirstName15',
      password: 'LastName15',
      canAccess: false,
  },
  {
      userId: 'userid16',
      emailAdd: 'sample22-1-01020@vsu.edu.ph',
      username: 'FirstName16',
      password: 'LastName16',
      canAccess: true,
  },
  {
      userId: 'userid17',
      emailAdd: 'sample22-1-01011@vsu.edu.ph',
      username: 'FirstName17',
      password: 'LastName17',
      canAccess: true,
  },
  {
      userId: 'userid18',
      emailAdd: 'sample22-1-01038@vsu.edu.ph',
      username: 'FirstName18',
      password: 'LastName18',
      canAccess: true,
  },
  {
      userId: 'userid19',
      emailAdd: 'sample22-1-01052@vsu.edu.ph',
      username: 'FirstName19',
      password: 'LastName19',
      canAccess: false,
  },
  {
      userId: 'userid20',
      emailAdd: 'sample22-1-01080@vsu.edu.ph',
      username: 'FirstName20',
      password: 'LastName20',
      canAccess: true,
  },
  {
    userId: 'userid21',
    emailAdd: 'sample22-1-01091@vsu.edu.ph',
    username: 'FirstName21',
    password: 'LastName21',
    canAccess: true,
  },
  {
    userId: 'userid22',
    emailAdd: 'sample22-1-01092@vsu.edu.ph',
    username: 'FirstName22',
    password: 'LastName22',
    canAccess: false,
  },
  {
    userId: 'userid23',
    emailAdd: 'sample22-1-01093@vsu.edu.ph',
    username: 'FirstName23',
    password: 'LastName23',
    canAccess: true,
  },
  {
    userId: 'userid24',
    emailAdd: 'sample22-1-01094@vsu.edu.ph',
    username: 'FirstName24',
    password: 'LastName24',
    canAccess: true,
  },
  {
    userId: 'userid25',
    emailAdd: 'sample22-1-01095@vsu.edu.ph',
    username: 'FirstName25',
    password: 'LastName25',
    canAccess: false,
  },
  {
    userId: 'userid26',
    emailAdd: 'sample22-1-01096@vsu.edu.ph',
    username: 'FirstName26',
    password: 'LastName26',
    canAccess: true,
  },
  {
    userId: 'userid27',
    emailAdd: 'sample22-1-01097@vsu.edu.ph',
    username: 'FirstName27',
    password: 'LastName27',
    canAccess: true,
  },
  {
    userId: 'userid28',
    emailAdd: 'sample22-1-01098@vsu.edu.ph',
    username: 'FirstName28',
    password: 'LastName28',
    canAccess: false,
  },
  {
    userId: 'userid29',
    emailAdd: 'sample22-1-01099@vsu.edu.ph',
    username: 'FirstName29',
    password: 'LastName29',
    canAccess: true,
  },
  {
    userId: 'userid30',
    emailAdd: 'sample22-1-01100@vsu.edu.ph',
    username: 'FirstName30',
    password: 'LastName30',
    canAccess: true,
  },
  
  {
    userId: 'userid31',
    emailAdd: 'sample22-1-01101@vsu.edu.ph',
    username: 'FirstName31',
    password: 'LastName31',
    canAccess: true,
  },
  {
    userId: 'userid32',
    emailAdd: 'sample22-1-01102@vsu.edu.ph',
    username: 'FirstName32',
    password: 'LastName32',
    canAccess: false,
  },
  {
    userId: 'userid33',
    emailAdd: 'sample22-1-01103@vsu.edu.ph',
    username: 'FirstName33',
    password: 'LastName33',
    canAccess: true,
  },
  {
    userId: 'userid34',
    emailAdd: 'sample22-1-01104@vsu.edu.ph',
    username: 'FirstName34',
    password: 'LastName34',
    canAccess: true,
  },
  {
    userId: 'userid35',
    emailAdd: 'sample22-1-01105@vsu.edu.ph',
    username: 'FirstName35',
    password: 'LastName35',
    canAccess: false,
  },
  {
    userId: 'userid36',
    emailAdd: 'sample22-1-01106@vsu.edu.ph',
    username: 'FirstName36',
    password: 'LastName36',
    canAccess: true,
  },
  {
    userId: 'userid37',
    emailAdd: 'sample22-1-01107@vsu.edu.ph',
    username: 'FirstName37',
    password: 'LastName37',
    canAccess: true,
  },
  {
    userId: 'userid38',
    emailAdd: 'sample22-1-01108@vsu.edu.ph',
    username: 'FirstName38',
    password: 'LastName38',
    canAccess: true,
  },
  {
    userId: 'userid39',
    emailAdd: 'sample22-1-01109@vsu.edu.ph',
    username: 'FirstName39',
    password: 'LastName39',
    canAccess: true,
  },
  {
    userId: 'userid40',
    emailAdd: 'sample22-1-01110@vsu.edu.ph',
    username: 'FirstName40',
    password: 'LastName40',
    canAccess: true,
  },
  ];
  
  