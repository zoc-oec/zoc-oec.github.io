const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

const failures = [];
const check = (condition, message) => {
  if (!condition) failures.push(message);
};

const css = read('assets/css/site.css');
const index = read('index.html');
const team = read('team.html');
const cohorts = read('cohorts.html');
const dataAccess = read('data_access.html');
const publications = read('publications.html');

check(css.includes('.container--wide'), 'homepage needs a wide container option for cohort cards');
check(/\.container--wide\{max-width:1280px\}/.test(css), 'wide cohort container should be visually closer to the feature strip');
check(/\.feature-strip\{[\s\S]*max-width:1280px/.test(css), 'feature strip should align more closely with homepage cohort cards');
check(/\.feature-strip\{[\s\S]*margin:28px auto 0/.test(css), 'feature strip gap should be deliberate below the old cramped seam');
check(/body::before\{[\s\S]*position:absolute/.test(css), 'dot-grid background should not be fixed');
check(/body::after\{[\s\S]*display:none/.test(css), 'ambient fixed glow should be disabled for scroll performance');
check(/\.cohort-card__name\{[\s\S]*white-space:nowrap/.test(css), 'homepage cohort names should stay on one line on desktop');
check(/\.hero\{[\s\S]*background-position:right 44%/.test(css), 'hero background should crop away the heavy bottom edge');
check(/\.research-card__desc\{[\s\S]*font-size:\.96rem/.test(css), 'research card descriptions should fit cleanly on desktop');
check(!css.includes('faculty-card__photo--gao'), 'faculty photos should use normalized crops instead of one-off Gao positioning');
check(/\.collab-grid\{[\s\S]*grid-template-columns:repeat\(2,minmax\(0,1fr\)\)/.test(css), 'collaboration network should render as two balanced rows');
check(css.includes('.data-snapshot'), 'data access page needs a cleaner snapshot layout');

check(index.includes('container container--wide'), 'homepage cohort section should use wide container');
check(index.includes('<span class="hero__brand">ZOC-OEC</span>'), 'homepage hero should foreground ZOC-OEC');
check(index.includes('<span class="val">Lancet</span><span class="lbl">Landmark Paper</span>'), 'ZAP homepage card should use the unified landmark paper label');
check(index.includes('<span class="val">Nat Comms</span><span class="lbl">Landmark Paper</span>'), 'GDES homepage card should use the unified landmark paper label');
check(index.includes('Zhongshan High Myopia Cohort'), 'homepage should use the unified ZHMC name');
check(index.indexOf('JAMA Ophthalmology</strong> 2026') < index.indexOf('Nature Communications</strong> 2025'), 'homepage featured publications should be sorted by year');
check(index.includes('<strong>Ophthalmology</strong> 2024;131(11):1304&ndash;1313.'), 'homepage featured publications should include the ZHMC Ophthalmology paper');
check(index.indexOf('<!-- IMPACT BAND -->') > index.indexOf('<!-- FEATURED PUBLICATIONS -->'), 'impact stats should appear below representative publications');
check(!index.includes('<span class="val">JAMA</span><span class="lbl">Flagship Outlet</span>'), 'old JAMA flagship label should be removed');

check(team.includes('https://orcid.org/0000-0002-5273-3332'), 'team ORCID must use the confirmed ORCID');
check(team.includes('<span class="stat-num">8</span><span class="stat-label">Cohorts Led</span>'), 'team PI cohorts led should be 8');
check(team.includes('page-hero--team'), 'team page needs a visual hero');
check(team.includes('ZOC-OEC Research Team'), 'team eyebrow should be clear, not vague People');
check(team.includes('The programme has produced high-impact cohort papers'), 'team PI bio should not imply Lancet is a personal publication claim');
check(!team.includes('Associate Director'), 'team title should avoid unclear Associate Director wording');
check(!team.includes('Research Focus Areas'), 'ugly Research Focus Areas section should be removed from team page');
check(!team.includes('University of Waterloo'), 'unverified collaborator should not appear');
check(!team.includes('University of Melbourne / CERA'), 'collaboration list should be trimmed to a balanced verified set');
check(!team.includes('H0PJmacAAAAJ'), 'old Google Scholar profile ID should be removed');
check(!team.includes('Google Scholar'), 'Google Scholar link should be omitted until a verified profile ID is available');
check(team.includes('images/faculty/huangwenyong-card.jpg'), 'faculty cards should use normalized cropped portraits');
check(team.includes('images/faculty/chenshida-card.jpg'), 'faculty cards should use normalized cropped portraits');
check(team.includes('images/faculty/gaoxinbo-card.jpg'), 'faculty cards should use normalized cropped portraits');
check(team.includes('images/faculty/hechang-card.jpg'), 'faculty cards should use normalized cropped portraits');
check(team.includes('images/faculty/chengweijing-card.jpg'), 'faculty cards should use normalized cropped portraits');
check((team.match(/class="collab-item"/g) || []).length === 4, 'collaboration network should show four balanced institutions');

check(cohorts.includes('cohort-overview'), 'cohorts page needs a scannable overview');
check(cohorts.includes('page-hero--cohorts'), 'cohorts page needs a visual hero');
check(cohorts.includes('<span>889 participants</span><span>18-year prevention RCT</span>'), 'ZAP overview should clearly lead with sample size and design');
check(cohorts.includes('<span>3,000+ participants</span><span>diabetic eye multi-omics</span>'), 'GDES overview should clearly lead with sample size and theme');
check(cohorts.includes('Zhongshan High Myopia Cohort'), 'cohorts page should use the unified ZHMC name');
check(cohorts.includes('cohort-proof'), 'cohort descriptions should include concise publication proof cards');
check(cohorts.includes('in-print <em>PLOS Medicine</em> study') || cohorts.includes('<em>PLOS Medicine</em> (in print)'), 'GDES PLOS Medicine wording should be in print');
check(!cohorts.includes('<em>PLOS Medicine</em> (2026)'), 'GDES should not cite missing PLOS Medicine 2026 as a published listing');

check(publications.includes('page-hero--publications'), 'publications page needs a visual hero');
check(/\.pub-item\[data-cohort="zhmc"\]\{border-left:3px solid var\(--cyan\)\}/.test(css), 'ZHMC publication items should have the blue left accent');

check(dataAccess.includes('page-hero--data'), 'data access page needs a visual hero');
check(dataAccess.includes('Zhongshan High Myopia Cohort'), 'data access page should use the unified ZHMC name');
check(dataAccess.includes('Eligible') && dataAccess.includes('Not allowed') && dataAccess.includes('Separate approval'), 'data access boundaries should use clear labels, not OK/No');
check(!dataAccess.includes('>OK<') && !dataAccess.includes('>No<'), 'data access should not show vague OK/No labels');
check(dataAccess.includes('889 participants') && dataAccess.includes('18-year randomized trial'), 'data access ZAP numbers should match cohorts page');
check(dataAccess.includes('3,000+ participants') && dataAccess.includes('2,923 plasma proteins'), 'data access GDES numbers should match cohorts page');
check(dataAccess.includes('14-year registry'), 'data access ZHMC numbers should match cohorts page');
check(!dataAccess.includes('~1,400 participants') && !dataAccess.includes('4-year follow-up'), 'old GDES data access numbers should be removed');

check(!/[芒聙聰聯漏脗]/.test(publications), 'publications page should not contain mojibake Chinese glyph fragments');
check(!/247[^<]{0,4}254/.test(publications), 'publication page ranges should use en dash entities, not mojibake');
check(/data-year="2024"[\s\S]*Handgrip strength[\s\S]*Br J Ophthalmol\.<\/strong> 2024;109\(1\):157&ndash;164/.test(publications), 'Handgrip paper should be categorized as 2024');
check(/data-year="2023"[\s\S]*Rates of choroidal loss[\s\S]*2023;108\(1\):84&ndash;90/.test(publications), 'choroidal loss paper should be categorized as 2023');
check(/data-year="2023"[\s\S]*In Vivo Visualization[\s\S]*2023;4\(1\):100358/.test(publications), 'optic disc microvasculature paper should be categorized as 2023');

if (failures.length) {
  console.error('Portal polish checks failed:');
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log('Portal polish checks passed.');
