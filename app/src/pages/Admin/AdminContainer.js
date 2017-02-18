import { connect } from 'react-redux';
import message from '../../actions/message';

import Admin from './Admin';

const mapStateToProps = (state) => {
  return {
    message: state.messages.message,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onMessageSubmit: (msg) => {
      dispatch(message.setMessage(msg));
    },
  };
};

const AdminContainer = connect(mapStateToProps, mapDispatchToProps)(Admin);

export default AdminContainer;
