export interface Story {
  id: number;
  by: string;
  title: string;
  score: number;
  url: string;
  kids?: number[]; // Comment IDs
}
