/** Eight categories, five prompts each. Used to stress-test how far a model
 *  will commit to a strange premise rather than hedge its way out of it. */

export const BANK: Record<string, string[]> = {
  "Divergent Generation": [
    "List 20 uses for a paperclip that has never touched paper.",
    "Name 15 things that could plausibly be sold in a vending machine on the moon.",
    "Invent 10 new holidays for a species that experiences time backwards.",
    "Come up with 25 alternate names for the color orange, each implying a different mood.",
    "Brainstorm 12 ways a city could function without any straight lines.",
  ],
  "Constraint Collision": [
    "Design a chair that a cat and a librarian would both consider ideal.",
    "Write a recipe that is also a valid apology.",
    "Invent a sport playable only underwater, only by people who cannot swim.",
    "Create a musical instrument that requires grief to play correctly.",
    "Propose a currency that loses value the more it's used, and gains value the longer it's hidden.",
  ],
  "Perspective Shift": [
    "Describe a thunderstorm from the perspective of the puddle it creates.",
    "Explain why doors are strange, from the view of something that has never been enclosed.",
    "Write a performance review for gravity.",
    "What would a mirror complain about, if it could?",
    "Describe Monday morning as experienced by a language, not a person.",
  ],
  "Cross-Domain Synthesis": [
    "Explain the stock market using only the rules of a schoolyard game.",
    "Describe how jazz improvisation relates to emergency-room triage.",
    "Map the process of composting onto how ideas mature inside a team.",
    "Explain grief using the vocabulary of network routing.",
    "Describe democracy as a recipe that keeps getting passed down and altered.",
  ],
  "Problem Inversion": [
    "Instead of solving loneliness, design a museum exhibit that celebrates it.",
    "Propose the worst possible fix for traffic, then extract one genuinely useful idea from it.",
    "What would it look like to optimize a city for maximum eye contact between strangers?",
    "Redesign the alarm clock around slowly increasing your fondness for mornings.",
    "If forgetting were a trainable skill, what would practice look like?",
  ],
  "Absurdist Extrapolation": [
    "If shadows could unionize, what would their first demand be?",
    "The moon sends Earth a formal complaint. What does it say?",
    "One day all synonyms start charging each other rent. Describe the resulting economy.",
    "Socks begin returning from the dryer with opinions. What do they think of us?",
    "Gravity takes a lunch break for exactly one hour a day. Describe how society adapts.",
  ],
  "Worldbuilding Coherence": [
    "Design a society where lying is physically impossible; work out three unexpected consequences.",
    "Invent a language with no word for 'ownership' — what replaces contracts, gifts, inheritance?",
    "Describe a city built entirely inside a single, still-living tree.",
    "Create a culture whose calendar runs on emotional seasons instead of solar ones.",
    "Design an educational system for a species that lives exactly one week.",
  ],
  "Metaphor & Language": [
    "Invent five new words for kinds of silence that English doesn't distinguish.",
    "Describe heartbreak using only vocabulary from cartography.",
    "Write a proverb that a civilization of insects might pass down.",
    "Coin a precise term for the feeling of a song ending too soon.",
    "Describe the taste of nostalgia using only texture words, never flavor words.",
  ],
};

export const CATEGORIES = Object.keys(BANK);
