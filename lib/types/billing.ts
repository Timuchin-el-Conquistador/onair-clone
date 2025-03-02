export interface Plan {
  name: string;
  priceId: string;
  priceTestId: string;
  active: boolean;
  status: string;
  price: string;
  features: string[];
  links: number;
  integrations: number;
  totalCallDuration: number;
  created: string;
  expiration: string;
  subscriptionPeriod: string;
  subscriptionId: string;
  daysLeftToExpiration:number
}
