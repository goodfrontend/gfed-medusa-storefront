// Sanity CMS / Portable Text types — manually maintained (not codegen-generated)

export type SanityFileAsset = {
  __typename?: 'SanityFileAsset';
  _id: string;
  mimeType?: string | null;
  originalFilename?: string | null;
  size?: number | null;
  url: string;
};

export type SanityImageAsset = {
  __typename?: 'SanityImageAsset';
  _id: string;
  metadata?: {
    dimensions?: {
      aspectRatio: number;
      height: number;
      width: number;
    } | null;
    hasAlpha?: boolean | null;
    isOpaque?: boolean | null;
  } | null;
  url: string;
};

export type SanityImage = {
  __typename?: 'SanityImage';
  alt?: string | null;
  asset?: SanityImageAsset | null;
  caption?: string | null;
};

export type FileBlock = {
  __typename?: 'FileBlock';
  _key: string;
  _type: string;
  asset?: SanityFileAsset | null;
};

export type ImageBlock = {
  __typename?: 'ImageBlock';
  _key: string;
  _type: string;
  alt?: string | null;
  asset?: SanityImageAsset | null;
  caption?: string | null;
};

export type LinkMark = {
  __typename?: 'LinkMark';
  _key: string;
  _type: string;
  href: string;
  target?: string | null;
};

export type IconLinkMark = {
  __typename?: 'IconLinkMark';
  _key: string;
  _type: string;
  href: string;
  iconClass?: string | null;
  iconComponent?: string | null;
  iconFill?: string | null;
  iconImage?: SanityImage | null;
  iconType: string;
  iconUrl?: string | null;
  target?: string | null;
};

export type MarkDef = IconLinkMark | LinkMark;

export type Span = {
  __typename?: 'Span';
  _key: string;
  _type: string;
  marks?: string[] | null;
  text: string;
};

export type TextBlock = {
  __typename?: 'TextBlock';
  _key: string;
  _type: string;
  children: Span[];
  level?: number | null;
  listItem?: string | null;
  markDefs?: MarkDef[] | null;
  style?: string | null;
};

export type RichTextBlock = FileBlock | ImageBlock | TextBlock;
