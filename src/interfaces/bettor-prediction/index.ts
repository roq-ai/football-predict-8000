import { BettorInterface } from 'interfaces/bettor';
import { PredictionInterface } from 'interfaces/prediction';
import { GetQueryInterface } from 'interfaces';

export interface BettorPredictionInterface {
  id?: string;
  bettor_id?: string;
  prediction_id?: string;
  created_at?: any;
  updated_at?: any;

  bettor?: BettorInterface;
  prediction?: PredictionInterface;
  _count?: {};
}

export interface BettorPredictionGetQueryInterface extends GetQueryInterface {
  id?: string;
  bettor_id?: string;
  prediction_id?: string;
}
