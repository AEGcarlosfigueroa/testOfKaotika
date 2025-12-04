// Basic attribute fields
export interface AttributeField {
  intelligence: number;
  dexterity: number;
  charisma: number;
  constitution: number;
  strength: number;
  insanity: number;
}

// Basic item fields
export interface ItemFields {
  name: string;
  description: string;
  type: string;
  image: string;
  value: number;
  min_lvl: number;
}

// Weapon
export interface Weapon extends ItemFields {
  modifiers: AttributeField;
  base_percentage: number;
  die_faces: number;
  die_modifier: number;
  die_num: number;
  isUnique: boolean;
  isActive: boolean;
}

// Artifact
export interface Artifact extends ItemFields {
  modifiers: AttributeField;
}

// Armor
export interface Armor extends ItemFields {
  modifiers: AttributeField;
  defense: number;
}

// Potions
export interface HealingPotion extends ItemFields {
  modifiers: AttributeField;
  duration: number;
}

export interface RecoveryEffects {
  modifiers: AttributeField;
  name: string;
  description: string;
  type: string;
  antidote_effects: string[];
  poison_effects: string[];
}

export interface Antidote extends ItemFields {
  recover_effect: RecoveryEffects;
}

export interface EnhancerPotion extends ItemFields {
  modifiers: AttributeField;
  duration: number;
}

// Equipment pieces
export interface Helmet {
  modifiers: AttributeField;
  defense: number;
}

export interface Shield {
  modifiers: AttributeField;
  defense: number;
  isUnique: boolean;
  isActive: boolean;
}

export interface Boot {
  modifiers: AttributeField;
  isUnique: boolean;
  isActive: boolean;
}

export interface Ring {
  modifiers: AttributeField;
}

// Equipment
export interface EquipmentSchema {
  weapon: Weapon;
  armor: Armor;
  artifact: Artifact;
  antidote_potion: Antidote;
  healing_potion: HealingPotion;
  enhancer_potion: EnhancerPotion;
  helmet: Helmet;
  shield: Shield;
  boot: Boot;
  ring: Ring;
}

// Inventory
export interface InventorySchema {
  helmets: Helmet[];
  weapons: Weapon[];
  shields: Shield[];
  artifacts: Artifact[];
  boots: Boot[];
  rings: Ring[];
  antidote_potions: Antidote[];
  healing_potions: HealingPotion[];
  enhancer_potions: EnhancerPotion[];
  ingredients: string[];
}

// Player Profile & Attributes
export interface PlayerAttribute {
  name: string;
  description: string;
  value: number;
}

export interface PlayerProfile {
  name: string;
  description: string;
  image: string;
  attributes: PlayerAttribute[];
  role: "ISTVAN" | "VILLANO" | "MORTIMER" | "ACOLITO";
}

// Tasks
export interface Task {
  classroom_Id: string;
  courseWorkName: string;
  grade: number;
  selectedAssignment: string;
  maxPoints: number;
}

// Skills
export interface Skill {
  skill: string;
  activeLevels: number[];
}

// Player Info
export interface PlayerInfo {
  name: string;
  nickname: string;
  email: string;
  avatar: string;
  classroom_Id: string;
  level: number;
  experience: number;
  is_active: boolean;
  fcmToken: string | null;
  socketId: string | null;
  isInside: boolean;
  isInTower: boolean;
  cardID: string | null;
  profile: PlayerProfile;
  gold: number;
  tasks: Task[];
  created_date: Date;
  isBetrayer: boolean;
  skills: Skill[];
  isInHallOfSages: Boolean,
  artifactInventory: [String]
}

// Main Player Schema
export interface Player extends PlayerInfo {
  attributes: AttributeField[];
  equipment: EquipmentSchema;
  inventory: InventorySchema;
}

export interface ArtifactsDB {
  artifactID: string,
  artifactName: string,
  isCollected: false,
  latitude: number,
  longitude: number
}

export interface ArtifactDistances {
  id: string,
  distance: number,
  isCollected: boolean
}

