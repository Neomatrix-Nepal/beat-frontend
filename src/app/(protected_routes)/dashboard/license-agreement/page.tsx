"use client";
import { useState } from "react";
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
  licensorLocation: "Melbourne, Australia",
  licenseeName: "",
  licenseeArtist: "",
  licenseeLocation: "",
  beatTitle: "",
  price: "30",
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
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.4,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    textDecoration: "underline",
  },
  subheading: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  section: {
    marginBottom: 12,
    textAlign: "justify",
  },
  clauseNumber: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 8,
  },
  listItem: {
    marginLeft: 20,
    marginBottom: 4,
  },
  bold: {
    fontWeight: "bold",
  },
  signatureSection: {
    marginTop: 30,
    padding: 15,
    border: "1px solid #000",
  },
  footer: {
    position: "absolute",
    fontSize: 9,
    bottom: 30,
    right: 40,
    fontStyle: "italic",
  },
  partyInfo: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  warningBox: {
    padding: 10,
    backgroundColor: "#fff2cc",
    border: "1px solid #d6b656",
    marginBottom: 15,
  },
  exclusiveBox: {
    padding: 10,
    backgroundColor: "#d4e6f1",
    border: "2px solid #2874a6",
    marginBottom: 15,
  },
  standardHeader: {
    backgroundColor: "#e8f5e8",
    padding: 10,
    marginBottom: 15,
  },
  premiumHeader: {
    backgroundColor: "#fff3cd",
    padding: 10,
    marginBottom: 15,
  },
  exclusiveHeader: {
    backgroundColor: "#d1ecf1",
    padding: 10,
    marginBottom: 15,
  },
});

const StandardLicensePDF = ({ data }: { data: AgreementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>STANDARD PACKAGE LICENSE AGREEMENT</Text>

      <Text style={styles.section}>
        <Text style={styles.bold}>Effective Date:</Text> {data.effectiveDate}
      </Text>

      <Text style={styles.section}>
        This Standard Package License Agreement ("Agreement") is entered into by
        and between:
      </Text>

      <View style={styles.partyInfo}>
        <Text style={styles.bold}>Licensor:</Text>
        <Text>
          {data.licensorName}, professionally known as {data.licensorArtist},
          residing in {data.licensorLocation}.
        </Text>
      </View>

      <View style={styles.partyInfo}>
        <Text style={styles.bold}>Licensee:</Text>
        <Text>
          {data.licenseeName}, professionally known as {data.licenseeArtist},
          residing in {data.licenseeLocation}.
        </Text>
      </View>

      <Text style={styles.section}>
        Licensor warrants that they control the copyright and all rights in and
        to the musical composition entitled{" "}
        <Text style={styles.bold}>"{data.beatTitle}"</Text> (the "Composition")
        as of and prior to the Effective Date.
      </Text>

      <Text style={styles.clauseNumber}>1. Definitions</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>1. Composition</Text> – The underlying musical
        work, including melody, harmony, arrangement, and structure.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>2. Master Recording</Text> – The sound
        recording made by Licensee using the Composition in part or whole.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>3. Standard License</Text> – A non-exclusive
        license with usage limitations as defined herein.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>4. Net Profit</Text> – Gross revenue actually
        received from exploitation of the Master Recording, less only documented
        third-party production, distribution, and promotion expenses.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>5. Territory</Text> – Worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>6. Term</Text> – Perpetual unless terminated
        under Clause 9.
      </Text>

      <Text style={styles.clauseNumber}>2. Grant of Rights</Text>
      <Text style={styles.section}>
        Licensor grants Licensee the following rights:
      </Text>
      <Text style={styles.listItem}>
        a. <Text style={styles.bold}>Master Use</Text> – Record vocals over the
        Composition and produce Master Recordings.
      </Text>
      <Text style={styles.listItem}>
        b. <Text style={styles.bold}>Distribution</Text> – Sell and distribute
        the Master Recording up to {data.streamLimit} across all platforms.
      </Text>
      <Text style={styles.listItem}>
        c. <Text style={styles.bold}>Streaming Rights</Text> – Non-exclusive
        right to make the Master Recording available for up to{" "}
        {data.streamLimit} worldwide.
      </Text>
      <Text style={styles.listItem}>
        d. <Text style={styles.bold}>Synchronization</Text> – Use in one music
        video for streaming on platforms like YouTube.
      </Text>
      <Text style={styles.listItem}>
        e. <Text style={styles.bold}>Performance Rights</Text> – Perform the
        Master Recording live without restriction.
      </Text>
      <Text style={styles.listItem}>
        f. <Text style={styles.bold}>Broadcast Rights</Text> – Play the Master
        Recording on unlimited radio stations.
      </Text>

      <Text style={styles.clauseNumber}>3. Consideration</Text>
      <Text style={styles.section}>
        Licensee shall pay USD ${data.price} to Licensor upon signing. Payment
        is due in full. Late payments accrue 5% interest p.a.
      </Text>

      <Text style={styles.clauseNumber}>3A. No Refund Policy</Text>
      <Text style={styles.section}>
        All payments are non-refundable. Once files are delivered, the Licensee
        cannot request refunds or charge backs.
      </Text>

      <Text style={styles.clauseNumber}>4. Delivery</Text>
      <Text style={styles.section}>
        Licensor shall deliver the Composition as a high-quality WAV file only,
        with producer tag included, within 3 business days to{" "}
        {data.deliveryEmail}.
      </Text>

      <Text style={styles.clauseNumber}>5. Royalties</Text>
      <Text style={styles.listItem}>
        • 3% of Net Profit from exploitation of the Master Recording, payable
        quarterly.
      </Text>
      <Text style={styles.listItem}>
        • Licensor retains 50% Writer's Share and 50% Publisher's Share of the
        Composition.
      </Text>

      <Text style={styles.clauseNumber}>6. Warranties and Indemnities</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Licensor warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>
        • They are the sole owner of the Composition and have full authority to
        grant this License.
      </Text>
      <Text style={styles.listItem}>
        • The Composition does not infringe upon any third-party rights.
      </Text>

      <Text style={styles.section}>
        <Text style={styles.bold}>Licensee warrants that:</Text>
      </Text>
      <Text style={styles.listItem}>
        • They will not use the Composition or Master Recording in any
        defamatory, unlawful, or infringing manner.
      </Text>
      <Text style={styles.listItem}>
        • They will clear any third-party samples prior to exploitation.
      </Text>

      <Text style={styles.section}>
        Both parties agree to indemnify and hold each other harmless against any
        claims, damages, or costs arising from a breach of these warranties.
      </Text>

      <Text style={styles.clauseNumber}>7. Restrictions</Text>
      <Text style={styles.section}>
        This License is <Text style={styles.bold}>non-transferable</Text>{" "}
        without the Licensor's prior written consent. Licensee may not
        sublicense, assign, or otherwise transfer rights without consent.
      </Text>

      <Text style={styles.clauseNumber}>8. Outstanding Clients</Text>
      <Text style={styles.section}>
        Licensee acknowledges that prior to this Agreement, the Composition may
        have been licensed to third parties on a non-exclusive basis. Such prior
        licenses remain valid until expiration. From the Effective Date,
        Licensor may continue to license the Composition to other parties on a
        non-exclusive basis.
      </Text>

      <Text style={styles.clauseNumber}>9. Term and Termination</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term:</Text> This Agreement shall remain in
        force in perpetuity, unless terminated in accordance with this Clause.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Termination for Breach:</Text> Either party
        may terminate upon 30 days' written notice if the other party breaches
        any material term and fails to cure within such period.
      </Text>
      <Text style={styles.listItem}>
        Upon termination, all rights granted revert to Licensor, and further
        exploitation of the Master Recording by Licensee shall cease.
      </Text>

      <Text style={styles.clauseNumber}>
        10. Governing Law & Dispute Resolution
      </Text>
      <Text style={styles.section}>
        This Agreement shall be governed by the laws of Nepal. Any disputes
        shall first be resolved by good-faith negotiation. If unresolved within
        30 days, disputes shall be submitted to binding arbitration in
        Kathmandu, Nepal, under the Nepal Arbitration Act.
      </Text>

      <Text style={styles.clauseNumber}>11. Force Majeure</Text>
      <Text style={styles.section}>
        Neither party shall be liable for delays or failures caused by events
        beyond their reasonable control, including natural disasters,
        governmental actions, internet outages, or acts of war.
      </Text>

      <Text style={styles.clauseNumber}>12. Miscellaneous</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Entire Agreement:</Text> This is the complete
        agreement between the parties and supersedes all prior discussions.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Amendments:</Text> Must be in writing and
        signed by both parties.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Severability:</Text> If any provision is held
        invalid, the remainder shall remain in effect.
      </Text>

      <Text style={styles.section}>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the
        Effective Date.
      </Text>

      <View style={styles.signatureSection}>
        <Text style={styles.subheading}>SIGNATURES</Text>

        <Text style={{ marginBottom: 15 }}>
          <Text style={styles.bold}>Licensor:</Text>
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Name: {data.licensorName} [{data.licensorArtist}]
        </Text>
        <Text style={{ marginBottom: 20 }}>
          Signature: _________________ Date: {data.effectiveDate}
        </Text>

        <Text style={{ marginBottom: 15 }}>
          <Text style={styles.bold}>Licensee:</Text>
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Name: {data.signatureName} [{data.licenseeArtist}]
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Signature: {data.signatureInitials} Date: {data.dateSigned}
        </Text>

        <Text style={{ marginTop: 15, fontSize: 9 }}>
          By signing above, both parties acknowledge reading and agreeing to all
          terms and conditions.
        </Text>
      </View>

      <Text style={styles.footer}>
        Producer Fury - Standard Package License Agreement
      </Text>
    </Page>
  </Document>
);

const PremiumLicensePDF = ({ data }: { data: AgreementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>PREMIUM PACKAGE LICENSE AGREEMENT</Text>

      <Text style={styles.section}>
        <Text style={styles.bold}>Effective Date:</Text> {data.effectiveDate}
      </Text>

      <Text style={styles.section}>
        This Exclusive License Agreement ("Agreement") is entered into by and
        between:
      </Text>

      <View style={styles.partyInfo}>
        <Text style={styles.bold}>Licensor:</Text>
        <Text>
          {data.licensorName}, professionally known as {data.licensorArtist},
          residing in {data.licensorLocation}.
        </Text>
      </View>

      <View style={styles.partyInfo}>
        <Text style={styles.bold}>Licensee:</Text>
        <Text>
          {data.licenseeName}, professionally known as {data.licenseeArtist},
          residing in {data.licenseeLocation}.
        </Text>
      </View>

      <Text style={styles.section}>
        Licensor warrants that they control the copyright and all rights in and
        to the musical composition entitled{" "}
        <Text style={styles.bold}>"{data.beatTitle}"</Text> (the "Composition")
        as of and prior to the Effective Date.
      </Text>

      <Text style={styles.clauseNumber}>1. Definitions</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Composition</Text> – The underlying musical
        work, including melody, harmony, arrangement, and structure.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Master Recording</Text> – The sound recording
        made by Licensee using the Composition in part or whole.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Exclusive License</Text> – For the Term,
        Licensor shall not license the same Master Recording to any other party
        beyond the terms stated herein.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Net Profit</Text> – Gross revenue actually
        received from exploitation of the Master Recording, less only documented
        third-party production, distribution, and promotion expenses.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Territory</Text> – Worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term</Text> – Perpetual unless terminated
        under Clause 9.
      </Text>

      <Text style={styles.clauseNumber}>2. Grant of Rights</Text>
      <Text style={styles.section}>
        Licensor grants Licensee the following rights:
      </Text>
      <Text style={styles.listItem}>
        a) <Text style={styles.bold}>Master Use</Text> – Record vocals over the
        Composition and produce Master Recordings.
      </Text>
      <Text style={styles.listItem}>
        b) <Text style={styles.bold}>Distribution</Text> – Sell and distribute
        the Master Recording with unlimited streams.
      </Text>
      <Text style={styles.listItem}>
        c) <Text style={styles.bold}>Streaming Rights</Text> – Non-exclusive
        right to make the Master Recording available for unlimited streams
        worldwide.
      </Text>
      <Text style={styles.listItem}>
        d) <Text style={styles.bold}>Synchronization</Text> – Use in one music
        video for streaming on platforms like YouTube.
      </Text>
      <Text style={styles.listItem}>
        e) <Text style={styles.bold}>Performance Rights</Text> – Perform the
        Master Recording live without restriction.
      </Text>
      <Text style={styles.listItem}>
        f) <Text style={styles.bold}>Broadcast Rights</Text> – Play the Master
        Recording on unlimited radio stations.
      </Text>

      <Text style={styles.clauseNumber}>3. Consideration</Text>
      <Text style={styles.section}>
        Licensee shall pay USD ${data.price} to Licensor upon signing. Payment
        is due in full. Late payments accrue 5% interest p.a.
      </Text>

      <Text style={styles.clauseNumber}>3A. No Refund Policy</Text>
      <Text style={styles.section}>
        All payments are non-refundable. Once files are delivered, Licensee
        cannot request refunds or chargebacks.
      </Text>

      <Text style={styles.clauseNumber}>4. Delivery</Text>
      <Text style={styles.section}>
        WAV + stems upon request; producer tag may be removed at Licensee’s
        option for additional fee to be discussed with Licensor.
      </Text>

      <Text style={styles.clauseNumber}>5. Royalties</Text>
      <Text style={styles.section}>
        3% of Net Profit from exploitation of the Master Recording, payable
        quarterly.
        {"\n\n"}Licensor retains 50% Writer's Share and 50% Publisher's Share of
        the Composition.
      </Text>

      <Text style={styles.clauseNumber}>6. Warranties and Indemnities</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Licensor warrants that:</Text>
        {"\n"}• They are the sole owner of the Composition and have full
        authority to grant this License.
        {"\n"}• The Composition does not infringe upon any third-party rights.
        {"\n\n"}
        <Text style={styles.bold}>Licensee warrants that:</Text>
        {"\n"}• They will not use the Composition or Master Recording in any
        defamatory, unlawful, or infringing manner.
        {"\n"}• They will clear any third-party samples prior to exploitation.
        {"\n\n"}Both parties agree to indemnify and hold each other harmless
        against any claims, damages, or costs arising from a breach of these
        warranties.
      </Text>

      <Text style={styles.clauseNumber}>7. Restrictions</Text>
      <Text style={styles.section}>
        This License is non-transferable without the Licensor's prior written
        consent. Licensee may not sublicense, assign, or otherwise transfer
        rights without consent.
      </Text>

      <Text style={styles.clauseNumber}>8. Outstanding Clients</Text>
      <Text style={styles.section}>
        Licensee acknowledges that prior to this Agreement, the Composition may
        have been licensed to third parties on a non-exclusive basis. Such prior
        licenses remain valid until expiration. From the Effective Date,
        Licensor shall not license the Composition or Master Recording to any
        other third party.
      </Text>

      <Text style={styles.clauseNumber}>9. Term and Termination</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Term:</Text> This Agreement shall remain in
        force in perpetuity, unless terminated in accordance with this Clause.
        {"\n\n"}
        <Text style={styles.bold}>Termination for Breach:</Text> Either party
        may terminate upon 30 days' written notice if the other party breaches
        any material term and fails to cure within such period.
        {"\n\n"}Upon termination, all rights granted revert to Licensor, and
        further exploitation of the Master Recording by Licensee shall cease.
      </Text>

      <Text style={styles.clauseNumber}>
        10. Governing Law & Dispute Resolution
      </Text>
      <Text style={styles.section}>
        This Agreement shall be governed by the laws of Nepal. Any disputes
        shall first be resolved by good-faith negotiation. If unresolved within
        30 days, disputes shall be submitted to binding arbitration in
        Kathmandu, Nepal, under the Nepal Arbitration Act.
      </Text>

      <Text style={styles.clauseNumber}>11. Force Majeure</Text>
      <Text style={styles.section}>
        Neither party shall be liable for delays or failures caused by events
        beyond their reasonable control, including natural disasters,
        governmental actions, internet outages, or acts of war.
      </Text>

      <Text style={styles.clauseNumber}>12. Miscellaneous</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Entire Agreement:</Text> This is the complete
        agreement between the parties and supersedes all prior discussions.
        {"\n\n"}
        <Text style={styles.bold}>Amendments:</Text> Must be in writing and
        signed by both parties.
        {"\n\n"}
        <Text style={styles.bold}>Severability:</Text> If any provision is held
        invalid, the remainder shall remain in effect.
      </Text>

      <Text style={styles.section}>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the
        Effective Date.
      </Text>

      <View style={styles.signatureSection}>
        <Text style={styles.subheading}>SIGNATURES</Text>

        <View>
          <Text>
            <Text style={styles.bold}>Licensor:</Text>
          </Text>
          <Text></Text>
        </View>
        <Text style={{ marginBottom: 5 }}>Name: {data.licensorName}</Text>
        <Text style={{ marginBottom: 15 }}>
          Signature: {data.signatureInitials} Date: {data.dateSigned}
        </Text>

        <View>
          <Text>
            <Text style={styles.bold}>Licensee:</Text>
          </Text>
          <Text></Text>
        </View>
        <Text style={{ marginBottom: 5 }}>Name: {data.licenseeName}</Text>
        <Text>
          Signature: {data.signatureInitials} Date: {data.dateSigned}
        </Text>
      </View>

      <Text style={styles.footer}>
        Producer Fury - Premium License Agreement
      </Text>
    </Page>
  </Document>
);

// Exclusive License PDF Component
const ExclusiveLicensePDF = ({ data }: { data: AgreementData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>EXCLUSIVE LICENSE AGREEMENT</Text>

      <View style={styles.exclusiveHeader}>
        <Text style={styles.bold}>
          EXCLUSIVE LICENSE - FULL OWNERSHIP RIGHTS
        </Text>
        <Text>
          Complete exclusive rights transfer with unlimited usage and
          distribution.
        </Text>
      </View>

      <View style={styles.exclusiveBox}>
        <Text style={styles.bold}>EXCLUSIVE RIGHTS NOTICE:</Text>
        <Text>
          Upon execution of this agreement, the Composition becomes exclusively
          licensed to Licensee. Licensor forfeits all rights to license this
          Composition to any other party.
        </Text>
      </View>

      <Text style={styles.section}>
        <Text style={styles.bold}>Effective Date:</Text> {data.effectiveDate}
      </Text>

      <Text style={styles.section}>
        This Exclusive License Agreement ("Agreement") is entered into by and
        between:
      </Text>

      <View style={styles.partyInfo}>
        <Text style={styles.bold}>Licensor:</Text>
        <Text>
          {data.licensorName}, professionally known as {data.licensorArtist},
          residing in {data.licensorLocation}
        </Text>
      </View>

      <View style={styles.partyInfo}>
        <Text style={styles.bold}>Licensee:</Text>
        <Text>
          {data.licenseeName}, professionally known as {data.licenseeArtist},
          residing in {data.licenseeLocation}.
        </Text>
      </View>

      <Text style={styles.section}>
        Licensor warrants that they control the copyright and all rights in and
        to the musical composition entitled{" "}
        <Text style={styles.bold}>"{data.beatTitle}"</Text> (the "Composition")
        as of and prior to the Effective Date. The Composition, including the
        underlying musical work and arrangement, was composed by{" "}
        {data.licensorName} ("Songwriter") and is managed under the Licensor.
      </Text>

      <Text style={styles.clauseNumber}>1. Definitions</Text>
      <Text style={styles.section}>For the purposes of this Agreement:</Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Composition:</Text> The underlying musical
        work, including melody, harmony, arrangement, and structure.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Master Recording:</Text> The sound recording
        made by Licensee using the Composition in part or in whole.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Exclusive License:</Text> The grant of rights
        whereby the Licensor shall not license the Composition or Master
        Recording to any other party during the Term, subject to Clause 8
        (Outstanding Clients).
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Net Profit:</Text> Gross revenue actually
        received from exploitation of the Master Recording, less only
        reasonable, documented third-party expenses directly related to
        production, distribution, and promotion.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Territory:</Text> Worldwide.
      </Text>
      <Text style={styles.listItem}>
        <Text style={styles.bold}>Term:</Text> The period stated in Clause 9.
      </Text>

      <Text style={styles.clauseNumber}>2. Grant of Rights</Text>
      <Text style={styles.section}>
        Licensor grants to Licensee an exclusive, worldwide license to:
      </Text>
      <Text style={styles.listItem}>
        a) <Text style={styles.bold}>Master Use</Text> – Record vocal or
        instrumental performances synchronized to the Composition in whole or in
        part, and produce Master Recordings thereof.
      </Text>
      <Text style={styles.listItem}>
        b) <Text style={styles.bold}>Distribution Rights</Text> – [Unlimited
        Sales] Manufacture, reproduce, distribute, sell, and otherwise exploit
        the Master Recording in any physical or digital format
      </Text>
      <Text style={styles.listItem}>
        c) <Text style={styles.bold}>Streaming Rights</Text> – [Unlimited
        Streams] Make the Master Recording available via non-commercial and
        commercial streaming on platforms such as Spotify, Apple Music, YouTube
        Music, etc.
      </Text>
      <Text style={styles.listItem}>
        d) <Text style={styles.bold}>Synchronization Rights</Text> – Synchronize
        the Master Recording with visual media, including music videos,
        television, films, video games, and online platforms, without limitation
        on streams or broadcasts.
      </Text>
      <Text style={styles.listItem}>
        e) <Text style={styles.bold}>Performance Rights</Text> – Perform the
        Master Recording in unlimited live shows, concerts, and events, both
        for-profit and non-profit.
      </Text>
      <Text style={styles.listItem}>
        f) <Text style={styles.bold}>Broadcast Rights</Text> – Authorize
        broadcasting of the Master Recording on unlimited radio stations,
        television channels, and online broadcasts.
      </Text>

      <Text style={styles.clauseNumber}>3. Consideration</Text>
      <Text style={styles.section}>
        In exchange for the rights granted herein, Licensee shall pay Licensor
        USD ${data.price} to {data.licensorName}. Payment is due in full upon
        execution of this Agreement. Late payments shall incur interest at 5%
        per annum above the base rate.
      </Text>

      <Text style={styles.clauseNumber}>3A. No Refund Policy</Text>
      <Text style={styles.section}>
        All payments made under this Agreement are non-refundable. Due to the
        nature of digital music files, once the Composition has been delivered
        in any format, the Licensee shall have no right to request a refund or
        charge back for any reason.
        {"\n\n"}In the event of unauthorized charge backs, Licensor reserves the
        right to pursue legal action and recover all associated costs, including
        legal fees.
      </Text>

      <Text style={styles.clauseNumber}>4. Delivery</Text>
      <Text style={styles.section}>
        Licensor shall deliver the Composition as high-quality WAV and stems if
        required within 3 business days of receiving payment, via email or
        secure download link. Failure to deliver entitles Licensee to terminate
        this Agreement and receive a full refund.
      </Text>

      <Text style={styles.clauseNumber}>5. Royalties</Text>
      <Text style={styles.section}>
        Licensor shall receive 3% of Net Profit from the exploitation of the
        Master Recording, payable quarterly, together with detailed royalty
        statements.
        {"\n\n"}Licensor shall retain 50% of the Writer's Share and 50% of the
        Publisher's Share of the underlying Composition.
        {"\n\n"}Licensee shall maintain accurate books and records and allow
        Licensor, upon reasonable notice, to audit such records once per year.
      </Text>

      <Text style={styles.clauseNumber}>6. Warranties and Indemnities</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Licensor warrants that:</Text>
        {"\n"}• They are the sole owner of the Composition and have full
        authority to grant this License.
        {"\n"}• The Composition does not infringe upon any third-party rights.
        {"\n\n"}
        <Text style={styles.bold}>Licensee warrants that:</Text>
        {"\n"}• They will not use the Composition or Master Recording in any
        defamatory, unlawful, or infringing manner.
        {"\n"}• They will clear any third-party samples prior to exploitation.
        {"\n\n"}Both parties agree to indemnify and hold each other harmless
        against any claims, damages, or costs arising from a breach of these
        warranties.
      </Text>

      <Text style={styles.clauseNumber}>7. Restrictions</Text>
      <Text style={styles.section}>
        This License is non-transferable without the Licensor's prior written
        consent. Licensee may not sublicense, assign, or otherwise transfer
        rights without consent.
      </Text>

      <Text style={styles.clauseNumber}>8. Outstanding Clients</Text>
      <Text style={styles.section}>
        Licensee acknowledges that prior to this Agreement, the Composition may
        have been licensed to third parties on a non-exclusive basis. Such prior
        licenses remain valid until expiration. From the Effective Date,
        Licensor shall not license the Composition or Master Recording to any
        other third party.
      </Text>

      <Text style={styles.clauseNumber}>9. Term and Termination</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Term:</Text> This Agreement shall remain in
        force in perpetuity, unless terminated in accordance with this Clause.
        {"\n\n"}
        <Text style={styles.bold}>Termination for Breach:</Text> Either party
        may terminate upon 30 days' written notice if the other party breaches
        any material term and fails to cure within such period.
        {"\n\n"}Upon termination, all rights granted revert to Licensor, and
        further exploitation of the Master Recording by Licensee shall cease.
      </Text>

      <Text style={styles.clauseNumber}>
        10. Governing Law & Dispute Resolution
      </Text>
      <Text style={styles.section}>
        This Agreement shall be governed by the laws of Nepal. Any disputes
        shall first be resolved by good-faith negotiation. If unresolved within
        30 days, disputes shall be submitted to binding arbitration in
        Kathmandu, Nepal, under the Nepal Arbitration Act.
      </Text>

      <Text style={styles.clauseNumber}>11. Force Majeure</Text>
      <Text style={styles.section}>
        Neither party shall be liable for delays or failures caused by events
        beyond their reasonable control, including natural disasters,
        governmental actions, internet outages, or acts of war.
      </Text>

      <Text style={styles.clauseNumber}>12. Miscellaneous</Text>
      <Text style={styles.section}>
        <Text style={styles.bold}>Entire Agreement:</Text> This is the complete
        agreement between the parties and supersedes all prior discussions.
        {"\n\n"}
        <Text style={styles.bold}>Amendments:</Text> Must be in writing and
        signed by both parties.
        {"\n\n"}
        <Text style={styles.bold}>Severability:</Text> If any provision is held
        invalid, the remainder shall remain in effect.
      </Text>

      <Text style={styles.section}>
        IN WITNESS WHEREOF, the parties have executed this Agreement as of the
        Effective Date.
      </Text>

      <View style={styles.signatureSection}>
        <Text style={styles.subheading}>
          EXCLUSIVE RIGHTS TRANSFER CONFIRMATION
        </Text>

        <Text style={{ marginBottom: 15, fontSize: 10, fontWeight: "bold" }}>
          By signing below, both parties acknowledge this is an EXCLUSIVE
          LICENSE transferring comprehensive rights to the Licensee.
        </Text>

        <View>
          <Text>
            <Text style={styles.bold}>Licensor:</Text>
          </Text>
          <Text></Text>
        </View>
        <Text style={{ marginBottom: 5 }}>Name: {data.licensorName}</Text>
        <Text style={{ marginBottom: 15 }}>
          Signature: {data.signatureInitials} Date: {data.dateSigned}
        </Text>

        <View>
          <Text>
            <Text style={styles.bold}>Licensee:</Text>
          </Text>
          <Text></Text>
        </View>
        <Text style={{ marginBottom: 5 }}>Name: {data.licenseeName}</Text>
        <Text style={{ marginBottom: 15 }}>
          Signature: {data.signatureInitials} Date: {data.dateSigned}
        </Text>

        <Text style={{ marginTop: 20, fontSize: 9 }}>
          <Text style={styles.bold}>ACKNOWLEDGMENT:</Text> Licensee confirms
          understanding that this exclusive license grants comprehensive rights
          and prohibits Licensor from licensing this Composition to any other
          party from the Effective Date forward.
        </Text>
      </View>

      <Text style={styles.footer}>
        Producer Fury - Exclusive License Agreement & Rights Transfer
      </Text>
    </Page>
  </Document>
);

export default function LicensePage() {
  const [form, setForm] = useState<AgreementData>(defaultValues);
  const [customBeatTitle, setCustomBeatTitle] = useState("");

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

        // Auto-set license-dependent fields
        if (name === "licenseType") {
          if (value === "Standard") {
            Object.assign(updated, {
              price: "30",
              deliveryFormat: "WAV only (44.1kHz/16-bit)",
              streamLimit: "50,000 streams maximum",
              producerTag: "Included (cannot be removed)",
              stemsRequired: false,
              tagRemoval: false,
            });
          } else if (value === "Premium") {
            Object.assign(updated, {
              price: "200",
              deliveryFormat: "WAV + optional stems (44.1kHz/24-bit)",
              streamLimit: "Unlimited streams",
              producerTag: "Included (removal available for +$50)",
              stemsRequired: false,
              tagRemoval: false,
            });
          } else if (value === "Exclusive") {
            Object.assign(updated, {
              price: "800",
              deliveryFormat: "WAV + stems + MIDI files",
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

  // Validation function
  const isFormValid = () => {
    const requiredFields = [
      "licenseeName",
      "licenseeArtist",
      "licenseeLocation",
      "beatTitle",
      "deliveryEmail",
      "signatureName",
      "signatureInitials",
      "price",
    ];

    return requiredFields.every((field) => form[field as keyof AgreementData]);
  };

  const getPDFComponent = () => {
    switch (form.licenseType) {
      case "Standard":
        return <StandardLicensePDF data={form} />;
      case "Premium":
        return <PremiumLicensePDF data={form} />;
      case "Exclusive":
        return <ExclusiveLicensePDF data={form} />;
      default:
        return <StandardLicensePDF data={form} />;
    }
  };

  const getLicenseTypeDescription = () => {
    switch (form.licenseType) {
      case "Standard":
        return "Basic non-exclusive license with limited usage rights. Producer tag required.";
      case "Premium":
        return "Enhanced non-exclusive license with unlimited streams and optional stems.";
      case "Exclusive":
        return "Complete exclusive rights transfer. Producer cannot license beat to others.";
      default:
        return "";
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
                  <option value="Standard">Standard - $30</option>
                  <option value="Premium">Premium - $200</option>
                  <option value="Exclusive">Exclusive - Custom Price</option>
                </select>
              </label>
              <p className="text-sm text-slate-400 mt-1">
                {getLicenseTypeDescription()}
              </p>
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

          {/* Licensee Information */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Licensee Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                Legal Name *
                <input
                  type="text"
                  value={form.licenseeName}
                  onChange={onInput("licenseeName")}
                  placeholder="Full legal name"
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
              </label>

              <label className="block">
                Artist/Stage Name *
                <input
                  type="text"
                  value={form.licenseeArtist}
                  onChange={onInput("licenseeArtist")}
                  placeholder="Professional name"
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
              </label>

              <label className="block md:col-span-2">
                Location *
                <input
                  type="text"
                  value={form.licenseeLocation}
                  onChange={onInput("licenseeLocation")}
                  placeholder="City, State/Province, Country"
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
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
                    value={
                      beatTitles.includes(form.beatTitle)
                        ? form.beatTitle
                        : "Custom Beat Title"
                    }
                    onChange={handleBeatTitleChange}
                    className="p-3 rounded bg-slate-600 w-full mt-1"
                  >
                    <option value="">Select a beat...</option>
                    {beatTitles.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                  {(form.beatTitle === customBeatTitle ||
                    !beatTitles.includes(form.beatTitle)) && (
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
                  <p className="text-xs text-slate-400 mt-1">
                    Auto-filled based on license type
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* License Terms Display */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">License Terms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">
                  Delivery Format
                  <input
                    type="text"
                    value={form.deliveryFormat}
                    readOnly
                    className="p-3 rounded bg-slate-600 w-full mt-1 opacity-75"
                  />
                </label>
              </div>

              <div>
                <label className="block mb-2">
                  Stream/Sales Limit
                  <input
                    type="text"
                    value={form.streamLimit}
                    readOnly
                    className="p-3 rounded bg-slate-600 w-full mt-1 opacity-75"
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2">
                  Producer Tag Policy
                  <input
                    type="text"
                    value={form.producerTag}
                    readOnly
                    className="p-3 rounded bg-slate-600 w-full mt-1 opacity-75"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-slate-700 p-4 rounded">
            <h3 className="text-lg font-bold mb-4">Delivery Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                Delivery Email *
                <input
                  type="email"
                  value={form.deliveryEmail}
                  onChange={onInput("deliveryEmail")}
                  placeholder="email@example.com"
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
              </label>

              <div>
                <label className="block mb-2">Payment Date</label>
                <input
                  type="date"
                  value={form.paymentDate}
                  onChange={onInput("paymentDate")}
                  className="p-3 rounded bg-slate-600 w-full"
                />
              </div>
            </div>

            {/* License-specific options */}
            {form.licenseType !== "Standard" && (
              <div className="mt-4 space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={form.stemsRequired}
                    onChange={onInput("stemsRequired")}
                    disabled={form.licenseType === "Exclusive"}
                    className="w-4 h-4"
                  />
                  <span>
                    Request Stems/Trackouts{" "}
                    {form.licenseType === "Exclusive" && "(Included)"}
                  </span>
                </label>

                {form.licenseType === "Premium" && (
                  <label className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={form.tagRemoval}
                      onChange={onInput("tagRemoval")}
                      className="w-4 h-4"
                    />
                    <span>Request Producer Tag Removal (+$50)</span>
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
                <input
                  type="text"
                  value={form.signatureName}
                  onChange={onInput("signatureName")}
                  placeholder="Digital signature name"
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
              </label>

              <label className="block">
                Initials *
                <input
                  type="text"
                  value={form.signatureInitials}
                  onChange={onInput("signatureInitials")}
                  placeholder="Your initials"
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
              </label>

              <label className="block">
                Date Signed *
                <input
                  type="date"
                  value={form.dateSigned}
                  onChange={onInput("dateSigned")}
                  className="p-3 rounded bg-slate-600 w-full mt-1"
                />
              </label>
            </div>
          </div>

          {/* Form Validation & Download */}
          <div className="text-center">
            {isFormValid() ? (
              <PDFDownloadLink
                document={getPDFComponent()}
                fileName={`ProducerFury_${form.licenseType}_License_${
                  form.beatTitle.replace(/[^a-zA-Z0-9]/g, "_") || "Agreement"
                }.pdf`}
                className="inline-block"
              >
                {({ loading }) => (
                  <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 shadow-lg">
                    {loading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
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
                <button
                  className="bg-gray-600 px-8 py-4 rounded-lg font-bold text-lg cursor-not-allowed opacity-50"
                  disabled
                >
                  Complete Required Fields
                </button>
                <p className="text-red-400 text-sm mt-2">
                  Please fill in all required fields marked with *
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
                    <td className="text-center p-2">$30</td>
                    <td className="text-center p-2">$200</td>
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
                    <td className="text-center p-2">Optional</td>
                    <td className="text-center p-2">✅</td>
                  </tr>
                  <tr className="border-b border-slate-600">
                    <td className="p-2">Tag Removal</td>
                    <td className="text-center p-2">❌</td>
                    <td className="text-center p-2">+$50</td>
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
