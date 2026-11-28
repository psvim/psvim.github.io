// Preloader
(function(){
  var minShow = 320;
  var start = Date.now();
  function hide(){
    var el = document.getElementById('preloader');
    if (!el) return;
    var wait = Math.max(0, minShow - (Date.now() - start));
    setTimeout(function(){
      el.classList.add('hide');
      setTimeout(function(){ el.remove(); }, 400);
    }, wait);
  }
  if (document.readyState === 'complete') hide();
  else window.addEventListener('load', hide);
  setTimeout(hide, 2500);
})();
// Theme
(function(){
  try {
    var t = localStorage.getItem('vps-theme') || 'light';
    document.documentElement.setAttribute('data-theme', t);
  } catch(e){}
})();
function getTheme() {
  return document.documentElement.getAttribute('data-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}
function setTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  try { localStorage.setItem('vps-theme', t); } catch(e){}
  updateThemeIcon();
}
function updateThemeIcon() {
  var dark = getTheme() === 'dark';
  document.getElementById('icon-sun').style.display = dark ? 'none' : '';
  document.getElementById('icon-moon').style.display = dark ? '' : 'none';
}
document.getElementById('theme-btn').addEventListener('click', function(){
  setTheme(getTheme() === 'dark' ? 'light' : 'dark');
});
updateThemeIcon();
// Nav ham
var ham = document.getElementById('nav-ham');
var mob = document.getElementById('mob-menu');
ham.addEventListener('click', function(){
  var open = mob.classList.toggle('open');
  ham.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
mob.querySelectorAll('a').forEach(function(a){
  a.addEventListener('click', function(){
    mob.classList.remove('open');
    ham.classList.remove('open');
    document.body.style.overflow = '';
  });
});
// AI chatbot
var ARR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
function sw(id,label){return '<br><button class="ai-switch" onclick="showSection(\''+id+'\')">'+ARR+label+'</button>';}
var answers = {
  wer: "Vineet (psvim) is a security researcher from India, finishing a Bachelor of Pharmacy at AKTU Lucknow. Pentesting, CTFs, and vulnerability research generally, plus a particular focus on life sciences — patient data, pharmaceutical research data, and the systems that store them."+sw('facts','View full facts'),
  beruflich: "Security research — CTFs and pentesting practice on TryHackMe, plus vulnerability work that's specifically aimed at life sciences: finding and fixing issues in systems that hold patient and research data. Python and Bash are what he writes himself; PHP and Go get written with AI doing most of the actual code, which he then reads and tests."+sw('skills','See his toolkit'),
  projekte: "A handful of open-source projects, mostly security-focused — including DRXStore, a pharmacy management system where he's fixed several reported vulnerabilities around patient data, plus some smaller security tools. All public on <a href='https://github.com/psvim' target='_blank'>github.com/psvim</a>."+sw('work','Browse his work'),
  kontakt: "Email is the best way — <strong>ci.vps@proton.me</strong> or <strong>i@psv.im</strong>. Also on <a href='https://github.com/psvim' target='_blank'>GitHub</a> and <a href='https://linkedin.com/in/psvim' target='_blank'>LinkedIn</a>."+sw('reach','Open contact page'),
  thm: "TryHackMe Top 1% globally — web exploitation, forensics, OSINT, cryptography, networking. The latest was Hacker Holidays 2026: 14 rooms, all completed, with writeups. <a href='https://tryhackme.com/p/psvim' target='_blank'>View profile →</a>"+sw('badges','See badges & certs'),
  cve: "He's fixed several reported vulnerabilities in DRXStore — the pharmacy management system he maintains — mostly high-severity auth bypass and file upload issues. Advisories are on <a href='https://github.com/psvim/drxstore' target='_blank'>github.com/psvim/drxstore</a>. Finding them in a healthcare context made the reporting process a bit more careful than usual."+sw('work','See all projects'),
  pharma: "Third-year B.Pharm at AKTU Lucknow. The security interest isn't new or dependent on the degree — CTFs and general pentesting came first. What the pharmacy background added is a specific angle: seeing how patient records, research data, and pharmaceutical systems get handled in practice, and applying that same security thinking to DRXStore and the research he's done on the side."+sw('education','View education'),
  award: "Won first place in the AI Innovation track at ICS-22, a cyclodextrin research symposium, for a drug-solubility prediction model (R² 0.96). <a href='https://github.com/psvim/pharmi/blob/70945ecb327e17337e3ba7e3ffddd537a29e176c/1e445da2-776e-4c06-a5bd-bbf6f73caa37.pdf' target='_blank'>View ICS-22 Certificate</a> Also co-presented a research poster on black seed compounds and cancer targets at the IPGA annual conference, and completed TryHackMe's Hacker Holidays CTF."+sw('work','See the work'),
  blog: "A few recent posts — a PHP vulnerability writeup, CTF solutions from Hacker Holidays, and some guides on SQL injection and CSRF. All at <a href='https://bl.psv.im' target='_blank'>bl.psv.im</a>.",
  skills: "<strong>Python</strong> and <strong>Bash</strong> he writes himself, no AI involved. <strong>PHP</strong> and <strong>Go</strong> he writes with AI doing most of the drafting — he reads and tests what comes out rather than writing it unassisted. MySQL, Linux and Git day to day. Security toolkit: Burp Suite, Nmap, Wireshark and Metasploit."+sw('skills','See his toolkit'),
  edu: "B.Pharm at AKTU Lucknow (2024–2028, third year). Before that: Class XII in the PCB stream with <strong>92.4%</strong> (2022–24) and Class X with <strong>87%</strong> (2022)."+sw('education','View education'),
  where: "He's in India — studying at AKTU in Lucknow. Times on this site are shown in IST."+sw('facts','View full facts'),
  drx: "<strong>DRXStore</strong> is an open-source pharmacy management system (PHP + MySQL, self-hosted) that holds patient records and prescription data. Vineet has been its developer & security maintainer since 2024 — he's Published formal GitHub Security Advisories (up to CVSS 8.8) in coordination with external researchers, remediated critical auth and file-upload bugs, and redesigned staff RBAC to protect patient records, moving the project to GPLv3 along the way. The PHP itself is largely AI-assisted; finding and fixing the vulnerabilities is not. Code: <a href='https://github.com/psvim/drxstore' target='_blank'>github.com/psvim/drxstore</a>."+sw('work','See the project'),
  pharmi: "<strong>PharmI</strong> is a machine-learning model that predicts how well drugs dissolve with cyclodextrins (scikit-learn + Flask, R² 0.96). It won first place in the AI Innovation track at ICS-22 in 2026 and was presented at a symposium in Moga. <a href='https://github.com/psvim/pharmi/blob/70945ecb327e17337e3ba7e3ffddd537a29e176c/1e445da2-776e-4c06-a5bd-bbf6f73caa37.pdf' target='_blank'>View ICS-22 Certificate →</a>"+sw('work','See the project'),
  research: "A research poster on black seed compounds and cancer targets, co-authored with Dr. Shreya Singh — computational (in-silico) screening for drug-likeness, presented at the 37th IPGA annual conference in 2025."+sw('work','See the work'),
  certs: "Eight so far, including TryHackMe's <strong>Hacker Holidays — Byte Lotus</strong>, <strong>Cyber Security 101</strong> and <strong>Pre Security</strong>, Google Cloud's Generative AI skill badge, and LinkedIn Learning courses on Copilot prompt writing and GitHub Actions."+sw('badges','See all badges'),
  hire: "Open to internship opportunities and collaboration in infosec generally — pentesting, application security, vulnerability research — and particularly anything at the intersection of life sciences and security: patient data, pharmaceutical research data. Also happy to connect for CTF collaboration and research. Email is the quickest way: <strong>ci.vps@proton.me</strong>. Facts, Work and Education on this site cover the same ground as a CV."+sw('reach','Open contact page'),
  links: "<a href='https://github.com/psvim' target='_blank'>GitHub</a> · <a href='https://linkedin.com/in/psvim' target='_blank'>LinkedIn</a> · <a href='https://tryhackme.com/p/psvim' target='_blank'>TryHackMe</a> — all under the handle <strong>psvim</strong>."+sw('reach','Contact page'),
  site: "I'm a small built-in assistant, not a live AI model. I match your question against a set of facts about Vineet and answer right here in your browser — no tracking, and your questions stay on your device. The ⓘ status panel only contacts GitHub and ip.sb when you open it."
};
var defaultAnswer = "Not sure about that one. For anything specific, email <strong>ci.vps@proton.me</strong> or check <a href='https://github.com/psvim' target='_blank'>github.com/psvim</a>.";
var term = {
  help: "Commands: <strong>whoami</strong>, <strong>ls</strong>, <strong>pwd</strong>, <strong>cat flag.txt</strong>, <strong>sudo</strong>, <strong>matrix</strong>. Or ask in plain English.",
  whoami: "psvim — security researcher (infosec + life sciences), B.Pharm student, TryHackMe Top 1%.",
  ls: "projects/&nbsp; skills/&nbsp; certs/&nbsp; contact.txt",
  pwd: "/home/psvim",
  flag: "Nice try. No flags here. Go earn them on <a href='https://tryhackme.com/p/psvim' target='_blank'>TryHackMe</a>.",
  sudo: "psvim is not in the sudoers file. This incident will be reported."
};
function istHour(){
  try {
    var p = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', hour12: false }).format(new Date());
    return parseInt(p, 10) % 24;
  } catch (e) { return new Date().getHours(); }
}
function greetReply(q){
  var clean = q.replace(/[^a-z\s]/g, ' ').replace(/\s+/g, ' ').trim();
  if (!clean) return null;
  var words = clean.split(' ');
  if (words.length > 3) return null;
  if (/^(good ?night|gn)$/.test(words.join('')) ) return 'Good night! Feel free to come back with questions anytime.';
  var greet = null;
  if (/^good ?(morning|afternoon|evening)$/.test(words.slice(0, 2).join('')) || /^(gm)$/.test(words[0])) greet = 'Hello!';
  else if (/^(h|hi+|hii+|hey+|hlo|helo+|hello+|hullo|hola|yo|sup|howdy|namaste|namaskar|pranam|radhe)$/.test(words[0])) greet = /^(namaste|namaskar|pranam)$/.test(words[0]) ? 'Namaste!' : /^hola$/.test(words[0]) ? 'Hola!' : 'Hello!';
  if (!greet) return null;
  var h = istHour(), wish;
  if (h >= 5 && h < 12) wish = 'Good morning';
  else if (h >= 12 && h < 17) wish = 'Good afternoon';
  else if (h >= 17 && h < 21) wish = 'Good evening';
  else wish = 'Hope you are having a good night';
  return greet + ' ' + wish + '. Ask me anything about Vineet — his <strong>projects</strong>, <strong>background</strong>, or <strong>how to reach him</strong>.';
}
// Question matching: weighted keywords + phrases, typo tolerance, "did you mean"
var INT = {
  wer: { q: 'Who is Vineet?', rel: ['beruflich', 'projekte', 'kontakt'],
    kw: { wer: 2, who: 2, bio: 2, biography: 2, intro: 2, introduce: 2, introduction: 2, psvim: 1.5, name: 1.5, summary: 1.2, overview: 1.2, uber: 1.2, person: 1, profile: .8, about: .6, researcher: .6, background: .5, vineet: .5, singh: .5, pratap: .5 },
    ph: [['who is vineet', 1.5], ['about him', 2], ['about vineet', 2], ['about psvim', 2]] },
  beruflich: { q: 'What does he do?', rel: ['skills', 'projekte'],
    kw: { occupation: 2, profession: 2, beruf: 2, beruflich: 2, role: 1.5, career: 1.5, job: 1.2, macht: 1, tut: 1, doing: 1, position: 1, work: .6, working: .6 },
    ph: [['what does he do', 3], ['what he does', 3], ['what is his job', 3], ['what is he doing', 1.5]] },
  projekte: { q: 'What is he working on?', rel: ['drx', 'pharmi', 'links'],
    kw: { project: 2, projects: 2, projekt: 2, projekte: 2, portfolio: 2, opensource: 1.5, oss: 1.5, repo: 2, repos: 2, repository: 2, repositories: 2, github: 1.5, build: 1, built: 1, building: 1, bauen: 1, arbeit: 1, tool: .8, tools: .8, app: .8, apps: .8, software: .8, code: .6, coding: .6, work: .6, working: .6 },
    ph: [['working on', 2.2], ['work on', 2.2], ['open source', 1.5], ['what has he built', 3], ['what has he made', 3], ['side project', 2]] },
  kontakt: { q: 'How do I contact him?', rel: ['hire', 'links'],
    kw: { contact: 2, kontakt: 2, email: 2, emailing: 2, mail: 2, reach: 2, erreichen: 2, erreich: 2, message: 1.5, dm: 1.5, phone: 2, call: 1, number: 1, address: .8, touch: .8, write: .5 },
    ph: [['get in touch', 2.5], ['how do i contact', 2.5], ['reach him', 2.5], ['reach out', 2.5], ['send a message', 2]] },
  thm: { q: 'TryHackMe Top 1%?', rel: ['certs', 'skills', 'cve'],
    kw: { tryhackme: 2, thm: 2, ctf: 2, ctfs: 2, security: 2, cybersecurity: 2, cybersec: 2, infosec: 2, pentest: 2, pentesting: 2, penetration: 1.5, hacking: 1.5, hacker: 1.5, hack: 1.2, leaderboard: 1.5, rank: 1, ranking: 1, rooms: 1, room: .8, osint: 1.5, forensics: 1, cryptography: 1, capture: .8 },
    ph: [['top 1', 2.5], ['top one', 2.5], ['bug bounty', 1.5], ['capture the flag', 2]] },
  cve: { q: 'CVE disclosures?', rel: ['drx', 'blog'],
    kw: { cve: 3, cves: 3, cwe: 3, cvss: 3, ghsa: 3, vuln: 3, vulnerability: 3, vulnerabilities: 3, vulnerable: 2.5, disclosure: 2.5, disclosures: 2.5, disclose: 2.5, advisory: 2.5, advisories: 2.5, exploit: 2, bug: 2.2, bugs: 2.2, reported: 1 },
    ph: [] },
  pharma: { q: 'Pharmacy background?', rel: ['edu', 'research', 'drx'],
    kw: { pharma: 2, pharmacy: 2, bpharm: 2, pharmaceutical: 2, pharmacist: 1.5, aktu: 2, degree: 2, study: 1.5, studying: 1.5, studies: 1.5, student: 1.5, college: 1.5, university: 1.5, education: 2, educational: 2, bachelor: 2, qualification: 2, qualifications: 2, coursework: 1.5, course: 1, lucknow: 1, drug: 1, drugs: 1, medicine: 1.2, medical: .8 },
    ph: [['b pharm', 2], ['third year', 1.5], ['where does he study', 3], ['what does he study', 3]] },
  award: { q: 'Awards & wins?', rel: ['pharmi', 'research'],
    kw: { award: 2, awards: 2, winner: 2, prize: 2, prizes: 2, achievement: 2, achievements: 2, accomplishment: 2, accomplishments: 2, medal: 2, trophy: 2, win: 2, won: 2, honor: 1.5, honour: 1.5, honors: 1.5, recognition: 1.5, competition: 1.5, symposium: 1.5, ics: 2, icss: 2, presentation: 1.5, achieved: 1.5, place: 1, first: .6 },
    ph: [['first place', 2.5], ['1st place', 2.5], ['ics 22', 3], ['icss 22', 3], ['ics22', 3], ['icss22', 3]] },
  blog: { q: 'Latest articles?', rel: ['thm', 'cve'],
    kw: { blog: 2, blogs: 2, article: 2, articles: 2, writeup: 2, writeups: 2, essay: 2, essays: 2, sqli: 2, csrf: 2, tutorial: 1.5, writing: 1.5, wrote: 1.5, written: 1.5, injection: 1.5, sql: 1.5, post: 1.2, posts: 1.2, notes: 1.2, guide: 1, guides: 1, publication: 1, publications: 1, latest: 1, recent: .8, note: .8, read: .6 },
    ph: [['what has he written', 3], ['what he wrote', 3], ['latest articles', 3], ['hacker holidays', 1.5]] },
  skills: { q: 'Skills & tools', rel: ['projekte', 'certs'],
    kw: { skill: 2, skills: 2, skillset: 2, stack: 2, techstack: 2, programming: 2, php: 2, python: 2, golang: 2, javascript: 2, mysql: 2, linux: 2, toolkit: 2, burp: 2, nmap: 2, wireshark: 2, metasploit: 2, expertise: 2, tech: 1.5, technology: 1.5, technologies: 1.5, language: 1.5, languages: 1.5, bash: 1.5, js: 1.5, java: 1.5, git: 1.5, proficient: 1.5, strengths: 1.5, database: 1.5, databases: 1.5, copilot: 1, frameworks: 1, tools: 1.2, tool: .8, ai: .6 },
    ph: [['what does he use', 2.5], ['what tools', 2], ['tech stack', 2], ['programming languages', 2.5]] },
  edu: { q: 'School results', rel: ['pharma', 'award'],
    kw: { school: 2, schooling: 2, marks: 2, percentage: 2, percent: 2, cgpa: 2, gpa: 2, secondary: 2, xii: 2, '12th': 2, '10th': 2, twelfth: 2, tenth: 2, pcb: 2, hsc: 2, ssc: 2, grade: 1.5, grades: 1.5, board: 1.5, academic: 1.5, academics: 1.5, result: 1, results: 1 },
    ph: [['class 12', 2.5], ['class 10', 2.5], ['class xii', 2.5], ['high school', 2.5]] },
  where: { q: 'Where is he from?', rel: ['pharma', 'kontakt'],
    kw: { where: 2, location: 2, located: 2, city: 2, country: 2, india: 2, indian: 1.5, based: 1.5, live: 1.5, lives: 1.5, timezone: 2, residence: 2, locate: 1.5, living: .8, from: .6, lucknow: 1 },
    ph: [['where is he from', 3], ['where does he live', 3], ['where is he', 2.5], ['time zone', 2], ['what time', 1.5]] },
  drx: { q: 'What is DRXStore?', rel: ['cve', 'skills'],
    kw: { drxstore: 3, drx: 3, gplv3: 2, gpl: 2, rbac: 2, maintainer: 2, license: 1.5, licence: 1.5, selfhosted: 1.5, maintain: 1.5, maintained: 1.5, inventory: 1 },
    ph: [['pharmacy management', 2.5], ['pharmacy system', 2.5], ['pharmacy software', 2.5], ['pharmacy store', 1.5]] },
  pharmi: { q: 'What is PharmI?', rel: ['award', 'skills'],
    kw: { pharmi: 3, solubility: 3, cyclodextrin: 3, cyclodextrins: 3, dissolve: 2, dissolution: 2, scikit: 2, sklearn: 2, flask: 2, prediction: 1.5, predict: 1.5, adversarial: 1.5, ml: 1.5, model: 1.2, machine: 1, learning: 1, ai: .6, ics: 1.5, icss: 1.5, presentation: 1.5, certificate: 1.2, moga: 1.5 },
    ph: [['machine learning', 2.5], ['drug solubility', 3], ['ai model', 2], ['ai project', 2], ['ai innovation', 3], ['ics 22', 3], ['icss 22', 3], ['ics22', 3], ['icss22', 3], ['ics 22 presentation', 3], ['icss 22 presentation', 3]] },
  research: { q: 'Research poster', rel: ['pharma', 'award'],
    kw: { research: 2, researcher: 2, poster: 2.5, cancer: 2.5, ipga: 3, silico: 3, insilico: 3, swissadme: 3, blackseed: 3, shreya: 3, paper: 1.5, papers: 1.5, conference: 2, presented: 1.5, presentation: 1.5, compound: 1.5, compounds: 1.5, publication: 1.2, publications: 1.2, seed: 1 },
    ph: [['black seed', 3], ['in silico', 3], ['network pharmacology', 3]] },
  certs: { q: 'Certifications', rel: ['thm', 'skills'],
    kw: { cert: 2, certs: 2, certificate: 2, certificates: 2, certification: 2, certifications: 2, badge: 2, badges: 2, credential: 2, credentials: 2, simplilearn: 2, training: 1.2, course: 1, courses: 1, completed: 1, copilot: 1 },
    ph: [['google cloud', 2], ['linkedin learning', 2], ['skill badge', 2.5], ['github actions', 1.5], ['byte lotus', 2.5], ['hacker holidays', 2.5], ['pre security', 2.5], ['cyber security 101', 3]] },
  hire: { q: 'Is he open to collaboration?', rel: ['kontakt', 'projekte'],
    kw: { hire: 2.5, hiring: 2.5, hired: 2, hireable: 2.5, available: 2, availability: 2, freelance: 2.5, freelancing: 2.5, collab: 2.5, collaborate: 2.5, collaboration: 2.5, opportunity: 2, opportunities: 2, internship: 2.5, intern: 2, recruit: 2, recruiter: 2, resume: 2.5, cv: 2, employment: 2, partner: 1.5, partnership: 1.5, offer: 1, open: .6 },
    ph: [['work with him', 2.5], ['work together', 2.5], ['open to work', 3], ['open to collaboration', 3], ['looking for work', 3], ['hire him', 3], ['available for', 2.5]] },
  links: { q: 'Social links', rel: ['kontakt', 'blog'],
    kw: { linkedin: 2, twitter: 2, social: 2, socials: 2, github: 2, follow: 1.5, handle: 1.5, username: 1.5, link: 1.5, links: 1.5, url: 1.5, profiles: 1, website: 1, profile: .8 },
    ph: [['social media', 2.5], ['find him online', 2.5]] },
  site: { q: 'Are you a real AI?', rel: ['wer', 'kontakt'],
    kw: { bot: 2, chatbot: 2.5, assistant: 2.5, chatgpt: 2.5, gpt: 2.5, human: 2, tracking: 2.5, privacy: 2.5, cookies: 2, powered: 2, llm: 1.5, site: 1.5, website: 1.5, webpage: 1.5, offline: 1.5, data: 1, real: .8, ai: .8 },
    ph: [['who are you', 3], ['are you a bot', 3], ['are you ai', 3], ['are you real', 3], ['are you human', 3], ['how do you work', 3], ['how does this work', 3], ['what are you', 3], ['this site', 1.5], ['this website', 2], ['who made this', 2.5], ['who built this', 2.5], ['who made you', 3], ['who built you', 3]] }
};
var STOP = {};
'a an the is are was were am be been being he his him she her it its of to in on at for and or do does did done can could would should will shall me my you your i we our us this that these those there here have has had having get got give show tell please pls plz what whats which when how why whom whose with without as by if but so just also any some ok okay yes no ist der die das und much many very really like want need know looking look find more info information details their then than them'.split(' ').forEach(function(w){ STOP[w] = 1; });
var IDX = {}, PHR = [], PW = {}, VOC = [];
Object.keys(INT).forEach(function(k){
  Object.keys(INT[k].kw).forEach(function(w){ (IDX[w] = IDX[w] || []).push([k, INT[k].kw[w]]); });
  INT[k].ph.forEach(function(p){ PHR.push([p[0], k, p[1]]); p[0].split(' ').forEach(function(w){ PW[w] = 1; }); });
});
Object.keys(IDX).concat(Object.keys(PW)).forEach(function(w){ if (w.length >= 4 && !STOP[w] && VOC.indexOf(w) < 0) VOC.push(w); });
function norm(q){
  var s = q.toLowerCase();
  try { s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) {}
  return s.replace(/ß/g, 'ss').replace(/&/g, ' and ').replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
}
function dl(a, b){
  var i, j, d = [];
  for (i = 0; i <= a.length; i++) { d[i] = [i]; }
  for (j = 1; j <= b.length; j++) d[0][j] = j;
  for (i = 1; i <= a.length; i++) for (j = 1; j <= b.length; j++) {
    var c = a[i - 1] === b[j - 1] ? 0 : 1;
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + c);
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}
function topWeight(w){ var m = 0; (IDX[w] || []).forEach(function(p){ if (p[1] > m) m = p[1]; }); return m; }
function resolve(t){
  if (STOP[t] || t.length < 2) return null;
  if (IDX[t] || PW[t]) return { w: t, q: 1 };
  if (t.length < 4) return null;
  var i, v, best = null, bd = 99;
  for (i = 0; i < VOC.length; i++) {
    v = VOC[i];
    if ((v.indexOf(t) === 0 && t.length >= v.length * .6) || (t.indexOf(v) === 0 && /^(s|es|ed|d|er|ers|ing|ings|ly|y|al|ion|ions|ment|ments)$/.test(t.slice(v.length)))) {
      var df = Math.abs(v.length - t.length);
      if (df < bd) { bd = df; best = v; }
    }
  }
  if (best) return { w: best, q: .9 };
  var maxd = t.length >= 8 ? 2 : 1, bestd = maxd + 1, bw = null;
  for (i = 0; i < VOC.length; i++) {
    v = VOC[i];
    if (Math.abs(v.length - t.length) > maxd) continue;
    if (t.length <= 5 && v.charAt(0) !== t.charAt(0)) continue;
    var d = dl(t, v);
    if (t.length === 4 && v.length === 4 && t.split('').sort().join('') !== v.split('').sort().join('')) continue;
    if (d < bestd || (d === bestd && bw && topWeight(v) > topWeight(bw))) { bestd = d; bw = v; }
  }
  return bw ? { w: bw, q: bestd === 1 ? .85 : .75, f: 1 } : null;
}
function rank(q){
  var n = norm(q), toks = n ? n.split(' ') : [], fixes = {}, S = {}, seen = {}, corr = [];
  toks.forEach(function(t){
    var r = resolve(t);
    if (r) {
      if (r.f) fixes[t] = r.w;
      if (!seen[r.w]) { seen[r.w] = 1; (IDX[r.w] || []).forEach(function(p){ S[p[0]] = (S[p[0]] || 0) + p[1] * r.q; }); }
    }
    corr.push(r && r.f ? r.w : t);
  });
  var text = ' ' + corr.join(' ') + ' ';
  PHR.forEach(function(p){ if (text.indexOf(' ' + p[0] + ' ') > -1) S[p[1]] = (S[p[1]] || 0) + p[2]; });
  var list = Object.keys(S).map(function(k){ return { k: k, s: S[k] }; }).sort(function(a, b){ return b.s - a.s; });
  return { list: list, fixes: fixes, n: n };
}
function esc(s){ return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
function sugs(keys, label){
  keys = keys.filter(function(k, i){ return INT[k] && keys.indexOf(k) === i; }).slice(0, 3);
  if (!keys.length) return '';
  return '<div class="ai-sugs">' + (label ? '<span class="ai-sugs-label">' + label + '</span>' : '') + keys.map(function(k){
    return '<button type="button" class="ai-sug" data-ask="' + k + '">' + esc(INT[k].q) + '</button>';
  }).join('') + '</div>';
}
function reply(key){ return answers[key] + sugs(INT[key].rel, 'You might also ask'); }
function nearest(n){
  var grams = function(s){ var g = {}; for (var i = 0; i < s.length - 1; i++) g[s.substr(i, 2)] = 1; return g; };
  var qg = grams(n), qn = Object.keys(qg).length;
  if (!qn) return ['wer', 'projekte', 'kontakt'];
  var sc = Object.keys(INT).map(function(k){
    var tg = grams(norm(INT[k].q + ' ' + Object.keys(INT[k].kw).join(' '))), hit = 0;
    Object.keys(qg).forEach(function(g){ if (tg[g]) hit++; });
    return { k: k, s: hit / qn };
  }).sort(function(a, b){ return b.s - a.s; });
  var out = sc.filter(function(x){ return x.s > .5; }).slice(0, 3).map(function(x){ return x.k; });
  return out.length ? out : ['wer', 'projekte', 'kontakt'];
}
function findAnswer(q) {
  q = q.slice(0, 200).toLowerCase().trim();
  if (q === 'help' || q === '?') return term.help + sugs(['wer', 'projekte', 'skills'], 'Or ask');
  var g = greetReply(q);
  if (g) return g + sugs(['wer', 'projekte', 'kontakt']);
  if (/^(thanks?|thank you|thx|ty|tysm|cheers|great|nice|cool|awesome|perfect|wow|got it)\b[\s!.]*$/.test(q)) return 'Glad that helped! Ask anything else about Vineet.' + sugs(['projekte', 'skills', 'kontakt']);
  if (/^(bye|goodbye|see ya|cya|good bye)\b[\s!.]*$/.test(q)) return 'See you! Come back anytime.';
  var single = q.replace(/[^a-z]/g, '');
  if (q === single && single.length >= 5 && single !== 'whoami' && single !== 'matrix') {
    if (dl(single, 'whoami') === 1) q = 'whoami';
    else if (dl(single, 'matrix') === 1) q = 'matrix';
  }
  if (q === 'matrix' || q === 'hack') { setTimeout(matrixRain, 200); return 'Wake up, Neo… The Matrix has you.'; }
  if (q === 'whoami') return term.whoami;
  if (q === 'ls' || q === 'ls -la') return term.ls;
  if (q === 'pwd') return term.pwd;
  if (/^cat\s+flag|^flag/.test(q)) return term.flag;
  if (/^sudo\b/.test(q)) return term.sudo;
  var r = rank(q), L = r.list, top = L[0], sec = L[1];
  if (top && top.s >= 1.6) {
    var fx = [];
    Object.keys(r.fixes).forEach(function(t){ var w = r.fixes[t]; if (INT[top.k].kw[w] && fx.indexOf(w) < 0) fx.push(w); });
    var note = fx.length ? '<span class="ai-note">Showing results for <em>' + esc(fx.join(', ')) + '</em></span>' : '';
    var more = (sec && sec.s >= 1.2 && sec.s >= top.s * .6) ? [sec.k] : [];
    return note + answers[top.k] + sugs(more.concat(INT[top.k].rel), more.length ? 'You might also mean' : 'You might also ask');
  }
  if (top && top.s >= .5) {
    var c = [top.k];
    L.slice(1, 3).forEach(function(x){ if (x.s >= top.s * .5) c.push(x.k); });
    return '<span class="ai-dym">Not sure I got that — did you mean:</span>' + sugs(c, '');
  }
  return "I'm not sure about that one. Try one of these, or email <strong>ci.vps@proton.me</strong> / check <a href='https://github.com/psvim' target='_blank'>github.com/psvim</a>." + sugs(nearest(r.n), 'Popular questions');
}
function showAnswer(text) {
  var inline = document.getElementById('ai-inline');
  var thinking = document.getElementById('ai-thinking');
  var answer = document.getElementById('ai-answer');
  var chips = document.getElementById('chips');
  inline.style.display = 'block';
  thinking.classList.add('show');
  answer.classList.remove('show');
  if (chips) chips.style.display = 'none';
  document.getElementById('chat-box').style.flexDirection = 'column';
  document.getElementById('chat-box').style.alignItems = 'stretch';
  document.getElementById('chat-box').style.padding = '14px 14px 6px';
  setTimeout(function(){
    thinking.classList.remove('show');
    answer.innerHTML = text;
    answer.classList.add('show');
  }, 700 + Math.random() * 400);
}
document.getElementById('chat-send').addEventListener('click', function(){
  var val = document.getElementById('chat-input').value.trim();
  if(!val) return;
  showAnswer(findAnswer(val));
  document.getElementById('chat-input').value = '';
});
document.getElementById('chat-input').addEventListener('keydown', function(e){
  if(e.key === 'Enter') {
    var val = this.value.trim();
    if(!val) return;
    showAnswer(findAnswer(val));
    this.value = '';
  }
});
document.querySelectorAll('.chip').forEach(function(chip){
  chip.addEventListener('click', function(){
    var key = this.dataset.q;
    showAnswer(answers[key] ? reply(key) : defaultAnswer);
  });
});
document.getElementById('ai-answer').addEventListener('click', function(e){
  var b = e.target.closest ? e.target.closest('[data-ask]') : null;
  if (b && answers[b.dataset.ask]) showAnswer(reply(b.dataset.ask));
});
// Per-section SEO
var SEO = {
  ask: {
    path: '/', nav: 'Ask',
    title: 'psvim — Vineet Pratap Singh | Security Researcher',
    og: 'psvim — Vineet Pratap Singh',
    desc: 'Vineet Pratap Singh (psvim): security researcher — pentesting, CTFs, and vulnerability research, with a particular focus on life sciences. B.Pharm student at AKTU Lucknow. Ask about his work, skills and background.',
    type: 'ProfilePage'
  },
  facts: {
    path: '/facts', nav: 'Facts',
    title: 'Facts — Vineet Pratap Singh (psvim)',
    og: 'Facts — Vineet Pratap Singh',
    desc: 'Quick facts about Vineet Pratap Singh (psvim): education, role, tech stack, and links to GitHub, LinkedIn and TryHackMe.',
    type: 'AboutPage'
  },
  work: {
    path: '/work', nav: 'Work',
    title: 'Work — DRXStore, Security Research & CTFs | psvim',
    og: 'Work — Security research, CTFs & life sciences',
    desc: 'Security and research work by Vineet Pratap Singh (psvim): TryHackMe CTFs, DRXStore pharmacy management system, patient and research data security, and award-winning research.',
    type: 'CollectionPage'
  },
  skills: {
    path: '/skills', nav: 'Skills',
    title: 'Skills — Security Tooling, Python & Bash | psvim',
    og: 'Skills — Security tooling, Python & Bash',
    desc: 'Skills and tools used by Vineet Pratap Singh: Python and Bash written by hand, PHP and Go written with AI assistance, and a penetration-testing toolkit including Burp Suite, Nmap and Metasploit.',
    type: 'CollectionPage'
  },
  education: {
    path: '/education', nav: 'Education',
    title: 'Education — B.Pharm at AKTU Lucknow | psvim',
    og: 'Education — B.Pharm at AKTU Lucknow',
    desc: 'Education background of Vineet Pratap Singh (psvim): Bachelor of Pharmacy (B.Pharm) at Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow.',
    type: 'CollectionPage'
  },
  badges: {
    path: '/badges', nav: 'Badges',
    title: 'Badges & Certifications — TryHackMe Top 1% | psvim',
    og: 'Badges & certifications — TryHackMe Top 1%',
    desc: 'Certifications and badges earned by Vineet Pratap Singh (psvim), including TryHackMe security paths, Google Cloud Generative AI, and LinkedIn Learning courses.',
    type: 'CollectionPage'
  },
  reach: {
    path: '/reach', nav: 'Reach',
    title: 'Reach — Contact Vineet Pratap Singh (psvim)',
    og: 'Reach — Contact Vineet Pratap Singh',
    desc: 'Contact Vineet Pratap Singh (psvim) by email, GitHub, LinkedIn or TryHackMe for pentesting, life sciences security, or research collaboration.',
    type: 'ContactPage'
  }
};
function setMeta(sel, attr, val) {
  var el = document.head.querySelector(sel);
  if (el) el.setAttribute(attr, val);
}
function applySeo(id) {
  // SEO disabled site-wide: this no longer touches canonical/hreflang links,
  // meta description, or structured data (ld+json) — it only swaps the tab
  // title and the Open Graph / Twitter preview text, which are used for
  // chat-app link-preview cards, not search indexing.
  var d = SEO[id] || SEO.ask;
  document.title = d.title;
  setMeta('meta[property="og:title"]', 'content', d.og);
  setMeta('meta[property="og:description"]', 'content', d.desc);
  setMeta('meta[property="og:image:alt"]', 'content', d.og);
  setMeta('meta[name="twitter:title"]', 'content', d.og);
  setMeta('meta[name="twitter:description"]', 'content', d.desc);
  setMeta('meta[name="twitter:image:alt"]', 'content', d.og);
  var ld = document.getElementById('ld-section');
  if (ld) ld.remove();
}
// Nav section swap
var allNavLinks = document.querySelectorAll('.nav-links a, .mob-link');
function runNavLoader() {
  var bar = document.getElementById('nav-loader');
  if (!bar) return;
  bar.classList.remove('active');
  bar.style.transition = 'none';
  bar.style.width = '0%';
  void bar.offsetWidth;
  bar.style.transition = '';
  bar.classList.add('active');
  requestAnimationFrame(function(){ bar.style.width = '70%'; });
  setTimeout(function(){
    bar.style.width = '100%';
    setTimeout(function(){
      bar.classList.remove('active');
      setTimeout(function(){ bar.style.width = '0%'; }, 250);
    }, 180);
  }, 160);
}
function showSection(targetId, fromPop, noFocus) {
  runNavLoader();
  if (LEGACY_ROUTES[targetId]) targetId = LEGACY_ROUTES[targetId];
  var isAsk = !targetId || targetId === 'ask';
  applySeo(isAsk ? 'ask' : targetId);
  if (!fromPop) {
    try {
      var newPath = isAsk ? '/' : '/' + targetId;
      if (location.pathname !== newPath) history.pushState(null, '', newPath + location.search);
    } catch (e) {}
  }
  // Active nav link highlight
  allNavLinks.forEach(function(l) {
    var href = l.getAttribute('href') || '';
    var id = href === '/' ? 'ask' : href.replace(/^\//, '');
    l.classList.toggle('active', id === targetId || (isAsk && id === 'ask'));
  });
  window.scrollTo(0, 0);
  var mainEl = document.querySelector('main');
  var sections = document.querySelectorAll('.section-collapsible');
  var current = mainEl && mainEl.style.display !== 'none' ? mainEl : null;
  if (!current) {
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].style.display !== 'none') { current = sections[i]; break; }
    }
  }
  if (current) { current.classList.remove('fade-in'); current.classList.add('fade-out'); }
  setTimeout(function(){
    mainEl.style.display = isAsk ? '' : 'none';
    if (isAsk) { mainEl.classList.remove('fade-out', 'fade-in'); void mainEl.offsetWidth; mainEl.classList.add('fade-in'); }
    sections.forEach(function(s) {
      var show = !isAsk && s.id === targetId;
      s.style.display = show ? '' : 'none';
      if (show) { s.classList.remove('fade-out', 'fade-in'); void s.offsetWidth; s.classList.add('fade-in'); }
      else { s.classList.remove('fade-out'); }
    });
    // Ask opened: focus the chat input
    if (isAsk && !noFocus) {
      var ci = document.getElementById('chat-input');
      if (ci) ci.focus({ preventScroll: true });
    }
  }, current ? 140 : 0);
}
// Init
document.querySelectorAll('.section-collapsible').forEach(function(s) {
  s.style.display = 'none';
});
// Default view: from URL path, else Ask
var LEGACY_ROUTES = { projects: 'work', certifications: 'badges', contact: 'reach' };
function pathId() {
  var id = location.pathname.replace(/^\/+|\/+$/g, '');
  if (LEGACY_ROUTES[id]) id = LEGACY_ROUTES[id];
  var el = id && document.getElementById(id);
  return (el && el.classList.contains('section-collapsible')) ? id : 'ask';
}
showSection(pathId(), true);
(function(){ // rewrite legacy or /ask URLs to the canonical one without adding a history entry
  try {
    var raw = location.pathname.replace(/^\/+|\/+$/g, ''), want = pathId() === 'ask' ? '/' : '/' + pathId();
    if ((LEGACY_ROUTES[raw] || raw === 'ask') && location.pathname !== want) history.replaceState(null, '', want + location.search + location.hash);
  } catch (e) {}
})();
window.addEventListener('popstate', function(){ showSection(pathId(), true); });
allNavLinks.forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = this.getAttribute('href') || '';
    if (!href || href.charAt(0) !== '/') return;
    e.preventDefault();
    var id = href === '/' ? 'ask' : href.slice(1);
    showSection(id);
    // Close mobile menu
    document.getElementById('mob-menu').classList.remove('open');
    document.getElementById('nav-ham').classList.remove('open');
    document.body.style.overflow = '';
  });
});
// Swipe to change section
(function(){
  var ORDER = ['ask', 'facts', 'work', 'skills', 'education', 'badges', 'reach'];
  var sx = 0, sy = 0, st = 0, ok = false;
  function overlayOpen() {
    var m = document.getElementById('mob-menu'), c = document.getElementById('cmdk'),
        i = document.getElementById('info-panel'), x = document.getElementById('ext-modal');
    return (m && m.classList.contains('open')) || (c && c.classList.contains('open')) ||
           (i && i.classList.contains('open')) || (x && x.classList.contains('open'));
  }
  function ownsHorizontalSwipe(el) {
    while (el && el !== document.body && el.nodeType === 1) {
      var tag = el.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable) return true;
      if (el.scrollWidth > el.clientWidth + 2) {
        var ox = getComputedStyle(el).overflowX;
        if (ox === 'auto' || ox === 'scroll') return true;
      }
      el = el.parentNode;
    }
    return false;
  }
  document.addEventListener('touchstart', function(e){
    if (e.touches.length !== 1 || overlayOpen() || ownsHorizontalSwipe(e.target)) { ok = false; return; }
    var t = e.touches[0];
    sx = t.clientX; sy = t.clientY; st = Date.now(); ok = true;
  }, { passive: true });
  document.addEventListener('touchend', function(e){
    if (!ok) return;
    ok = false;
    var t = e.changedTouches[0], dx = t.clientX - sx, dy = t.clientY - sy;
    if (Date.now() - st > 700) return;
    if (Math.abs(dx) < 70 || Math.abs(dx) < Math.abs(dy) * 1.6) return;
    var i = ORDER.indexOf(pathId());
    var n = i + (dx < 0 ? 1 : -1);
    if (i < 0 || n < 0 || n >= ORDER.length) return;
    showSection(ORDER[n], false, true);
  }, { passive: true });
  document.addEventListener('touchcancel', function(){ ok = false; }, { passive: true });
})();
// Logo → home
document.querySelector('.nav-logo').addEventListener('click', function(e) {
  e.preventDefault();
  showSection('ask');
});
// Skills accordion
document.querySelectorAll('.sk-accordion-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var key = this.dataset.sk;
    var body = document.getElementById('sk-' + key);
    var isOpen = this.classList.contains('open');
    this.classList.toggle('open', !isOpen);
    this.setAttribute('aria-expanded', String(!isOpen));
    body.hidden = isOpen;
  });
});
// External site notice
(function(){
  var modal = document.getElementById('ext-modal');
  var urlEl = document.getElementById('ext-url');
  var pending = '';
  function openNotice(url){
    pending = url;
    urlEl.textContent = url.replace(/^https?:\/\//,'');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
    document.getElementById('ext-go').focus();
  }
  window.openExternalNotice = openNotice;
  function closeNotice(){
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden','true');
    pending = '';
  }
  var internalHosts = [location.host, 'psv.im'];
  function isExternal(a){
    var h = a.getAttribute('href') || '';
    if (!/^https?:\/\//i.test(h)) return false;
    var host = a.host;
    return internalHosts.indexOf(host) === -1 && !/\.psv\.im$/i.test(host);
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a[href]') : null;
    if (!a || a.closest('#ext-modal') || !isExternal(a)) return;
    e.preventDefault();
    mob.classList.remove('open');
    ham.classList.remove('open');
    document.body.style.overflow = '';
    openNotice(a.href);
  });
  document.getElementById('ext-cancel').addEventListener('click', closeNotice);
  document.getElementById('ext-go').addEventListener('click', function(){
    if (pending) window.open(pending, '_blank', 'noopener,noreferrer');
    closeNotice();
  });
  modal.addEventListener('click', function(e){ if (e.target === modal) closeNotice(); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeNotice(); });
})();
// Content protection
(function(){
  var PROTECT = { copy: true, contextMenu: true, drag: true, saveViewPrint: true, devtoolsKeys: true };
  function allowed(node){
    var el = node && (node.nodeType === 1 ? node : node.parentElement);
    return !!(el && el.closest && el.closest('input,textarea,[data-allow-copy],#ai-answer'));
  }
  function selAllowed(){
    var sel = window.getSelection && window.getSelection();
    return !sel || sel.rangeCount === 0 || allowed(sel.anchorNode);
  }
  if (PROTECT.copy) {
    ['copy','cut'].forEach(function(t){
      document.addEventListener(t, function(e){
        if (allowed(e.target) && selAllowed()) return;
        e.preventDefault();
        if (e.clipboardData) e.clipboardData.setData('text/plain', 'Content protected. © psv.im');
      });
    });
    document.addEventListener('selectstart', function(e){
      if (!allowed(e.target)) e.preventDefault();
    });
  }
  if (PROTECT.contextMenu) {
    document.addEventListener('contextmenu', function(e){
      if (!allowed(e.target)) e.preventDefault();
    });
  }
  if (PROTECT.drag) {
    document.addEventListener('dragstart', function(e){ e.preventDefault(); });
  }
  document.addEventListener('keydown', function(e){
    var k = (e.key || '').toLowerCase();
    var mod = e.ctrlKey || e.metaKey;
    if (PROTECT.saveViewPrint && mod && !e.shiftKey && (k === 'u' || k === 's' || k === 'p')) { e.preventDefault(); return; }
    if (PROTECT.devtoolsKeys) {
      if (e.key === 'F12') { e.preventDefault(); return; }
      if (mod && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) { e.preventDefault(); return; }
      if (e.metaKey && e.altKey && (k === 'i' || k === 'j' || k === 'u' || k === 'c')) { e.preventDefault(); return; }
    }
  });
})();
// Console warning
(function(){
  try {
    console.log('%cStop!', 'color:#dc2626;font-size:52px;font-weight:800;font-family:system-ui,sans-serif;');
    console.log('%cThis console is for developers. If someone told you to paste something here, it is almost certainly a scam (Self-XSS) that can hijack your accounts. Do not paste code you do not understand.', 'font-size:15px;font-family:system-ui,sans-serif;');
    console.log('%cFound a security issue? Responsible disclosure welcome: ci.vps@proton.me', 'font-size:13px;color:#6a6a64;font-family:system-ui,sans-serif;');
  } catch (e) {}
})();
// PWA: service worker + install prompt
(function(){
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }
  var deferred = null;
  var btns = document.querySelectorAll('.js-install');
  function setHidden(h){ btns.forEach(function(b){ b.hidden = h; }); }
  window.addEventListener('beforeinstallprompt', function(e){
    e.preventDefault();
    deferred = e;
    setHidden(false);
  });
  btns.forEach(function(b){
    b.addEventListener('click', function(){
      if (!deferred) return;
      mob.classList.remove('open'); ham.classList.remove('open'); document.body.style.overflow = '';
      deferred.prompt();
      deferred.userChoice.finally(function(){ deferred = null; setHidden(true); });
    });
  });
  window.addEventListener('appinstalled', function(){ deferred = null; setHidden(true); });
})();
// Extras
var toastTimer;
function toast(msg){
  var t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function(){ t.classList.remove('show'); }, 1800);
}
function copyEmail(){
  var mail = 'ci.vps@proton.me';
  var done = function(){ toast('Email copied'); };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(mail).then(done, function(){ toast('Copy failed'); });
  } else { toast('Copy failed'); }
}
document.querySelectorAll('.js-copy-email').forEach(function(b){ b.addEventListener('click', copyEmail); });
(function(){
  var el = document.getElementById('ist-clock');
  function tick(){
    try {
      var t = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST';
      if (el) el.textContent = t;
    } catch (e) {}
  }
  tick(); setInterval(tick, 30000);
})();
(function(){
  var inp = document.getElementById('chat-input');
  if (!inp || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  var ph = ['Who is Vineet?', 'What is he working on?', 'TryHackMe Top 1%?', 'Try: whoami', 'How do I contact him?'];
  var i = 0, j = 0, del = false;
  function tick(){
    if (inp.value) { setTimeout(tick, 1000); return; }
    var t = ph[i], d;
    if (!del) { j++; inp.placeholder = t.slice(0, j); d = 90; if (j === t.length) { del = true; d = 1600; } }
    else { j--; inp.placeholder = t.slice(0, j) || ' '; d = 35; if (j === 0) { del = false; i = (i + 1) % ph.length; d = 300; } }
    setTimeout(tick, d);
  }
  setTimeout(tick, 1500);
})();
(function(){
  var box = document.getElementById('cmdk'), inp = document.getElementById('cmdk-input'), list = document.getElementById('cmdk-list');
  var cmds = [
    ['Ask', 'Go to', function(){ showSection('ask'); }],
    ['Facts', 'Go to', function(){ showSection('facts'); }],
    ['Work', 'Go to', function(){ showSection('work'); }],
    ['Skills', 'Go to', function(){ showSection('skills'); }],
    ['Education', 'Go to', function(){ showSection('education'); }],
    ['Badges', 'Go to', function(){ showSection('badges'); }],
    ['Reach', 'Go to', function(){ showSection('reach'); }],
    ['Toggle theme', 'Action', function(){ setTheme(getTheme() === 'dark' ? 'light' : 'dark'); }],
    ['Copy email', 'Action', copyEmail],
    ['Save contact', 'Action', saveContact],
    ['Site status & tech info', 'Action', function(){ if (window.toggleInfoPanel) window.toggleInfoPanel(true); }],
    ['Share site', 'Action', shareSite],
    ['Copy link', 'Action', copyLink],
    ['Expand / collapse skills', 'Action', function(){ showSection('skills'); setTimeout(function(){ document.getElementById('sk-toggle-all').click(); }, 50); }],
    ['GitHub', 'External', function(){ openExternalNotice('https://github.com/psvim'); }],
    ['LinkedIn', 'External', function(){ openExternalNotice('https://linkedin.com/in/psvim'); }],
    ['TryHackMe', 'External', function(){ openExternalNotice('https://tryhackme.com/p/psvim'); }],
    ['CTF Blog', 'External', function(){ openExternalNotice('https://bl.psv.im'); }]
  ];
  var shown = [], idx = 0;
  function render(){
    var q = inp.value.toLowerCase().trim();
    shown = cmds.filter(function(c){ return !q || (c[0] + ' ' + c[1]).toLowerCase().indexOf(q) !== -1; });
    idx = Math.min(idx, Math.max(shown.length - 1, 0));
    list.innerHTML = '';
    if (!shown.length) { var n = document.createElement('li'); n.className = 'none'; n.textContent = 'No match'; list.appendChild(n); return; }
    shown.forEach(function(c, k){
      var li = document.createElement('li');
      li.className = k === idx ? 'active' : '';
      li.setAttribute('role', 'option');
      var a = document.createElement('span'); a.textContent = c[0];
      var b = document.createElement('small'); b.textContent = c[1];
      li.appendChild(a); li.appendChild(b);
      li.addEventListener('mousemove', function(){ if (idx !== k) { idx = k; render(); } });
      li.addEventListener('click', function(){ run(k); });
      list.appendChild(li);
    });
    var act = list.querySelector('.active'); if (act && act.scrollIntoView) act.scrollIntoView({ block: 'nearest' });
  }
  function open(){ box.classList.add('open'); box.setAttribute('aria-hidden', 'false'); inp.value = ''; idx = 0; render(); inp.focus(); }
  function close(){ box.classList.remove('open'); box.setAttribute('aria-hidden', 'true'); }
  function run(k){ var c = shown[k]; if (!c) return; close(); c[2](); }
  document.addEventListener('keydown', function(e){
    var k = (e.key || '').toLowerCase();
    if ((e.ctrlKey || e.metaKey) && k === 'k') { e.preventDefault(); box.classList.contains('open') ? close() : open(); return; }
    if (k === '/' && !box.classList.contains('open') && !/^(input|textarea)$/i.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); open(); return; }
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowDown') { e.preventDefault(); idx = (idx + 1) % Math.max(shown.length, 1); render(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); idx = (idx - 1 + shown.length) % Math.max(shown.length, 1); render(); }
    else if (e.key === 'Enter') { e.preventDefault(); run(idx); }
  });
  inp.addEventListener('input', function(){ idx = 0; render(); });
  box.addEventListener('click', function(e){ if (e.target === box) close(); });
  document.getElementById('kbd-hint').addEventListener('click', open);
})();
// More extras
function saveContact(){
  var v = ['BEGIN:VCARD','VERSION:3.0','FN:Vineet Pratap Singh','N:Singh;Vineet Pratap;;;','NICKNAME:psvim',
    'TITLE:Security Researcher — Infosec & Life Sciences','EMAIL;TYPE=INTERNET,PREF:ci.vps@proton.me','EMAIL;TYPE=INTERNET:i@psv.im',
    'URL:https://psv.im','URL:https://github.com/psvim','URL:https://linkedin.com/in/psvim',
    'NOTE:Security research in patient data\\, pharmaceutical research data and healthcare systems.','END:VCARD'].join('\r\n');
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([v], { type: 'text/vcard' }));
  a.download = 'vineet-pratap-singh.vcf';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(function(){ URL.revokeObjectURL(a.href); }, 1500);
  toast('Contact saved');
}
function copyLink(){
  var u = location.href;
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(u).then(function(){ toast('Link copied'); }, function(){ toast('Copy failed'); });
  else toast('Copy failed');
}
function shareSite(){
  if (navigator.share) navigator.share({ title: document.title, url: 'https://psv.im/' }).catch(function(){});
  else copyLink();
}
document.querySelectorAll('.js-save-contact').forEach(function(b){ b.addEventListener('click', saveContact); });
(function(){
  var all = document.getElementById('sk-toggle-all');
  var btns = [].slice.call(document.querySelectorAll('.sk-accordion-btn'));
  if (!all || !btns.length) return;
  function sync(){ all.textContent = btns.every(function(b){ return b.classList.contains('open'); }) ? 'Collapse all' : 'Expand all'; }
  all.addEventListener('click', function(){
    var open = !btns.every(function(b){ return b.classList.contains('open'); });
    btns.forEach(function(b){
      b.classList.toggle('open', open);
      b.setAttribute('aria-expanded', String(open));
      document.getElementById('sk-' + b.dataset.sk).hidden = !open;
    });
    sync();
  });
  btns.forEach(function(b){ b.addEventListener('click', function(){ setTimeout(sync, 0); }); });
  sync();
})();
window.addEventListener('offline', function(){ toast('Offline: showing saved copy'); });
window.addEventListener('online', function(){ toast('Back online'); });
function matrixRain(){
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) { toast('Wake up, Neo…'); return; }
  if (document.getElementById('mx')) return;
  var c = document.createElement('canvas'); c.id = 'mx';
  c.style.cssText = 'position:fixed;inset:0;z-index:400;pointer-events:none;transition:opacity .6s';
  document.body.appendChild(c);
  var x = c.getContext('2d'), w = c.width = innerWidth, h = c.height = innerHeight, fs = 16, cols = Math.floor(w / fs), drops = [], dark = getTheme() === 'dark';
  var chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿ0123456789'.split('');
  for (var i = 0; i < cols; i++) drops[i] = Math.random() * -40;
  var iv = setInterval(function(){
    x.fillStyle = dark ? 'rgba(10,10,9,.12)' : 'rgba(244,244,248,.12)'; x.fillRect(0, 0, w, h);
    x.fillStyle = dark ? '#f2f2ef' : '#111110'; x.font = fs + 'px monospace';
    for (var i = 0; i < cols; i++) {
      x.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, drops[i] * fs);
      if (drops[i] * fs > h && Math.random() > .975) drops[i] = 0;
      drops[i]++;
    }
  }, 50);
  setTimeout(function(){ c.style.opacity = 0; setTimeout(function(){ clearInterval(iv); c.remove(); }, 650); }, 5000);
}
(function(){
  var seq = ['arrowup','arrowup','arrowdown','arrowdown','arrowleft','arrowright','arrowleft','arrowright','b','a'], pos = 0;
  document.addEventListener('keydown', function(e){
    var k = (e.key || '').toLowerCase();
    pos = (k === seq[pos]) ? pos + 1 : (k === seq[0] ? 1 : 0);
    if (pos === seq.length) { pos = 0; matrixRain(); }
  });
})();
// Info panel
(function(){
  // GitHub repo(s) hosting this site
  var GH_REPOS = ['psvim/psvim.github.io', 'psvim/psvim'];
  var IP_API = 'https://api.ip.sb/geoip';
  var fab = document.getElementById('info-fab'), panel = document.getElementById('info-panel'),
      body = document.getElementById('ip-body'), dot = document.getElementById('fab-dot'),
      btnR = document.getElementById('ip-refresh'), btnC = document.getElementById('ip-close');
  if (!fab || !panel || !body) return;
  var cache = { gh: null, ip: null };
  var openState = { 'Official site': true, 'Last deploy · GitHub': true, 'Network & location': true, 'Screen & device': true, 'Live response': false, 'Performance': false };
  function el(tag, cls, text){ var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function empty(v){ return v == null || v === '' || v === false || (typeof v === 'number' && isNaN(v)); }
  function add(sec, k, v, mono){
    if (empty(v)) return null;
    var r = el('div', 'ip-row'); r.appendChild(el('span', 'ip-k', k));
    var vv = el('span', 'ip-v' + (mono ? ' mono' : ''));
    if (v instanceof Node) vv.appendChild(v); else vv.textContent = String(v);
    r.appendChild(vv); sec.appendChild(r); return r;
  }
  function link(href, text){ var a = el('a', null, text); a.href = href; a.target = '_blank'; a.rel = 'noopener noreferrer'; return a; }
  function pill(text, kind){ return el('span', 'ip-pill ip-' + kind, text); }
  function section(title){
    var d = el('details', 'ip-sec'), sm = el('summary', 'ip-h'), meta = el('span', 'ip-meta');
    sm.appendChild(el('span', null, title)); sm.appendChild(meta); d.appendChild(sm); d._meta = meta;
    d.open = !!openState[title];
    d.addEventListener('toggle', function(){ openState[title] = d.open; });
    return d;
  }
  function ago(iso){
    var t = Date.parse(iso); if (!t) return '';
    var d = Math.max(0, (Date.now() - t) / 1000);
    if (d < 60) return 'just now';
    if (d < 3600) return Math.floor(d / 60) + ' min ago';
    if (d < 86400) return Math.floor(d / 3600) + ' h ago';
    if (d < 86400 * 60) return Math.floor(d / 86400) + ' d ago';
    return Math.floor(d / 86400 / 30) + ' mo ago';
  }
  function fmtDate(iso){ var t = new Date(iso); return isNaN(t) ? '' : t.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }); }
  function ms(n){ return n > 0 ? Math.round(n) + ' ms' : ''; }
  function dur(a, b){ var x = Date.parse(a), y = Date.parse(b); if (!x || !y || y < x) return ''; var sec = Math.round((y - x) / 1000); return sec < 60 ? sec + ' s' : Math.floor(sec / 60) + ' m ' + (sec % 60) + ' s'; }
  function setDot(kind){ dot.className = 'fab-dot' + (kind ? ' ' + kind : ''); }
  function api(url){
    return fetch(url, { headers: { 'Accept': 'application/vnd.github+json' }, cache: 'no-store' }).then(function(r){
      return r.json().catch(function(){ return null; }).then(function(j){ return { status: r.status, ok: r.ok, json: j }; });
    });
  }
  // Last deploy
  function renderGh(sec, d){
    var run = d.run, done = run.status === 'completed', concl = run.conclusion || run.status;
    var kind = !done ? 'warn' : (concl === 'success' ? 'ok' : (concl === 'neutral' || concl === 'skipped' ? 'mute' : 'bad'));
    var label = !done ? (run.status === 'in_progress' ? 'Deploying' : 'Queued') : (concl === 'success' ? 'Deployed' : concl.replace(/_/g, ' '));
    setDot(kind === 'mute' ? '' : kind);
    sec._meta.appendChild(pill(label, kind));
    var msg = ((run.head_commit && run.head_commit.message) || '').split('\n')[0];
    if (msg.length > 70) msg = msg.slice(0, 67) + '…';
    var by = (run.head_commit && run.head_commit.author && run.head_commit.author.name) || (run.actor && run.actor.login) || '';
    add(sec, 'Workflow', link(run.html_url, (run.name || 'workflow') + ' #' + run.run_number));
    add(sec, 'Status code', run.status + ' / ' + (run.conclusion || 'none') + ' · API ' + d.status, true);
    add(sec, 'Branch', run.head_branch, true);
    add(sec, 'Commit', run.head_sha ? link('https://github.com/' + d.repo + '/commit/' + run.head_sha, run.head_sha.slice(0, 7)) : '', true);
    add(sec, 'Message', msg);
    add(sec, 'Author', by);
    add(sec, 'Deployed', [ago(run.updated_at), fmtDate(run.updated_at)].filter(Boolean).join(' · '));
    add(sec, 'Build time', dur(run.run_started_at || run.created_at, run.updated_at), true);
    add(sec, 'Repo', link('https://github.com/' + d.repo, d.repo));
  }
  function ghFail(sec, box, msg, code){
    box.remove(); setDot('bad'); sec._meta.appendChild(pill('Unavailable', 'bad'));
    add(sec, 'Code', code == null ? 'network / blocked' : 'HTTP ' + code, true);
    sec.appendChild(el('div', 'ip-note', msg));
  }
  function loadDeploy(sec, force){
    if (!force && cache.gh && Date.now() - cache.gh.t < 60000) { renderGh(sec, cache.gh); return; }
    var box = el('div', 'ip-muted', 'Loading from GitHub…'); sec.appendChild(box);
    var last = null;
    function tryRepo(i){
      if (i >= GH_REPOS.length) return Promise.resolve(null);
      return api('https://api.github.com/repos/' + GH_REPOS[i] + '/actions/runs?per_page=5').then(function(res){
        last = res;
        if (res.ok && res.json && res.json.workflow_runs) return { repo: GH_REPOS[i], status: res.status, runs: res.json.workflow_runs };
        return tryRepo(i + 1);
      });
    }
    tryRepo(0).then(function(hit){
      if (!hit) return ghFail(sec, box, last && last.status === 403 ? 'GitHub API rate limit reached — try again later.' : 'Repo not found. Set GH_REPOS in the page script.', last ? last.status : null);
      var run = hit.runs.filter(function(r){ return /pages/i.test(r.name || ''); })[0] || hit.runs[0];
      if (!run) return ghFail(sec, box, 'No workflow runs found for ' + hit.repo + '.', hit.status);
      cache.gh = { t: Date.now(), repo: hit.repo, status: hit.status, run: run };
      box.remove(); renderGh(sec, cache.gh);
    }).catch(function(){ ghFail(sec, box, 'Could not reach api.github.com (offline or blocked).', null); });
  }
  // Network & location
  function renderIp(sec, d){
    if (d.ip) sec._meta.appendChild(pill(d.ip.indexOf(':') > -1 ? 'IPv6' : 'IPv4', 'mute'));
    var r = add(sec, 'IP address', d.ip, true);
    if (r) {
      r.classList.add('ip-copy'); r.title = 'Click to copy';
      r.addEventListener('click', function(){
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(d.ip).then(function(){ toast('IP copied'); }, function(){ toast('Copy failed'); });
      });
    }
    var parts = [d.city, d.region, d.country].filter(function(x, i, a){ return x && x !== a[i - 1]; });
    add(sec, 'Location', parts.join(', '));
    add(sec, 'ISP', d.isp || d.organization || d.asn_organization);
    add(sec, 'ASN', d.asn ? 'AS' + d.asn + (d.asn_organization ? ' · ' + d.asn_organization : '') : '', true);
    sec.appendChild(el('div', 'ip-note', 'Approximate — derived from your IP address, not GPS.'));
  }
  function loadIp(sec, force){
    if (!force && cache.ip && Date.now() - cache.ip.t < 600000) { renderIp(sec, cache.ip.d); return; }
    var box = el('div', 'ip-muted', 'Looking up your IP…'); sec.appendChild(box);
    fetch(IP_API, { cache: 'no-store' }).then(function(r){ if (!r.ok) throw 0; return r.json(); }).then(function(d){
      cache.ip = { t: Date.now(), d: d }; box.remove(); renderIp(sec, d);
    }).catch(function(){ box.textContent = 'IP lookup unavailable (offline, or blocked by an ad-blocker).'; });
  }
  // Screen & device
  function browserInfo(){
    var ua = navigator.userAgent || '', m, b = '', os = '';
    if ((m = ua.match(/Edg(?:e|A|iOS)?\/([\d.]+)/))) b = 'Edge ' + m[1];
    else if ((m = ua.match(/OPR\/([\d.]+)/))) b = 'Opera ' + m[1];
    else if ((m = ua.match(/(?:Firefox|FxiOS)\/([\d.]+)/))) b = 'Firefox ' + m[1];
    else if ((m = ua.match(/(?:Chrome|CriOS)\/([\d.]+)/))) b = 'Chrome ' + m[1];
    else if ((m = ua.match(/Version\/([\d.]+).*Safari/))) b = 'Safari ' + m[1];
    b = b.replace(/^(\S+) (\d+)[\d.]*$/, '$1 $2');
    var uad = navigator.userAgentData;
    if (uad && uad.platform) os = uad.platform;
    else if (/Windows/.test(ua)) os = 'Windows';
    else if (/Android ([\d.]+)/.test(ua)) os = 'Android ' + ua.match(/Android ([\d.]+)/)[1];
    else if (/iPhone|iPad|iPod/.test(ua)) os = 'iOS';
    else if (/Mac OS X/.test(ua)) os = 'macOS';
    else if (/CrOS/.test(ua)) os = 'ChromeOS';
    else if (/Linux/.test(ua)) os = 'Linux';
    return { browser: b, os: os };
  }
  function utcOffset(){
    var m = -new Date().getTimezoneOffset(), sign = m < 0 ? '-' : '+'; m = Math.abs(m);
    var h = Math.floor(m / 60), mm = m % 60;
    return 'UTC' + sign + h + (mm ? ':' + String(mm).padStart(2, '0') : '');
  }
  function deviceSection(){
    var sec = section('Screen & device'), dpr = window.devicePixelRatio || 1, c = navigator.connection;
    add(sec, 'Screen', screen.width + '×' + screen.height, true);
    if (Math.abs(dpr - 1) > .01) add(sec, 'Native', Math.round(screen.width * dpr) + '×' + Math.round(screen.height * dpr) + ' (' + (+dpr.toFixed(2)) + '×)', true);
    add(sec, 'Viewport', innerWidth + '×' + innerHeight, true);
    add(sec, 'Orientation', ((screen.orientation && screen.orientation.type) || (innerWidth >= innerHeight ? 'landscape' : 'portrait')).replace('-primary', '').replace('-secondary', ' (flipped)'), true);
    add(sec, 'Color depth', screen.colorDepth ? screen.colorDepth + '-bit' : '', true);
    var coarse = window.matchMedia && matchMedia('(pointer: coarse)').matches;
    add(sec, 'Input', coarse ? 'touch' + (navigator.maxTouchPoints ? ' (' + navigator.maxTouchPoints + ' pts)' : '') : 'mouse / keyboard');
    var b = browserInfo();
    add(sec, 'Browser', b.browser); add(sec, 'OS', b.os);
    add(sec, 'CPU cores', navigator.hardwareConcurrency, true);
    add(sec, 'Memory', navigator.deviceMemory ? navigator.deviceMemory + ' GB' : '', true);
    var net = [navigator.onLine ? 'online' : 'offline'];
    if (c) { if (c.effectiveType) net.push(c.effectiveType); if (c.downlink) net.push(c.downlink + ' Mbps'); if (c.rtt) net.push(c.rtt + ' ms RTT'); if (c.saveData) net.push('data saver'); }
    add(sec, 'Connection', net.join(' · '));
    var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone; } catch (e) {}
    add(sec, 'Time zone', (tz ? tz + ' · ' : '') + utcOffset());
    if (window.matchMedia && matchMedia('(display-mode: standalone)').matches) add(sec, 'Mode', 'installed app');
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) add(sec, 'Service worker', 'active');
    return sec;
  }
  // Live HTTP response of this site
  function loadHttp(sec){
    if (!/^https?:$/.test(location.protocol)) { sec.appendChild(el('div', 'ip-muted', 'Not served over HTTP(S) here.')); return; }
    var box = el('div', 'ip-muted', 'Checking…'); sec.appendChild(box);
    var t0 = performance.now();
    fetch(location.origin + '/', { method: 'HEAD', cache: 'no-store' }).then(function(r){
      var t = performance.now() - t0; box.remove();
      sec._meta.appendChild(pill('HTTP ' + r.status, r.status < 300 ? 'ok' : (r.status < 400 ? 'warn' : 'bad')));
      add(sec, 'Status', 'HTTP ' + r.status + (r.statusText ? ' ' + r.statusText : ''), true);
      add(sec, 'Round trip', Math.round(t) + ' ms', true);
      add(sec, 'Server', r.headers.get('server'), true);
      var lm = r.headers.get('last-modified');
      add(sec, 'Last modified', lm ? [ago(lm), fmtDate(lm)].filter(Boolean).join(' · ') : '');
      add(sec, 'Cache-Control', r.headers.get('cache-control'), true);
    }).catch(function(){ box.textContent = 'Could not check the live response.'; });
  }
  // Page performance
  function perfSection(){
    var sec = section('Performance'), nav = (performance.getEntriesByType && performance.getEntriesByType('navigation')[0]) || null;
    if (!nav) { sec.appendChild(el('div', 'ip-muted', 'Timing not available.')); return sec; }
    add(sec, 'First byte', ms(nav.responseStart - nav.startTime), true);
    add(sec, 'DOM ready', ms(nav.domContentLoadedEventEnd), true);
    add(sec, 'Page load', ms(nav.loadEventEnd), true);
    add(sec, 'Protocol', nav.nextHopProtocol, true);
    return sec;
  }
  // Official site identity
  function identitySection(){
    var sec = section('Official site');
    sec._meta.appendChild(pill('Verified', 'ok'));
    add(sec, 'Site', 'The official website of Vineet Pratap Singh', false);
    add(sec, 'Verified via', link('https://github.com/psvim', 'GitHub psvim'));
    var t = '';
    try { t = new Date().toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata', hour: '2-digit', minute: '2-digit', hour12: true }) + ' IST'; } catch (e) {}
    add(sec, 'Local time', t, true);
    return sec;
  }
  var builtAt = 0;
  function build(force){
    if (force) cache = { gh: null, ip: null };
    body.textContent = ''; setDot('');
    var id = identitySection(), gh = section('Last deploy · GitHub'), net = section('Network & location'), dev = deviceSection(),
        http = section('Live response'), perf = perfSection();
    [id, gh, net, dev, http, perf].forEach(function(x){ body.appendChild(x); });
    loadDeploy(gh, force); loadIp(net, force); loadHttp(http);
    builtAt = Date.now();
  }
  function refresh(){
    btnR.classList.add('spin'); build(true);
    setTimeout(function(){ btnR.classList.remove('spin'); }, 900);
  }
  var isOpen = false;
  function setOpen(v){
    isOpen = v;
    panel.classList.toggle('open', v);
    panel.setAttribute('aria-hidden', String(!v));
    fab.setAttribute('aria-expanded', String(v));
    if (v) { if (!builtAt || Date.now() - builtAt > 60000) build(false); panel.focus({ preventScroll: true }); }
  }
  window.toggleInfoPanel = function(force){ setOpen(typeof force === 'boolean' ? force : !isOpen); };
  fab.addEventListener('click', function(){ setOpen(!isOpen); });
  btnC.addEventListener('click', function(){ setOpen(false); fab.focus(); });
  btnR.addEventListener('click', refresh);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && isOpen) { setOpen(false); fab.focus(); } });
  document.addEventListener('mousedown', function(e){ if (isOpen && !panel.contains(e.target) && !fab.contains(e.target)) setOpen(false); });
})();
