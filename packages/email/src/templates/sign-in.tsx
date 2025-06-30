import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';

type SignInTemplateProps = {
  url: string;
  name: string;
};

export const SignInTemplate = ({ url, name }: SignInTemplateProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your login request to {name}</Preview>
      <Body className="bg-zinc-50 font-sans">
        <Container className="mx-auto py-12">
          <Section className="mt-8 rounded-md bg-zinc-200 p-px">
            <Section className="rounded-[5px] bg-white p-8">
              <Text className="mt-0 mb-4 font-semibold text-2xl text-zinc-950">
                Your login request to {name}
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
