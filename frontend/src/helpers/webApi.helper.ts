
export interface IRequestArgs {
  method?: string;
  endpoint: string;
  credentials?: string;
  args?: { [key: string]: string };
  body?: object;
}

function formatArgs(args: { [key: string]: string }): string {
  let res = '';
  for (const key in args) {
    res += `${key}=${args[key]}`;
  }
  return res;
}

function getFetchUrl(args: IRequestArgs) {
  console.log(process.env.BACKEND_ADDRESS);
  return `https://studqueue.ninja` + args.endpoint + (args.args ? `?${formatArgs(args.args)}` : '');
}

function getFetchArgs(args: IRequestArgs): RequestInit {
  const headers: any = {};
  headers['Content-Type'] = 'application/json';
  // headers.Accept = 'application/json';
  return {
    method: args.method,
    headers,
    credentials: args.credentials as RequestCredentials,
    body: JSON.stringify(args.body)
  };
}

export async function throwIfResponseFailed(res: Response) {
  console.log(res.status);
  // 200 - OK
  // 201 - CREATED
  // 410 - Gone (DELETED)
  if (res.status !== 200 && res.status !== 201 && res.status !== 204 && res.status !== 410) {
    const data = await res.text()
    console.log(data);
    throw data;
  }
}

export async function callWebApi(args: IRequestArgs) {
  args.credentials = 'include';
  const res = await fetch(getFetchUrl(args), getFetchArgs(args));
  await throwIfResponseFailed(res);
  return res;
}

const apiClient = {
  get: (args: IRequestArgs) => callWebApi({ method: 'GET', ...args }),
  post: (args: IRequestArgs) => callWebApi({ method: 'POST', ...args }),
  put: (args: IRequestArgs) => callWebApi({ method: 'PUT', ...args }),
  delete: (args: IRequestArgs) => callWebApi({ method: 'DELETE', ...args })
};

export default apiClient;
