interface DocumentRequired {
  marketplace: string;
  customer_id: number;
  review_id: string;
  product_id: string;
  product_parent: number;
  product_title: string;
  product_category: string;
  star_rating: number;
  helpful_votes: number;
  total_votes: number;
  vine: boolean;
  verified_purchase: boolean;
  review_headline: string;
  review_body: string;
  review_date: string;
}

interface DocumentOptional {
  marketplace?: string;
  customer_id?: number;
  review_id?: string;
  product_id?: string;
  product_parent?: number;
  product_title?: string;
  product_category?: string;
  star_rating?: number;
  helpful_votes?: number;
  total_votes?: number;
  vine?: boolean;
  verified_purchase?: boolean;
  review_headline?: string;
  review_body?: string;
  review_date?: string;
}

export type { DocumentRequired, DocumentOptional };
