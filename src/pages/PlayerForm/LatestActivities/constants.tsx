import { DailyActivitiesTab } from './DailyActivitiesTab';
import { GameSessionsTab } from './GameSessionsTab';

export const tabs = [{
  title: 'Game Session',
  content: GameSessionsTab,
  tabId: 'game-sessions',
}, {
  title: 'Daily Activities',
  content: DailyActivitiesTab,
  tabId: 'daily-activities',
}] as const;
