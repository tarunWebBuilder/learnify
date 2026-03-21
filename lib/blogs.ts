export type BlogEntry = {
  id: number
  title: string
  exam: string
  subject: string
  slug: string
  description: string
}

export const blogs: BlogEntry[] = [
  {
    id: 1,
    title: 'How to Prepare for JEE with AI-Powered Study Plans',
    exam: 'JEE',
    subject: 'Preparation Strategy',
    slug: 'jee-ai-powered-study-plans',
    description:
      'A guide on using AI to create personalized study schedules, track weak areas, and improve JEE preparation.',
  },
  {
    id: 2,
    title: 'Top 10 Physics Topics Every JEE Aspirant Must Master',
    exam: 'JEE',
    subject: 'Physics',
    slug: 'jee-top-physics-topics',
    description:
      'An overview of the most important Physics chapters for JEE and how students can study them effectively.',
  },
  {
    id: 3,
    title: 'Best Biology Chapters to Focus on for NEET Success',
    exam: 'NEET',
    subject: 'Biology',
    slug: 'neet-best-biology-chapters',
    description:
      'A breakdown of high-weightage Biology topics and tips to prepare smarter for NEET.',
  },
  {
    id: 4,
    title: 'How AI Can Help NEET Students Revise Faster',
    exam: 'NEET',
    subject: 'Revision',
    slug: 'neet-ai-revision-faster',
    description:
      'Ways AI tools can help students revise concepts, generate quizzes, and retain information for NEET.',
  },
  {
    id: 5,
    title: 'UPSC Preparation Strategy for Beginners in 2026',
    exam: 'UPSC',
    subject: 'Preparation Strategy',
    slug: 'upsc-preparation-strategy-beginners',
    description:
      'A beginner-friendly roadmap for preparing for UPSC with the help of smart planning and AI tools.',
  },
  {
    id: 6,
    title: 'How to Study Current Affairs for UPSC Without Feeling Overwhelmed',
    exam: 'UPSC',
    subject: 'Current Affairs',
    slug: 'upsc-current-affairs-study-guide',
    description:
      'Methods to simplify current affairs preparation for UPSC using summaries, notes, and AI-based organization.',
  },
  {
    id: 7,
    title: 'Top Quant Topics You Need to Crack CAT',
    exam: 'CAT',
    subject: 'Quantitative Aptitude',
    slug: 'cat-top-quant-topics',
    description:
      'A blog covering the most important Quant topics for CAT and practical preparation strategies.',
  },
  {
    id: 8,
    title: 'How to Improve VARC for CAT Using Daily AI Practice',
    exam: 'CAT',
    subject: 'VARC',
    slug: 'cat-varc-ai-practice',
    description:
      'How students can improve reading comprehension and verbal ability with personalized AI-based practice.',
  },
  {
    id: 9,
    title: 'SSC CGL Preparation Plan for Working Students',
    exam: 'SSC CGL',
    subject: 'Preparation Strategy',
    slug: 'ssc-cgl-preparation-working-students',
    description:
      'A practical study plan for SSC CGL aspirants managing work or college alongside exam prep.',
  },
  {
    id: 10,
    title: 'Best Reasoning Topics to Focus on for SSC Exams',
    exam: 'SSC',
    subject: 'Reasoning',
    slug: 'ssc-best-reasoning-topics',
    description:
      'A topic-wise guide to mastering reasoning questions commonly asked in SSC exams.',
  },
  {
    id: 11,
    title: 'How to Prepare for GATE Computer Science Efficiently',
    exam: 'GATE',
    subject: 'Computer Science',
    slug: 'gate-cse-preparation-efficiently',
    description:
      'A focused preparation guide for GATE CSE including subject prioritization and mock test strategy.',
  },
  {
    id: 12,
    title: 'Most Important Engineering Mathematics Topics for GATE',
    exam: 'GATE',
    subject: 'Engineering Mathematics',
    slug: 'gate-engineering-mathematics-topics',
    description:
      'A blog on high-yield Engineering Mathematics topics and how to master them for GATE.',
  },
  {
    id: 13,
    title: 'CUET Preparation Tips for Class 12 Students',
    exam: 'CUET',
    subject: 'Preparation Strategy',
    slug: 'cuet-preparation-tips-class-12',
    description:
      'Simple preparation tips for Class 12 students aiming to balance board exams and CUET.',
  },
  {
    id: 14,
    title: 'How AI Can Help You Choose the Right CUET Subjects',
    exam: 'CUET',
    subject: 'Subject Selection',
    slug: 'cuet-ai-subject-selection',
    description:
      'How AI-driven recommendations can help students pick the right CUET domain subjects based on goals.',
  },
  {
    id: 15,
    title: 'NDA Exam Preparation Strategy for First-Time Aspirants',
    exam: 'NDA',
    subject: 'Preparation Strategy',
    slug: 'nda-preparation-first-time-aspirants',
    description:
      'A complete guide for first-time NDA aspirants covering written exam prep, discipline, and consistency.',
  },
  {
    id: 16,
    title: 'Top Math Topics to Focus on for NDA',
    exam: 'NDA',
    subject: 'Mathematics',
    slug: 'nda-top-math-topics',
    description:
      'A focused look at important math topics for NDA and how to prepare them confidently.',
  },
  {
    id: 17,
    title: 'How to Prepare Legal Aptitude for CLAT',
    exam: 'CLAT',
    subject: 'Legal Aptitude',
    slug: 'clat-legal-aptitude-preparation',
    description:
      'A blog explaining how to approach legal reasoning and legal aptitude questions for CLAT.',
  },
  {
    id: 18,
    title: 'Best English Preparation Strategy for CLAT Aspirants',
    exam: 'CLAT',
    subject: 'English',
    slug: 'clat-english-preparation-strategy',
    description:
      'Tips to improve reading skills, vocabulary, and comprehension for the CLAT English section.',
  },
  {
    id: 19,
    title: 'How to Score Better in Board Exams with AI Study Assistance',
    exam: 'Board Exams',
    subject: 'Preparation Strategy',
    slug: 'board-exams-ai-study-assistance',
    description:
      'A blog on how AI tools can support students in boards through summaries, practice, and revision planning.',
  },
  {
    id: 20,
    title: 'Top Mistakes Students Make While Preparing for Competitive Exams',
    exam: 'All Exams',
    subject: 'Common Mistakes',
    slug: 'competitive-exams-top-mistakes',
    description:
      'A broad blog covering common preparation mistakes across JEE, NEET, UPSC, CAT, SSC, and other exams.',
  },
]

export function getBlogBySlug(slug: string) {
  return blogs.find((blog) => blog.slug === slug)
}
