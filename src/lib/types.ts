export type UserNameType = {
  username: string;
};

export type VisitorType = {
  visitor: string;
};

export type PageParams<T extends Record<string, string | string[]>> = {
  params: Promise<T>;
};

export type RouteLayoutType = {
  children: React.ReactNode;
};
