import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import thunk from "redux-thunk";
import { render } from "react-dom";
import React from 'react';
import { Provider } from "react-redux";
import rootReducer from "./reducers/index";
import Dashboard from './components/dashboard';
// import mainListItems from './components/listitems';
// import Title from './components/title';
import LandingPage from './components/landingpage'
import PlantLibrary from './components/plantlibrary'
import Recommendations from './components/recommendations'
import MySpacesDashboard from './components/MySpacesDashboard'
import MyPlantsDashboard from './components/MyPlantsDashboard'
import PlantLibraryDashboard from './components/PlantLibraryDashboard'
import PlantDetailDashboard from './components/PlantDetailDashboard'
import ScheduleDashboard from './components/ScheduleDashboard'
import SignInPage from './components/SignInPage'
import WishListDashboard from './components/WishListDashboard'


const store = createStore(rootReducer, {}, applyMiddleware(thunk));

render(
    <Provider store={store}>
      <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SignInPage} />
            <Route exact path="/create" component={Dashboard} />
            <Route exact path="/my_spaces" component={MySpacesDashboard} />
            <Route exact path="/my_plants" component={MyPlantsDashboard} />
            <Route exact path='/wishlist' component={WishListDashboard} />
            <Route exact path="/plant_library" component={PlantLibraryDashboard} />
            <Route exact path="/:plantId/plantdetail" component={PlantDetailDashboard} />
            <Route exact path="/schedule" component={ScheduleDashboard} />
          </Switch>
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );