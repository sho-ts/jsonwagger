import { stringify } from 'json2yaml';

export const getProperties = (
  value: any,
  required: boolean
) => {
  const data: { [k: string]: any } = {};

  if (required) {
    data.required = Object.keys(value).map(
      (v) => `{{${v}}}`
    );
  }

  return {
    ...data,
    properties: {
      ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          {
            ...getTypeData(v, required),
            example: v,
          },
        ])
      ),
    },
  };
};

const getTypeData = (
  value: any,
  required: boolean
): { [k: string]: any } => {
  if (typeof value === 'number') {
    return value.toString().split('.').length > 1
      ? {
          type: '{{number}}',
          format: '{{float}}',
        }
      : {
          type: '{{integer}}',
          format: '{{int64}}',
        };
  }

  if (value instanceof Array) {
    return {
      type: '{{array}}',
      items: getTypeData(value[0] ?? '', required),
    };
  }

  if (value instanceof Object) {
    return {
      type: '{{object}}',
      ...getProperties(value, required),
    };
  }

  if (typeof value === 'boolean') {
    return {
      type: '{{boolean}}',
    };
  }

  if (!Number.isNaN(new Date(value).getTime())) {
    return {
      type: '{{string}}',
      format: '{{date}}',
    };
  }

  return {
    type: '{{string}}',
  };
};

export const parseJsonToYaml = (
  jsonString: string,
  required: boolean
) => {
  const data = JSON.parse(jsonString);

  return stringify({
    ...getProperties(data, required),
  })
    .replaceAll('"{{', '')
    .replaceAll('}}"', '');
};
