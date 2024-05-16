export type TypeItem = {
  token_address: string;
  user_id: string;
  name: string;
  description: string;
  product_story: string;
  price: 0;
  currency: string;
  status: string;
  qr_url: string;
  nft_check_url: string;
  image_url: string;
  history: [
    {
      creator: string;
      date: string;
      action: string;
      photos_videos: string;
    }
  ];
};
