import { writeFileSync } from 'fs';

const randomId = Math.floor(Math.random() * 1000);

const users = Array.from({length: 10}, (_, i) => ({
    id: i + 1,
    name: `Artist ${i + 1}`,
    email: `artist${i + 1}@example.com`,
    password: `pass${i + 1}`,
    role: "artist",
    description: "I love painting and sketching.",
    image: `https://source.unsplash.com/500x500?portrait,artist&sig=${randomId}`
  }));

  writeFileSync("./db.json", JSON.stringify({users}, null, 2))