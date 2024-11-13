interface Location {
    value: string; // Şehir veya ilçe ID'si (string)
    label: string; // Şehir veya ilçe adı (string)
    _id: string; // MongoDB benzersiz ID'si (string)
  }
  
  interface User {
    city: Location; // Şehir bilgisi (Location tipinde)
    createdAt: string; // Kullanıcının oluşturulma tarihi (ISO 8601 formatında string)
    district: Location; // İlçe bilgisi (Location tipinde)
    email: string; // Kullanıcı e-posta adresi (string)
    fullname: string; // Kullanıcı adı soyadı (string)
    is_superadmin: boolean; // Süper admin mi? (boolean)
    password: string; // Şifre (hashlenmiş veya normal string olarak saklanabilir)
    updatedAt: string; // Kullanıcı güncellenme tarihi (ISO 8601 formatında string)              // MongoDB versiyon numarası (number)
    _id: string; // Kullanıcı ID'si (MongoDB ID'si, string)
  }
  
  export interface Book {
    author: string; // Yazar adı (string)
    price: string; // Yazar adı (string)
    bookStore: string; // Kitapçı adı (string)
    createdAt: string; // Kitap oluşturulma tarihi (ISO 8601 formatında string)
    description: string; // Kitap açıklaması (string)
    isActive: boolean; // Kitap aktif mi (boolean)
    isDeleted: boolean; // Kitap silindi mi (boolean)
    name: string; // Kitap adı (string)
    photo: string; // Kitap fotoğrafı URL (string)
    publishmentYear: string; // Yayın yılı (string)
    updatedAt: string; // Kitap güncellenme tarihi (ISO 8601 formatında string)
    user_id: User; // Kullanıcı ID'si (string)
    __v: number; // MongoDB versiyon numarası (number)
    _id: string; // Kitap ID'si (string)
  }

  declare module 'jsonwebtoken' {
    var jwt: any;
    export = jwt;
  }

  // user.types.ts veya benzer bir dosyada
export interface CityDistrict {
  value: string;
  label: string;
  _id: string; 
}

export interface User {
  _id: string; 
  fullname: string;
  email: string;
  password: string;
  city: CityDistrict;
  district: CityDistrict;
  is_superadmin: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
