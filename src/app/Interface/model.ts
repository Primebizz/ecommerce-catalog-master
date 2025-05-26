export interface IModel {
    _id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category: string,
    type: string,
    stock: boolean
}


export class Model {
    // id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    type: string;
    stock: boolean


    constructor(){
    // this.id = 0;
    this.name = '';
    this.description = '';
    this.price = 0;
    this.imageUrl = '';
    this.category = '';
    this.type = '';
    this.stock = false;

    }
}

export interface Address {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface ViewedItem {
  productId: string;
  viewedAt: Date;
}

export interface ICat{
  name: string;
  type: string
}

export interface Preferences {
  theme: 'light' | 'dark';
  notifications: boolean;
  emailNotifications: boolean;
  smsNotifications: boolean;
  language: string;
  currency: string;
}

export class User{
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password?: string;
    addresses: Address[];
    role: string;
    isVerified: boolean;
    isAdmin: boolean;
    isBlocked: boolean;
    isDeleted: boolean;
    isActive: boolean;

    // Profile extras
    profilePicture?: string;
    dateOfBirth?: Date;
    gender?: string;
    referralCode?: string;
    lastActiveAt?: Date;
    twoFactorEnabled: boolean;

    // Commerce & engagement
    cartItems: CartItem[];
    orderHistory: string[];
    totalSpent: number;
    membershipTier: string;
    rewardPoints: number;
    wishlist: string[];
    recentlyViewed: ViewedItem[];

    // UI preferences
    preferences: Preferences;

    constructor(init?: Partial<User>) {
        this.firstName = init?.firstName ?? '';
        this.lastName = init?.lastName ?? '';
        this.email = init?.email ?? '';
        this.phone = init?.phone ?? 0;
        this.password = init?.password;
        this.addresses = init?.addresses ?? [];

        this.role = init?.role ?? 'userSignup';
        this.isVerified = init?.isVerified ?? false;
        this.isAdmin = init?.isAdmin ?? false;
        this.isBlocked = init?.isBlocked ?? false;
        this.isDeleted = init?.isDeleted ?? false;
        this.isActive = init?.isActive ?? true;

        this.profilePicture = init?.profilePicture;
        this.dateOfBirth = init?.dateOfBirth;
        this.gender = init?.gender;
        this.referralCode = init?.referralCode;
        this.lastActiveAt = init?.lastActiveAt;
        this.twoFactorEnabled = init?.twoFactorEnabled ?? false;

        this.cartItems = init?.cartItems ?? [];
        this.orderHistory = init?.orderHistory ?? [];
        this.totalSpent = init?.totalSpent ?? 0;
        this.membershipTier = init?.membershipTier ?? 'bronze';
        this.rewardPoints = init?.rewardPoints ?? 0;
        this.wishlist = init?.wishlist ?? [];
        this.recentlyViewed = init?.recentlyViewed ?? [];

        this.preferences = init?.preferences ?? {
        theme: 'light',
        notifications: true,
        emailNotifications: true,
        smsNotifications: false,
        language: 'en-US',
        currency: 'USD'
        };
    }
}

export interface IUser{
    firstName: string;
    lastName: string;
    email: string;
    phone: number;
    password: string;
    addresses: [];
    role: string

}

export class ApiResponse{
    status: boolean;
    message: string;
    data: any;
    token: string;
    user: User

    constructor(){
    this.status = false;
    this.message = '';
    this.data = null;
    this.token = '';
    this.user = new User();
    }
}