export interface Project {
  _id: string;
  rank: number;
  clientId: string;
  title: string;
  routeLink: string;
  isLinkAbsolute: boolean;
  description: string;
  items: {
    title: string,
    description: string,
    link: string
  }[];
}
