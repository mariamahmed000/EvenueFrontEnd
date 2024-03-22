export interface Reservation {
  _id?: { $oid: string };
  userId?: { $oid: string };
  events?:[{
    eventId: { $oid: string,title:String },
    ticketInfo:[{
      quantity:Number,
      type:String
    }],
    totalPrice:Number,
    totalQuantity?:Number
    _id?:{ $oid: string };
  }]
  totalPrice:Number,
  isPurchased?:Boolean;
  totalQuantity?:Number
  timestamp?:Date;
}
