export interface DigitalAgreement {
  id?: number;
  price: string;
  currency: string;
  licenseName: string;
  deliverable: string;
  noticeOfOutstandingClients: boolean;
  writersShare: string;
  publishersShare: string;
  masterRoyalties: string;
  beatTitle: string;
  producerLegalName: string;
  producerStageName: string;
  producerAddress: string;
  producerCountry: string;
  artistLegalName: string;
  artistStageName: string;
  artistAddress: string;
  artistCountry: string;
}
