/**
 * Copy for the inner pages. Every string here is placeholder text:
 * replace it with your own wording.
 */
import { photo } from "./media";

export const about = {
  hero: { title: "About Us", image: photo("about-hero") },
  whoWeAre: {
    title: "Who We Are",
    body: "We are a family of people learning to follow Jesus together. We gather to worship, grow in faith and serve our city, and we'd love for you to be part of it.",
  },
  name: {
    title: "What Our Name Means",
    paragraphs: [
      "Our name reflects the kind of community we want to be: open, generous and rooted in love.",
      "It reminds us that church is not a building but a people, a household where everyone has a place at the table.",
      "Replace this section with the story behind your church's name, or remove it in AboutPage.tsx.",
    ],
    image: photo("about-name", 900, 1100),
  },
  mission: {
    title: "Our Mission",
    body: "To build a vibrant church that loves God and loves people, reaching our community, our city, our nation and our world with hope.",
  },
  affiliation: {
    title: "Our Affiliation",
    body: "We are part of a wider family of churches that share resources, training and mission. Describe your network or denomination here.",
  },
  values: {
    title: "Our Values",
    items: [
      { title: "1. We Value Worship", body: "We believe worship is more than music; it's a life offered to God. We gather to honour Him with our whole hearts." },
      { title: "2. We Value People", body: "Every person matters. We create space for people from every background to belong before they believe." },
      { title: "3. We Value Creativity", body: "We use the arts, media and fresh ideas to communicate timeless truth in ways that connect." },
      { title: "4. We Value Spiritual Gifts", body: "Everyone has something to give. We help people discover and use their gifts to build others up." },
      { title: "5. We Value Empowerment", body: "We equip people to lead, serve and make a difference in their homes, workplaces and communities." },
      { title: "6. We Value Practical Teaching", body: "We teach the Bible in a way that is clear, honest and applicable to everyday life." },
      { title: "7. We Value Relationships", body: "Faith grows best in friendship. Small groups and serving teams help us do life together." },
    ],
  },
  getToKnow: {
    title: "Get to Know Us",
    intro: "Discover what we believe, where we've come from and the values that shape our community.",
    items: [
      { title: "Our Beliefs", body: "The core truths we hold and how we hold them.", cta: "Explore Our Beliefs", to: "/about/beliefs" },
      { title: "Our Story", body: "How it started, and where we're going.", cta: "Read Our Story", to: "/about/story" },
      { title: "Our Lifestyle", body: "How our faith shapes the way we live each day.", cta: "Read More", to: "/about/lifestyle" },
    ],
  },
};

export const beliefs = {
  hero: { title: "Our Beliefs", image: photo("beliefs-hero") },
  approach: {
    title: "How We Hold Our Beliefs",
    items: [
      { title: "In essentials, unity", body: "On the core truths of the faith we stand together." },
      { title: "In non-essentials, liberty", body: "Where Christians sincerely differ, we give each other freedom." },
      { title: "In all things, charity", body: "Whatever we discuss, we do it with love and respect." },
    ],
  },
  essentials: {
    title: "What We Believe",
    items: [
      { title: "About God", body: "There is one God, Creator of all things, eternally existing as Father, Son and Holy Spirit." },
      { title: "About Jesus Christ", body: "Jesus is the Son of God. He lived a sinless life, died for our sins, rose from the dead and will return." },
      { title: "About the Holy Spirit", body: "The Holy Spirit lives in every believer, giving guidance, power and gifts for life and service." },
      { title: "About the Bible", body: "The Bible is God's inspired Word, the trustworthy guide for faith and life." },
      { title: "About People", body: "Every person is made in God's image, deeply loved and in need of His grace." },
      { title: "About Salvation", body: "Salvation is God's free gift, received by faith in Jesus Christ, not earned by our efforts." },
      { title: "About Eternity", body: "We were created to live forever, and in Christ we look forward to eternal life with God." },
    ],
  },
};

export const story = {
  hero: { title: "Our Story", image: photo("story-hero") },
  intro: {
    title: "A Journey of Faith, Hope and Faithfulness",
    body: "Every church has a story. Here's a short timeline of ours. Replace these milestones with your own.",
  },
  timeline: [
    { year: "2001", title: "A small beginning", body: "A handful of families began meeting in a living room to pray and study the Bible together.", image: photo("story-1", 900, 700) },
    { year: "2008", title: "Our first building", body: "As the church grew, we moved into our first permanent home and launched kids and youth ministries.", image: photo("story-2", 900, 700) },
    { year: "2015", title: "Reaching further", body: "We started community outreach programmes and planted our first partner congregation." },
    { year: "2022", title: "Online church", body: "Services went online, connecting with people across the country and around the world." },
    { year: "Today", title: "Still growing", body: "We continue to build a church where everyone can belong, grow and make a difference." },
  ],
};

export const lifestyle = {
  hero: { title: "Our Lifestyle", image: photo("lifestyle-hero") },
  intro: {
    title: "Living Our Faith Every Day",
    body: "Faith isn't only for Sundays. These commitments describe how we try to live as a church family.",
  },
  items: [
    { title: "The Bible Is Our Guide", body: "We look to Scripture as the final word on how we live and make decisions." },
    { title: "Everyone Has a Part", body: "Every believer has direct access to God and a part to play in His work." },
    { title: "Generosity", body: "We give joyfully and faithfully, trusting God as our provider." },
    { title: "Spirit-led Living", body: "We depend on the Holy Spirit for wisdom, strength and character." },
    { title: "Come As You Are", body: "There's no dress code. We value modesty and respect, and we want everyone to feel welcome." },
    { title: "Sharing Our Faith", body: "We naturally and respectfully share the hope we've found with those around us." },
  ],
};

export const visit = {
  hero: { title: "Plan a Visit", image: photo("visit-hero") },
  welcome: {
    title: "We'd Love to Welcome You",
    body: "Whether it's your first time in a church or you're looking for a place to call home, we're excited to meet you. Here's everything you need to know before your first visit.",
  },
  expect: {
    eyebrow: "Your First Visit",
    title: "What Can You Expect?",
    intro: "From the moment you arrive, our team is here to help you feel at home.",
    items: [
      { icon: "hand", title: "Friendly Welcome", body: "Our welcome team will answer questions, help you find your way and make you feel at home." },
      { icon: "music", title: "Heartfelt Worship", body: "Uplifting worship that points people to Jesus and prepares our hearts for the message." },
      { icon: "book", title: "Practical Teaching", body: "Each message is rooted in Scripture and designed to help you follow Jesus in everyday life." },
      { icon: "shirt", title: "Come As You Are", body: "There's no dress code. Casual or formal, you'll be warmly welcomed." },
    ],
    image: photo("visit-expect", 1920, 900),
  },
  kids: {
    title: "Your Kids Will Love It Here",
    body: "Our kids ministry provides a safe, fun and engaging environment where children learn about Jesus through age-appropriate lessons, worship and activities.",
    cta: { label: "Explore Kids Ministry", to: "/ministries/kids" },
    image: photo("visit-kids", 900, 700),
  },
  form: {
    title: "We'd Love to Meet You",
    body: "Fill in the form and someone from our team will be in touch before your visit to answer questions and help make your first experience easy.",
  },
  faq: {
    eyebrow: "Have Questions?",
    title: "We've Got You Covered",
    items: [
      { title: "Where should I park?", body: "Free parking is available on-site, with volunteers ready to help direct you." },
      { title: "What should I wear?", body: "Come as you are. Whether you dress casually or formally, you'll be welcome." },
      { title: "How long is the service?", body: "Sunday services usually last around 90 minutes, including worship and the message." },
      { title: "Is there something for my children?", body: "Absolutely. Our kids ministry runs age-appropriate programmes during every Sunday service." },
    ],
  },
};

export const ministries = {
  hero: { title: "Ministries", image: photo("ministries-hero") },
  intro: { title: "A Ministry for Every Season of Life", body: "Wherever you are on your journey, there's a place for you to connect, grow and serve." },
  items: [
    { title: "Kids", body: "Fun, safe and Bible-centred programmes for children from nursery to age 11.", cta: "Discover Kids", to: "/ministries/kids", image: photo("min-kids", 800, 600) },
    { title: "Youth", body: "A place for students to belong, grow in faith and build lasting friendships.", cta: "Join Youth", to: "/ministries/youth", image: photo("min-youth", 800, 600) },
    { title: "Small Groups", body: "Meet in homes across the city to study, pray and do life together.", cta: "Find a Group", to: "/contact?topic=Small%20groups", image: photo("min-groups", 800, 600) },
    { title: "Men & Women", body: "Gatherings, mentoring and events that strengthen faith and friendship.", cta: "Get Connected", to: "/contact?topic=Men%20%26%20women", image: photo("min-adults", 800, 600) },
    { title: "Family", body: "Resources and counselling to help marriages and families flourish.", cta: "Family Resources", to: "/family", image: photo("min-family", 800, 600) },
    { title: "Serve Teams", body: "Use your gifts on our welcome, worship, media, kids or outreach teams.", cta: "Start Serving", to: "/contact?topic=Serving", image: photo("min-serve", 800, 600) },
  ],
  cta: {
    title: "Take Your Next Step",
    body: "Not sure where to start? Tell us a bit about yourself and we'll help you find the right place.",
    primary: { label: "About Us", to: "/about" },
    secondary: { label: "Contact Us", to: "/contact" },
  },
};

export const kids = {
  hero: { title: "Kids Ministry", image: photo("kids-hero") },
  intro: {
    title: "Where Kids Discover God's Love",
    body: "Every Sunday, children enjoy worship, Bible lessons and small groups designed just for them, while you enjoy the service.",
    image: photo("kids-intro", 900, 700),
  },
  quote: "Start children off on the way they should go, and even when they are old they will not turn from it.",
  expect: {
    title: "What to Expect",
    items: [
      { icon: "music", title: "Exciting Worship", body: "High-energy songs and creative moments that help kids worship." },
      { icon: "book", title: "Engaging Bible Lessons", body: "Age-appropriate teaching that brings Bible stories to life." },
      { icon: "users", title: "Small Groups", body: "Caring leaders help kids talk about what they learned and build friendships." },
    ],
  },
  partner: {
    title: "Partnering With You",
    body: "We believe parents are the most important influence in a child's faith. We provide take-home resources so the conversation continues all week.",
    image: photo("kids-partner", 900, 700),
  },
  volunteer: {
    title: "Make a Difference in a Child's Life",
    body: "Our volunteers are background-checked, trained and passionate about kids. We'd love for you to join the team.",
    image: photo("kids-volunteer", 900, 700),
    cta: { label: "Volunteer With Kids", to: "/contact?topic=Kids%20volunteering" },
  },
  checkIn: {
    title: "Pre-register Your Child",
    body: "Save time on Sunday. Send us your child's details and we'll have their name tag ready when you arrive.",
    cta: { label: "Pre-register", to: "/contact?topic=Kids%20check-in" },
  },
};

export const youth = {
  hero: { title: "Youth Ministry", image: photo("youth-hero") },
  intro: {
    title: "A Place for Students to Belong, Grow and Thrive",
    body: "Our youth ministry is a community where teenagers can ask real questions, build real friendships and discover a real faith.",
    image: photo("youth-intro", 900, 700),
  },
  quote: "Don't let anyone look down on you because you are young, but set an example in speech, in conduct, in love, in faith.",
  gatherings: {
    title: "Every Gathering Is Full of Energy",
    items: [
      { icon: "party", title: "Fun & Games", body: "Every night starts with games, food and a chance to hang out." },
      { icon: "music", title: "Passionate Worship", body: "Student-led worship that's loud, honest and focused on Jesus." },
      { icon: "book", title: "Practical Teaching", body: "Messages that tackle the real issues students face every day." },
    ],
  },
  social: { title: "Join the Conversation", body: "Follow our youth channels for updates, photos and what's coming up." },
  cta: {
    title: "We'd Love to Meet You",
    body: "Youth meets every Saturday at 6:00pm. Bring a friend!",
    primary: { label: "Plan Your Visit", to: "/visit" },
    secondary: { label: "Contact Us", to: "/contact?topic=Youth" },
  },
};

export const family = {
  hero: { title: "Family", image: photo("family-hero") },
  intro: { title: "Strong Families. Strong Faith.", body: "Healthy families build healthy communities. Here are resources and support to help your family grow together." },
  resources: {
    title: "Practical Resources for Every Family",
    image: photo("family-resources", 900, 700),
    links: [
      { label: "Family Devotional Guide", href: "#" },
      { label: "A Parent's Blessing", href: "#" },
      { label: "Conversation Starters", href: "#" },
    ],
  },
  learn: {
    title: "Learn, Grow and Be Encouraged",
    body: "Articles and tools to help you write a family mission statement, choose healthy media and build traditions.",
    links: [
      { label: "Writing a Family Mission Statement", href: "#" },
      { label: "Family Media Reviews", href: "#" },
    ],
  },
  connect: {
    title: "Connect With Us",
    body: "Our pastoral team offers counselling, marriage support and pre-marriage courses.",
    links: [
      { label: "Contact", to: "/contact?topic=Family" },
      { label: "Counselling", to: "/contact?topic=Counselling" },
      { label: "Marriage Ministry", to: "/contact?topic=Marriage" },
      { label: "Pre-Marriage Course", to: "/contact?topic=Pre-marriage" },
    ],
  },
};

export const resources = {
  hero: { title: "Resources", image: photo("resources-hero") },
  title: "Download Service Resources",
  items: [
    { title: "Follow Along with the Message", body: "This week's sermon outline with space for your own notes.", cta: "Sermon Notes", to: "/notes", icon: "notebook" },
    { title: "Grow in God's Word Every Day", body: "A short daily reading and reflection to start your day.", cta: "Daily Devotional", href: "/files/devotional-sample.pdf", icon: "sun" },
    { title: "Stay Connected with Church Life", body: "News, events and ways to get involved this week.", cta: "Bulletin", href: "/files/bulletin-sample.pdf", icon: "newspaper" },
  ],
};

export const prayer = {
  hero: { title: "Prayer", image: photo("prayer-hero") },
  title: "Every Prayer Matters",
  body: "Whether you're celebrating answered prayer, seeking guidance or carrying a heavy burden, our prayer team is here for you. We believe God hears every prayer.",
};

export const watch = {
  hero: { title: "Watch Live", image: photo("watch-hero") },
  title: "Worship With Us Wherever You Are",
  body: "Wherever you are in the world, you're part of our family. Join us online for worship, teaching and community.",
  room: "sunday-service",
};

export const contact = {
  hero: { title: "Contact Us", image: photo("contact-hero") },
  title: "We'd Love to Hear From You",
  body: "Questions, next steps, or just want to say hello? Send us a message and we'll get back to you within two working days.",
  topics: [
    "General enquiry",
    "Next steps",
    "Small groups",
    "Serving",
    "Kids check-in",
    "Kids volunteering",
    "Youth",
    "Men & women",
    "Family",
    "Counselling",
    "Marriage",
    "Pre-marriage",
    "Media & press",
  ],
};

export const give = {
  hero: { title: "Give", image: photo("give-hero") },
  title: "Generosity Changes Lives",
  body: "Your giving supports our ministries, reaches people in need and helps us share hope across our city and beyond. Thank you.",
};

export const privacy = {
  hero: { title: "Privacy Policy", image: photo("privacy-hero") },
  updated: "1 January 2026",
  sections: [
    { title: "Who we are", body: "This website is operated by Your Church. If you have questions about this policy, contact us using the details in the footer." },
    { title: "Information we collect", body: "We collect the information you choose to give us through forms on this site, such as your name, email address, phone number and message. We do not sell your information." },
    { title: "How we use it", body: "We use your information to respond to you, follow up on visit plans, pray for requests you share and send event information you've asked for." },
    { title: "Prayer requests", body: "If you choose \"Public\", your first name and request may be shown on our prayer wall. \"Anonymous\" requests are shown without your name. \"Private\" requests are only seen by our prayer team." },
    { title: "Cookies and local storage", body: "We use your browser's local storage to remember things like your sermon notes and the prayers you've reacted to. This information stays on your device." },
    { title: "Your rights", body: "You can ask us to see, correct or delete the personal information we hold about you at any time." },
    { title: "Changes", body: "We may update this policy from time to time. The latest version will always be on this page." },
  ],
};
