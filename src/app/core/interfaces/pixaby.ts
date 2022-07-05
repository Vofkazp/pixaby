export interface Pixaby {
  hits: hitsItem[];
  total: number;
  totalHits: number;
}

export interface hitsItem {
  collections: number;
  comments: number;
  downloads: number;
  id: number;
  imageHeight: number;
  imageSize: number;
  imageWidth: number;
  largeImageURL: string;
  likes: number;
  pageURL: string;
  previewHeight: number;
  previewURL: string;
  previewWidth: number;
  tags: string;
  type: string;
  user: string;
  userImageURL: string;
  user_id: number;
  views: number;
  webformatHeight: number;
  webformatURL: string;
  webformatWidth: number;
}

export interface selectList {
  name: string;
  value: string;
}

export interface optionList {
  perPage: string;
  text: string | null;
  category: string;
  imageType: string;
  orientation: string;
  min_width: string;
  min_height: string;
  colors: string;
  editorsChoice: boolean;
  safesearch: boolean;
  order: string;
}
