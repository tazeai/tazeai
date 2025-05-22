import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
  Link,
} from '@react-email/components';

type SignInTemplateProps = {
  readonly url: string;
};

export const SignInTemplate = ({ url }: SignInTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your login request to VizoAI</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mt-8 rounded-md bg-zinc-200 p-px">
            <Section className="rounded-[5px] bg-white p-8">
              <Text className="mt-0 mb-4 font-semibold text-2xl text-zinc-950">
                Your login request to VizoAI
              </Text>
              <Link href={url} target="_blank">
                Login
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);
