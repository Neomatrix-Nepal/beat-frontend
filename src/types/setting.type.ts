import { DigitalAsset } from "./beats";

export interface Setting {
  id: number;
  customBeatsBasePrice: string;
  mixingProBasePrice: string;
  studioOneHourPrice: string;
  studioTwoHourPrice: string;
  tax: string;
  commission: string;
  beforeMixing: DigitalAsset | null;
  beforeMixingId: string | null;
  afterMixing: DigitalAsset | null;
  afterMixingId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface FormSetting {
  customBeatsBasePrice: string;
  mixingProBasePrice: string;
  studioOneHourPrice: string;
  studioTwoHourPrice: string;
  tax: string;
  commission: string;
  beforeMixingId: string | null;
  afterMixingId: string | null;
}
