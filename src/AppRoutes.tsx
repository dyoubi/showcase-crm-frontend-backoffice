import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';
import { routes } from '@/libs/router/constants';
import { RESTRICTED_EMAILS } from '@/constants';
import { IconsShowCase } from '@/shared/Icons/IconsShowCase.stories';
import { Article } from './pages/Article';
import { Articles } from './pages/Articles';
import { Bonus } from './pages/Bonus';
import { Bonuses } from './pages/Bonuses';
import { Carousel } from './pages/Carousel';
import { Carousels } from './pages/Carousels';
import { CasinoSettings } from './pages/CasinoSettings';
// import { Dashboard } from './pages/Dashboard';
import { EditCategory } from './pages/EditCategory';
import { GamesCategories } from './pages/GamesCategories';
import { LoginSession } from './pages/LoginSession';
import { MachinesViews } from './pages/MachinesViews';
import { PaymentMandateDetail } from './pages/Finance/PaymentMandateDetail';
import { PaymentMandates } from './pages/Finance/PaymentMandates';
import { PlayerForm } from './pages/PlayerForm';
import { Players } from './pages/Players';
import { Promotion } from './pages/Promotion';
import { Promotions } from './pages/Promotions';
import { Providers } from './pages/ProviderViews';
import { SegmentEdit } from './pages/SegmentEdit';
import { Segments } from './pages/Segments';
import { Tags } from './pages/Tags';
import { WithdrawalDemandDetail } from './pages/Finance/WithdrawalDemandDetail';
import { WithdrawalDemands } from './pages/Finance/WithdrawalDemands';
import { MediaManagement } from './pages/MediaManagement';
import Forbidden from './components/Forbidden';

const AppRoutes = () => {
  const { user } = useAuth();
  const userEmail = user?.profile?.email;
  const isRestricted = userEmail && RESTRICTED_EMAILS.includes(userEmail);

  if (isRestricted) {
    return (
      <Routes>
        <Route path={routes.DASHBOARD} element={<Navigate to={routes.PLAYERS_LIST} />} />
        <Route path={routes.PLAYERS_LIST} element={<Players />} />
        <Route path={routes.EDIT_PLAYER} element={<PlayerForm />} />
        <Route path="*" element={<Forbidden />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path={routes.DASHBOARD} element={<Navigate to={routes.PLAYERS_LIST} />} />
      <Route path={routes.PLAYERS_LIST} element={<Players />} />
      <Route path={routes.EDIT_PLAYER} element={<PlayerForm />} />
      <Route path={routes.GAMES_LIST} element={<MachinesViews />} />
      <Route path={routes.GAMES_CATEGORIES} element={<GamesCategories />} />
      <Route path={routes.GAMES_TAGS} element={<Tags />} />
      <Route path={routes.GAME_EDIT_CATEGORY} element={<EditCategory />} />
      <Route path={routes.SEGMENTS} element={<Segments />} />
      <Route path={routes.SEGMENT_EDIT} element={<SegmentEdit />} />
      <Route path={routes.LOGIN_SESSION} element={<LoginSession />} />
      <Route path={routes.BONUS} element={<Bonus />} />
      <Route path={routes.BONUSES} element={<Bonuses />} />
      <Route path={routes.PAYMENT_DETAIL} element={<PaymentMandateDetail />} />
      <Route path={routes.PAYMENTS} element={<PaymentMandates />} />
      <Route path={routes.PROMOTION} element={<Promotion />} />
      <Route path={routes.PROMOTIONS} element={<Promotions />} />
      <Route path={routes.CAROUSELS} element={<Carousels />} />
      <Route path={routes.CAROUSEL} element={<Carousel />} />
      <Route path={routes.ARTICLES} element={<Articles />} />
      <Route path={routes.ARTICLE} element={<Article />} />
      <Route
        path={routes.CASINO_SETTINGS_ROOT}
        element={<Navigate to={routes.CASINO_SETTINGS_FOOTER} />}
      />
      <Route path={routes.CASINO_SETTINGS} element={<CasinoSettings />} />
      <Route path={routes.PROVIDERS} element={<Providers />} />
      <Route path="icons" element={<IconsShowCase />} />
      <Route path={routes.WITHDRAWAL_DETAIL} element={<WithdrawalDemandDetail />} />
      <Route path={routes.WITHDRAWALS} element={<WithdrawalDemands />} />
      <Route path={routes.MEDIAMANAGER} element={<MediaManagement />} />
    </Routes>
  );
};

export default AppRoutes;
