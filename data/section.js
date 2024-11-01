
// CRUD Functions
export const getSectionsByLevel = (grade, sy) => {
    return section.filter((sec) => sec.sectionLevel === grade && sec.sectionSchoolYear === sy);
};


export const addSection = (sec) => {
  section.push(sec);
};

export const resetSection = (SY) => {
    section.push({
        adviserId: null,
        sectionPopulation: '0',
        sectionName: 'Javascript',
        sectionLevel: '7',
        sectionSchoolYear: SY,
    });
}

export const updateSectionAdviser= (secID, facID) => {
  const index = section.findIndex((sec) => sec.id === secID);
  if (index !== -1) {
    section[index].adviserId = facID;
    return true;
  }
  return false;
};

export const updateSectionName= (secID, name) => {
    const index = section.findIndex((sec) => sec.id === secID);
    if (index !== -1) {
      section[index].sectionName = name;
      return true;
    }
    return false;
  };

  export const updateSectionPop= (secID, pop) => {
    const index = section.findIndex((sec) => sec.id === secID);
    if (index !== -1) {
      section[index].sectionPopulation = pop;
      return true;
    }
    return false;
  };

export const deleteSection = (id) => {
  const index = section.findIndex((sec) => sec.id === id);
  if (index !== -1) {
    section.splice(index, 1);
  }
};

export const section = [

     // Sections for level 7
{
    id: 'sectionid1',
    adviserId: 'adviserid1',
    sectionPopulation: '20',
    sectionName: 'Javascript',
    sectionLevel: '7',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [
        '22-1-10075',
        '22-1-10076',
        '22-1-10077',
        '22-1-10078',
        '22-1-10079',
        '22-1-10080',
        '22-1-10081',
        '22-1-10082',
        '22-1-10083',
        '22-1-10084',
        '22-1-10085',
        '22-1-10086'
    ]
},
{
    id: 'sectionid2',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'C#',
    sectionLevel: '7',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid3',
    adviserId: 'adviserid3',
    sectionPopulation: 0,
    sectionName: 'C++',
    sectionLevel: '7',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid4',
    adviserId: 'adviserid4',
    sectionPopulation: 0,
    sectionName: 'C',
    sectionLevel: '7',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid5',
    adviserId: 'adviserid5',
    sectionPopulation: 0,
    sectionName: 'Java',
    sectionLevel: '7',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},

// Sections for level 8
{
    id: 'sectionid6',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Python Basics',
    sectionLevel: '8',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid7',
    adviserId: 'adviserid7',
    sectionPopulation: 0,
    sectionName: 'Web Development',
    sectionLevel: '8',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid8',
    adviserId: 'adviserid8',
    sectionPopulation: 0,
    sectionName: 'Data Structures',
    sectionLevel: '8',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid9',
    adviserId: 'adviserid9',
    sectionPopulation: 0,
    sectionName: 'Game Development',
    sectionLevel: '8',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid10',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Mobile Apps',
    sectionLevel: '8',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},

// Sections for level 9
{
    id: 'sectionid11',
    adviserId: 'adviserid11',
    sectionPopulation: 0,
    sectionName: 'Artificial Intelligence',
    sectionLevel: '9',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid12',
    adviserId: 'adviserid12',
    sectionPopulation: 10,
    sectionName: 'Machine Learning',
    sectionLevel: '9',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [
        '22-1-10087',
        '22-1-10088',
        '22-1-10089',
        '22-1-10090',
        '22-1-10091',
        '22-1-10092' 
    ],
},
{
    id: 'sectionid13',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Cybersecurity',
    sectionLevel: '9',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid14',
    adviserId: 'adviserid14',
    sectionPopulation: 0,
    sectionName: 'Cloud Computing',
    sectionLevel: '9',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [
        '22-1-10093',
        '22-1-10094',
        '22-1-10095',
        '22-1-10096'
    ],
},
{
    id: 'sectionid15',
    adviserId: 'adviserid15',
    sectionPopulation: 0,
    sectionName: 'Data Analysis',
    sectionLevel: '9',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},

// Sections for level 10
{
    id: 'sectionid16',
    adviserId: 'adviserid16',
    sectionPopulation: 11,
    sectionName: 'DevOps',
    sectionLevel: '10',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [
        '22-1-10097',
        '22-1-10098',
        '22-1-10099',
        '22-1-10100',
        '22-1-10101',
        '22-1-10102',
        '22-1-10103',
        '22-1-10104',
        '22-1-10105',
        '22-1-10106',
        '22-1-10107'
    ],
},
{
    id: 'sectionid17',
    adviserId: 'adviserid17',
    sectionPopulation: 0,
    sectionName: 'Blockchain',
    sectionLevel: '10',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid18',
    adviserId: 'adviserid18',
    sectionPopulation: 0,
    sectionName: 'IoT',
    sectionLevel: '10',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid19',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Virtual Reality',
    sectionLevel: '10',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid20',
    adviserId: 'adviserid20',
    sectionPopulation: 0,
    sectionName: 'Augmented Reality',
    sectionLevel: '10',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},

{
    id: 'sectionid21',
    adviserId: 'adviserid21',
    sectionPopulation: 0,
    sectionName: 'Blue',
    sectionLevel: '11',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid22',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Red',
    sectionLevel: '11',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid23',
    adviserId: 'adviserid23',
    sectionPopulation: 0,
    sectionName: 'Yellow',
    sectionLevel: '11',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid24',
    adviserId: 'adviserid24',
    sectionPopulation: 0,
    sectionName: 'Green',
    sectionLevel: '11',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid25',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Pink',
    sectionLevel: '11',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},

// Sections for level 12
{
    id: 'sectionid26',
    adviserId: 'adviserid26',
    sectionPopulation: 6,
    sectionName: 'Advanced Web Development',
    sectionLevel: '12',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [
        '22-1-10108',
        '22-1-10109',
        '22-1-10110',
        '22-1-10111',
        '22-1-10112',
        '22-1-10113'
    ],
},
{
    id: 'sectionid27',
    adviserId: 'adviserid27',
    sectionPopulation: 0,
    sectionName: 'Mobile Game Development',
    sectionLevel: '12',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid28',
    adviserId: null,
    sectionPopulation: 0,
    sectionName: 'Software Engineering',
    sectionLevel: '12',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid29',
    adviserId: 'adviserid29',
    sectionPopulation: 0,
    sectionName: 'Big Data',
    sectionLevel: '12',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},
{
    id: 'sectionid30',
    adviserId: 'adviserid30',
    sectionPopulation: 0,
    sectionName: 'IT Project Management',
    sectionLevel: '12',
    sectionSchoolYear: '2024-2025',
    sectionStudents: [],
},

];

