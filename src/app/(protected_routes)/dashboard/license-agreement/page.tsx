"use client";
import { useState, useEffect } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  PDFDownloadLink,
  View,
} from "@react-pdf/renderer";

interface AgreementData {
  licenseType: "Standard" | "Premium" | "Exclusive";
  effectiveDate: string;
  licensorName: string;
  licensorArtist: string;
  licensorLocation: string;
  licenseeName: string;
  licenseeArtist: string;
  licenseeLocation: string;
  beatTitle: string;
  price: string;
  deliveryFormat: string;
  streamLimit: string;
  producerTag: string;
  deliveryEmail: string;
  stemsRequired: boolean;
  tagRemoval: boolean;
  signatureName: string;
  signatureInitials: string;
  dateSigned: string;
  paymentDate: string;
}

const defaultValues: AgreementData = {
  licenseType: "Standard",
  effectiveDate: new Date().toISOString().split("T")[0],
  licensorName: "LIL Rock Look",
  licensorArtist: "LIL Rock Look",
  licensorLocation: "Sydney, Australia",
  licenseeName: "",
  licenseeArtist: "",
  licenseeLocation: "",
  beatTitle: "",
  price: "35",
  deliveryFormat: "WAV only",
  streamLimit: "50,000 streams",
  producerTag: "Included (cannot be removed)",
  deliveryEmail: "",
  stemsRequired: false,
  tagRemoval: false,
  signatureName: "",
  signatureInitials: "",
  dateSigned: new Date().toISOString().split("T")[0],
  paymentDate: new Date().toISOString().split("T")[0],
};

const beatTitles = [
  "Dark Trap Beat",
  "Melodic Hip Hop Instrumental",
  "Hard Drill Type Beat",
  "Chill Lo-Fi Beat",
  "Aggressive Trap Banger",
  "R&B Soul Beat",
  "Custom Beat Title",
];

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 10.5,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: "#000000",
  },
  mainHeading: {
    fontSize: 13,
    fontFamily: "Helvetica-Bold",
    textAlign: "center",
    marginBottom: 14,
    textDecoration: "underline",
  },
  introText: {
    marginBottom: 8,
    fontSize: 10.5,
  },
  partyLine: {
    marginBottom: 4,
    fontSize: 10.5,
  },
  sectionNumber: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    marginTop: 14,
    marginBottom: 6,
  },
  bodyText: {
    fontSize: 10.5,
    marginBottom: 6,
  },
  listItem: {
    marginLeft: 16,
    marginBottom: 5,
    fontSize: 10.5,
  },
  bold: {
    fontFamily: "Helvetica-Bold",
  },
  signatureLine: {
    marginBottom: 6,
    fontSize: 10.5,
  },
  signatureBlock: {
    marginTop: 24,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    marginVertical: 10,
  },
  footer: {
    position: "absolute",
    fontSize: 8,
    bottom: 28,
    right: 50,
    fontStyle: "italic",
    color: "#555",
  },
  underline: {
    textDecoration: "underline",
  },
});

const StandardLicensePDF = ({ data }: { data: AgreementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.mainHeading}>STANDARD PACKAGE LICENSE AGREEMENT</Text>

      <Text style={styles.introText}>
        <Text style={styles.bold}>Effective Date: </Text>{data.effectiveDate}
      </Text>

      <Text style={styles.introText}>
        This Non - Exclusive License Agreement ("Agreement") is entered into by and between:
      </Text>

      <View style={styles.partyLine}>
        <Text style={styles.bold}>Licensor: </Text>
        <Text>{data.licensorName}, professionally known as {data.licensorArtist}, residing in {data.licensorLocation}.</Text>
      </View>
      <View style={[styles.partyLine, { marginBottom: 8 }]}>
        <Text style={styles.bold}>Licensee: </Text>
        <Text>{data.licenseeName}, professionally known as {data.licenseeArtist}, residing in {data.licenseeLocation}.</Text>
      </View>

      <Text style={[styles.bodyText, { marginBottom: 10 }]}>
        Licensor warrants that they control the copyright and all rights in and to the musical composition entitled "<Text style={styles.underline}>{data.beatTitle}</Text>" (the "Composition") as of and prior to the Effective Date.
      </Text>

      <Text style={styles.sectionNumber}>1. Definitions</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Composition</Text> – The underlying musical work, including melody, harmony, arrangement, and structure.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Master Recording</Text> – The sound recording made by Licensee using the Composition in part or whole.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Non - Exclusive License</Text> – For the Term, Licensor cannot license the Composition to any other party beyond the terms stated herein.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Net Profit</Text> – Gross revenue actually received from exploitation of the Master Recording, less only documented third-party production, distribution, and promotion expenses.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Territory</Text> – Worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term</Text> – Perpetual unless terminated under Clause 9.
      </Text>

      <Text style={styles.sectionNumber}>2. Grant of Rights</Text>
      <Text style={styles.bodyText}>Licensor grants Licensee the following rights:</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> a) Master Use</Text> – Record vocals over the Composition and produce Master Recordings.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> b) Distribution</Text> – Sell and distribute the Master Recording up to {data.streamLimit} total streams across all platforms. Upon exceeding {data.streamLimit} streams, Licensee must immediately cease exploitation or upgrade the license. Continued use without upgrade constitutes copyright infringement.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> c) Streaming Rights</Text> – Non-exclusive right to make the Master Recording available for up to {data.streamLimit} streams worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> d) Synchronization</Text> – Use in one music video for streaming on platforms like YouTube.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> e) Performance Rights</Text> – Perform the Master Recording live without restriction.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> f) Broadcast Rights</Text> – Play the Master Recording on unlimited radio stations.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> g) No commercial Rights</Text> - for Sync, film, TV, ads
      </Text>

      <Text style={styles.sectionNumber}>3. Consideration</Text>
      <Text style={styles.bodyText}>
        Licensee shall pay USD ${data.price} to Licensor upon signing. Payment is due in full. Late payments accrue 10% interest p.a. No rights are granted until full payment is received.
      </Text>

      <Text style={styles.sectionNumber}>3A. No Refund Policy</Text>
      <Text style={styles.bodyText}>
        All payments are non-refundable. Once files are delivered, the Licensee cannot request refunds or chargebacks.
      </Text>

      <Text style={styles.sectionNumber}>4. Delivery</Text>
      <Text style={styles.bodyText}>
        Licensor shall deliver the Composition as a high-quality {data.deliveryFormat} file, with producer tag {data.producerTag}, within 3 business days to {data.deliveryEmail}.
      </Text>

      <Text style={styles.sectionNumber}>5. Royalties & Publishing</Text>
      <Text style={styles.bodyText}>
        3% of Net Profit from exploitation of the Master Recording, payable quarterly.{"\n"}
        Net Profit shall not include indirect costs, overhead, or unrelated expenses. Only direct, verifiable costs may be deducted.{"\n"}
        Licensee agrees to register the Composition with a Performing Rights Organization (PRO), listing Licensor as 50% writer and 50% publisher. (standard practice)
      </Text>

      <Text style={styles.sectionNumber}>6. Warranties and Indemnities</Text>
      <Text style={[styles.bodyText, { marginBottom: 3 }]}>
        <Text style={styles.bold}>Licensor warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>• They are the sole owner of the Composition and have full authority to grant this License.</Text>
      <Text style={[styles.listItem, { marginBottom: 8 }]}>• The Composition does not infringe upon any third-party rights.</Text>
      <Text style={[styles.bodyText, { marginBottom: 3 }]}>
        <Text style={styles.bold}>Licensee warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>• They will not use the Composition or Master Recording in any defamatory, unlawful, or infringing manner.</Text>
      <Text style={[styles.listItem, { marginBottom: 8 }]}>• They will clear any third-party samples prior to exploitation.</Text>
      <Text style={styles.bodyText}>
        Both parties agree to indemnify and hold each other harmless against any claims, damages, or costs arising from a breach of these warranties.
      </Text>

      <Text style={styles.sectionNumber}>7. Restrictions</Text>
      <Text style={styles.bodyText}>
        This License is non-transferable without the Licensor's prior written consent. Licensees may not sublicense, assign, or otherwise transfer rights without consent.
      </Text>

      <Text style={styles.sectionNumber}>8. Outstanding Clients</Text>
      <Text style={styles.bodyText}>
        Licensee acknowledges that prior to this Agreement, the Composition may have been licensed to third parties on a non-exclusive basis. Such prior licenses remain valid until expiration. From the Effective Date, Licensor reserves the right to license the Composition to other parties without restriction.
      </Text>

      <Text style={styles.sectionNumber}>9. Term and Termination</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term: </Text>This Agreement shall remain in force in perpetuity, unless terminated in accordance with this Clause.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Termination for Breach: </Text>Either party may terminate upon 30 days' written notice if the other party breaches any material term and fails to cure within such period.
      </Text>
      <Text style={styles.listItem}>
        Upon termination, all rights granted revert to Licensor, and further exploitation of the Master Recording by Licensee shall cease.
      </Text>

      <Text style={styles.sectionNumber}>10. Governing Law & Dispute Resolution</Text>
      <Text style={styles.bodyText}>
        This Agreement shall be governed by the laws of NSW, Australia. Any disputes shall first be resolved by good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to Resolution Pathways NSW. If still unresolved will be filed at Federal Court of Australia.
      </Text>

      <Text style={styles.sectionNumber}>11. Force Majeure</Text>
      <Text style={styles.bodyText}>
        Neither party shall be liable for delays or failures caused by events beyond their reasonable control, including natural disasters, governmental actions, internet outages, or acts of war.
      </Text>

      <Text style={styles.sectionNumber}>12. Miscellaneous</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Entire Agreement: </Text>This is the complete agreement between the parties and supersedes all prior discussions.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Amendments: </Text>Must be in writing and signed by both parties.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Severability: </Text>If any provision is held invalid, the remainder shall remain in effect.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Auditing: </Text>Licensor shall have the right to audit Licensee's records upon reasonable notice to verify royalty payments.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Content ID / YT Monetization: </Text>Licensor retains the right to monetize the Composition via Content ID systems, unless otherwise agreed in writing.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Buy Out Clause: </Text>Licensee may upgrade this license to a higher-tier agreement upon mutual consent, subject to additional fees.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>File Usage: </Text>Licensee may not resell, lease, or distribute the Composition in its original form without vocals.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Moral Rights: </Text>Licensee shall not use the Composition in a manner that harms Licensor's reputation.
      </Text>

      <Text style={styles.sectionNumber}>13. Major Label Clause: (If signed or used commercially)</Text>
      <Text style={styles.listItem}>• License must be upgraded</Text>
      <Text style={styles.listItem}>• Parties renegotiate for a Major Label Producer Fee</Text>
      <Text style={styles.listItem}>• 3% Royalty of Gross Revenue with Proper publishing credit</Text>
      <Text style={styles.listItem}>• Failure to renegotiate in good faith shall constitute a material breach</Text>

      <Text style={styles.sectionNumber}>14. Credit</Text>
      <Text style={styles.bodyText}>
        Licensee agrees to credit Licensor as: "Produced by LIL Rock Look" in all reasonable metadata, streaming platforms, and public releases where producer credits are customary. Any removal or alteration of the producer tag without written consent constitutes a material breach of this Agreement.
      </Text>

      <Text style={[styles.bodyText, { marginTop: 14 }]}>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.
      </Text>

      <View style={styles.signatureBlock}>
        <Text style={[styles.bold, { marginBottom: 6 }]}>Licensor:</Text>
        <Text style={styles.signatureLine}> Name: <Text style={styles.underline}>{data.signatureName || "_______________________"}</Text>  [{data.licensorName}]</Text>
        <Text style={[styles.signatureLine, { marginBottom: 16 }]}> Signature: <Text style={styles.underline}>{data.signatureInitials || "_______First & Last Initials____"}</Text>  Date: <Text style={styles.underline}>{data.dateSigned}</Text></Text>

        <Text style={[styles.bold, { marginBottom: 6 }]}>Licensee:</Text>
        <Text style={styles.signatureLine}> Name: <Text style={styles.underline}>{data.licenseeName || "_______________________"}</Text>  [{data.licenseeArtist}]</Text>
        <Text style={styles.signatureLine}> Signature: <Text style={styles.underline}>{data.signatureInitials || "_____First & Last Initials____"}</Text>  Date: <Text style={styles.underline}>{data.dateSigned}</Text></Text>
      </View>

      <Text style={styles.footer}>LIL Rock Look – Standard Package License Agreement</Text>
    </Page>
  </Document>
);

const PremiumLicensePDF = ({ data }: { data: AgreementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.mainHeading}>PREMIUM PACKAGE LICENSE AGREEMENT</Text>

      <Text style={styles.introText}>
        <Text style={styles.bold}>Effective Date: </Text>{data.effectiveDate}
      </Text>

      <Text style={styles.introText}>
        This Non - Exclusive License Agreement ("Agreement") is entered into by and between:
      </Text>

      <View style={styles.partyLine}>
        <Text style={styles.bold}>Licensor: </Text>
        <Text>{data.licensorName}, professionally known as {data.licensorArtist}, residing in {data.licensorLocation}.</Text>
      </View>
      <View style={[styles.partyLine, { marginBottom: 8 }]}>
        <Text style={styles.bold}>Licensee: </Text>
        <Text>{data.licenseeName}, professionally known as {data.licenseeArtist}, residing in {data.licenseeLocation}.</Text>
      </View>

      <Text style={[styles.bodyText, { marginBottom: 10 }]}>
        Licensor warrants that they control the copyright and all rights in and to the musical composition entitled "<Text style={styles.underline}>{data.beatTitle}</Text>" (the "Composition") as of and prior to the Effective Date.
      </Text>

      <Text style={styles.sectionNumber}>1. Definitions</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Composition</Text> – The underlying musical work, including melody, harmony, arrangement, and structure.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Master Recording</Text> – The sound recording made by Licensee using the Composition in part or whole.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Non - Exclusive License</Text> – For the Term, Licensor cannot license the Composition to any other party beyond the terms stated herein.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Net Profit</Text> – Gross revenue actually received from exploitation of the Master Recording, less only documented third-party production, distribution, and promotion expenses.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Territory</Text> – Worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term</Text> – Perpetual unless terminated under Clause 9.
      </Text>

      <Text style={styles.sectionNumber}>2. Grant of Rights</Text>
      <Text style={styles.bodyText}>Licensor grants Licensee the following rights:</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> a) Master Use</Text> – Record vocals over the Composition and produce Master Recordings.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> b) Distribution</Text> – Sell and distribute the Master Recording for Unlimited streams across all platforms.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> c) Streaming Rights</Text> – Non-exclusive right to make the Master Recording available for Unlimited streams worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> d) Synchronization</Text> – Use in one music video for streaming on platforms like YouTube.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> e) Performance Rights</Text> – Perform the Master Recording live without restriction.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> f) Broadcast Rights</Text> – Play the Master Recording on unlimited radio stations.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}> g) No commercial Rights</Text> - for Sync, film, TV, ads
      </Text>

      <Text style={styles.sectionNumber}>3. Consideration</Text>
      <Text style={styles.bodyText}>
        Licensee shall pay USD ${data.price} to Licensor upon signing. Payment is due in full. Late payments accrue 10% interest p.a. No rights are granted until full payment is received.
      </Text>

      <Text style={styles.sectionNumber}>3A. No Refund Policy</Text>
      <Text style={styles.bodyText}>
        All payments are non-refundable. Once files are delivered, the Licensee cannot request refunds or chargebacks.
      </Text>

      <Text style={styles.sectionNumber}>4. Delivery</Text>
      <Text style={styles.bodyText}>
        Licensor shall deliver the Composition as high-quality {data.deliveryFormat} files, with producer tag {data.producerTag}, within 3 business days to {data.deliveryEmail}. Stems can be requested by the Licensee for no additional charge. {data.tagRemoval ? "Producer Tag can be removed for an agreed additional fee." : ""}
      </Text>

      <Text style={styles.sectionNumber}>5. Royalties & Publishing</Text>
      <Text style={styles.bodyText}>
        3% of Net Profit from exploitation of the Master Recording, payable quarterly.{"\n"}
        Net Profit shall not include indirect costs, overhead, or unrelated expenses. Only direct, verifiable costs may be deducted.{"\n"}
        Licensee agrees to register the Composition with a Performing Rights Organization (PRO), listing Licensor as 50% writer and 50% publisher. (standard practice)
      </Text>

      <Text style={styles.sectionNumber}>6. Warranties and Indemnities</Text>
      <Text style={[styles.bodyText, { marginBottom: 3 }]}>
        <Text style={styles.bold}>Licensor warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>• They are the sole owner of the Composition and have full authority to grant this License.</Text>
      <Text style={[styles.listItem, { marginBottom: 8 }]}>• The Composition does not infringe upon any third-party rights.</Text>
      <Text style={[styles.bodyText, { marginBottom: 3 }]}>
        <Text style={styles.bold}>Licensee warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>• They will not use the Composition or Master Recording in any defamatory, unlawful, or infringing manner.</Text>
      <Text style={[styles.listItem, { marginBottom: 8 }]}>• They will clear any third-party samples prior to exploitation.</Text>
      <Text style={styles.bodyText}>
        Both parties agree to indemnify and hold each other harmless against any claims, damages, or costs arising from a breach of these warranties.
      </Text>

      <Text style={styles.sectionNumber}>7. Restrictions</Text>
      <Text style={styles.bodyText}>
        This License is non-transferable without the Licensor's prior written consent. Licensees may not sublicense, assign, or otherwise transfer rights without consent.
      </Text>

      <Text style={styles.sectionNumber}>8. Outstanding Clients</Text>
      <Text style={styles.bodyText}>
        Licensee acknowledges that prior to this Agreement, the Composition may have been licensed to third parties on a non-exclusive basis. Such prior licenses remain valid until expiration. From the Effective Date, Licensor reserves the right to license the Composition to other parties without restriction.
      </Text>

      <Text style={styles.sectionNumber}>9. Term and Termination</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term: </Text>This Agreement shall remain in force in perpetuity, unless terminated in accordance with this Clause.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Termination for Breach: </Text>Either party may terminate upon 30 days' written notice if the other party breaches any material term and fails to cure within such period.
      </Text>
      <Text style={styles.listItem}>
        Upon termination, all rights granted revert to Licensor, and further exploitation of the Master Recording by Licensee shall cease.
      </Text>

      <Text style={styles.sectionNumber}>10. Governing Law & Dispute Resolution</Text>
      <Text style={styles.bodyText}>
        This Agreement shall be governed by the laws of NSW, Australia. Any disputes shall first be resolved by good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to Resolution Pathways NSW. If still unresolved will be filed at Federal Court of Australia.
      </Text>

      <Text style={styles.sectionNumber}>11. Force Majeure</Text>
      <Text style={styles.bodyText}>
        Neither party shall be liable for delays or failures caused by events beyond their reasonable control, including natural disasters, governmental actions, internet outages, or acts of war.
      </Text>

      <Text style={styles.sectionNumber}>12. Miscellaneous</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Entire Agreement: </Text>This is the complete agreement between the parties and supersedes all prior discussions.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Amendments: </Text>Must be in writing and signed by both parties.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Severability: </Text>If any provision is held invalid, the remainder shall remain in effect.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Auditing: </Text>Licensor shall have the right to audit Licensee's records upon reasonable notice to verify royalty payments.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Content ID / YT Monetization: </Text>Licensor retains the right to monetize the Composition via Content ID systems, unless otherwise agreed in writing.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Buy Out Clause: </Text>Licensee may upgrade this license to a higher-tier agreement upon mutual consent, subject to additional fees.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>File Usage: </Text>Licensee may not resell, lease, or distribute the Composition in its original form without vocals.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Moral Rights: </Text>Licensee shall not use the Composition in a manner that harms Licensor's reputation.
      </Text>

      <Text style={styles.sectionNumber}>13. Major Label Clause: (If signed or used commercially)</Text>
      <Text style={styles.listItem}>• License must be upgraded</Text>
      <Text style={styles.listItem}>• Parties renegotiate for a Major Label Producer Fee</Text>
      <Text style={styles.listItem}>• 3% Royalty of Gross Revenue with Proper publishing credit</Text>
      <Text style={styles.listItem}>• Failure to renegotiate in good faith shall constitute a material breach</Text>

      <Text style={styles.sectionNumber}>14. Credit</Text>
      <Text style={styles.bodyText}>
        Licensee agrees to credit Licensor as: "Produced by LIL Rock Look" in all reasonable metadata, streaming platforms, and public releases where producer credits are customary. Any removal or alteration of the producer tag without written consent constitutes a material breach of this Agreement.
      </Text>

      <Text style={[styles.bodyText, { marginTop: 14 }]}>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.
      </Text>

      <View style={styles.signatureBlock}>
        <Text style={[styles.bold, { marginBottom: 6 }]}>Licensor:</Text>
        <Text style={styles.signatureLine}> Name: <Text style={styles.underline}>{data.signatureName || "_______________________"}</Text>  [{data.licensorName}]</Text>
        <Text style={[styles.signatureLine, { marginBottom: 16 }]}> Signature: <Text style={styles.underline}>{data.signatureInitials || "_______First & Last Initials____"}</Text>  Date: <Text style={styles.underline}>{data.dateSigned}</Text></Text>

        <Text style={[styles.bold, { marginBottom: 6 }]}>Licensee:</Text>
        <Text style={styles.signatureLine}> Name: <Text style={styles.underline}>{data.licenseeName || "_______________________"}</Text>  [{data.licenseeArtist}]</Text>
        <Text style={styles.signatureLine}> Signature: <Text style={styles.underline}>{data.signatureInitials || "_____First & Last Initials____"}</Text>  Date: <Text style={styles.underline}>{data.dateSigned}</Text></Text>
      </View>

      <Text style={styles.footer}>LIL Rock Look – Premium Package License Agreement</Text>
    </Page>
  </Document>
);

const ExclusiveLicensePDF = ({ data }: { data: AgreementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.mainHeading}>EXCLUSIVE LICENSE AGREEMENT</Text>

      <Text style={styles.introText}>
        <Text style={styles.bold}>Effective Date: </Text>{data.effectiveDate}
      </Text>

      <Text style={styles.introText}>
        This Exclusive License Agreement ("Agreement") is entered into by and between:
      </Text>

      <View style={styles.partyLine}>
        <Text style={styles.bold}>Licensor: </Text>
        <Text>{data.licensorName}, professionally known as {data.licensorArtist}, residing in {data.licensorLocation}.</Text>
      </View>
      <View style={[styles.partyLine, { marginBottom: 8 }]}>
        <Text style={styles.bold}>Licensee: </Text>
        <Text>{data.licenseeName}, professionally known as {data.licenseeArtist}, residing in {data.licenseeLocation}.</Text>
      </View>

      <Text style={[styles.bodyText, { marginBottom: 10 }]}>
        Licensor warrants that they control the copyright and all rights in and to the musical composition entitled "<Text style={styles.underline}>{data.beatTitle}</Text>" (the "Composition") as of and prior to the Effective Date. The Composition, including the underlying musical work and arrangement, was composed by {data.licensorName} ("Songwriter") and is managed under the Licensor.
      </Text>

      <Text style={styles.sectionNumber}>1. Definitions</Text>
      <Text style={[styles.bodyText, { marginBottom: 4 }]}>For the purposes of this Agreement:</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Composition: </Text>The underlying musical work, including melody, harmony, arrangement, and structure.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Master Recording: </Text>The sound recording made by Licensee using the Composition in part or in whole.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Exclusive License: </Text>The grant of rights whereby the Licensor shall not license the Composition or Master Recording to any other party during the Term, subject to Clause 11 (Outstanding Clients).
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Territory: </Text>Worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term: </Text>The period stated in Clause 12.
      </Text>

      <Text style={styles.sectionNumber}>2. Grant of Rights</Text>
      <Text style={styles.bodyText}>Licensor grants to Licensee an exclusive, worldwide license to:</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>a) Master Use</Text> – Record vocal or instrumental performances synchronized to the Composition in whole or in part, and produce Master Recordings thereof.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>b) Distribution Rights</Text> – [Unlimited Sales] Manufacture, reproduce, distribute, sell, and otherwise exploit the Master Recording in any physical or digital format.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>c) Streaming Rights</Text> – [Unlimited Streams] Make the Master Recording available via non-commercial and commercial streaming on platforms such as Spotify, Apple Music, YouTube Music, etc.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>d) Synchronization Rights</Text> – Synchronize the Master Recording with visual media, including music videos, television, films, video games, and online platforms, without limitation on streams or broadcasts.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>e) Performance Rights</Text> – Perform the Master Recording in unlimited live shows, concerts, and events, both for-profit and non-profit.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>f) Broadcast Rights</Text> – Authorize broadcasting of the Master Recording on unlimited radio stations, television channels, and online broadcasts.
      </Text>

      <Text style={styles.sectionNumber}>3. Consideration</Text>
      <Text style={styles.bodyText}>
        In exchange for the rights granted herein, Licensee shall pay Licensor USD ${data.price} to {data.licensorName}. Payment is due in full upon execution of this Agreement. Late payments shall incur interest at 10% per annum above the base rate. No rights are granted until full payment is received.
      </Text>

      <Text style={styles.sectionNumber}>3A. No Refund Policy</Text>
      <Text style={styles.bodyText}>
        All payments made under this Agreement are non-refundable. Due to the nature of digital music files, once the Composition has been delivered in any format, the Licensee shall have no right to request a refund or chargeback for any reason.
      </Text>
      <Text style={styles.bodyText}>
        In the event of unauthorized chargebacks, Licensor reserves the right to pursue legal action and recover all associated costs, including legal fees.
      </Text>

      <Text style={styles.sectionNumber}>4. Delivery</Text>
      <Text style={styles.bodyText}>
        Licensor shall deliver the Composition as high-quality WAV within 3 business days and stems if required within 5 business days of receiving payment, via {data.deliveryEmail}. Failure to deliver entitles Licensee to terminate this Agreement and receive a full refund.
      </Text>

      <Text style={styles.sectionNumber}>5. Royalties</Text>
      <Text style={styles.bodyText}>
        3% of Gross Revenue derived from exploitation of the Master Recording, payable quarterly.{"\n"}
        Net Profit shall not include indirect costs, overhead, or unrelated expenses. Only direct, verifiable costs may be deducted.{"\n"}
        Licensee agrees to register the Composition with a Performing Rights Organization (PRO), listing Licensor as 50% writer and 50% publisher. (standard practice)
      </Text>

      <Text style={styles.sectionNumber}>6. Warranties and Indemnities</Text>
      <Text style={[styles.bodyText, { marginBottom: 3 }]}>
        <Text style={styles.bold}>Licensor warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>• They are the sole owner of the Composition and have full authority to grant this License.</Text>
      <Text style={[styles.listItem, { marginBottom: 8 }]}>• The Composition does not infringe upon any third-party rights.</Text>
      <Text style={[styles.bodyText, { marginBottom: 3 }]}>
        <Text style={styles.bold}>Licensee warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>• They will not use the Composition or Master Recording in any defamatory, unlawful, or infringing manner.</Text>
      <Text style={[styles.listItem, { marginBottom: 8 }]}>• They will clear any third-party samples prior to exploitation.</Text>
      <Text style={styles.bodyText}>
        Both parties agree to indemnify and hold each other harmless against any claims, damages, or costs arising from a breach of these warranties.
      </Text>

      <Text style={styles.sectionNumber}>7. Restrictions</Text>
      <Text style={styles.bodyText}>
        This License is non-transferable without the Licensor's prior written consent. Licensees may not sublicense, assign, or otherwise transfer rights without consent.
      </Text>

      <Text style={styles.sectionNumber}>8. Outstanding Clients</Text>
      <Text style={styles.bodyText}>
        Licensee acknowledges that prior to this Agreement, the Composition may have been licensed to third parties on a non-exclusive basis. Such prior licenses remain valid until expiration. From the Effective Date, Licensor shall not license the Composition to any other party.
      </Text>

      <Text style={styles.sectionNumber}>9. Term and Termination</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term: </Text>This Agreement shall remain in force in perpetuity, unless terminated in accordance with this Clause.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Termination for Breach: </Text>Either party may terminate upon 30 days' written notice if the other party breaches any material term and fails to cure within such period.
      </Text>
      <Text style={styles.listItem}>
        Upon termination, all rights granted revert to Licensor, and further exploitation of the Master Recording by Licensee shall cease.
      </Text>

      <Text style={styles.sectionNumber}>10. Governing Law & Dispute Resolution</Text>
      <Text style={styles.bodyText}>
        This Agreement shall be governed by the laws of NSW, Australia. Any disputes shall first be resolved by good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to Resolution Pathways NSW. If still unresolved will be filed at Federal Court of Australia.
      </Text>

      <Text style={styles.sectionNumber}>11. Force Majeure</Text>
      <Text style={styles.bodyText}>
        Neither party shall be liable for delays or failures caused by events beyond their reasonable control, including natural disasters, governmental actions, internet outages, or acts of war.
      </Text>

      <Text style={styles.sectionNumber}>12. Miscellaneous</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Entire Agreement: </Text>This is the complete agreement between the parties and supersedes all prior discussions.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Amendments: </Text>Must be in writing and signed by both parties.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Severability: </Text>If any provision is held invalid, the remainder shall remain in effect.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Auditing: </Text>Licensor shall have the right to audit Licensee's records upon reasonable notice to verify royalty payments.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Content ID / YT Monetization: </Text>Licensor retains the right to monetize the Composition via Content ID systems, unless otherwise agreed in writing.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Buy Out Clause: </Text>Licensee may upgrade this license to a higher-tier agreement upon mutual consent, subject to additional fees.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>File Usage: </Text>Licensee may not resell, lease, or distribute the Composition in its original form without vocals.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Moral Rights: </Text>Licensee shall not use the Composition in a manner that harms Licensor's reputation.
      </Text>
      <Text style={styles.listItem}>
        Upon execution of this Agreement, Licensor agrees to remove the Composition from all marketplaces, platforms, and licensing services and cease all future licensing.
      </Text>
      <Text style={styles.listItem}>
        Licensee shall not register the Composition as their own or claim ownership of the underlying musical work.
      </Text>

      <Text style={styles.sectionNumber}>13. Major Label Clause: (If signed or used commercially)</Text>
      <Text style={styles.bodyText}>This Agreement shall be amended to reflect industry-standard major label producer terms.</Text>
      <Text style={styles.listItem}>• In the event of a major commercial release, Licensor shall be entitled to an upfront producer fee or advance consistent with industry standards.</Text>
      <Text style={styles.listItem}>• 3%–5% of Gross Revenue derived from exploitation of the Master Recording with Proper publishing credit</Text>
      <Text style={styles.listItem}>• Failure to renegotiate in good faith shall constitute a material breach</Text>

      <Text style={styles.sectionNumber}>14. Credit</Text>
      <Text style={styles.bodyText}>
        Licensee agrees to credit Licensor as: "Produced by LIL Rock Look" in all reasonable metadata, streaming platforms, and public releases where producer credits are customary. Any removal or alteration of the producer tag without written consent constitutes a material breach of this Agreement. Failure to provide proper credit constitutes a material breach and may result in termination or financial penalties.
      </Text>

      <Text style={[styles.bodyText, { marginTop: 14 }]}>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.
      </Text>

      <View style={styles.signatureBlock}>
        <Text style={[styles.bold, { marginBottom: 6 }]}>Licensor:</Text>
        <Text style={styles.signatureLine}> Name: <Text style={styles.underline}>{data.signatureName || "_______________________"}</Text>  [{data.licensorName}]</Text>
        <Text style={[styles.signatureLine, { marginBottom: 16 }]}> Signature: <Text style={styles.underline}>{data.signatureInitials || "_______First & Last Initials____"}</Text>  Date: <Text style={styles.underline}>{data.dateSigned}</Text></Text>

        <Text style={[styles.bold, { marginBottom: 6 }]}>Licensee:</Text>
        <Text style={styles.signatureLine}> Name: <Text style={styles.underline}>{data.licenseeName || "_______________________"}</Text>  [{data.licenseeArtist}]</Text>
        <Text style={styles.signatureLine}> Signature: <Text style={styles.underline}>{data.signatureInitials || "_____First & Last Initials____"}</Text>  Date: <Text style={styles.underline}>{data.dateSigned}</Text></Text>
      </View>

      <Text style={styles.footer}>LIL Rock Look – Exclusive License Agreement</Text>
    </Page>
  </Document>
);

/* ─────────────────────────────────────────────
   MAIN PAGE COMPONENT
───────────────────────────────────────────── */
export default function LicensePage() {
  const [form, setForm] = useState<AgreementData>(defaultValues);
  const [customBeatTitle, setCustomBeatTitle] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onInput =
    (name: keyof AgreementData) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { type } = e.target as HTMLInputElement;
        const value =
          type === "checkbox"
            ? (e.target as HTMLInputElement).checked
            : e.target.value;

        setForm((prev: AgreementData) => {
          const updated = { ...prev, [name]: value };

          if (name === "licenseType") {
            if (value === "Standard") {
              Object.assign(updated, {
                price: "35",
                deliveryFormat: "WAV only",
                streamLimit: "50,000 streams",
                producerTag: "Included (cannot be removed)",
                stemsRequired: false,
                tagRemoval: false,
              });
            } else if (value === "Premium") {
              Object.assign(updated, {
                price: "75",
                deliveryFormat: "WAV + optional stems",
                streamLimit: "Unlimited streams",
                producerTag: "Included (removal for agreed fee)",
                stemsRequired: false,
                tagRemoval: false,
              });
            } else if (value === "Exclusive") {
              Object.assign(updated, {
                price: "800",
                deliveryFormat: "WAV + stems",
                streamLimit: "Unlimited (exclusive rights)",
                producerTag: "Removed (exclusive package)",
                stemsRequired: true,
                tagRemoval: true,
              });
            }
          }

          return updated;
        });
      };

  const handleBeatTitleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "Custom Beat Title") {
      setForm((prev) => ({ ...prev, beatTitle: customBeatTitle }));
    } else {
      setForm((prev) => ({ ...prev, beatTitle: value }));
      setCustomBeatTitle("");
    }
  };

  const handleCustomBeatTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomBeatTitle(value);
    setForm((prev) => ({ ...prev, beatTitle: value }));
  };

  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const requiredFields = [
      "licensorName", "licensorArtist", "licensorLocation",
      "licenseeName", "licenseeArtist", "licenseeLocation",
      "beatTitle", "deliveryEmail", "signatureName", "signatureInitials", "price",
    ];
    const hasAllFields = requiredFields.every((field) => {
      const value = form[field as keyof AgreementData];
      return typeof value === "string" ? value.trim() !== "" : !!value;
    });
    return hasAllFields && emailRegex.test(form.deliveryEmail);
  };

  const getPDFComponent = () => {
    switch (form.licenseType) {
      case "Standard": return <StandardLicensePDF data={form} />;
      case "Premium": return <PremiumLicensePDF data={form} />;
      case "Exclusive": return <ExclusiveLicensePDF data={form} />;
      default: return <StandardLicensePDF data={form} />;
    }
  };

  const getLicenseTypeDescription = () => {
    switch (form.licenseType) {
      case "Standard": return "Non-exclusive license. Up to 50,000 streams. Producer tag required.";
      case "Premium": return "Non-exclusive license. Unlimited streams. Stems available on request.";
      case "Exclusive": return "Exclusive rights. Unlimited streams. Beat removed from all stores.";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 font-michroma">
      <div className="mx-auto">
        <div className="bg-slate-800 p-6 rounded-lg mb-6 space-y-6">

          {/* License Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 font-semibold">
                License Type *
                <select
                  name="licenseType"
                  value={form.licenseType}
                  onChange={onInput("licenseType")}
                  className="p-3 rounded bg-slate-700 w-full mt-1"
                >
                  <option value="Standard">Standard - $35</option>
                  <option value="Premium">Premium - $75</option>
                  <option value="Exclusive">Exclusive - Custom Price</option>
                </select>
              </label>
              <p className="text-sm text-slate-400 mt-1">{getLicenseTypeDescription()}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">
                Effective Date *
                <input
                  type="date"
                  value={form.effectiveDate}
                  onChange={onInput("effectiveDate")}
                  className="p-3 rounded bg-slate-700 w-full mt-1"
                />
              </label>
            </div>
          </div>

          {/* Licensor Information */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Licensor Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                Legal Name *
                <input type="text" value={form.licensorName} onChange={onInput("licensorName")}
                  placeholder="Full legal name" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <label className="block">
                Artist/Stage Name *
                <input type="text" value={form.licensorArtist} onChange={onInput("licensorArtist")}
                  placeholder="Professional name" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <label className="block md:col-span-2">
                Location *
                <input type="text" value={form.licensorLocation} onChange={onInput("licensorLocation")}
                  placeholder="City, Country" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
            </div>
          </div>

          {/* Licensee Information */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Licensee Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                Legal Name *
                <input type="text" value={form.licenseeName} onChange={onInput("licenseeName")}
                  placeholder="Full legal name" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <label className="block">
                Artist/Stage Name *
                <input type="text" value={form.licenseeArtist} onChange={onInput("licenseeArtist")}
                  placeholder="Professional name" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <label className="block md:col-span-2">
                Location *
                <input type="text" value={form.licenseeLocation} onChange={onInput("licenseeLocation")}
                  placeholder="City, Country" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
            </div>
          </div>

          {/* Beat Information */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Beat Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">
                  Beat Title *
                  <select
                    value={beatTitles.includes(form.beatTitle) ? form.beatTitle : "Custom Beat Title"}
                    onChange={handleBeatTitleChange}
                    className="p-3 rounded bg-slate-600 w-full mt-1"
                  >
                    <option value="">Select a beat...</option>
                    {beatTitles.map((title) => (
                      <option key={title} value={title}>{title}</option>
                    ))}
                  </select>
                  {(form.beatTitle === customBeatTitle || !beatTitles.includes(form.beatTitle)) && (
                    <input
                      type="text"
                      placeholder="Enter custom beat title"
                      value={customBeatTitle || form.beatTitle}
                      onChange={handleCustomBeatTitle}
                      className="p-3 rounded bg-slate-600 w-full mt-2"
                    />
                  )}
                </label>
              </div>
              <div>
                <label className="block mb-2">
                  Price (USD) *
                  <input
                    type="text"
                    value={form.price}
                    onChange={onInput("price")}
                    placeholder="Enter price"
                    className="p-3 rounded bg-slate-600 w-full mt-1"
                    disabled={form.licenseType !== "Exclusive"}
                  />
                </label>
                {form.licenseType !== "Exclusive" && (
                  <p className="text-xs text-slate-400 mt-1">Auto-filled based on license type</p>
                )}
              </div>
            </div>
          </div>

          {/* License Terms Display */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">License Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block mb-2">
                Delivery Format
                <input type="text" value={form.deliveryFormat} readOnly
                  className="p-3 rounded bg-slate-600 w-full mt-1 opacity-75" />
              </label>
              <label className="block mb-2">
                Stream/Sales Limit
                <input type="text" value={form.streamLimit} readOnly
                  className="p-3 rounded bg-slate-600 w-full mt-1 opacity-75" />
              </label>
              <label className="block mb-2 md:col-span-2">
                Producer Tag Policy
                <input type="text" value={form.producerTag} readOnly
                  className="p-3 rounded bg-slate-600 w-full mt-1 opacity-75" />
              </label>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Delivery Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                Delivery Email *
                <input type="email" value={form.deliveryEmail} onChange={onInput("deliveryEmail")}
                  placeholder="email@example.com" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <div>
                <label className="block mb-2">Payment Date</label>
                <input type="date" value={form.paymentDate} onChange={onInput("paymentDate")}
                  className="p-3 rounded bg-slate-600 w-full" />
              </div>
            </div>
            {form.licenseType !== "Standard" && (
              <div className="mt-4 space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" checked={form.stemsRequired} onChange={onInput("stemsRequired")}
                    disabled={form.licenseType === "Exclusive"} className="w-4 h-4" />
                  <span>Request Stems/Trackouts {form.licenseType === "Exclusive" && "(Included)"}</span>
                </label>
                {form.licenseType === "Premium" && (
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" checked={form.tagRemoval} onChange={onInput("tagRemoval")} className="w-4 h-4" />
                    <span>Request Producer Tag Removal (agreed additional fee)</span>
                  </label>
                )}
              </div>
            )}
          </div>

          {/* Digital Signature */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Digital Signature</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <label className="block">
                Full Name *
                <input type="text" value={form.signatureName} onChange={onInput("signatureName")}
                  placeholder="Digital signature name" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <label className="block">
                Initials *
                <input type="text" value={form.signatureInitials} onChange={onInput("signatureInitials")}
                  placeholder="Your initials" className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
              <label className="block">
                Date Signed *
                <input type="date" value={form.dateSigned} onChange={onInput("dateSigned")}
                  className="p-3 rounded bg-slate-600 w-full mt-1" />
              </label>
            </div>
          </div>

          {/* Download Button */}
          <div className="text-center">
            {!isClient ? (
              <div className="bg-gray-600 px-8 py-4 rounded-lg font-bold text-lg opacity-50">
                Initializing...
              </div>
            ) : isFormValid() ? (
              <PDFDownloadLink
                document={getPDFComponent()}
                fileName={`LIL_Rock_Look_${form.licenseType}_License_${form.beatTitle.replace(/[^a-zA-Z0-9]/g, "_") || "Agreement"}.pdf`}
                className="inline-block"
              >
                {({ loading }) => (
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating PDF...
                      </span>
                    ) : (
                      `Download ${form.licenseType} License Agreement`
                    )}
                  </button>
                )}
              </PDFDownloadLink>
            ) : (
              <div className="text-center">
                <button className="bg-gray-600 px-8 py-4 rounded-lg font-bold text-lg cursor-not-allowed opacity-50" disabled>
                  Complete Required Fields
                </button>
                <p className="text-red-400 text-sm mt-2">
                  {!form.deliveryEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.deliveryEmail)
                    ? "Please enter a valid delivery email address."
                    : "Please fill in all required fields marked with *"}
                </p>
              </div>
            )}
          </div>

          {/* License Comparison Table */}
          <div className="mt-8 bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">License Comparison</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left p-2">Feature</th>
                    <th className="text-center p-2">Standard</th>
                    <th className="text-center p-2">Premium</th>
                    <th className="text-center p-2">Exclusive</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr className="border-b border-slate-600">
                    <td className="p-2">Price</td>
                    <td className="text-center p-2">$35</td>
                    <td className="text-center p-2">$75</td>
                    <td className="text-center p-2">Custom</td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="p-2">Stream Limit</td>
                    <td className="text-center p-2">50,000</td>
                    <td className="text-center p-2">Unlimited</td>
                    <td className="text-center p-2">Unlimited</td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="p-2">Stems Included</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">On Request</td>
                    <td className="text-center p-2">✅</td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="p-2">Tag Removal</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">Agreed Fee</td>
                    <td className="text-center p-2">✅</td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="p-2">Commercial Sync</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">✅</td>
                  </tr>
                  <tr>
                    <td className="p-2">Exclusivity</td>
                    <td className="text-center p-2">Non-Exclusive</td>
                    <td className="text-center p-2">Non-Exclusive</td>
                    <td className="text-center p-2">Exclusive</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}