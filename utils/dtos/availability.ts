export interface Availability {
    start: string;
    end: string;
  }
  
  export interface Schedule {
    monday: { availability: Availability; isActive: boolean };
    tuesday: { availability: Availability; isActive: boolean };
    wednesday: { availability: Availability; isActive: boolean };
    thursday: { availability: Availability; isActive: boolean };
    friday: { availability: Availability; isActive: boolean };
    saturday: { availability: Availability; isActive: boolean };
    sunday: { availability: Availability; isActive: boolean };
  }