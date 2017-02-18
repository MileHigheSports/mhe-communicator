export default {
  setMessage: (message) => {
    return {
      type: 'SET_MESSAGE',
      message: message,
    }
  }
};
