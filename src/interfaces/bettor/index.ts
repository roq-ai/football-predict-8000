import { BettorPredictionInterface } from 'interfaces/bettor-prediction';
import { FeedbackInterface } from 'interfaces/feedback';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BettorInterface {
  id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  bettor_prediction?: BettorPredictionInterface[];
  feedback?: FeedbackInterface[];
  user?: UserInterface;
  _count?: {
    bettor_prediction?: number;
    feedback?: number;
  };
}

export interface BettorGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
}
