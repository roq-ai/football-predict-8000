const mapping: Record<string, string> = {
  bettors: 'bettor',
  'bettor-predictions': 'bettor_prediction',
  feedbacks: 'feedback',
  'match-data': 'match_data',
  organizations: 'organization',
  predictions: 'prediction',
  'team-members': 'team_member',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
