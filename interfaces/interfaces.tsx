// Basic attribute fields
interface attributeField {
  intelligence: number,
  dexterity: number,
  charisma: number,
  constitution: number,
  strength: number,
  insanity: number,
};

// Basic item fields
interface itemFields {
  name: string,
  description: string,
  type: string,
  image: string,
  value: number,
  min_lvl: number,
};

// Weapon Schema
interface weapon extends itemFields {
  modifiers: attributeField,
  base_percentage: Number,
  die_faces: Number,
  die_modifier: Number,
  die_num: Number,
  isUnique: Boolean,
  isActive: Boolean,
};

// Artifact Schema
interface artifacts extends itemFields {
  modifiers: attributeField,
};

// Armor Schema
interface armor extends itemFields {
  modifiers: attributeField,
  defense: Number,
};

// Potion Schemas
interface potion extends itemFields {
  modifiers: attributeField,
};

interface recoveryEffects {
  modifiers: attributeField,
  name: String,
  description: String,
  type: String,
  antidote_effects: [String],
  poison_effects: [String],
};

interface antidoteSchema {
  recover_effect: recoveryEffects,
};

interface enhancerPotSchema {
  modifiers: attributeField,
  duration: Number,
};

// Equipment pieces
interface helmetSchema {
  modifiers: attributeField,
  defense: Number,
};

interface shieldSchema {
  modifiers: attributeField,
  defense: Number,
  isUnique: Boolean,
  isActive: Boolean,
};

interface bootSchema {
  modifiers: attributeField,
  isUnique: Boolean,
  isActive: Boolean,
};

interface ringSchema {
  modifiers: attributeField,
};

// Equipment Schema (equipped items)
interface equipmentSchema {
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

