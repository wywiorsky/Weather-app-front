import agent from './agent';


const promiseMiddleware = store => next => action => {
  if (isPromise(action.payload)) {
  
    const currentView = store.getState().viewChangeCounter;
    const skipTracking = action.skipTracking;

    action.payload.then(
      res => {
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
        action.payload = res
        store.dispatch(action);
      },
      error => {
        console.log(error);
        return;
        const currentState = store.getState()
        if (!skipTracking && currentState.viewChangeCounter !== currentView) {
          return
        }
       
        action.error = true;
        action.payload = error.response.body;
        if (!action.skipTracking) {
         
        }
        store.dispatch(action);
      }
    );

    return;
  }

  next(action);
};


function isPromise(v) {
  return v && typeof v.then === 'function';
}


export { promiseMiddleware }
