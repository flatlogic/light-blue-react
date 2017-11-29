import { DISMISS_ALERT } from '../constants';

export default function dismissAlert(id) {
  return {
    type: DISMISS_ALERT,
    id,
  };
}
