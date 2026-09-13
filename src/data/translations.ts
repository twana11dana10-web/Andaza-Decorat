export type Language = 'en' | 'ar' | 'ku' | 'tr'

export interface LanguageOption {
  code: Language
  shortCode: string
  label: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  flag: string
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'en',
    shortCode: 'EN',
    label: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
  {
    code: 'ar',
    shortCode: 'AR',
    label: 'Arabic',
    nativeName: 'العربية',
    direction: 'ltr',
    flag: '🇮🇶',
  },
  {
    code: 'ku',
    shortCode: 'KU',
    label: 'Kurdish',
    nativeName: 'کوردی',
    direction: 'ltr',
    flag: '☀️',
  },
  {
    code: 'tr',
    shortCode: 'TR',
    label: 'Turkish',
    nativeName: 'Türkçe',
    direction: 'ltr',
    flag: '🇹🇷',
  },
]

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
  en: {
    // Brand & Header
    'brand.name': 'ANDAZA DECORAT',
    'brand.tagline': 'Luxury Decoration is here',
    'header.shoppingBox': 'Shopping Box',
    'header.themeToggle': 'Switch theme mode',
    'header.language': 'Language',
    'header.selectLanguage': 'Select Language',

    // Product Card
    'card.add': 'ADD',
    'card.decrease': 'Decrease quantity',
    'card.increase': 'Increase quantity',
    'card.removeFromBox': 'Remove from Box',
    'card.inStock': 'In Stock',
    'card.newArrival': 'New Arrival',
    'card.featured': 'Featured',
    'card.onlyLeft': 'Only {count} left',

    // Product Modal
    'modal.specifications': 'Specifications',
    'modal.cancelSelection': 'CANCEL SELECTION',
    'modal.addToShoppingBox': 'ADD TO SHOPPING BOX',
    'modal.previousAngle': 'Previous angle',
    'modal.nextAngle': 'Next angle',
    'modal.immediateDispatch': 'Immediate Dispatch',

    // Shopping Box Drawer
    'drawer.title': 'Shopping Box',
    'drawer.pieceSelected': 'piece selected',
    'drawer.piecesSelected': 'pieces selected',
    'drawer.clearAll': 'Clear All',
    'drawer.removeItem': 'Remove item',
    'drawer.emptyTitle': 'Your Shopping Box is Empty',
    'drawer.emptySubtitle': 'Click ADD on any piece to start curating your selection.',
    'drawer.totalInDinar': 'Total in Dinar:',
    'drawer.sendInvoiceSheet': 'Send Invoice Sheet',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'Back to Shopping Box',
    'review.title': 'Customer & Order Details for Invoice',
    'review.subtitle': 'Please enter your details to generate your official invoice and enable direct WhatsApp sending.',
    'review.fullName': 'Full Name',
    'review.namePlaceholder': 'e.g. Ahmed Ali',
    'review.phone': 'WhatsApp / Phone Number',
    'review.phonePlaceholder': 'e.g. 07501234567',
    'review.phoneMinDigits': '(10/11 digits)',
    'review.cityAddress': 'City / Address (Optional)',
    'review.addressPlaceholder': 'e.g. Baghdad, Mansour',
    'review.specialNotes': 'Special Notes / Custom Requirements (Optional)',
    'review.notesPlaceholder': 'e.g. Preferred delivery time or custom finishes',
    'review.productOrdered': 'Product Ordered',
    'review.productsOrdered': 'Products Ordered',
    'review.readyToSend': 'Ready to send in Iraqi Dinar',
    'review.totalInDinar': 'Total in Dinar',
    'review.generating': 'Generating Invoice...',
    'review.generateAndReady': 'Generate & Ready Invoice',
    'review.docReadyTitle': 'Invoice Document Ready',
    'review.directWhatsAppConfigured': 'Direct WhatsApp delivery configured for:',
    'review.downloadAndOpen': 'Download & Open Invoice',
    'review.sendToWhatsApp': "Send Invoice to What's up",
    'review.returnToShowroom': '← Return to Showroom',
    'review.phoneError': 'Please enter 10 or 11 digits for your phone number (e.g. 07501234567).',
    'review.generationError': 'Could not generate invoice. Please try again.',
    'review.waShareSuccess': 'Invoice shared successfully via WhatsApp!',
    'review.waDesktopNote': 'The invoice PDF file has been downloaded. Please attach it to this chat.',
    'review.waGatewaySuccess': 'Invoice PDF sent directly to WhatsApp!',
    'review.sendingToWhatsApp': 'Sending to WhatsApp...',
    'review.waMessageCaption': 'Invoice {docNumber} from {clientName} — Total: {total}',

    // Catalog & Filters
    'catalog.noProducts': 'No products found',
    'catalog.adjustSearch': 'Try adjusting your search query or clear active filters.',
    'catalog.resetAll': 'Reset All',
    'catalog.searchPlaceholder': 'Search products, collections...',

    // WhatsApp Floating Help
    'help.floatingText': "If you need help, I'm here",
    'help.whatsappPreset': 'Hello',

    // Common
    'common.required': '*',
    'common.optional': '(Optional)',
    'common.currency': 'IQD',

    // Product Translations
    'prod.alucobond.name': 'Alucobond',
    'prod.alucobond.short': '',
    'prod.alucobond.full': '',
    'prod.mechanical-porcelain.name': 'Mechanical Porcelain',
    'prod.mechanical-porcelain.short': '',
    'prod.mechanical-porcelain.full': '',
    'prod.panoramic-sliding-glass.name': 'Glass',
    'prod.panoramic-sliding-glass.short': '',
    'prod.panoramic-sliding-glass.full': '',
    'prod.architectural-glass-doors.name': 'Aluminum',
    'prod.architectural-glass-doors.short': '',
    'prod.architectural-glass-doors.full': '',
  },
  ar: {
    // Brand & Header
    'brand.name': 'أندازة ديكورات',
    'brand.tagline': 'فخامة الديكور هنا',
    'header.shoppingBox': 'سلة المشتريات',
    'header.themeToggle': 'تغيير وضع المظهر',
    'header.language': 'اللغة',
    'header.selectLanguage': 'اختر اللغة',

    // Product Card
    'card.add': 'إضافة',
    'card.decrease': 'تقليل الكمية',
    'card.increase': 'زيادة الكمية',
    'card.removeFromBox': 'إزالة من السلة',
    'card.inStock': 'متوفر بالمخزن',
    'card.newArrival': 'وصل حديثاً',
    'card.featured': 'مميز',
    'card.onlyLeft': 'متبقي {count} فقط',

    // Product Modal
    'modal.specifications': 'المواصفات الفنية',
    'modal.cancelSelection': 'إلغاء الاختيار',
    'modal.addToShoppingBox': 'إضافة إلى سلة المشتريات',
    'modal.previousAngle': 'الزاوية السابقة',
    'modal.nextAngle': 'الزاوية التالية',
    'modal.immediateDispatch': 'جاهز للشحن الفوري',

    // Shopping Box Drawer
    'drawer.title': 'سلة المشتريات',
    'drawer.pieceSelected': 'قطعة محددة',
    'drawer.piecesSelected': 'قطع محددة',
    'drawer.clearAll': 'مسح الكل',
    'drawer.removeItem': 'حذف العنصر',
    'drawer.emptyTitle': 'سلة المشتريات فارغة',
    'drawer.emptySubtitle': 'اضغط على "إضافة" على أي قطعة لبدء تجميع طلبك.',
    'drawer.totalInDinar': 'المجموع بالدينار:',
    'drawer.sendInvoiceSheet': 'إرسال قائمة الفاتورة',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'العودة إلى سلة المشتريات',
    'review.title': 'بيانات العميل والطلب للفاتورة',
    'review.subtitle': 'يرجى إدخال بياناتك لإنشاء الفاتورة الرسمية وتفعيل الإرسال المباشر عبر واتساب.',
    'review.fullName': 'الاسم الكامل',
    'review.namePlaceholder': 'مثال: أحمد علي',
    'review.phone': 'رقم الواتساب / الهاتف',
    'review.phonePlaceholder': 'مثال: ٠٧٥٠١٢٣٤٥٦٧',
    'review.phoneMinDigits': '(١٠/١١ رقماً)',
    'review.cityAddress': 'المدينة / العنوان (اختياري)',
    'review.addressPlaceholder': 'مثال: بغداد، المنصور',
    'review.specialNotes': 'ملاحظات خاصة / متطلبات مخصصة (اختياري)',
    'review.notesPlaceholder': 'مثال: وقت التوصيل المفضل أو تشطيبات خاصة',
    'review.productOrdered': 'منتج مطلوب',
    'review.productsOrdered': 'منتجات مطلوبة',
    'review.readyToSend': 'جاهز للإرسال بالدينار العراقي',
    'review.totalInDinar': 'المجموع بالدينار',
    'review.generating': 'جاري إنشاء الفاتورة...',
    'review.generateAndReady': 'إنشاء وتجهيز الفاتورة',
    'review.docReadyTitle': 'الفاتورة جاهزة',
    'review.directWhatsAppConfigured': 'تم تجهيز الإرسال المباشر لواتساب للرقم:',
    'review.downloadAndOpen': 'تحميل وفتح الفاتورة',
    'review.sendToWhatsApp': 'إرسال الفاتورة عبر واتساب',
    'review.returnToShowroom': '← العودة إلى المعرض',
    'review.phoneError': 'يرجى إدخال ١٠ أو ١١ رقماً لرقم الهاتف (مثال: ٠٧٥٠١٢٣٤٥٦٧).',
    'review.generationError': 'تعذر إنشاء الفاتورة. يرجى المحاولة مرة أخرى.',
    'review.waShareSuccess': 'تمت مشاركة الفاتورة بنجاح عبر واتساب!',
    'review.waDesktopNote': 'تم تحميل ملف الفاتورة PDF. يرجى إرفاقه في هذه المحادثة.',
    'review.waGatewaySuccess': 'تم إرسال ملف الفاتورة PDF مباشرة عبر واتساب!',
    'review.sendingToWhatsApp': 'جارٍ الإرسال عبر واتساب...',
    'review.waMessageCaption': 'فاتورة {docNumber} من {clientName} — الإجمالي: {total}',

    // Catalog & Filters
    'catalog.noProducts': 'لم يتم العثور على منتجات',
    'catalog.adjustSearch': 'جرب تغيير كلمة البحث أو إعادة تعيين الفلاتر.',
    'catalog.resetAll': 'إعادة ضبط الكل',
    'catalog.searchPlaceholder': 'ابحث في المنتجات والمجموعات...',

    // WhatsApp Floating Help
    'help.floatingText': 'إذا كنت بحاجة إلى مساعدة أنا هنا',
    'help.whatsappPreset': 'مرحباً',

    // Common
    'common.required': '*',
    'common.optional': '(اختياري)',
    'common.currency': 'د.ع',

    // Product Translations
    'prod.alucobond.name': 'أليكوبوند',
    'prod.alucobond.short': '',
    'prod.alucobond.full': '',
    'prod.mechanical-porcelain.name': 'بورسلين ميكانيكي',
    'prod.mechanical-porcelain.short': '',
    'prod.mechanical-porcelain.full': '',
    'prod.panoramic-sliding-glass.name': 'زجاج',
    'prod.panoramic-sliding-glass.short': '',
    'prod.panoramic-sliding-glass.full': '',
    'prod.architectural-glass-doors.name': 'ألمنيوم',
    'prod.architectural-glass-doors.short': '',
    'prod.architectural-glass-doors.full': '',
  },
  ku: {
    // Brand & Header
    'brand.name': 'ئەندازە دیکۆرات',
    'brand.tagline': 'دیکۆراتی شاهانە لێرەیە',
    'header.shoppingBox': 'سەبەتەی کڕین',
    'header.themeToggle': 'گۆڕینی دۆخی ڕەنگ',
    'header.language': 'زمان',
    'header.selectLanguage': 'زمان هەڵبژێرە',

    // Product Card
    'card.add': 'زیادکردن',
    'card.decrease': 'کەمکردنەوەی ژمارە',
    'card.increase': 'زیادکردنی ژمارە',
    'card.removeFromBox': 'سڕینەوە لە سەبەتە',
    'card.inStock': 'لە کۆگا بەردەستە',
    'card.newArrival': 'تازە گەیشتوو',
    'card.featured': 'تایبەت',
    'card.onlyLeft': 'تەنها {count} ماوە',

    // Product Modal
    'modal.specifications': 'تایبەتمەندییەکان',
    'modal.cancelSelection': 'هەڵوەشاندنەوەی هەڵبژاردن',
    'modal.addToShoppingBox': 'زیادکردن بۆ سەبەتەی کڕین',
    'modal.previousAngle': 'وێنەی پێشوو',
    'modal.nextAngle': 'وێنەی داهاتوو',
    'modal.immediateDispatch': 'ئامادەیە بۆ ناردنی دەستبەجێ',

    // Shopping Box Drawer
    'drawer.title': 'سەبەتەی کڕین',
    'drawer.pieceSelected': 'دانە هەڵبژێردراوە',
    'drawer.piecesSelected': 'دانە هەڵبژێردراون',
    'drawer.clearAll': 'سڕینەوەی هەمووی',
    'drawer.removeItem': 'سڕینەوە',
    'drawer.emptyTitle': 'سەبەتەی کڕینەکەت بەتاڵە',
    'drawer.emptySubtitle': 'کرتە لەسەر "زیادکردن" بکە لەسەر هەر پارچەیەک بۆ دروستکردنی داواکارییەکەت.',
    'drawer.totalInDinar': 'کۆی گشتی بە دینار:',
    'drawer.sendInvoiceSheet': 'ناردنی پەڕەی پسوولە',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'گەڕانەوە بۆ سەبەتەی کڕین',
    'review.title': 'زانیاری کڕیار و داواکاری بۆ پسوولە',
    'review.subtitle': 'تکایە زانیارییەکانت بنووسە بۆ دەرکردنی پسوولەی فەرمی و ناردنی ڕاستەوخۆ لە ڕێگەی واتسئاپ.',
    'review.fullName': 'ناوی تەواو',
    'review.namePlaceholder': 'نموونە: ئەحمەد عەلی',
    'review.phone': 'ژمارەی واتسئاپ / مۆبایل',
    'review.phonePlaceholder': 'نموونە: ٠٧٥٠١٢٣٤٥٦٧',
    'review.phoneMinDigits': '(١٠/١١ ژمارە)',
    'review.cityAddress': 'شار / ناونیشان (ئارەزوومەندانە)',
    'review.addressPlaceholder': 'نموونە: هەولێر، بەختیاری',
    'review.specialNotes': 'تێبینی تایبەت / داواکاری تایبەت (ئارەزوومەندانە)',
    'review.notesPlaceholder': 'نموونە: کاتی گەیاندنی دڵخواز یان ڕەنگ و دیزاینی تایبەت',
    'review.productOrdered': 'بەرهەمی داواکراو',
    'review.productsOrdered': 'بەرهەمی داواکراو',
    'review.readyToSend': 'ئامادەیە بۆ ناردن بە دیناری عێراقی',
    'review.totalInDinar': 'کۆی گشتی بە دینار',
    'review.generating': 'پسوولە ئامادە دەکرێت...',
    'review.generateAndReady': 'دروستکردن و ئامادەکردنی پسوولە',
    'review.docReadyTitle': 'پسوولەکە ئامادەیە',
    'review.directWhatsAppConfigured': 'ناردنی ڕاستەوخۆی واتسئاپ ئامادەکرا بۆ:',
    'review.downloadAndOpen': 'داگرتن و کردنەوەی پسوولە',
    'review.sendToWhatsApp': 'ناردنی پسوولە بۆ واتسئاپ',
    'review.returnToShowroom': '← گەڕانەوە بۆ پێشانگا',
    'review.phoneError': 'تکایە ١٠ یان ١١ ژمارە بنووسە بۆ مۆبایل (نموونە: ٠٧٥٠١٢٣٤٥٦٧).',
    'review.generationError': 'دروستکردنی پسوولە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.',
    'review.waShareSuccess': 'پسوولەکە بە سەرکەوتوویی لە واتسئاپ هاوبەش کرا!',
    'review.waDesktopNote': 'فایلی پسوولەی PDF داگیراوە. تکایە لەم چاتەدا پەیوەستی بکە و بینێرە.',
    'review.waGatewaySuccess': 'فایلی پسوولەی PDF ڕاستەوخۆ بۆ واتسئاپ نێردرا!',
    'review.sendingToWhatsApp': 'ناردن بۆ واتسئاپ...',
    'review.waMessageCaption': 'پسوولەی {docNumber} لە {clientName} — کۆی گشتی: {total}',

    // Catalog & Filters
    'catalog.noProducts': 'هیچ بەرهەمێک نەدۆزرایەوە',
    'catalog.adjustSearch': 'وشەی گەڕانەکەت بگۆڕە یان فلتەرەکان پاک بکەرەوە.',
    'catalog.resetAll': 'ڕێکخستنەوەی هەموو',
    'catalog.searchPlaceholder': 'گەڕان بۆ بەرهەم و کۆمەڵەکان...',

    // WhatsApp Floating Help
    'help.floatingText': 'ئەگەر پێویستت بە هاوکارییە من لێرەم',
    'help.whatsappPreset': 'سڵاو',

    // Common
    'common.required': '*',
    'common.optional': '(ئارەزوومەندانە)',
    'common.currency': 'د.ع',

    // Product Translations
    'prod.alucobond.name': 'ئەلیکۆبۆن',
    'prod.alucobond.short': '',
    'prod.alucobond.full': '',
    'prod.mechanical-porcelain.name': 'پۆرسەلینی میکانیکی',
    'prod.mechanical-porcelain.short': '',
    'prod.mechanical-porcelain.full': '',
    'prod.panoramic-sliding-glass.name': 'جام',
    'prod.panoramic-sliding-glass.short': '',
    'prod.panoramic-sliding-glass.full': '',
    'prod.architectural-glass-doors.name': 'ئەلەمنیۆم',
    'prod.architectural-glass-doors.short': '',
    'prod.architectural-glass-doors.full': '',
  },
  tr: {
    // Brand & Header
    'brand.name': 'ANDAZA DECORAT',
    'brand.tagline': 'Lüks Dekorasyon Burada',
    'header.shoppingBox': 'Alışveriş Kutusu',
    'header.themeToggle': 'Tema modunu değiştir',
    'header.language': 'Dil',
    'header.selectLanguage': 'Dil Seçin',

    // Product Card
    'card.add': 'EKLE',
    'card.decrease': 'Miktarı azalt',
    'card.increase': 'Miktarı artır',
    'card.removeFromBox': 'Kutudan çıkar',
    'card.inStock': 'Stokta Var',
    'card.newArrival': 'Yeni Ürün',
    'card.featured': 'Öne Çıkan',
    'card.onlyLeft': 'Son {count} adet kaldı',

    // Product Modal
    'modal.specifications': 'Teknik Özellikler',
    'modal.cancelSelection': 'SEÇİMİ İPTAL ET',
    'modal.addToShoppingBox': 'ALIŞVERİŞ KUTUSUNA EKLE',
    'modal.previousAngle': 'Önceki açı',
    'modal.nextAngle': 'Sonraki açı',
    'modal.immediateDispatch': 'Hemen Teslimat',

    // Shopping Box Drawer
    'drawer.title': 'Alışveriş Kutusu',
    'drawer.pieceSelected': 'parça seçildi',
    'drawer.piecesSelected': 'parça seçildi',
    'drawer.clearAll': 'Tümünü Temizle',
    'drawer.removeItem': 'Öğeyi kaldır',
    'drawer.emptyTitle': 'Alışveriş Kutunuz Boş',
    'drawer.emptySubtitle': 'Seçiminizi oluşturmaya başlamak için herhangi bir ürüne EKLE butonuna tıklayın.',
    'drawer.totalInDinar': 'Toplam Dinar:',
    'drawer.sendInvoiceSheet': 'Fatura Sayfasını Gönder',

    // Selection Review / Invoice Modal
    'review.backToShoppingBox': 'Alışveriş Kutusuna Dön',
    'review.title': 'Fatura İçin Müşteri ve Sipariş Detayları',
    'review.subtitle': 'Resmi faturanızı oluşturmak ve WhatsApp üzerinden doğrudan gönderim sağlamak için lütfen bilgilerinizi girin.',
    'review.fullName': 'Ad Soyad',
    'review.namePlaceholder': 'Örn: Ahmet Yılmaz',
    'review.phone': 'WhatsApp / Telefon Numarası',
    'review.phonePlaceholder': 'Örn: 0750 123 4567',
    'review.phoneMinDigits': '(10/11 rakam)',
    'review.cityAddress': 'Şehir / Adres (İsteğe Bağlı)',
    'review.addressPlaceholder': 'Örn: Bağdat, Mansur',
    'review.specialNotes': 'Özel Notlar / Talepler (İsteğe Bağlı)',
    'review.notesPlaceholder': 'Örn: Tercih edilen teslimat zamanı veya özel kaplama detayları',
    'review.productOrdered': 'Sipariş Edilen Ürün',
    'review.productsOrdered': 'Sipariş Edilen Ürünler',
    'review.readyToSend': 'Irak Dinarı olarak gönderilmeye hazır',
    'review.totalInDinar': 'Dinar Olarak Toplam',
    'review.generating': 'Fatura Oluşturuluyor...',
    'review.generateAndReady': 'Faturayı Oluştur ve Hazırla',
    'review.docReadyTitle': 'Fatura Belgesi Hazır',
    'review.directWhatsAppConfigured': 'Doğrudan WhatsApp gönderimi şu numara için yapılandırıldı:',
    'review.downloadAndOpen': 'Faturayı İndir ve Aç',
    'review.sendToWhatsApp': 'Faturayı WhatsApp ile Gönder',
    'review.returnToShowroom': '← Showrooma Dön',
    'review.phoneError': 'Lütfen telefon numarası için 10 veya 11 rakam girin (örn: 0750 123 4567).',
    'review.generationError': 'Fatura oluşturulamadı. Lütfen tekrar deneyin.',
    'review.waShareSuccess': 'Fatura WhatsApp üzerinden başarıyla paylaşıldı!',
    'review.waDesktopNote': 'Fatura PDF dosyası indirildi. Lütfen bu sohbete ekleyip gönderin.',
    'review.waGatewaySuccess': 'Fatura PDF dosyası doğrudan WhatsApp’a gönderildi!',
    'review.sendingToWhatsApp': 'WhatsApp’a gönderiliyor...',
    'review.waMessageCaption': '{clientName} adına {docNumber} numaralı fatura — Toplam: {total}',

    // Catalog & Filters
    'catalog.noProducts': 'Ürün bulunamadı',
    'catalog.adjustSearch': 'Arama teriminizi değiştirmeyi veya filtreleri temizlemeyi deneyin.',
    'catalog.resetAll': 'Tümünü Sıfırla',
    'catalog.searchPlaceholder': 'Ürünlerde, koleksiyonlarda arayın...',

    // WhatsApp Floating Help
    'help.floatingText': 'Yardıma ihtiyacınız varsa buradayım',
    'help.whatsappPreset': 'Merhaba',

    // Common
    'common.required': '*',
    'common.optional': '(İsteğe Bağlı)',
    'common.currency': 'IQD',

    // Product Translations
    'prod.alucobond.name': 'Alukobond',
    'prod.alucobond.short': '',
    'prod.alucobond.full': '',
    'prod.mechanical-porcelain.name': 'Mekanik Porselen',
    'prod.mechanical-porcelain.short': '',
    'prod.mechanical-porcelain.full': '',
    'prod.panoramic-sliding-glass.name': 'Cam',
    'prod.panoramic-sliding-glass.short': '',
    'prod.panoramic-sliding-glass.full': '',
    'prod.architectural-glass-doors.name': 'Alüminyum',
    'prod.architectural-glass-doors.short': '',
    'prod.architectural-glass-doors.full': '',
  },
}
