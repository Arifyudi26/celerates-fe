import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { User } from "@/lib/types";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    backgroundColor: "#f8f9fa",
    position: "relative",
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
    paddingVertical: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    marginBottom: 25,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  sectionContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    shadowColor: "#aaa",
    shadowOpacity: 0.5,
    shadowRadius: 6,
    border: "1 solid #ddd",
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#007bff",
    borderBottom: "2 solid #007bff",
    paddingBottom: 5,
  },
  text: {
    fontSize: 12,
    color: "#333",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    width: "48%",
  },
  addressSection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    border: "1 solid #007bff",
  },
  companySection: {
    marginTop: 15,
    padding: 15,
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    border: "1 solid #28a745",
  },
  watermark: {
    position: "absolute",
    fontSize: 60,
    color: "#dddddd",
    opacity: 0.2,
    textAlign: "center",
    top: "40%",
    left: "5%",
    right: "5%",
    transform: "rotate(-30deg)",
  },
  divider: {
    borderBottom: "1 solid #ddd",
    marginVertical: 10,
  },
});

interface PdfUserModernProps {
  user: User | null;
}

export default function PdfUserModern({ user }: PdfUserModernProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark */}
        <Text style={styles.watermark}>CONFIDENTIAL</Text>

        <Text style={styles.header}>User Profile</Text>

        {/* Personal Information */}
        <View style={styles.sectionContainer}>
          <Text style={styles.subHeader}>Personal Information</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.text}>Name: {user?.name}</Text>
              <Text style={styles.text}>Email: {user?.email}</Text>
              <Text style={styles.text}>Phone: {user?.phone}</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.text}>Username: {user?.username}</Text>
              <Text style={styles.text}>Website: {user?.website}</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        {/* Address Section */}
        <View style={styles.addressSection}>
          <Text style={styles.subHeader}>Address</Text>
          <Text style={styles.text}>Street: {user?.address.street}</Text>
          <Text style={styles.text}>Suite: {user?.address.suite}</Text>
          <Text style={styles.text}>City: {user?.address.city}</Text>
          <Text style={styles.text}>Zipcode: {user?.address.zipcode}</Text>
        </View>

        <View style={styles.divider} />

        {/* Company Section */}
        <View style={styles.companySection}>
          <Text style={styles.subHeader}>Company</Text>
          <Text style={styles.text}>Name: {user?.company.name}</Text>
          <Text style={styles.text}>
            Catchphrase: {user?.company.catchPhrase}
          </Text>
          <Text style={styles.text}>Business: {user?.company.bs}</Text>
        </View>
      </Page>
    </Document>
  );
}
