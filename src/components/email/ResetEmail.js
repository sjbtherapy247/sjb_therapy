import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text } from '@react-email/components';

const image = 'https://firebasestorage.googleapis.com/v0/b/sjbtherapy-365805.appspot.com/o/email.jpg?alt=media&token=5208b883-d055-4b40-9b08-9e2e07d88bc1';

export const SJBTherapyResetPasswordEmail = ({ email, link }) => (
  <Html>
    <Head />
    <Preview>SJB Therapy - Reset your password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img style={img} src={image} width="250" alt="SJB Therapy" />
        <Section>
          <Text style={text}>Hi {email},</Text>
          <Text style={text}>Someone recently requested a password change for your SJB Therapy account. If this was you, you can set a new password here:</Text>
          <Button style={button} href={link}>
            Reset password
          </Button>
          <Text style={text}>If you don&apos;t want to change your password or didn&apos;t request this, just ignore and delete this message.</Text>
          <Text style={text}>
            To keep your account secure, please don&apos;t forward this email to anyone. Head over to our Support Center for{' '}
            <Link style={anchor} href="https://simo-dev.vercel.app/support">
              more security tips.
            </Link>
          </Text>
          <Text style={text}>Simply Just Believe!</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default SJBTherapyResetPasswordEmail;

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0',
};

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px',
};

const text = {
  fontSize: '16px',
  fontFamily: "'Roboto', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px',
};

const img = {
  border: 'none',
};

const button = {
  backgroundColor: '#7987CB',
  borderRadius: '5px',
  color: '#fff',
  fontFamily: "'Roboto', 'Helvetica Neue', Arial",
  fontSize: '15px',
  fontWeight: '500',
  padding: '40px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'inline-block',
  alignItems: 'center',
  width: '210px',
};

const anchor = {
  textDecoration: 'underline',
};
