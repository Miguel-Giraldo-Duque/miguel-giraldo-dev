import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

export function ContactEmail({ fullName, company, email, message }) {
  return (
    <Html lang="es">
      <Head />
      <Preview>Nuevo mensaje de {fullName}</Preview>
      <Body style={body}>
        <Container style={card}>
          <Text style={brand}>miguelgd.com</Text>
          <Heading style={heading}>Nuevo mensaje de contacto</Heading>
          <Text style={line}>Nombre: {fullName}</Text>
          <Text style={line}>Compañía: {company || "—"}</Text>
          <Text style={line}>Email: {email}</Text>
          <Hr style={rule} />
          <Text style={messageStyle}>{message}</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#f4f4f0",
  fontFamily: "Arial, Helvetica, sans-serif",
  color: "#161616",
};

const card = {
  margin: "24px auto",
  padding: "32px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
};

const brand = {
  margin: "0 0 8px",
  color: "#9a8600",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

const heading = {
  margin: "0 0 16px",
  fontSize: "24px",
  lineHeight: "1.2",
};

const line = {
  margin: "0 0 8px",
  fontSize: "16px",
  lineHeight: "1.5",
};

const rule = {
  borderColor: "#ffe200",
  margin: "16px 0",
};

const messageStyle = {
  margin: 0,
  fontSize: "16px",
  lineHeight: "1.5",
  whiteSpace: "pre-wrap",
};
