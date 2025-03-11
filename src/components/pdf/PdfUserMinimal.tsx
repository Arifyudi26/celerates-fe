import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { User } from "@/lib/types";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12, backgroundColor: "#f0f2f5" },
  sectionContainer: {
    marginTop: 15,
    padding: 15,
    borderRadius: 8,
    border: "2 solid #ccc",
    backgroundColor: "#ffffff",
    shadowColor: "#aaa",
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  header: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#007bff",
    borderBottom: "4 solid #007bff",
    paddingBottom: 10,
  },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#222",
  },
  text: { fontSize: 12, color: "#444", marginBottom: 5 },
  addressSection: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#d1ecf1",
    borderRadius: 8,
    border: "2 solid #0c5460",
  },
  companySection: {
    marginTop: 10,
    padding: 15,
    backgroundColor: "#d4edda",
    borderRadius: 8,
    border: "2 solid #155724",
  },
  watermark: {
    position: "absolute",
    fontSize: 80,
    color: "#aaaaaa",
    opacity: 0.35,
    textAlign: "center",
    top: "35%",
    left: 0,
    right: 0,
    transform: "rotate(-30deg)",
  },
});

interface PdfUserMinimalProps {
  user: User | null;
}

export default function PdfUserMinimal({ user }: PdfUserMinimalProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Watermark for document protection */}
        <Text style={styles.watermark}>CONFIDENTIAL</Text>

        {/* Header */}
        <Text style={styles.header}>User Profile</Text>

        {/* Personal Information Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.subHeader}>Personal Information</Text>
          <Text style={styles.text}>Name: {user?.name}</Text>
          <Text style={styles.text}>Username: {user?.username}</Text>
          <Text style={styles.text}>Email: {user?.email}</Text>
          <Text style={styles.text}>Phone: {user?.phone}</Text>
          <Text style={styles.text}>Website: {user?.website}</Text>
        </View>

        {/* Address Section */}
        <View style={styles.addressSection}>
          <Text style={styles.subHeader}>Address</Text>
          <Text style={styles.text}>Street: {user?.address.street}</Text>
          <Text style={styles.text}>Suite: {user?.address.suite}</Text>
          <Text style={styles.text}>City: {user?.address.city}</Text>
          <Text style={styles.text}>Zipcode: {user?.address.zipcode}</Text>
          <Text style={styles.text}>
            Geo: {user?.address.geo.lat}, {user?.address.geo.lng}
          </Text>
        </View>

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
