export interface ICreateNewUserParams {
    Email: string,
    FirstName: string,
    LastName: string
    Password: string,
    ConfirmPassword: string,
    Membership: string,
    Type: string,
    AccessLevel: string,
    ForceChangePassword: number,
    Role: IRoleParams[],
    TaxExempt: number,
}

export interface IRoleParams {
    label: string,
    role: string,
}
