export interface MyEvent {
  _id:  string ;
  image?:any;
  title?: string;
  location?: string;
  facilities?: string[];
  organizer?: string;
  Description?: string;
  tickets?: {
    type?: string;
    reserved?: number;
    price?: number;
    totalTickets?: number;
    _id?: { $oid?: string };
  }[];
  dates?: {
    date?: string;
    times?: { hour?: number; minute?: number }[];
  }[];
  instructions?: any[];
  reviews?: any[];
}
