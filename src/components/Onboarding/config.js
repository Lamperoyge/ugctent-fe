// Creator fields:

// firstName: string - required
// lastName: string - required
// bio: string
// city: string
// profilePicture: string
// interests: [string]
// socialLinks: [String]
// skillIds: [String]
// interestIds: [String] - required
// works: [{
//     client name : String
//     attachments: [] - max 3
//     description: String
// }]

//CONTRIBUTOR
// firstName: string - required
// lastName: string - required
// profilePicture: string - not required
// website: String - not required
// bio: String - not required
// city: String
// country: String
// companyName: String
// taxId: String
// socialLinks: [String]
// category: String

export const CREATOR_CONFIG = {
  firstName: {
    label: 'First name',
    type: 'text',
    name: 'firstName',
    placeholder: 'John',
  },
  lastName: {
    label: 'Last name',
    type: 'text',
    name: 'lastName',
    placeHolder: 'Smith',
  },
  bio: {
    label: 'Bio',
    type: 'textarea',
    name: 'bio',
    placeholder: 'I am an awesome creator...',
  },
  city: {
    type: 'text',
    label: 'Your city',
    name: 'city',
    placeholder: 'Bucharest',
  },
  country: {
    type: 'text',
    label: 'Your country',
    name: 'country',
    placeholder: 'Romania',
  },
  profilePicture: {
    type: 'attachment',
    label: 'Profile picture',
    name: 'profilePicture',
    placeholder: '',
  },
  socialLinks: {},
  skillIds: {},
  interestIds: {},
  works: {},
};

export const CONTRIBUTOR_CONFIG = {
  firstName: {}, //este
  lastName: {}, //este
  profilePicture: {}, //+ ESTE
  website: {}, //+ ESTE
  bio: {}, //+ESTE
  city: {}, //este
  country: {}, //este
  companyName: {}, //+ ESTE
  taxId: {}, //este
  socialLinks: {}, //este
  categoryId: {}, // ESTE
};
