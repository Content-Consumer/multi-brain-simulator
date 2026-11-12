export const QUESTIONS = [
  { id: 1,  text: 'Deepfake apps must only require paid licenses to build some friction and only allow serious users' },
  { id: 2,  text: 'Govt should mandate education about deepfake related issues' },
  { id: 3,  text: 'Cloud providers should have to comply with takedown notices from govt' },
  { id: 4,  text: 'Companies should be held financially and legally responsible for content created/promoted through their platform' },
  { id: 5,  text: 'Deepfake apps must comply with local AI regulations and must create products that can be customized for each user\'s geography and the laws that apply' },
  { id: 6,  text: 'Deepfake apps must have disclaimers and content warnings built in' },
  { id: 7,  text: 'Deepfake apps must add a digital signature of the users in all outputs that the government can identify' },
  { id: 8,  text: 'Government should be expected to not be swayed by technology companies interests' },
  { id: 9,  text: 'Guardrails should be built into all models released' },
  { id: 10, text: 'Govt should mandate and create automatic checkers for deepfakes' },
  { id: 11, text: 'The state needs to have a more robust regulatory framework for deepfake apps entering the Indian market' },
  { id: 12, text: 'Deepfakes must be mandatorily connected to the identity of the creator' },
  { id: 13, text: 'Robust response and redressal mechanisms should be created' },
]

// Responses indexed by question order (index 0 = question id 1, etc.)
// 1 = YES, 0 = NO
export const ENTITY_RESPONSES = {
  experts: [0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  mob:     [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  machine: [0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1],
}

// Returns random voter counts for each entity (1–19)
export function generateEntityCounts() {
  return {
    experts: Math.floor(Math.random() * 19) + 1,
    mob:     Math.floor(Math.random() * 19) + 1,
    machine: Math.floor(Math.random() * 19) + 1,
  }
}

// Returns a shuffled copy of the questions array (Fisher-Yates)
export function shuffleQuestions() {
  const shuffled = [...QUESTIONS]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}
