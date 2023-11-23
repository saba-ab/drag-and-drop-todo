export type Item = {
  id: string;
  content: string;
};

export type Group = {
  groupName: string;
  items: Item[];
};

export type GroupItems = Group[];
