export enum TimelineType {
  PRIMARY_TIMELINE = 'PRIMARY_TIMELINE',
  SECONDARY_TIMELINE = 'SECONDARY_TIMELINE',
  COMBINE_TIMELINE = 'COMBINE_TIMELINE',
}

export enum TimelineEventType {
  FIXED = 'FIXED', // Affects Timeline, can not be deleted, and can not be moved.
  FIXED_OVERLAP = 'FIXED_OVERLAP', // Affects Timeline, can not be deleted, and can not be moved but move relatives.
  TRAVEL = 'TRAVEL', // Affects Timeline, can be deleted from onboarding, and can not be moved.
  PRIMARY = 'PRIMARY', // Affects Timeline, cannot be deleted, and can not be moved.
  SECONDARY = 'SECONDARY', // Affects Timeline, can be deleted, can be moved, can not pass the redline.
  CUSTOM = 'CUSTOM', // Doesn't Affect the Timeline, can be deleted, can be moved, can pass the redline.
}

export enum TimelineColorCodes {
  FIXED = '#C8A2C8',
  FIXED_OVERLAP = '#C8A2C8',
  TRAVEL = '#FFDDC6',
  CUSTOM = '#CDE7D0',
  PRIMARY = '#C8A2C8',
  SECONDARY = '#C8A2C8',
}

export enum TIMELINE_EVENT_NAME {
  TRAVEL = 'Travel + Buffer',
  HAIR_AND_MAKEUP = 'Hair & Makeup',
  SPECIAL_FIRST_LOOK = 'First Look With',
  FIRST_LOOK = 'First Look',
  BRIDESMAID_GETITNG_DRESSED = 'Bridesmaids get dressed',
  BOUQETS_DELIVERED_BRIDE_BRIDESMAIDS = 'Bouquets delivered',
  BOUTONNIERES_DELIVERED_GROOM_GROOMSMEN = "Boutonniere's delivered",
  GETITNG_DRESSED = 'Getting Dressed',
  GUEST_ARRIVAL = 'Guests Arrive',
  CEREMONY = 'Ceremony Starts',
  COUPLES_PHOTOGRAPHY = 'Couple Photos',
  FAMILY_PHOTOGRAPHY = 'Family Photos',
  COMBINED_FAMILY_PHOTOGRAPHY = 'Family Photos',
  IMMEDIATE_FAMILY_PHOTOGRAPHY = 'Immediate Family Photos',
  EXTENDED_FAMILY_PHOTOGRAPHY = 'Extended Family Photos',
  WEDDING_PARTY_PHOTOGRAPHY = 'Wedding Party Photos',
  GROOMSMEN_PHOTOGRAPHY = 'Groomsmen Only Photos',
  BRIDESMAID_PHOTOGRAPHY = 'Bridesmaids Only Photos',
  GROOM_IMMEDIATE_FAMILY_PHOTOGRAPHY = 'Groom Immediate Family Photos',
  BRIDE_IMMEDIATE_FAMILY_PHOTOGRAPHY = 'Bride Immediate Family Photos',
  COCKTAIL_HOUR = 'Cocktail Hour',
  RECEPTION_START = 'Reception Starts',
  GRAND_ENTRANCE = 'Grand Entrance',
  FIRST_DANCE = 'First Dance',
  FATHER_DAUGHTER_DANCE = 'Father / Daughter Dance',
  MOTHER_SON_DANCE = 'Mother / Son Dance',
  WELCOME_BLESSING = 'Welcome / Blessing',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SUNSET_PHOTOS = 'Sunset Photos',
  SUNSET = 'Sunset',
  PARENTS_OF_BRIDE_TOASTS = 'Father of Bride Toast',
  MAID_OF_HONOUR_TOASTS = 'Maid of Honor Toast',
  BEST_MAN_TOASTS = 'Best Man Toast',
  CAKE_CUTTING = 'Cake Cutting',
  DANCING = 'Dancing',
  BOUQUET_TOSS = 'Bouquet Toss',
  GARTER_TOSS = 'Garter Toss',
  RECEPTION_END = 'Reception Ends',
  SPARKLE_BUBBLE_EXIT = 'Sparkler / Bubble Exit',
}

export enum ImageAspectRatioTypes {
  PROFILE = 'PROFILE',
  FIANCE_PROFILE = 'FIANCE_PROFILE',
  COVER = 'COVER',
}

export enum COUPLE_TYPES {
  GROOM = 'Groom',
  BRIDE = 'Bride',
}
