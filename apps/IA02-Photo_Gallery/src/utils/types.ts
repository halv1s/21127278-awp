export enum QueryKey {
  Photos = 'photos',
}

export interface IPhoto {
  id: string;
  url: string;
  thumb: string;
  authorName: string;
  authorAvatar: string;
  desc: string;
}
