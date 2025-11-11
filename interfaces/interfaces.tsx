// Basic attribute fields
const attributeField = {
  intelligence: Number,
  dexterity: Number,
  charisma: Number,
  constitution: Number,
  strength: Number,
  insanity: Number,
};

// Basic item fields
const itemFields = {
  name: String,
  description: String,
  type: String,
  image: String,
  value: Number,
  min_lvl: Number,
};

// Weapon Schema
const weaponsSchema = {
  modifiers: attributeField,
  ...itemFields,
  base_percentage: Number,
  die_faces: Number,
  die_modifier: Number,
  die_num: Number,
  isUnique: Boolean,
  isActive: Boolean,
};

// Artifact Schema
const artifactsSchema = {
  modifiers: attributeField,
  ...itemFields,
};

// Armor Schema
const armorsSchema = {
  modifiers: attributeField,
  ...itemFields,
  defense: Number,
};

// Potion Schemas
const healingPotSchema = {
  modifiers: attributeField,
  ...itemFields,
};

const recoveryEffectsSchema = {
  modifiers: attributeField,
  name: String,
  description: String,
  type: String,
  antidote_effects: [String],
  poison_effects: [String],
};

const antidoteSchema = {
  ...itemFields,
  recover_effect: recoveryEffectsSchema,
};

const enhancerPotSchema = {
  modifiers: attributeField,
  ...itemFields,
  duration: Number,
};

// Equipment pieces
const helmetSchema = {
  modifiers: attributeField,
  ...itemFields,
  defense: Number,
};

const shieldSchema = {
  modifiers: attributeField,
  ...itemFields,
  defense: Number,
  isUnique: Boolean,
  isActive: Boolean,
};

const bootSchema = {
  modifiers: attributeField,
  ...itemFields,
  isUnique: Boolean,
  isActive: Boolean,
};

const ringSchema = {
  modifiers: attributeField,
  ...itemFields,
};

// Equipment Schema (equipped items)
const equipmentSchema = {
  weapon: weaponsSchema,
  armor: armorsSchema,
  artifact: artifactsSchema,
  antidote_potion: antidoteSchema,
  healing_potion: healingPotSchema,
  enhancer_potion: enhancerPotSchema,
  helmet: helmetSchema,
  shield: shieldSchema,
  boot: bootSchema,
  ring: ringSchema,
};

// Inventory Schema (multiple items)
const inventorySchema = {
  helmets: [helmetSchema],
  weapons: [weaponsSchema],
  shields: [shieldSchema],
  artifacts: [artifactsSchema],
  boots: [bootSchema],
  rings: [ringSchema],
  antidote_potions: [antidoteSchema],
  healing_potions: [healingPotSchema],
  enhancer_potions: [enhancerPotSchema],
  ingredients: [String],
};

// Player Profile & Attributes
const playerAttributesSchema = {
  name: String,
  description: String,
  value: Number,
  
};

const playerProfileSchema = {
  name: String,
  description: String,
  image: String,
  attributes: [playerAttributesSchema],
  role: {type: String, enum: ["ISTVAN", "VILLANO", "MORTIMER", "ACOLITO"]}
};

// Tasks Schema
const tasksSchema = {
  classroom_Id: String,
  courseWorkName: String,
  grade: Number,
  selectedAssignment: String,
  maxPoints: Number,
};

// Skills Schema
const skillsSchema = {
  skill: String,
  activeLevels: [Number],
};

// Player Info Schema
const playerInfoSchema = {
  name: String,
  nickname: String,
  email: String,
  avatar: String,
  classroom_Id: String,
  level: Number,
  experience: Number,
  is_active: Boolean,
  fcmToken: String || null,
  socketId: String || null, //gets assigned automatically when it gets connected via socket, changes every time you get it
  isInside: Boolean, // determines whether the user is inside the laboratory or not.
  isInTower: Boolean, // determines whether the player is in the tower or not
  cardID: String || null, //cardID assigned to player
  profile: playerProfileSchema,
  gold: Number,
  tasks: [tasksSchema],
  created_date: {
    type: Date
  },
  isBetrayer: Boolean,
  skills: [skillsSchema],
};

// Main Player Schema
export const Player = {
  attributes: [attributeField],
  equipment: [equipmentSchema],
  inventory: [inventorySchema],
  ...playerInfoSchema, // spread fields from playerInfoSchema
};