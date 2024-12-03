export function formatDateToTurkish(dateStr: string): string {
    // ISO 8601 formatındaki tarihi Date nesnesine çeviriyoruz
    const date = new Date(dateStr);
  
    // Türkçe tarih ve saat formatı için seçenekler
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',  // Hafta günü ismi
      year: 'numeric',  // Yıl
      month: 'long',    // Ay ismi
      day: 'numeric',   // Gün
      hour: 'numeric',  // Saat
      minute: 'numeric',// Dakika
      second: 'numeric',// Saniye
      timeZoneName: 'short', // Zaman dilimi ismi (UTC veya GMT gibi)
      hour12: false,  // 24 saat formatı
    };
  
    // Türkçe dilinde tarih ve saati formatlıyoruz
    return new Intl.DateTimeFormat('tr-TR', options).format(date);
  }
  

 
  