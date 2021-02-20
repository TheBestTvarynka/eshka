import Cookies from 'js-cookie';

const createAuthHelper = () => {
  const COOKIE_NAME = 'SessionCookies';

  let token: string | null | undefined = Cookies.get('SessionCookies')
    ? Cookies.get(COOKIE_NAME)
    : null;

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
      Cookies.set(COOKIE_NAME, newToken, { path: '/', domain: 'eshka-lcmhz73rka-uc.a.run.app' });
    } else {
      Cookies.remove(COOKIE_NAME);
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
