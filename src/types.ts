export interface Snippet {
  requirement?: string;       
  responsibility?: string;    
}

export interface KeySkill {
  name: string;
}

export interface Salary {
  from?: number;
  to?: number;
  currency?: string;          
}

export interface Employer {
  name: string;
}

export interface Area {
  name: string;
}

export interface Vacancy {
  id: string;
  name: string;               
  employer: Employer;
  area: Area;
  key_skills?: KeySkill[];    
  experience?: { name: string }; 
  schedule?: { name: string };   
  salary?: Salary;               
  alternate_url?: string;        
  snippet?: Snippet;             
}

export interface HHResponse {
  items: Vacancy[];
  found: number;                
  pages: number;                
  page: number;                 
}
