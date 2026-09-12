window.toggleNotice = function(num) {
    const body = document.getElementById('notice-body-' + num);
    const arrow = document.getElementById('arrow-' + num);

    if (body.style.display === 'none' || !body.style.display) {
        body.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
    } else {
        body.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // --- Data Definition ---
    const hscSubjects = [
        { name: 'Physics', icon: 'fa-atom' },
        { name: 'Chemistry', icon: 'fa-flask' },
        { name: 'Biology', icon: 'fa-dna' },
        { name: 'Higher Math', icon: 'fa-calculator' },
        { name: 'ICT', icon: 'fa-laptop-code' },
        { name: 'English', icon: 'fa-book-open' },
        { name: 'Bangla', icon: 'fa-language' }
    ];

    // --- Dynamic Content System (Google Sheets Integration) ---
    // To use Google Sheets: Publish your sheet as CSV and paste the URL here.
    const SHEET_CSV_URL = '';
    let APP_CONTENT = [
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '1st', title: 'ভৌত জগত ও পরিমাপ', url: 'https://youtube.com/playlist?list=PLsvO5daJFw2ddi42P6PjBQ328UFcERWpg&si=94Na3JabCf9TVEcN', type: 'video', description: 'ACS', duration: '3.5 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '2nd', title: 'ভেক্টর', url: 'https://youtube.com/playlist?list=PLctDpDSJddXIxrVvwoRzwOCbWeHgkfPWk&si=JpAglRWhsMjr1BIR', type: 'video', description: 'ACS', duration: '4.2 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '3rd', title: 'গতিবিদ্যা', url: 'https://youtube.com/playlist?list=PLctDpDSJddXLKsVLEcFIb0n6C6IGRUirB&si=9VCSzgA9xBOlCXVs', type: 'video', description: 'ACS', duration: '3.8 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '4th', title: 'নিউটনিয়ান বলবিদ্যা', url: 'https://youtube.com/playlist?list=PLD0TU7MyD_l74A5ukM7wFO85xCaa_5q2l&si=Jge-dkkMiSXdGcz0', type: 'video', description: 'ACS', duration: '5.1 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '5th', title: 'কাজ -ক্ষমতা-শক্তি', url: 'https://youtube.com/playlist?list=PLctDpDSJddXIRJKDEEdKubriVReRovJ8l&si=692KoPL0Vr6xspCi', type: 'video', description: 'ACS', duration: '2.9 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '6th', title: 'মহাকর্ষ', url: 'https://youtube.com/playlist?list=PLctDpDSJddXIe0_Mue_dBhY1h3XFF4wZ-&si=JG3VsMaPT1lidZBb', type: 'video', description: 'ACS', duration: '3.2 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '7th', title: 'পদার্থের গাঠনিক ধর্ম', url: 'https://youtube.com/playlist?list=PLYwHi8LvkRkT4bsy_I3gfvqQct7xIiHxH&si=P0tYM1tY2PQpFDJx', type: 'video', description: 'ACS', duration: '4.5 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '8th', title: 'পর্যাবৃত্ত গতি', url: 'https://youtube.com/playlist?list=PLctDpDSJddXK8NE9BPGThnGhwwop2Rpgw&si=S2ps2qs_TAbsiRDw', type: 'video', description: 'ACS', duration: '3.7 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '9th', title: 'তরঙ্গ', url: 'https://youtube.com/playlist?list=PLxvo_jNjaepHIgfyzxGBYH7_x4N4UhPNP&si=qZjAIVKZMf81NNjO', type: 'video', description: 'ACS', duration: '3.1 Hours' },
        { subject: 'Physics', paper: '1st', category: 'HSC', chapter: '10th', title: 'আদর্শ গ্যাস ও গ্যাসের গতিতত্ত্ব', url: 'https://youtube.com/playlist?list=PLgiRmHToIpRfqd6pGH_rgUWve6zhwyeTd&si=qqCIQcmhzkKIFnYp', type: 'video', description: 'ACS', duration: '4.0 Hours' },

        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '1st', title: 'তাপ গতিবিদ্যা', url: 'https://youtube.com/playlist?list=PLctDpDSJddXKONKKoK_TsEhFjs9C_10Ji&si=xRI07FYNWySULYyX', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '2nd', title: 'স্থিরতড়িৎ', url: 'https://youtube.com/playlist?list=PLctDpDSJddXLdRbBxiYbYk0AUspYqm0EE&si=Ld8AhjDvERCLeo0q', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '3rd', title: 'চল তড়িৎ', url: 'https://youtube.com/playlist?list=PLctDpDSJddXLdRbBxiYbYk0AUspYqm0EE&si=Ld8AhjDvERCLeo0q', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '4th', title: 'তড়িৎ প্রবাহের চৌম্বকক্রিয়া ও চুম্বকত্ব', url: 'https://youtube.com/playlist?list=PLctDpDSJddXL1Rt64uM_9RyjI2-z85122&si=NDagRgLIo9CO8ox1', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '5th', title: 'তড়িৎ চৌম্বক আবেশ ও পরিবর্তী প্রবাহ', url: '', type: 'video', description: '' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '6th', title: 'জ্যামিতিক আলোকবিজ্ঞান', url: 'https://youtube.com/playlist?list=PLctDpDSJddXIGWMHyUDz6TQA8eQSpDm25&si=VJwifNuaIpTXKnIC', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '7th', title: 'ভৌত আলোক বিজ্ঞান', url: 'https://youtube.com/playlist?list=PLf66Fhl-FppdH-3zvRrpGxaR_mzRzGZKB&si=CiNN5YDHJAWd76TT', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '8th', title: 'আধুনিক পদার্থবিজ্ঞান', url: 'https://youtube.com/playlist?list=PLOIvX5_RAbasyUZwqHWTsfKK_r3nHfvcE&si=DToZEPvYjYBeiqx7', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '9th', title: 'পরমাণুর গঠণ ও নিউক্লিয়ার পদার্থবিজ্ঞান', url: 'https://youtube.com/playlist?list=PLOIvX5_RAbauLVw284J3aN_VoH6_X-5AV&si=bTNlgjSaR0g4JfS7', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '10th', title: 'সেমিকন্ডাক্টর ইলেকট্রনিকস', url: 'https://youtube.com/playlist?list=PLOIvX5_RAbavYz0YFPXhIDHE7GOtR3ZZW&si=vP6_7STKSWGu1gxD', type: 'video', description: 'ACS' },
        { subject: 'Physics', paper: '2nd', category: 'HSC', chapter: '11th', title: 'জ্যোতির্বিজ্ঞান', url: '', type: 'video', description: '' },

        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '1st', title: 'ম্যাট্রিক্স ও নির্ণায়ক', url: 'https://youtube.com/playlist?list=PL6H0G0vU2K2RTZiNOukAxG3Gzu6NYgt19&si=20T4nGzkgXNX4fcz', type: 'video', description: 'ACS' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '1st', title: 'ম্যাট্রিক্স ও নির্ণায়ক', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvj-iKdE6mSeTi6nT6EzHkBQ&si=6JXkGnhJwF9dolHB', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '2nd', title: 'ভেক্টর', url: 'https://youtu.be/uFGOaRvfFZA?si=WhkndJWLksGBKhHc', type: 'video', description: 'Abhi Datta Tushar' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '3rd', title: 'সরলরেখা', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvh-a6TE6j2egLKMalnDwsDn&si=gLme0l0tsaYaWUk6', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '4th', title: 'বৃত্ত', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvi9iGmxnRrIdcFGaJwJn2Vc&si=iLRM3qJPalUHhsDR', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '5th', title: 'বিন্যাস ও সমাবেশ', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvh8RlY5HtgVrB3kSv-4St9t&si=vDMfb3-hxLPwtXnj', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '5th', title: 'বিন্যাস ও সমাবেশ', url: 'https://youtube.com/playlist?list=PLjvB5a6_mOjFios-ZVJb0jtuJmcPWRd4u&si=qJMfIuHrHlQJr6gL', type: 'video', description: 'ACS' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '6th', title: 'ত্রিকোণমিতিক অনুপাত', url: 'https://youtu.be/-dw3s6D1G8U?si=fzliDH27KyE-DvvR', type: 'video', description: 'Abhi Datta Tushar' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '7th', title: 'সংযুক্ত ও যৌগিক কোণের ত্রিকোণমিতিক অনুপাত-১', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvgxESyYRbP_UdFFMlFRjFBu&si=VviyTOON4VXtTn1H', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '7th', title: 'সংযুক্ত ও যৌগিক কোণের ত্রিকোণমিতিক অনুপাত-২', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvhw-kdXkLe2mBMK6PkLAWHh&si=9JWDOih7ymLNFH3L', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '8th', title: 'ফাংশন ও ফাংশনের লেখচিত্র', url: 'https://youtube.com/playlist?list=PLKacUA_ZOPlpgKsmIAEjxAS05eRHAPetH&si=bANGt-aKqxsMiSyp', type: 'video', description: 'ACS' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '8th', title: 'ফাংশন ও ফাংশনের লেখচিত্র', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvhy7isMIFZZfPye0n21O98C&si=smdK6sLtDoHE9EfR', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '9th', title: 'অন্তরীকরণ ', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvg16Kbd8F26WFAv9QqIPRwM&si=ZsGHrpgOYmgHwNsO', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '1st', category: 'HSC', chapter: '10th', title: 'যোগজীকরণ', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLviU0ih4brGDrAjvCziqlCx7&si=t3VsaFp0D38FvxBg', type: 'video', description: 'Rifat Math Care' },

        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '1st', title: 'বাস্তব সংখ্যা ও অসমতা', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvjuAdKHqJCVEjQhSYMhqHt6&si=0k6srNTb-ZZfBPU4', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '2nd', title: 'যোগাশ্রয়ী প্রোগ্রাম ', url: 'https://youtube.com/playlist?list=PLxGJPwwF3v6z1cxhM-sqkXzVs0M_lVlGh&si=PgYwPWeHQUcAB_8t', type: 'video', description: 'ACS' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '3rd', title: 'জটিল সংখ্যা', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvj2VinCk-l8UEy4VQBS3fI4&si=9rzVemTdb8VsbgLT', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '4th', title: 'বহুপদী ও বহুপদী সমীকরণ', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvi53pY52CkA1BicyIXO6d7k&si=cdNvslcOA4iSJUgb', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '5th', title: 'দ্বিপদ বিস্তৃতি', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvgPbjR2EsoJv6yEEz1qQETf&si=_dHxKN92YCpBhC_b', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '6th', title: 'কনিক', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLviNL0fpRuvVq08RitI5aD4Z&si=OeEfDALf16nuuH-h', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '7th', title: 'বিপরীত ত্রিকোণমিতিক ফাংশন ও ত্রিকোণমিতিক সমীকরণ', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvj5BjhocWgU5Zh6nO1zYf5z&si=PjDhW8OapM0Uu9b0', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '8th', title: 'স্থিতিবিদ্যা', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvjJqeHw4vAe_-jgbj6_Ze8T&si=moNCCfmQwW6sxyUb', type: 'video', description: 'Rifat Math Care' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '9th', title: 'সমতলে বস্তুকণার গতি', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvjQ3jf7nVkMQPssWeXfkPiI&si=dmvPa0Yq6gBcNOMe', type: 'video', description: 'Rifat Math Care' },
         { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '9th', title: 'সমতলে বস্তুকণার গতি', url: 'https://youtube.com/playlist?list=PL4XrhAetwHqHs3tCStMlF7Ln1dCbQKD-j&si=TzslyhwUbFQQBSXj', type: 'video', description: 'Abhi Datta Tushar' },
        { subject: 'higher math', paper: '2nd', category: 'HSC', chapter: '10th', title: 'বিস্তার পরিমাপ ও সম্ভাবনা', url: 'https://youtube.com/playlist?list=PLpsxXzFtWLvh2Uk6N3qnO13qNrQZl6WBt&si=U6C__KWGOgt8lyM5', type: 'video', description: 'Rifat Math Care' },

        { subject: 'Chemistry', paper: '1st', category: 'HSC', chapter: '1st', title: 'ল্যাবরেটরির নিরাপদ ব্যবহার', url: 'https://youtube.com/playlist?list=PLepXHFBV3nyAT5toz93hngkPkI5rSPnni&si=erexpt1IuqrFuJVn', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '1st', category: 'HSC', chapter: '2nd', title: 'গুণগত রসায়ন', url: 'https://youtube.com/playlist?list=PLBIUjjCw0wBJLW6m2GwI4sZLP0tv4t8sP&si=W6M_ss8CH5uw-eDj', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '1st', category: 'HSC', chapter: '3rd', title: 'মৌলের পর্যাবৃত্ত ধর্ম ও রাসায়নিক বন্ধন', url: 'https://youtube.com/playlist?list=PLBPhOYI_nLgGIWqDOgCdInbAJ2XJJ9BcJ&si=_iYOIaE3ej_ilfzd', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '1st', category: 'HSC', chapter: '4th', title: 'রাসায়নিক পরিবর্তন', url: 'https://youtube.com/playlist?list=PL0Eb_I9onE-5c1NbY0rqVz7xm8uo_n6Lc&si=DCO10iupkZnfwVdp', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '1st', category: 'HSC', chapter: '5th', title: 'কর্মমুখী রসায়ন', url: 'https://youtube.com/playlist?list=PL63A5sj8xSzR0yMLPTorODoFLOtq_Ghls&si=UDY6EIU6eSnJCJu2', type: 'video', description: '' },

        { subject: 'Chemistry', paper: '2nd', category: 'HSC', chapter: '1st', title: '', url: '', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '2nd', category: 'HSC', chapter: '2nd', title: '', url: '', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '2nd', category: 'HSC', chapter: '3rd', title: '', url: '', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '2nd', category: 'HSC', chapter: '4th', title: '', url: '', type: 'video', description: '' },
        { subject: 'Chemistry', paper: '2nd', category: 'HSC', chapter: '5th', title: '', url: '', type: 'video', description: '' },

        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '1st', title: 'কোষের গঠন ', url: 'https://youtube.com/playlist?list=PLBIUjjCw0wBJi4ydjzjiE6NdwgyVMIKLk&si=qT_XY5ZivL1w-v85', type: 'video', description: 'বন্দি পাঠশালা ' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },

        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Biology', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },

        { subject: 'English', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'English', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },

        { subject: 'ICT', category: 'HSC', chapter: '1st', title: 'বিশ্ব ও বাংলাদেশ প্রেক্ষিত ', url: 'https://youtu.be/FycgM1KkpN0?si=POwB4AlhcWL0-m3R', type: 'video', description: 'ACS' },
        { subject: 'ICT', category: 'HSC', chapter: '2nd', title: 'কমিউনিকেশন সিস্টেম ও নেটওয়ার্কিং', url: 'https://youtu.be/pHO9fmTlHyQ?si=jl0GWMwNCOCe4sOK', type: 'video', description: 'ACS' },
        { subject: 'ICT', category: 'HSC', chapter: '3rd', title: 'সংখ্যা পদ্ধতি ও ডিজিটাল ডিভাইস', url: 'https://youtu.be/UraWGwzZIU0?si=z8QozqNHrXwOESm7', type: 'video', description: 'ACS' },
        { subject: 'ICT', category: 'HSC', chapter: '4th', title: 'ওয়েব ডিজাইন পরিচিতি এবং HTML', url: 'https://youtu.be/zljcRsSi8QU?si=GiViUP5_BjvVVPKz', type: 'video', description: 'ACS' },
        { subject: 'ICT', category: 'HSC', chapter: '5th', title: 'প্রোগ্ৰামিং ভাষা', url: 'https://youtu.be/PUGOQ5zJeVk?si=BSTbTHu-8pGHbIRQ', type: 'video', description: 'ACS' },
        { subject: 'ICT', category: 'HSC', chapter: '6th', title: 'Database Management System', url: 'https://youtu.be/warR3iHt_Wc?si=2MJ3zsNehSRTkqR-', type: 'video', description: 'ACS' },

        { subject: 'Bangla', paper: '1st', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },
        { subject: 'Bangla', paper: '2nd', category: 'HSC', chapter: '', title: '', url: '', type: 'video', description: '' },

        // Admission
        { subject: 'University Admission', category: 'Admission', title: 'Varsity Admission', url: 'https://youtube.com/playlist?list=PLKjdwUViO6Fj1q6HG4QYTHWmGBnrJJGP2&si=YH0don2A4cCUt9kI', type: 'video', description: 'উদ্ভাস-উন্মেষ শিক্ষা পরিবার' },
        { subject: 'University Admission', category: 'Admission', title: 'ঢাকা বিশ্ববিদ্যালয় ক ইউনিট', url: 'https://youtube.com/playlist?list=PL2h0WYsGcfJci2Hjgxfdz8W4RU4ArXa8u&si=Pdu3D8eC9xfL-XXk', type: 'video', description: 'DMC Station (RDS)' },
        { subject: 'University Admission', category: 'Admission', title: 'Target DU 5.0 Varsity + GST Admission Private Batch 2025', url: 'https://youtube.com/playlist?list=PLobFydMEKRxtniiXrJh6nZ0w2P7rSuMnH&si=h-lppfxahIfEbkRH', type: 'video', description: 'Bondi Pathshala' },
        { subject: 'University Admission', category: 'Admission', title: 'Math preparation varsity+gst admission', url: 'https://youtube.com/playlist?list=PL9TLDUL4U18chxBRToTtRDWde5HC2gfNT&si=HJBWT2Q3b1NsbHug', type: 'video', description: 'ACS' },
        { subject: 'University Admission', category: 'Admission', title: '', url: '', type: 'video', description: '' },
       
       
        { subject: 'Engineering Admission', category: 'Admission', title: 'ACS Engineering Batch', url: 'https://youtube.com/playlist?list=PLobFydMEKRxtYf2X5cweMc6zjoVdQsQQK&si=R7Vx5693cxGRikkJ', type: 'video', description: 'ACS' },
        { subject: 'Engineering Admission', category: 'Admission', title: 'ACS Engineering Admission (H. Math)', url: 'https://youtube.com/playlist?list=PLi5fEbOt0If5Qzx4SRMSSsNPyChKImUXs&si=2mY3IBAWFZ_taaL_', type: 'video', description: 'ACS' },
        { subject: 'Engineering Admission', category: 'Admission', title: 'Higher Math - ACS Engineering Admission Batch', url: 'https://youtube.com/playlist?list=PLobFydMEKRxtC0KGGSN0aGfIn2YCZeMZv&si=feoc5xPI_c0mMUyZ', type: 'video', description: 'ACS' },
        { subject: 'Engineering Admission', category: 'Admission', title: 'Engineering Chemistry Marathon Class', url: 'https://youtu.be/tKbLQb0Jk0k?si=Zb0vZyFxnHPQbNX9', type: 'video', description: 'OxyChem' },
        { subject: 'Engineering Admission', category: 'Admission', title: 'Engineering Admission Free Class', url: 'https://youtube.com/playlist?list=PLKjdwUViO6FiGXMa2_8YE1FvxxLJb-BBu&si=oGn5RDlqV2EmbiOb', type: 'video', description: 'উদ্ভাস-উন্মেষ শিক্ষা পরিবার' },
        { subject: 'Engineering Admission', category: 'Admission', title: '', url: '', type: 'video', description: '' },
        { subject: 'Engineering Admission', category: 'Admission', title: '', url: '', type: 'video', description: '' },
       
       
        { subject: 'Medical Admission', category: 'Admission', title: 'Biology nano medical course', url: 'https://youtube.com/playlist?list=PL8n3wAZkkFMZP4OslgzvfyGwQhrkDQcur&si=a6A-oq8E8GVyXN6c', type: 'video', description: 'DMC Station (RDS) ' },
        { subject: 'Medical Admission', category: 'Admission', title: 'Nano Medi English Course', url: 'https://youtube.com/playlist?list=PL2h0WYsGcfJfSUGRu2Sjte6llTuEGHGIp&si=-FqGSJ39FyM-bM6i', type: 'video', description: 'DMC Station (RDS) ' },
        { subject: 'Medical Admission', category: 'Admission', title: 'Medical Admission GK ENGLISH Course', url: 'https://youtube.com/playlist?list=PL2h0WYsGcfJd8hkBTA22ipJNxlUjZZaiP&si=gA-2X_s3vYCDfPg8', type: 'video', description: 'DMC Station (RDS) ' },
        { subject: 'Medical Admission', category: 'Admission', title: 'NANO MEDI HAND CALCULATION SERIES', url: 'https://youtube.com/playlist?list=PL2h0WYsGcfJfNf85_WXZKDIGfHP1DT9h_&si=vQKl2ljVji_GtfKy', type: 'video', description: 'DMC Station (RDS) ' },
        { subject: 'Medical Admission', category: 'Admission', title: '', url: '', type: 'video', description: '' },
        { subject: 'Medical Admission', category: 'Admission', title: '', url: '', type: 'video', description: '' },
        { subject: 'Medical Admission', category: 'Admission', title: '', url: '', type: 'video', description: '' },





        // Defence
        { subject: 'Bangladesh Army', category: 'Defence', title: 'Join Bangladesh Army', url: 'https://youtu.be/OCOPgiIbbbM?si=4v5uLhyqQn6VtWg3', type: 'video', description: 'Bangladesh Army' },
        { subject: 'Bangladesh Army', category: 'Defence', title: 'Bangladesh Army Anirban 2026', url: 'https://youtu.be/VcLKTGfJzn4?si=PTLt4ARRd6txPjC-', type: 'video', description: 'Bangladesh Army' },
       
        { subject: 'Bangladesh Navy', category: 'Defence', title: 'Join Bangladesh Navy', url: 'https://youtu.be/75-S3AhXJk0?si=KJXFppG53gcso7JK', type: 'video', description: 'Bangladesh Navy' },
        { subject: 'Bangladesh Navy', category: 'Defence', title: 'BANGLADESH NAVY ANIRBAN 2025', url: 'https://youtu.be/TrfRwAsLEcA?si=ocgJLz_cvXARAytr', type: 'video', description: 'Bangladesh Navy' },
       
        { subject: 'Bangladesh Air Force', category: 'Defence', title: 'Join Bangladesh Air Force', url: 'https://youtu.be/fq7Gpq-hAdE?si=co99DLaHJxY6dtTR', type: 'video', description: 'Bangladesh Air Force' },
        { subject: 'Bangladesh Air Force', category: 'Defence', title: 'BANGLADESH Air Force ANIRBAN 2025', url: 'https://youtu.be/jVnMy4HRFgM?si=OVKAaKSevrrfNILY', type: 'video', description: 'Bangladesh Air Force' }





    ];

    async function fetchSheetData() {
        if (!SHEET_CSV_URL) return;
        try {
            const response = await fetch(SHEET_CSV_URL);
            const data = await response.text();
            APP_CONTENT = parseCSV(data);
        } catch (error) {
            console.error('Error fetching sheet data:', error);
        }
    }

    function parseCSV(csvText) {
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        return lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, i) => {
                obj[header] = values[i] ? values[i].trim() : '';
                return obj;
            }, {});
        });
    }


    const admissionItems = [
        { name: 'Medical Admission', icon: 'fa-stethoscope' },
        { name: 'Engineering Admission', icon: 'fa-gears' },
        { name: 'University Admission', icon: 'fa-building-columns' },
        { name: 'Agricultural Uni', icon: 'fa-seedling' },
        { name: 'Others Admission', icon: 'fa-graduation-cap' }
    ];

    const defenceData = {
        army: [
            { name: 'Bangladesh Army', icon: 'fa-person-military-pointing' }
        ],
        airforce: [
            { name: 'Bangladesh Air Force', icon: 'fa-plane-up' }
        ],
        navy: [
            { name: 'Bangladesh Navy', icon: 'fa-ship' }
        ]
    };

    const literatureData = [
        { name: 'Bangla Classics', icon: 'fa-pen-fancy', category: 'Bangla' },
        { name: 'English Literature', icon: 'fa-feather', category: 'English' },
        { name: 'Hindi Collection', icon: 'fa-book', category: 'Hindi' },
        { name: 'Arabic Wisdom', icon: 'fa-scroll', category: 'Arabic' }
    ];

    // --- State Management ---
    let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // --- Auth Helpers for Explore Page ---
    window.showLoginPromptCard = function() {
        const card = document.getElementById('loginPromptCard');
        if (card) card.style.display = 'flex';
    };

    window.closeLoginPromptCard = function() {
        const card = document.getElementById('loginPromptCard');
        if (card) card.style.display = 'none';
    };

    window.goToLogin = function() {
        window.closeLoginPromptCard();
        window.location.hash = 'login';
    };

    window.checkLoginBeforeOpen = function(callback) {
        if (!currentUser) {
            window.showLoginPromptCard();
            return;
        }
        callback();
    };

    window.showPurchaseCard = function() {
        const card = document.getElementById('purchasePromptCard');
        if (card) card.style.display = 'flex';
    };

    window.closePurchaseCard = function() {
        const card = document.getElementById('purchasePromptCard');
        if (card) card.style.display = 'none';
    };

    window.openPurchaseGmail = function() {
        const to = 'sikkhagronthoedu@gmail.com';
        const subject = encodeURIComponent('Book Purchase Request');
        const body = encodeURIComponent(
            'Hello,\n\nI am interested in purchasing Books/Novels/Poems from Sikkhagrontho.\n\nPlease provide details.\n\nThank you.'
        );
        window.location.href =
            'https://mail.google.com/mail/?view=cm&fs=1&to=' + to +
            '&su=' + subject +
            '&body=' + body;
        window.closePurchaseCard();
    };

    // --- DOM Elements ---
    const loader = document.getElementById('loader');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Auth Elements
    const loginLink = document.getElementById('login-link');
    const logoutBtn = document.getElementById('logoutBtn');
    const profileLink = document.getElementById('profile-link');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    // Content Modal Elements
    const contentModal = document.getElementById('content-modal');
    const closeContentModal = document.getElementById('close-content-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body-content');
    const paperBtns = document.querySelectorAll('.paper-btn');

    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    const passwordToggles = document.querySelectorAll('.password-toggle');

    // Profile Elements
    const profileSection = document.getElementById('profile');
    const idCardModal = document.getElementById('id-card-modal');
    const showIdBtn = document.getElementById('show-id-btn');
    const closeIdModal = document.getElementById('close-id-modal');
    const downloadIdBtn = document.getElementById('download-id-btn');
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editAvatarBtn = document.getElementById('edit-avatar-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeEditModal = document.getElementById('close-edit-modal');
    const editProfileForm = document.getElementById('edit-profile-form');
    const hiddenAvatarInput = document.getElementById('hidden-avatar-input');

    // Admin Elements
    const adminSection = document.getElementById('admin');

    // --- YouTube API Support ---
    let ytPlayers = [];
    const ytScript = document.createElement('script');
    ytScript.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(ytScript);

    function initializeYouTubePlayers() {
        // Clear old players
        ytPlayers = [];
        const iframes = modalBody.querySelectorAll('iframe.video-player-frame');
        iframes.forEach((iframe, index) => {
            const player = new YT.Player(iframe, {
                events: {
                    'onStateChange': (event) => {
                        const wrapper = iframe.closest('.video-wrapper');
                        if (event.data === YT.PlayerState.PLAYING) {
                            // Remove active from all other wrappers
                            document.querySelectorAll('.video-wrapper.active-playback').forEach(w => {
                                w.classList.remove('active-playback');
                            });
                            // Add to current
                            wrapper.classList.add('active-playback');
                        } else if (event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.ENDED) {
                            wrapper.classList.remove('active-playback');
                        }
                    }
                }
            });
            ytPlayers.push(player);
        });
    }

    // Hide loader
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }, 2000);

    const pendulumHTML = `
        <div class="newtons-cradle-small">
            <div class="cradle-ball-wrap-small"><div class="cradle-string-small"></div><div class="cradle-ball-small"></div></div>
            <div class="cradle-ball-wrap-small"><div class="cradle-string-small"></div><div class="cradle-ball-small"></div></div>
            <div class="cradle-ball-wrap-small"><div class="cradle-string-small"></div><div class="cradle-ball-small"></div></div>
            <div class="cradle-ball-wrap-small"><div class="cradle-string-small"></div><div class="cradle-ball-small"></div></div>
            <div class="cradle-ball-wrap-small"><div class="cradle-string-small"></div><div class="cradle-ball-small"></div></div>
        </div>
    `;

    // Dynamic Rendering
    function renderCards() {
        // HSC
        const hscGrid = document.getElementById('hsc-grid');
        // Initial loader if empty
        if (!hscSubjects.length) {
            hscGrid.innerHTML = `<div class="coming-soon-wrapper">${pendulumHTML}<h3>Loading...</h3></div>`;
        } else {
            hscGrid.innerHTML = hscSubjects.map(sub => `
                <div class="card">
                    <i class="fas ${sub.icon} card-icon"></i>
                    <h3>${sub.name}</h3>
                    <div class="card-actions">
                        <button class="btn-card hsc-content-btn" data-subject="${sub.name}" data-type="video">Classes</button>
                        <button class="btn-card hsc-content-btn" data-subject="${sub.name}" data-type="book">Books</button>
                    </div>
                </div>
            `).join('');
        }

        // Add event listeners to HSC buttons
        document.querySelectorAll('.hsc-content-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const subject = btn.dataset.subject;
                const type = btn.dataset.type;
                checkLoginBeforeOpen(() => {
                    if (type === 'book') {
                        showPurchaseCard();
                    } else {
                        openContentModal(subject, type);
                    }
                });
            });
        });

        // Admission
        const admissionGrid = document.getElementById('admission-grid');
        admissionGrid.innerHTML = admissionItems.map(item => `
            <div class="card">
                <i class="fas ${item.icon} card-icon"></i>
                <h3>${item.name}</h3>
                <div class="card-actions">
                    <button class="btn-card admission-content-btn" data-subject="${item.name}" data-type="video">Classes</button>
                    <button class="btn-card admission-content-btn" data-subject="${item.name}" data-type="book">Books</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to Admission buttons
        document.querySelectorAll('.admission-content-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const subject = btn.dataset.subject;
                const type = btn.dataset.type;
                checkLoginBeforeOpen(() => {
                    if (type === 'book') {
                        showPurchaseCard();
                    } else {
                        openContentModal(subject, type);
                    }
                });
            });
        });

        // Defence
        Object.keys(defenceData).forEach(branch => {
            const grid = document.getElementById(`${branch}-grid`);
            if (grid) {
                grid.innerHTML = defenceData[branch].map(item => `
                    <div class="card">
                        <i class="fas ${item.icon} card-icon"></i>
                        <h3>${item.name}</h3>
                        <div class="card-actions">
                            <button class="btn-card defence-content-btn" data-subject="${item.name}" data-type="video">Classes</button>
                            <button class="btn-card defence-content-btn" data-subject="${item.name}" data-type="book">Books</button>
                        </div>
                    </div>
                `).join('');
            }
        });

        // Add event listeners to Defence buttons
        document.querySelectorAll('.defence-content-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const subject = btn.dataset.subject;
                const type = btn.dataset.type;
                checkLoginBeforeOpen(() => {
                    if (type === 'book') {
                        showPurchaseCard();
                    } else {
                        openContentModal(subject, type);
                    }
                });
            });
        });

        // Literature
        const literatureGrid = document.getElementById('literature-grid');
        literatureGrid.innerHTML = literatureData.map(item => `
            <div class="card">
                <i class="fas ${item.icon} card-icon"></i>
                <h3>${item.category} ${item.name.split(' ')[1]}</h3>
                <div class="card-actions">
                    <button class="btn-card literature-content-btn" data-type="Novels">Novels</button>
                    <button class="btn-card literature-content-btn" data-type="Poems">Poems</button>
                </div>
            </div>
        `).join('');

        // Add event listeners to Literature buttons
        document.querySelectorAll('.literature-content-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                checkLoginBeforeOpen(() => {
                    showPurchaseCard();
                });
            });
        });
    }

    // Modal Operations
    let currentSubject = '';
    let contentType = '';
    let currentPaper = '1st';

    function openContentModal(subject, type) {
        currentSubject = subject;
        contentType = type;
        currentPaper = '1st'; // Reset to 1st paper by default

        modalTitle.textContent = `${subject} ${type === 'video' ? 'Classes' : 'Books'}`;

        const toggleContainer = document.getElementById('paper-toggle-container');
        const hasPapers = ['Physics', 'Chemistry', 'Biology', 'Higher Math', 'Mathematics', 'English', 'Bangla'].some(s => s.toLowerCase() === subject.toLowerCase());
        
        if (type === 'video' && hasPapers && subject.toUpperCase() !== 'ICT') {
            toggleContainer.style.display = 'flex';
        } else {
            toggleContainer.style.display = 'none';
        }

        // Reset paper buttons
        paperBtns.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.paper === '1st') btn.classList.add('active');
        });

        updateModalContent();
        contentModal.style.display = 'flex';
    }

    function updateModalContent() {
        const filteredData = APP_CONTENT.filter(item =>
            item.subject.toLowerCase() === currentSubject.toLowerCase() &&
            item.type.toLowerCase() === contentType.toLowerCase() &&
            (contentType === 'book' || 
             currentSubject.toUpperCase() === 'ICT' || 
             !item.paper || 
             item.paper === currentPaper)
        );

        if (filteredData.length === 0) {
            modalBody.innerHTML = `
                <div class="coming-soon-wrapper">
                    ${pendulumHTML}
                    <h3>Coming Soon</h3>
                    <p>We are currently preparing ${contentType === 'video' ? 'classes' : 'books'} for ${currentSubject} ${contentType === 'video' ? currentPaper + ' Paper' : ''}.</p>
                </div>
            `;
            return;
        }

        if (contentType === 'video') {
            modalBody.innerHTML = filteredData.map(item => {
                if (item.url) {
                    const videoId = item.url.includes('list=') ? null : (item.url.match(/(?:https?:\/\/(?:www\.)?youtube\.com\/watch\?v=|https?:\/\/youtu\.be\/)([^&?/\s]+)/) || [])[1];
                    const separator = item.url.includes('?') ? '&' : '?';
                    const playerUrl = item.url.includes('list=') ?
                        `https://www.youtube.com/embed/videoseries?list=${item.url.split('list=')[1]}&enablejsapi=1` :
                        `https://www.youtube.com/embed/${videoId}?enablejsapi=1`;

                    return `
                        <div class="video-box">
                            <div class="video-wrapper">
                                <iframe class="video-player-frame" src="${playerUrl}" allowfullscreen></iframe>
                            </div>
                            <div class="video-info">
                                <h4>${item.title}</h4>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `;
                } else {
                    return `
                        <div class="video-item">
                            <div class="coming-soon-wrapper">
                                ${pendulumHTML}
                                <h4>${item.title} - Coming Soon</h4>
                                <p>${item.description}</p>
                            </div>
                        </div>
                    `;
                }
            }).join('');
        } else {
            modalBody.innerHTML = filteredData.map(item => `
                <a href="${item.url}" target="_blank" class="pdf-item">
                    <i class="fas fa-file-pdf pdf-icon"></i>
                    <div class="pdf-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                    </div>
                </a>
            `).join('');
        }

        // After setting HTML, initialize players if API is ready
        if (contentType === 'video' && typeof YT !== 'undefined' && YT.Player) {
            setTimeout(initializeYouTubePlayers, 100);
        }
    }

    paperBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paperBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPaper = btn.dataset.paper;
            updateModalContent();
        });
    });

    closeContentModal.addEventListener('click', () => {
        contentModal.style.display = 'none';
        modalBody.innerHTML = ''; // Clear videos to stop playback
    });

    // Close on outside click for content modal
    window.addEventListener('click', (event) => {
        if (event.target === contentModal) {
            contentModal.style.display = 'none';
            modalBody.innerHTML = '';
        }
    });

    // Initial HSC loader
    const hscGrid_main = document.getElementById('hsc-grid');
    if (hscGrid_main) {
        hscGrid_main.innerHTML = `<div class="coming-soon-wrapper">${pendulumHTML}<h3>Loading HSC Subjects...</h3></div>`;
    }

    fetchSheetData().then(() => {
        renderCards();
    });


    // Navigation & Tabs
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileToggle.querySelector('i').classList.toggle('fa-bars');
        mobileToggle.querySelector('i').classList.toggle('fa-xmark');
    });

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });

    // Auth Switching
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
    });

    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const input = document.getElementById(toggle.dataset.target);
            const icon = toggle.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });

    // Registration Logic
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('reg-fullname').value;
        const college = document.getElementById('reg-college').value;
        const phone = document.getElementById('reg-phone').value;
        const guardian = document.getElementById('reg-guardian').value;
        const blood = document.getElementById('reg-blood').value;
        const username = document.getElementById('reg-username').value;
        const password = document.getElementById('reg-password').value;
        const photoFile = document.getElementById('reg-photo').files[0];

        // Check if username exists
        if (users.find(u => u.username === username)) {
            alert('Username already exists!');
            return;
        }

        const newUser = {
            id: Date.now().toString(),
            fullName,
            college,
            phone,
            guardian,
            blood,
            username,
            password: btoa(password), // Simple encoding for demo
            photo: 'https://via.placeholder.com/150',
            role: username === 'admin' ? 'admin' : 'student'
        };

        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                newUser.photo = event.target.result;
                saveAndLogin(newUser);
            };
            reader.readAsDataURL(photoFile);
        } else {
            saveAndLogin(newUser);
        }
    });

    function saveAndLogin(user) {
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateUIForLogin();
        alert('Account created successfully!');
        window.location.hash = 'home';
    }

    // Login Logic
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = btoa(document.getElementById('login-password').value);

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            updateUIForLogin();
            alert('Welcome back, ' + user.fullName);
            window.location.hash = 'home';
        } else {
            alert('Invalid credentials!');
        }
    });

    // Logout Logic
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            currentUser = null;
            localStorage.removeItem('currentUser');
            updateUIForLogin();
            alert('Logged out successfully');
            window.location.hash = 'home';
        });
    }

    // UI Updates based on Auth
    function updateUIForLogin() {
        if (currentUser) {
            loginLink.classList.add('hidden');
            if (logoutBtn) logoutBtn.classList.remove('hidden');
            profileLink.classList.remove('hidden');
            document.querySelector('.auth-section').classList.add('hidden');

            // Fill Profile Data
            document.getElementById('display-name').textContent = currentUser.fullName;
            document.getElementById('display-username').textContent = '@' + currentUser.username;
            document.getElementById('profile-img').src = currentUser.photo;
            document.getElementById('profile-college').textContent = currentUser.college;
            document.getElementById('profile-phone').textContent = currentUser.phone;
            document.getElementById('profile-guardian').textContent = currentUser.guardian;
            document.getElementById('profile-blood').textContent = currentUser.blood;

            if (currentUser.role === 'admin') {
                adminSection.classList.remove('hidden');
                renderAdminPanel();
            } else {
                adminSection.classList.add('hidden');
            }
        } else {
            loginLink.classList.remove('hidden');
            if (logoutBtn) logoutBtn.classList.add('hidden');
            profileLink.classList.add('hidden');
            document.querySelector('.auth-section').classList.remove('hidden');
            profileSection.classList.add('hidden');
            adminSection.classList.add('hidden');
        }
    }

    // Toggle Home Elements Visibility
    function toggleHomeElements(pageId) {
    const banner = document.getElementById('nasa-banner');
    const cards = document.getElementById('logo-cards-section');
    const movies = document.getElementById('movies-section');
    const whatToWatch = document.getElementById('hero-middle-space');
    const midBanner = document.getElementById('mid-feature-banner');   // 👈 নতুন লাইন

    const isHome = pageId === 'home' || pageId === '' || pageId === '#';

    if (banner) banner.style.display = isHome ? 'block' : 'none';
    if (cards) cards.style.display = isHome ? 'flex' : 'none';
    if (movies) movies.style.display = isHome ? 'block' : 'none';
    if (whatToWatch) whatToWatch.style.display = isHome ? 'block' : 'none';
    if (midBanner) midBanner.style.display = isHome ? 'block' : 'none';   // 👈 নতুন লাইন
    const didYouKnow = document.getElementById('did-you-know-section');
    if (didYouKnow) didYouKnow.style.display = isHome ? 'block' : 'none';
    const featureBanner = document.getElementById('feature-banner-section');
    if (featureBanner) featureBanner.style.display = isHome ? 'flex' : 'none';

    const missionSection = document.getElementById('mission-section');
    if (missionSection) missionSection.style.display = isHome ? 'block' : 'none';
}

    // Hash Navigation
    function handleNavigation() {
        const hash = window.location.hash || '#home';
        const pageId = hash.replace('#', '') || 'home';

        // Toggle home-only elements
        toggleHomeElements(pageId);

        const sections = document.querySelectorAll('main > section');

        sections.forEach(sec => sec.classList.add('hidden'));

        const targetSection = document.querySelector(hash);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            // Special cases
            if (hash === '#profile' && !currentUser) window.location.hash = '#login';
            if (hash === '#admin' && (!currentUser || currentUser.role !== 'admin')) window.location.hash = '#home';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) link.classList.add('active');
        });

        // Close mobile menu
        navMenu.classList.remove('active');
        mobileToggle.querySelector('i').classList.remove('fa-xmark');
        mobileToggle.querySelector('i').classList.add('fa-bars');
    }

    window.addEventListener('hashchange', handleNavigation);
    handleNavigation(); // Initial run

    // ID Card Logic
    showIdBtn.addEventListener('click', () => {
        if (!currentUser) return;

        document.getElementById('id-name').textContent = currentUser.fullName;
        document.getElementById('id-uid').textContent = 'ID: ' + currentUser.id.slice(-6);
        document.getElementById('id-college').textContent = currentUser.college;
        document.getElementById('id-blood').textContent = currentUser.blood;
        document.getElementById('id-student-img').src = currentUser.photo;

        // Generate QR Code
        const qrContainer = document.getElementById('qrcode');
        qrContainer.innerHTML = '';
        new QRCode(qrContainer, {
            text: 'Name: ' + currentUser.fullName + '\n ID: ' + currentUser.id.slice(-6),
            width: 80,
            height: 80,
            colorDark: "#1E40AF",
            colorLight: "#ffffff"
        });

        idCardModal.style.display = 'flex';
    });

    closeIdModal.addEventListener('click', () => {
        idCardModal.style.display = 'none';
    });

    closeEditModal.addEventListener('click', () => {
        editProfileModal.style.display = 'none';
    });

    window.onclick = (event) => {
        if (event.target === idCardModal) idCardModal.style.display = 'none';
        if (event.target === editProfileModal) editProfileModal.style.display = 'none';
        if (event.target === contentModal) {
            contentModal.style.display = 'none';
            modalBody.innerHTML = '';
        }
    };

    // Edit Profile Logic
    editProfileBtn.addEventListener('click', () => {
        if (!currentUser) return;
        document.getElementById('edit-fullname').value = currentUser.fullName;
        document.getElementById('edit-college').value = currentUser.college;
        document.getElementById('edit-phone').value = currentUser.phone;
        document.getElementById('edit-guardian').value = currentUser.guardian;
        document.getElementById('edit-blood').value = currentUser.blood;
        editProfileModal.style.display = 'flex';
    });

    editProfileForm.addEventListener('submit', (e) => {
        e.preventDefault();
        currentUser.fullName = document.getElementById('edit-fullname').value;
        currentUser.college = document.getElementById('edit-college').value;
        currentUser.phone = document.getElementById('edit-phone').value;
        currentUser.guardian = document.getElementById('edit-guardian').value;
        currentUser.blood = document.getElementById('edit-blood').value;

        // Update in users array
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        if (userIndex !== -1) {
            users[userIndex] = { ...currentUser };
            localStorage.setItem('users', JSON.stringify(users));
        }
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        updateUIForLogin();
        editProfileModal.style.display = 'none';
        alert('Profile updated successfully!');
    });

    // Avatar Edit Logic
    editAvatarBtn.addEventListener('click', () => {
        hiddenAvatarInput.click();
    });

    hiddenAvatarInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (event) {
                currentUser.photo = event.target.result;

                // Update in users array
                const userIndex = users.findIndex(u => u.id === currentUser.id);
                if (userIndex !== -1) {
                    users[userIndex].photo = currentUser.photo;
                    localStorage.setItem('users', JSON.stringify(users));
                }
                localStorage.setItem('currentUser', JSON.stringify(currentUser));

                updateUIForLogin();
                alert('Profile photo updated!');
            };
            reader.readAsDataURL(file);
        }
    });

    downloadIdBtn.addEventListener('click', () => {
        const card = document.getElementById('idCardContent');
        html2canvas(card, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: null
        }).then(function (canvas) {
            const link = document.createElement('a');
            link.download = 'Sikkhagrontho_ID_' + currentUser.username + '.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });

    // Admin Panel Logic
    function renderAdminPanel() {
        const userList = document.getElementById('admin-user-list');
        const totalUsers = document.getElementById('total-users');

        totalUsers.textContent = users.length;
        userList.innerHTML = users.map(u => `
            <tr>
                <td>${u.fullName}</td>
                <td>@${u.username}</td>
                <td>${u.college}</td>
                <td>${u.phone}</td>
                <td>
                    <button class="btn-card" onclick="alert('Viewing profile of ${u.fullName}\\nID: ${u.id}\\nCollege: ${u.college}')">Details</button>
                </td>
            </tr>
        `).join('');
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    window.sendMessage = function() {
        const name = document.getElementById('contact-name').value;
        const email = document.getElementById('contact-email').value;
        const subjectField = document.getElementById('contact-subject').value;
        const message = document.getElementById('contact-message').value;

        if (!name || !email || !message) {
            alert('Please fill in all required fields!');
            return;
        }

        const to = 'sikkhagronthoedu@gmail.com';
        const subject = encodeURIComponent((subjectField || 'Message') + ' from ' + name);
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            'Message:\n' + message
        );

        window.location.href =
            'https://mail.google.com/mail/?view=cm&fs=1&to=' + to +
            '&su=' + subject +
            '&body=' + body;
    };


    // Mid Feature Banner Carousel
(function () {
    const slides = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.carousel-dots .dot');
    let current = 0;
    let interval;

    function showSlide(index) {
        slides.forEach((s, i) => {
            s.style.opacity = i === index ? '1' : '0';
            s.style.pointerEvents = i === index ? 'auto' : 'none';
        });
        dots.forEach((d, i) => {
            d.style.background = i === index ? '#ffffff' : 'rgba(255,255,255,0.4)';
        });
        current = index;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }

    function startAutoSlide() {
        interval = setInterval(nextSlide, 5000);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(interval);
            showSlide(parseInt(dot.dataset.index));
            startAutoSlide();
        });
    });

    if (slides.length > 0) startAutoSlide();
})();

    // Navbar Drag Shine Effect
    const navbar = document.querySelector('.navbar');
    let isDraggingNav = false;

    if (navbar) {
        navbar.addEventListener('mousedown', () => {
            isDraggingNav = true;
        });

        navbar.addEventListener('mousemove', () => {
            if (isDraggingNav) {
                if (!navbar.classList.contains('drag-shine')) {
                    navbar.classList.add('drag-shine');
                    // Remove class after animation finishes (0.8s-0.9s)
                    setTimeout(() => {
                        navbar.classList.remove('drag-shine');
                    }, 1000);
                }
                isDraggingNav = false; // Trigger once per drag start
            }
        });

        window.addEventListener('mouseup', () => {
            isDraggingNav = false;
        });
    }

    // Initial UI check
    updateUIForLogin();
});
