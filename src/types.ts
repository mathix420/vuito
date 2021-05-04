export type VRow = {
  test(value: unknown): boolean;
  onlyIf?(parent: Record<string, unknown>): boolean;
  message: string;
};

export type VTemplateRow = Array<VRow> & {
  check(value: unknown, parent: Record<string, unknown>): Promise<void>;
};

export type VInputTemplate = {
  [key: string]: Array<VRow>;
};

export type VKeys = {
  [key: string]: VTemplateRow;
};

export type VTemplate = VKeys & {
  check(object: Record<string, unknown>): Promise<void>;
};

export type VLengthy = unknown & {
  length: number;
};
