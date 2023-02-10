import Head from 'next/head';
import {
  AppShell,
  Header,
  Title,
  Container,
  Paper,
  Flex,
  Box,
  Button,
} from '@mantine/core';
import Editor, { OnMount } from '@monaco-editor/react';
import { editor } from 'monaco-editor/esm/vs/editor/editor.api';
import { useRef } from 'react';
import { parseJsonToYaml } from '@/lib/parseJsonToYaml';

export default function Home() {
  const jsonEditorRef =
    useRef<editor.IStandaloneCodeEditor>();
  const yamlEditorRef =
    useRef<editor.IStandaloneCodeEditor>();

  const handleJsonMount: OnMount = (editor) => {
    jsonEditorRef.current = editor;
  };

  const handleYamlMount: OnMount = (editor) => {
    yamlEditorRef.current = editor;
  };

  const handleSubmit = () => {
    try {
      const yaml = parseJsonToYaml(
        jsonEditorRef.current!.getValue() ?? '{}'
      );

      yamlEditorRef.current!.setValue(yaml);
    } catch (e) {
      alert('failed');
    }
  };

  return (
    <>
      <Head>
        <title>JSONWAGGER</title>
        <meta name="description" content="JSONWAGGER" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
        <Container size="xl">
          <Paper p={'xl'}>
            <Flex
              mih={50}
              gap="md"
              justify="center"
              align="center"
              direction="row"
            >
              <Box w="50%">
                <Title order={2}>Json</Title>
                <Editor
                  onMount={handleJsonMount}
                  height="500px"
                  theme="vs-dark"
                  defaultLanguage="json"
                  defaultValue={`{\n  "userId": "bfc19bf4-a964-11ed-afa1-0242ac120002",\n  "userName": "Mike",\n  "avatar": "aaaa",\n  "createdAt": "2022-11-11",\n  "updatedAt": "2022-11-11",\n  "age": 18\n}`}
                  options={{
                    padding: {
                      top: 10,
                    },
                    minimap: {
                      enabled: false,
                    },
                  }}
                />
              </Box>
              <Button
                variant="outline"
                radius="xl"
                sx={{ flexShrink: 0 }}
                onClick={handleSubmit}
              >
                Convert
              </Button>
              <Box w="50%">
                <Title order={2}>Swagger</Title>
                <Editor
                  height="500px"
                  theme="vs-dark"
                  defaultLanguage="yaml"
                  onMount={handleYamlMount}
                  options={{
                    minimap: {
                      enabled: false,
                    },
                  }}
                />
              </Box>
            </Flex>
          </Paper>
        </Container>
      </AppShell>
    </>
  );
}
