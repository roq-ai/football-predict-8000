import { BettorInterface } from 'interfaces/bettor';
import { PredictionInterface } from 'interfaces/prediction';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackInterface {
  id?: string;
  content: string;
  bettor_id?: string;
  prediction_id?: string;
  created_at?: any;
  updated_at?: any;

  bettor?: BettorInterface;
  prediction?: PredictionInterface;
  _count?: {};
}

export interface FeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  content?: string;
  bettor_id?: string;
  prediction_id?: string;
}
