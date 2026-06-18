export type Profile = {
  id: string
  name: string
  age: number
  location: string
  bio: string
  interests: string[]
  whatsapp: string
  photos: string[]
}

export const profiles: Profile[] = [
  {
    id: "maya",
    name: "Maya",
    age: 26,
    location: "Brooklyn, NY",
    bio: "Sunday hikes, terrible puns, and an unhealthy love for oat-milk lattes. Looking for someone who can keep up with my playlist.",
    interests: ["Hiking", "Coffee", "Vinyl", "Travel"],
    whatsapp: "+1 555 010 2026",
    photos: ["/profiles/maya.png", "/profiles/maya-2.png", "/profiles/maya-3.png"],
  },
  {
    id: "liam",
    name: "Liam",
    age: 29,
    location: "Austin, TX",
    bio: "Part-time guitarist, full-time taco enthusiast. I'll lose to you at chess and pretend I let you win.",
    interests: ["Music", "Cooking", "Tacos", "Chess"],
    whatsapp: "+1 555 010 4471",
    photos: ["/profiles/liam.png", "/profiles/liam-2.png"],
  },
  {
    id: "sofia",
    name: "Sofia",
    age: 24,
    location: "Miami, FL",
    bio: "Rooftop sunsets and spontaneous road trips. Tell me your favorite book and I'll tell you mine.",
    interests: ["Reading", "Sunsets", "Dancing", "Art"],
    whatsapp: "+1 555 010 8852",
    photos: ["/profiles/sofia.png", "/profiles/sofia-2.png", "/profiles/sofia-3.png"],
  },
  {
    id: "noah",
    name: "Noah",
    age: 31,
    location: "San Diego, CA",
    bio: "Beach mornings, ocean swims, and a dog named Biscuit who runs my life. Surf lessons available on request.",
    interests: ["Surfing", "Dogs", "Fitness", "Photography"],
    whatsapp: "+1 555 010 3390",
    photos: ["/profiles/noah.png", "/profiles/noah-2.png"],
  },
  {
    id: "aria",
    name: "Aria",
    age: 27,
    location: "Portland, OR",
    bio: "Cozy sweaters, autumn walks, and a candle for every mood. I make a mean pumpkin loaf and questionable decisions.",
    interests: ["Baking", "Candles", "Films", "Cats"],
    whatsapp: "+1 555 010 7714",
    photos: ["/profiles/aria.png", "/profiles/aria-2.png"],
  },
]
