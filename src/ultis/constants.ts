export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';
//export const APIHost = 'http://api.training.div3.pgtest.co/api/v1'

export const ACCESS_TOKEN_KEY = 'token';
