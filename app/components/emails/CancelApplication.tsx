import {
  Body,
  Container,
  Column,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind
} from "@react-email/components";
import * as React from "react";

interface CancelApplicationEmailProps {
  username?: string;
  updatedDate?: Date;
  listingUrl?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const CancelApplicationEmail = ({
  username,
  updatedDate,
  listingUrl
}: CancelApplicationEmailProps) => {
  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(updatedDate);

  return (
    <Html>
      <Head />
      <Preview>Prestation annulée</Preview>
      <Tailwind>
      <Body style={main}>
        <Container style={container}>
          <Section style={logo}>
            <Img width={114} src={"https://www.dixino.be/_next/image?url=%2Fimages%2FDixino-logo.png&w=128&q=75"} />
          </Section>
          <Section style={sectionsBorders}>
            <Row>
              <Column style={sectionBorder} />
              <Column style={sectionCenter} />
              <Column style={sectionBorder} />
            </Row>
          </Section>
          <Section style={content}>
            <Text style={paragraph}>{username},</Text>
            <Text style={paragraph}>
              😞 Tu as malheureusement annulé votre prestation.
            </Text>
            <Text style={paragraph}>
              Voici un lien vers les offres encore disponibles {" "}
              <Link href={listingUrl} style={link}>
                Voir l{"'"}offre
              </Link>{" "}
            </Text>
            <Text style={paragraph}>
              Rappelle toi de consulter régulièrement les offres pour trouver celles qui te correspondent le mieux.
            </Text>
            <Text style={paragraph}>
              Tu as des questions ?{" "}
              <Link href="#" style={link} target="_blank">
                <a href="mailto:hello@dixino.be" className="text-[#FC75FF]">Dixino Support</a>
              </Link>
            </Text>
            <Text style={paragraph}>
              Merci,
              <br />
              Dixino
            </Text>
          </Section>
        </Container>

        <Section style={footer}>
          <Row>
            <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
              <Img src={`${baseUrl}/static/twitch-icon-twitter.png`} />
            </Column>
            <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
              <Img src={`${baseUrl}/static/twitch-icon-facebook.png`} />
            </Column>
          </Row>
          <Row>
            <Text style={{ textAlign: "center", color: "#706a7b" }}>
              © 2024 Dixino, Tous droits réservés <br />
              Dixino, trouvez les prestations qui vous correspondent !
            </Text>
          </Row>
        </Section>
      </Body>
      </Tailwind>
    </Html>
  );
};

CancelApplicationEmail.PreviewProps = {
  username: "alanturing",
  updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as CancelApplicationEmailProps;

export default CancelApplicationEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
  backgroundColor: "#efeef1",
  fontFamily,
};

const paragraph = {
  lineHeight: 1.5,
  fontSize: 14,
};

const container = {
  maxWidth: "580px",
  margin: "30px auto",
  backgroundColor: "#ffffff",
};

const footer = {
  maxWidth: "580px",
  margin: "0 auto",
};

const content = {
  padding: "5px 20px 10px 20px",
};

const logo = {
  display: "flex",
  justifyContent: "center",
  alingItems: "center",
  padding: 30,
};

const sectionsBorders = {
  width: "100%",
  display: "flex",
};

const sectionBorder = {
  borderBottom: "1px solid rgb(238,238,238)",
  width: "249px",
};

const sectionCenter = {
  borderBottom: "1px solid rgb(145,71,255)",
  width: "102px",
};

const link = {
  textDecoration: "underline",
  color: "#FC75FF"
};
