import { Title, Box, Space } from '@mantine/core';
import MonacoEditor, {
  OnMount,
} from '@monaco-editor/react';

type Props = {
  title: string;
  onMount: OnMount;
  defaultValue?: string;
  defaultLanguage: string;
};

export const Editor: React.FC<Props> = ({
  title,
  onMount,
  defaultValue,
  defaultLanguage,
}) => {
  return (
    <Box
      w="50%"
      sx={{
        '@media screen and (max-width: 600px)': {
          width: '100%',
        },
      }}
    >
      <Title order={2}>{title}</Title>
      <Space h="md" />
      <MonacoEditor
        onMount={onMount}
        height="500px"
        theme="vs-dark"
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
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
  );
};
