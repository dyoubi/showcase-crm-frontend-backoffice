export type Query = {
  [key: string]: {
    eq?: string | number;
    neq?: string | number;
    gt?: number;
    gte?: number;
    lt?: number;
    lte?: number;
  };
};

export type Operators = keyof Query[string];

export type Filter = Partial<{
  [key2 in 'and' | 'or']: Array<Query>;
}>;

export type Condition = {
  [key: string]: Filter;
};

export type Conditions = Array<Condition>;

export interface Segment {
  id: string;
  name: string;
  created: string;
  updated: string;
  query: { data: Conditions };
}

export type GetSegmentsResponse = Array<Segment>;
export type GetSegmentResponse = Segment;

export type PostSegmentPayload = Partial<Omit<Segment, 'updated' | 'created'>>;
