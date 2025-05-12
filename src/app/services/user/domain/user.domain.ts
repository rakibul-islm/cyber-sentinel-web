export class Profile {
    id!: number;
    fullName!: string;
    email!: string;
    address!: string;
    phone!: string;
    mobile!: string;
    imageBase64!: string;
    roles!: string;
}

export class Register {
    fullName!: string;
    username!: string;
    password!: string;
    email!: string;
    address!: string;
    mobile!: string;
}
export class User {
    id!: number;
    fullName!: string;
    username!: string;
    password!: string;
    email!: string;
    address!: string;
    phone!: string;
    mobile!: string;
    active!: boolean;
    locked!: boolean;
    expiryDate!: Date;
    imageBase64!: string;
    superAdmin!: boolean;
    systemAdmin!: boolean;
    recruiterUser!: boolean;
    candidateUser!: boolean;
    roles!: string;
}