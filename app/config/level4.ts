export type Slide = {
  id: number;
  background: string;
  text: string;
  mood: "golden" | "pink" | "twilight" | "rose";
  hearts: boolean;
  petals: boolean;
  rain?: boolean;
  steam?: boolean;
  sparkles?: boolean;
  twinkles?: boolean;
  kb: string;
  textAnchor?: "bottomCenter" | "bottomLeft" | "bottomRight";
  textTone?: "dark" | "light";
  boxBlur?: "normal" | "strong";
};

export type Heart = { left: number; size: number; duration: number; delay: number };
export type Petal = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  rot: number;
  variant: string;
};

export const slides: Slide[] = [
  { id: 0, background: "/assets/story/background_kereta.png", text: "berawal dari janjian ketemuan buat pergi tanpa arah. maafin aku yang bikin kamu nunggu lama karna gabawa cash hehee. tapi aku suka experience nya hehee.", mood: "golden", hearts: true, petals: false, kb: "kb-left", textAnchor: "bottomLeft" },
  { id: 1, background: "/assets/story/background_kafe.png", text: "saling bertukar pikiran tentang banyak hal. dengan banyak pandangan juga tentunya. dan terimakasih telah membuat banyak sudut pandang yang belum pernah aku pikirkan sebelumnya. ini momen yang membuatku sangat kagum dengan pribadi kamu.", mood: "pink", hearts: true, petals: false, steam: true, kb: "kb-up", textAnchor: "bottomRight", textTone: "light" },
  { id: 2, background: "/assets/story/background_sedih.png", text: "di hari ini, pertama kali kamu menceritakan beratnya hari kamu. tentang eskrim yang dibeli oleh teman kamu karena kamu baru selesai nangis. dan setelah itu kamu mulai menceritakan beberapa hal tentang diri kamu dan bagaimana kamu ketika sebelum bertemu aku.", mood: "rose", hearts: true, petals: false, sparkles: true, kb: "kb-down", textAnchor: "bottomLeft", textTone: "light", boxBlur: "strong" },
  { id: 3, background: "/assets/story/background_perpustakan.png", text: "mungkin ini kita pertama kali ngedate yaa (aku anggap ngedate) ke perpus. dengan kamu yang duduk dan menikmati buku, dan aku yang melihatmu penuh rasa kagum. aku gatau kamu emang fokus baca buku atau fokus untuk terlihat keren hahaa. but, u really cool.", mood: "rose", hearts: true, petals: false, sparkles: true, kb: "kb-zoom", textAnchor: "bottomLeft" },
  { id: 4, background: "/assets/story/background_festival_ham.png", text: "masih di hari yang sama. kamu sedang menjelaskan tentang apa yang menjadi keresahan kamu dan apa yang kamu perjuangkan. dan menurutku, kamu terlalu baik untuk menjadi seorang manusia.", mood: "golden", hearts: true, petals: false, sparkles: true, kb: "kb-right", textAnchor: "bottomRight" },
  { id: 5, background: "/assets/story/background_duduk.png", text: "dan masih di hari yang sama. kita duduk di pinggir jalan sambil bercerita banyak hal. dan akhirnya, pembahasan yang kita bahas disini sedikit mendalam. karena itu tentang perasaan masing-masing. dan entah mengapa, waktu terasa sangat cepat berlalu di hari ini.", mood: "pink", hearts: true, petals: false, kb: "kb-zoom", textAnchor: "bottomLeft" },
  { id: 6, background: "/assets/story/background_cukil.png", text: "pertama kalinya kita nyukil bareng. membuat karya seni sendiri dan menempelkannya di baju kitaa. walaupun gagal, namun terasa sangat menyenangkan. mungkin next nya akan bisa berhasil hehee.", mood: "golden", hearts: true, petals: false, sparkles: true, kb: "kb-left", textAnchor: "bottomRight" },
  { id: 7, background: "/assets/story/background_bebek.png", text: "di hari ini, kamu ngajak aku makan bebek rica2 yang sangat kamu banggakan itu. enak sihh dan terimakasih. terimakasih karena masih mau bertemu denganku walaupun hari kamu sangat panjangg. u really cute.", mood: "rose", hearts: true, petals: false, twinkles: true, kb: "kb-right", textAnchor: "bottomLeft" },
  { id: 8, background: "/assets/story/background_bunga.png", text: "10 10. sesuai dengan nama kamu (ten ten). hari dimana aku memberikan kamu bunga dan mulai memberanikan diri untuk menjalin hubungan. dan ini hari dimana aku merasa sangat bahagia. terimakasih sudah mau menjadi bagian dari duniaku<3", mood: "pink", hearts: true, petals: true, sparkles: true, kb: "kb-zoom", textAnchor: "bottomRight" },
  { id: 9, background: "/assets/story/background_pasar_loak.png", text: "pertama kali kita ngedate ke luar dan nyoba buat nyari kamera bekas. walaupun gada kamera yang bisa kita beli, tapi di hari ini aku merasa sangat bahagiaa. terimakasihh manisss.", mood: "golden", hearts: true, petals: false, sparkles: true, kb: "kb-left", textAnchor: "bottomLeft" },
  { id: 10, background: "/assets/story/background_wfc.png", text: "pertama kali kita wfc bareng. di hari ini, ada lumayan banyak hal yang aku pikirkan. namun, terlepas dari segala hal, aku bener2 sangat bahagia pas kamu muncul dengan sapaan dan senyum kamu disini. terimakasih sudah selalu bisa membuat hidup aku terasa lebih berwarna.", mood: "twilight", hearts: true, petals: false, twinkles: true, kb: "kb-up", textAnchor: "bottomRight" },
  { id: 11, background: "/assets/story/background_jajanan.png", text: "setelah sekian lama akhirnya kita bisa pergi keluar buat main (karna kamu pemalas hahaa). dan di hari ini, aku ngerasa semua rasa lelahku mendadak hilang. kepalaku terasa tenang. dan yah, kamu selalu membuatku merasa penuh dengan cinta. kamu ga merasa kamu power ranger?", mood: "rose", hearts: true, petals: true, sparkles: true, kb: "kb-right", textAnchor: "bottomLeft" },
  { id: 12, background: "/assets/story/background_jalanan.png", text: "mungkin akan ada banyak hal yang akan kita lalui bersama. dan aku harap, kita berdua bisa selalu berjalan bersama. ngelewatin banyak hal yang akan kita hadapin juga tentunya. dan aku yakin, jika bersama kamu, sepertinya akan terasa seru dan menyenangkan.", mood: "golden", hearts: true, petals: false, kb: "kb-left", textAnchor: "bottomLeft" },
  { id: 13, background: "/assets/story/background_emotional.png", text: "terimakasih telah hadir. untuk setiap pertemuan, hingga hari ini, aku selalu merasa bersyukur karena telah bertemu denganmu. dunia yang terasa gelap, datar, dan keras, seakan terasa berwarna dengan kehadiran makhluk manis sepertimu. terimakasihh.", mood: "pink", hearts: true, petals: true, sparkles: true, kb: "kb-down", textAnchor: "bottomRight", textTone: "light", boxBlur: "strong" },
  { id: 14, background: "/assets/story/background_hbd.png", text: "selamat hari lahir. terimakasih sudah berjuang untuk melewati banyak hal yang tidak bisa kamu deskripsikan. terimakasih untuk tetap menjadi orang baik. terimakasih sudah begitu peduli pada manusia. terimakasih untuk wajah manis itu. terimakasih sudah lahir. terimakasih untuk senyuman yang selalu bisa membuat tenang. dan terimakasih sudah menjadi alasan baru aku buat tetap hidup. terimakasihh duniakuu🫶❤️", mood: "rose", hearts: true, petals: true, sparkles: true, kb: "kb-zoom", textAnchor: "bottomRight", textTone: "light", boxBlur: "strong" },
];

export const heartsData: Heart[] = [
  { left: 18, size: 12, duration: 7, delay: 0 },
  { left: 28, size: 10, duration: 6, delay: 1 },
  { left: 38, size: 12, duration: 8, delay: 2 },
  { left: 52, size: 11, duration: 7, delay: 0 },
  { left: 62, size: 10, duration: 6, delay: 1 },
  { left: 72, size: 12, duration: 8, delay: 2 },
  { left: 82, size: 11, duration: 7, delay: 1 },
];

export const petalsData: Petal[] = [
  { left: 8, size: 16, duration: 9, delay: 0, drift: -12, rot: 40, variant: "soft" },
  { left: 16, size: 14, duration: 10, delay: 1.5, drift: -18, rot: 55, variant: "warm" },
  { left: 24, size: 12, duration: 8, delay: 0.8, drift: -10, rot: 30, variant: "" },
  { left: 40, size: 13, duration: 9, delay: 0.4, drift: 10, rot: 35, variant: "warm" },
  { left: 56, size: 14, duration: 9, delay: 2.4, drift: 8, rot: 25, variant: "soft" },
  { left: 64, size: 12, duration: 10, delay: 0.7, drift: 16, rot: 55, variant: "warm" },
  { left: 80, size: 13, duration: 11, delay: 0.3, drift: -14, rot: 60, variant: "soft" },
];
