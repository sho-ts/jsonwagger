import type { OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor/esm/vs/editor/editor.api';

import { useRef } from 'react';
import { parseJsonToYaml } from '@/lib/parseJsonToYaml';

import Head from 'next/head';
import { Flex, Button } from '@mantine/core';
import { Editor } from '@/components/parts';
import { Layout } from '@/components/layouts';

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
      <Layout>
        <Flex
          mih={50}
          gap="md"
          justify="center"
          align="center"
          direction="row"
          sx={{
            '@media screen and (max-width: 600px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Editor
            title="JSON"
            onMount={handleJsonMount}
            defaultLanguage="json"
            defaultValue={`{\n  "userId": "bfc19bf4-a964-11ed-afa1-0242ac120002",\n  "userName": "Mike",\n  "avatar": "aaaa",\n  "createdAt": "2022-11-11",\n  "updatedAt": "2022-11-11",\n  "age": 18\n}`}
          />
          <Button
            variant="outline"
            radius="xl"
            sx={{ flexShrink: 0 }}
            onClick={handleSubmit}
          >
            Convert
          </Button>
          <Editor
            title="Swagger"
            defaultLanguage="yaml"
            onMount={handleYamlMount}
          />
        </Flex>
      </Layout>
    </>
  );
}
