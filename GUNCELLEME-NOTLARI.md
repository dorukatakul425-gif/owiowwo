# Yenilənmə qeydləri — scc-bottle-updated-v7

## Bu sürümdə əlavə edilənlər

### Botlarla oyun (tur motoru)
- **Tur reduceri** (`src/lib/game-round.ts`): `ready → spinning → arriving → choosing → result → returning` mərhələləri, `roundSeats`, `targetAngle`, `pickBotTarget`, `turnIndicatorGeometry` və `roundReducer`.
- **Avtomatik zamanlama** (`src/hooks/use-game-round.ts`): şişə 5000 ms dönür, oyuncu yerinə 700 ms keçir, seçim üçün 1000 ms (bot 1800 ms), nəticə 2000 ms, geri qayıtma 600 ms.
- **Bot növbəsi**: hər 4-cü tur bot 0, sonra bot 2 → bot 1 → bot 0 dövrü ilə.
- **Profil hərəkəti**: şişə hansı koltuğa düşərsə, həmin oyuncunun profili eyni istiqamətə irəli gedib yerinə qayıdır (`round-spinner-rock`, `--rock-direction`).
- **Növbə oxu**: şişənin yanındakı yaşıl ox həmişə şişəni çevirən koltuğa baxır; bucaq referans masanın koordinatlarından hesablanır (`turnIndicatorGeometry`), yaza çevirmir.
- **Saniyə**: "Sənin seçimin" ekranında ağ, konturlu rəqəm 9-dan başlayır və hər saniyə azalır; qərar verildikdə dərhal yoxa çıxır.
- **Pəncərələr açılanda** bütün tur zamanlayıcıları dayanır (`paused`); pəncərə bağlananda tur davam edir.

### Kalp pəncərəsi
- **İşıq animasiyası**: "Ən sərfəli təklif" və "Ən yaxşı seçim" lövhələri üzərindən 2600 ms-dan bir keçən parlaq zolaq (`offer-badge::after` + `offer-light-sweep`).
- **Azərbaycanca etiketlər**: "Ən sərfəli təklif", "Ən yaxşı seçim", VIP düyməsində "Detaylar".
- **DAT simgesi**: kalp/GM simgələri yerine qızılı DAT sikkəsi (`src/assets/dat-coin.png`, `src/assets/rabbit-dat.png`) — həm qiymət düymələrində, həm "Göndər" təklifində.

## Texniki qeydlər
- Bütün pəncərələr Radix Dialog ilə idarə olunur, "shop-drop-in" animasiyası (0.52s) ortaqdır.
- İçəri pəncərələr (kömək, detay) bağlananda əsas pəncərə açıq qalır.
- Tur vəziyyəti yalnız brauzer sətrində saxlanılır: heç bir hesap, server və ya çoxoyunçuluq əlaqəsi yoxdur.
- Dil: Azərbaycanca. Reytinq, gücləndirici və liqa rəqəmləri nümayiş üçündür (canlı hesablama deyil).
- Testlər: `bunx vitest run` — tur oxu, bot hədəfi, saniyə və öpüş/İmtina davranışları yoxlanılır.
