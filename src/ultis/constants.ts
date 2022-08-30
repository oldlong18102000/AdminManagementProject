export const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const APIHost = development ? '/api' : 'https://google.com';
export const APIHost2 = development ? '/apiAdmin' : 'https://google.com';
export const APIHostVendor = development ? '/apiVendor' : 'https://google.com';


export const APIHostConst = 'https://api.gearfocus.div4.pgtest.co'

export const ACCESS_TOKEN_KEY = 'token';

export const GENDERS = [
    {
        label: 'Nam',
        value: 'Male'
    },
    {
        label: 'Nữ',
        value: 'FeMale'
    }

]
