import { connect } from 'react-redux';
import Spinner from '../components/Spinner';

const mapStateToProps = ({ spinner }) => {
  return spinner;
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

const SpinnerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Spinner);

export default SpinnerContainer;
