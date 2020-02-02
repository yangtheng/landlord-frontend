import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from '../../pages/App/App';

const AppContainer = connect(null)(App);

export default withRouter(AppContainer);
