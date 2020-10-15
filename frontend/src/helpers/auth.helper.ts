import Cookies from 'js-cookie';

const createAuthHelper = () => {
  console.log(Cookies.get('Authentication'));
  let token: string | null | undefined = Cookies.get('Authentication') ? Cookies.get('Authentication') : null;

  let observers: Array<(isLogged: boolean) => void> = [];

  const subscribe = (observer: (isLogged: boolean) => void) => {
    observers.push(observer);
  };

  const unsubscribe = (observer: (isLogged: boolean) => void) => {
    observers = observers.filter(_observer => _observer !== observer);
  };

  const notify = () => {
    const isLogged = isLoggedIn();
    observers.forEach(observer => observer(isLogged));
  };

  const setToken = (newToken: typeof token) => {
    if (newToken) {
      Cookies.set('Authentication', newToken);
    } else {
      Cookies.remove('Authentication');
    }
    token = newToken;
    notify();
  }

  const getToken = () => token;

  const isLoggedIn = () => !!token;

  return {
    getToken,
    isLoggedIn,
    setToken,
    subscribe,
    unsubscribe
  };
}

export default createAuthHelper();