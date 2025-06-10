export interface IModel {
    _id: string,
    name: string,
    description: string,
    price: number,
    imageUrl: string,
    category: string,
    type: string,
    reviews: Reviews[];
    totalNoReviews?: number;
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
    reviews: Reviews[];
    totalNoReviews?: number;
    stock: boolean


    constructor(init?: Partial<Model>) {
    // this.id = 0;
    this.name = '';
    this.description = '';
    this.price = 0;
    this.imageUrl = '';
    this.category = '';
    this.type = '';
    this.reviews = init?.reviews ?? [];
    this.totalNoReviews = init?.reviews ? init.reviews.length : 0;
    this.stock = false;

    }
}

export interface Reviews{
  _id: string;
  author: string;
  rating: number;
  comment: string;
  date: Date;
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
  Id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
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
    orderHistory: Order[];
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

export interface LineItem {
  productId: string;
  name: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  _id: string;
  userId: string;
  items: LineItem[];
  shippingAddress: {
    line1: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string; // e.g. “Credit Card”
  subtotal: number;
  tax: number;
  shippingFee: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  createdAt: string;
  updatedAt: string;
}
