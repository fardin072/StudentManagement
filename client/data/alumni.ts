export interface Alumni {
  id: number;
  name: string;
  year: number;
  field: string;
  currentPosition: string;
  organization: string;
  imageUrl: string;
  bio: string;
  highlight: boolean;
}

export const alumniData: Alumni[] = [
  {
    id: 1,
    name: "Dr. Fariha Ahmed",
    year: 2015,
    field: "Medicine",
    currentPosition: "Consultant Cardiologist",
    organization: "National Heart Foundation",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "Currently leading the cardiology department and has published 12 peer-reviewed papers on cardiac health.",
    highlight: true,
  },
  {
    id: 2,
    name: "Md. Karim Hassan",
    year: 2016,
    field: "Engineering",
    currentPosition: "Software Engineer",
    organization: "Tech Solutions Ltd",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Specialized in AI and machine learning. Has developed multiple commercial applications.",
    highlight: true,
  },
  {
    id: 3,
    name: "Nasrin Islam",
    year: 2017,
    field: "Pharmacy",
    currentPosition: "Lead Pharmacist",
    organization: "Central Hospital Dhaka",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Managing pharmaceutical operations at the largest hospital in the country.",
    highlight: true,
  },
  {
    id: 4,
    name: "Jamal Rahman",
    year: 2014,
    field: "Medicine",
    currentPosition: "Associate Professor",
    organization: "Medical University of Bangladesh",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Teaching biochemistry and conducting research on genetic diseases.",
    highlight: false,
  },
  {
    id: 5,
    name: "Saira Begum",
    year: 2018,
    field: "Research",
    currentPosition: "Research Scientist",
    organization: "National Science Institute",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69be16?w=400&h=400&fit=crop",
    bio: "Published groundbreaking research in molecular biology and genetics.",
    highlight: false,
  },
  {
    id: 6,
    name: "Arif Hossain",
    year: 2019,
    field: "Dentistry",
    currentPosition: "Dental Surgeon",
    organization: "SmileCare Dental Clinics",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Running a successful dental clinic with focus on cosmetic dentistry.",
    highlight: false,
  },
  {
    id: 7,
    name: "Dr. Zakia Fatima",
    year: 2013,
    field: "Public Health",
    currentPosition: "Health Program Manager",
    organization: "WHO Bangladesh",
    imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Coordinating health initiatives affecting millions across South Asia.",
    highlight: false,
  },
  {
    id: 8,
    name: "Rashed Ali Khan",
    year: 2017,
    field: "Engineering",
    currentPosition: "Project Manager",
    organization: "Infrastructure Development Co.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Leading major infrastructure projects in the renewable energy sector.",
    highlight: false,
  },
];
