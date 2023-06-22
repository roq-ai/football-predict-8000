import { PredictionInterface } from 'interfaces/prediction';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface MatchDataInterface {
  id?: string;
  data: string;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  prediction?: PredictionInterface[];
  organization?: OrganizationInterface;
  _count?: {
    prediction?: number;
  };
}

export interface MatchDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  data?: string;
  organization_id?: string;
}
