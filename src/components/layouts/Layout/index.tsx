import {
  AppShell,
  Header,
  Title,
  Container,
  Paper,
} from '@mantine/core';

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <AppShell
      padding="md"
      header={
        <Container size="xl">
          <Header height={65} p="xs">
            <Title order={1}>JSONWAGGER</Title>
          </Header>
        </Container>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
          paddingTop: 65 + 32,
        },
      })}
    >
      <Container
        size="xl"
        sx={{
          '@media screen and (max-width: 600px)': {
            padding: 0,
          },
        }}
      >
        <Paper p={'xl'}>{children}</Paper>
      </Container>
    </AppShell>
  );
};
