import { stringify } from 'json2yaml';

export const getProperties = (data: any) => {
  return {
    required: Object.keys(data).map((v) => `{{${v}}}`),
    properties: {
      ...Object.fromEntries(
        Object.entries(data).map(([k, v]) => [
          k,
          {
            ...getTypeData(v),
            example: v,
          },
        ])
      ),
    },
  };
};

const getTypeData = (value: any): { [k: string]: any } => {
  if (typeof value === 'number') {
    return value.toString().split('.').length > 0
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
      items: getTypeData(value[0]),
    };
  }

  if (value instanceof Object) {
    return {
      type: '{{object}}',
      ...getProperties(value),
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

export const parseJsonToYaml = (jsonString: string) => {
  const data = JSON.parse(jsonString);

  return stringify({
    ...getProperties(data),
  })
    .replaceAll('"{{', '')
    .replaceAll('}}"', '');
};
