# Güncel sürüm v6 — yapılanlar

## Yeni özellikler
- **Hediye ekranı** (`src/components/gift-drawer.tsx`, `src/lib/reference-gifts.ts`): videodaki gibi alttan açılır, 135 hediye, 5 sütun, kilitli hediyelerde kilit simgesi, seçilince hafif büyür.
- **Profil popup'ı** (`src/components/player-profile.tsx`): ortadaki ok ile açılan ek istatistikler (kalp 30, çift kalp 8), beğenen kişisi ve alttaki aksiyon düğmeleri.
- Oyuncu fotoğraflarına tıklayınca hediye ekranı açılır (`src/routes/index.tsx`).

## Hediye ekranı yerleşimi
- "hediye gönder" çubuğu masanın üst kenarının üzerine oturur, masa aşağı itilmez.
- Hediye ekranı açılınca yukarıdaki hiçbir şey küçülmez (`--table-h` sabit).
- Hediyeler bölümü bir sıra daha büyük açılır.

## Müzik oynatıcısı
- Sohbetin sağ üst köşesinde, resimdeki boyut ve yerleşimde (`src/styles.css` içindeki `.chat-area .chat-music-player` kuralları).

## Sayfa kilidi
- Aşağı/yukarı kaydırma, zoom ve pinch engelli (`src/routes/__root.tsx` + `src/styles.css`); sohbet ve hediye listesi kendi içinde kaydırılabilir.

## İkonlar
- Orijinal 45 ikon ve pointer dosyaları **birebir aynı**, değiştirilmedi.
- Yeni 135 hediye ikonu `public/game-assets/gifts/`, 13 profil ikonu `public/game-assets/profile/` içinde; pointer dosyaları `src/assets/` içinde eklendi.
- Ahşap masa dokusu `src/styles.css` içinde `/game-assets/wood.png` adresinden okunur.

## Bu yeniləmədə əlavə edilənlər
- Kupa (liqa) pəncərəsi: "Dəmir liqa" + "?" ilə 4 qayda səhifəsi (Azərbaycan dilində, oxlar və nöqtələr).
- Üç xətt menyusu: Nailiyyətlər, Reytinqlər, Şüşə, Görünüş, Gücləndiricilər.
- Ayarlar pəncərəsi: Səslər, Musiqi, Dostları dəvət et, Dostlarım, Bizimlə əlaqə.
- Bütün 211 ikon/şəkil public/game-assets/ qovluğunda (ASSET-MANIFEST.json ilə).
- Orijinal v6 paketindəki bütün fayllar (original-spin-bottle-game.zip daxil) saxlanıb.


## Başarılar penceresi — yeni güncelleme
- Üç çizgi menüsü → Nailiyyətlər: referans görsellerindeki üç sütunlu, kaydırılabilir başarı penceresi.
- Açılış/kapanış ve karartma, kalp mağazasının aynı animasyonlarını kullanır.
- Başlangıç: 3/333 yıldız; ilk rozet 2, ikinci rozet 1 yıldız kazanmış ve renklidir.
- 95 rozet, tamamlandı/kilitli sıralama, sabit başlık, dışarı tıklama ve Escape ile kapanış.
- Kilitli rozetlerin çizimleri referanslardan ayrılmıştır; kazanılan rozetlerin renkli halleri, özgün renkli dosyalar pakette bulunmadığından görsellerden yeniden renklendirilmiştir.
- Bu değişiklik sunucu, hesap kaydı veya yeni başarı kazanma koşulları eklemez. İlerleme mevcut sayfa oturumunda tutulur.
- Orijinal ZIP'teki diğer dosyalar, medya ve original-spin-bottle-game.zip korunmuştur.

### Mevcut oyun ilerlemesini bağlama
Oyunun başarıyı kazandıran kodundan bu olayı gönderin:
```js
window.dispatchEvent(new CustomEvent('game:achievement-progress', {
  detail: { id: 'achievement-3', earned: 1 }
}));
```
`id` değerleri `achievement-1`–`achievement-95` arasındadır. `earned` kazanılan yıldız sayısıdır; sıfır kilitler, pozitif sayı renkli hale getirir. Hesap ilerlemesi varsa yüklenen değerleri aynı olayla aktarın.

## Şişe değiştirme penceresi — yeni güncelleme
- Üç çizgi menüsü → Şüşə, oyun masasının altındaki beyaz pencereyi açar.
- Şişeyi değiştir başlığı, referanstan ayrılmış 9 şişe ikonu, 4 sütun, her ikon altında kalp + 5 ve sağ altta yeşil X.
- Şişe seçilince masadaki şişe o görselle değişir; X veya Escape pencereyi kapatır. Masa ve önceki özellikler korunur.
- İkonlar public/game-assets/bottle-*.png, eşleşmeler src/assets ve BOTTLE-ASSETS.json içindedir.
- Kalp fiyatları referanstaki görünüm içindir; bu güncelleme ödeme, hesaptan kalp düşme veya kalıcı satın alma eklemez. Seçim sayfa oturumunda geçerlidir.
- Orijinal ZIP içeriği ve original-spin-bottle-game.zip korunmuştur.

## Görünüş penceresi — v3
- Üstteki üç çizgi → Görünüş, referansın sabit başlıklı ve dört sütunlu penceresini açar.
- 36 stil + stilsiz seçenek; her çerçeve ve orta simge ayrı şeffaf PNG dosyasıdır.
- Görseller doğrudan verilen ekran görüntülerinden ayrılmıştır; daha yüksek çözünürlüklü özgün dosyalar değildir.
- Kalp penceresiyle aynı 520ms shop-drop-in açılışı ve 200ms kapanış animasyonu.
- Stil seçimi üstte görünür; Uygula masadaki kendi profil çerçevesini değiştirir. Kilitli seçenekler seçilemez.
- Fiyatlar ve kilitler referans görünümüdür; gerçek satın alma, kalp düşme ve kalıcı hesap kaydı eklenmez.
- X, dışarı tıklama ve Escape ile kapanır; menü düğmesine odak geri döner.
- Yeni resimler public/game-assets/appearance içinde, çerçeveler frame-XX.png ve orta simgeler icon-XX.png adlarıyla ayrı ayrı bulunur.
- İçe aktarılan kaynakta bulunan gömülü özel servis anahtarı kaldırıldı; mevcut müzik araması için YOUTUBE_API_KEY ortam değişkeni gerekir.
- Eski sürümü tekrar içeren iç içe ZIP bu kaynak paketine dahil edilmedi.
