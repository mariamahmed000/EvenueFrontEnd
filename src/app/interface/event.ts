export interface Ticket {
  type: string;
  reserved: number;
  price: number;
  totalTickets: number;
}
export interface Dates {
  date?: Date;
  times?: Array<Time>;
}
export interface Time {
  hour?: Number;
  minute?: Number;
}

export interface Event {
  _id: string;
  image?:any;
  title?: string;
  location?: string;
  dates?: Dates[];
  facilities?: string[];
  tickets?: Ticket[];
  instructions?: string[];
  reviews?: string[];  // Update this if 'Review' is another model/interface
  organizer?: string;
  Description?: string;
}
