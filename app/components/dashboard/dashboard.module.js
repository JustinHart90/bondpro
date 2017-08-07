import uirouter from '@uirouter/angularjs';
import angularMoment from 'angular-moment';

import DashboardRoutes from './dashboard.route';
import DashboardComponent from './dashboard.component';
import DashboardService from './dashboard.service';

export default angular
  .module('dashboard', [uirouter, angularMoment])
  .component('dashboard', DashboardComponent)
  .service('dashboardService', DashboardService)
  .config(DashboardRoutes);
