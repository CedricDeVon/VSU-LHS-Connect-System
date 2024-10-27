const adviser = [
    {
        id: 'adviserid1',
        userId: 'userid1',
        sectionId:'sectionid2',
        facultyId: '22-1-01056',
        firstName:'Jedo',
        lastName:'Jajaja',
        middleName:'Shesh',
        suffix:'',
        bdate: '07-07-2005',
        profilePic:'',
        status:'active',
    },
    {
        id: 'adviserid2',
        userId: 'userid2',
        sectionId:'',
        facultyId: '22-1-01098',
        firstName:'Pawwy',
        lastName:'Rawwy',
        middleName:'Wee',
        suffix:'',
        bdate: '07-07-2006',
        profilePic:'',
        status:'inActive',
    },
    {
        id: 'adviserid3',
        userId: 'userid3',
        sectionId:'sectionid4',
        facultyId: '22-1-01034',
        firstName:'Ysmile',
        lastName:'jeejeje',
        middleName:'Jon',
        suffix:'Sr.',
        bdate: '07-07-2007',
        profilePic:'',
        status:'active',
    },
    {
        id: 'adviserid4',
        userId: 'userid4',
        sectionId:'sectionid5',
        facultyId: '22-1-01009',
        firstName:'Von',
        lastName:'Neuman',
        middleName:'Arch',
        suffix:'Jr.',
        bdate: '07-07-2008',
        profilePic:'',
        status:'active',
    },
    {
        id: 'adviserid5',
        userId: 'userid5',
        sectionId:'sectionid6',
        facultyId: '22-1-01012',
        firstName:'michael',
        lastName:'Jakston',
        middleName:'Pdiddy',
        suffix:'III',
        bdate: '07-07-2009',
        profilePic:'',
        status:'active',
    },
    {
        id: 'adviserid6',
        userId: 'userid6',
        sectionId:'',
        facultyId: '22-1-01044',
        firstName:'bars',
        lastName:'Rers',
        middleName:'Dsa',
        suffix:'II',
        bdate: '07-07-2010',
        profilePic:'',
        status:'inActive',
    },
    {
        id: 'adviserid7',
        userId: 'userid7',
        sectionId:'sectionid7',
        facultyId: '22-1-01068',
        firstName:'rods',
        lastName:'manns',
        middleName:'Db',
        suffix:'',
        bdate: '07-07-2011',
        profilePic:'',
        status:'active',
    },
    {
        id: 'adviserid8',
        userId: 'userid8',
        sectionId:'sectionid9',
        facultyId: '22-1-01034',
        firstName:'euj',
        lastName:'Wang',
        middleName:'Cal',
        suffix:'',
        bdate: '07-07-2019',
        profilePic:'',
        status:'active',
    },

];

// CRUD Functions
export const getAdvisers = () => adviser;

export const addadviser = (adv) => {
  adviser.push(adv);
};

export const updateAdviserThruFacID = (id, newData) => {
  const index = adviser.findIndex((adv) => adv.facultyId === id);
  if (index !== -1) {
    adviser[index] = { ...adviser[index], ...newData };
  }
};

export const deleteAdviserThruFacID = (id) => {
  const index = adviser.findIndex((adv) => adv.facultyId === id);
  if (index !== -1) {
    adviser.splice(index, 1);
  }
};