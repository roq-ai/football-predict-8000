import { BettorPredictionInterface } from 'interfaces/bettor-prediction';
import { FeedbackInterface } from 'interfaces/feedback';
import { MatchDataInterface } from 'interfaces/match-data';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface PredictionInterface {
  id?: string;
  match_id?: string;
  predicted_result: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  bettor_prediction?: BettorPredictionInterface[];
  feedback?: FeedbackInterface[];
  match_data?: MatchDataInterface;
  organization?: OrganizationInterface;
  _count?: {
    bettor_prediction?: number;
    feedback?: number;
  };
}

export interface PredictionGetQueryInterface extends GetQueryInterface {
  id?: string;
  match_id?: string;
  predicted_result?: string;
  organization_id?: string;
}
