import { type Product } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Arsenal Home jersey(Özil)",
    description: " A true legend in red and white, engineered for peak performance and style. Wear the crest of champions.",
    price: 250,
    images: [
      "/images/arsenal-ozil.png",
      "/images/arsenal-ozil2.png"
    ],
    category: "Club",
    features: ["Breathable Fabric", "Authentic Fit"],
    dataAiHint: "football jersey"
  },
  {
    id: "2",
    name: "White Striped FIGC Italia Away Shirt",
    description: "The iconic Pirlo 21 Italy Jersey – where elegance meets legacy.",
    price: 250,
    images: ["/images/pirlo.png",
             /images/pirlo2.png
            ],
    category: "Retro",
    features: ["Moisture-wicking AEROREADY", "Made with Recycled Materials"],
    dataAiHint: "soccer uniform"
  },
  {
    id: "3",
    name: "AC Milan 06/07 Retro Home",
    description: "Relive the glory days of the Rossoneri with this classic retro jersey. A tribute to the legends of the San Siro.",
    price: 1200,
    images: ["https://placehold.co/600x600.png"],
    category: "Retro",
    features: ["Embroidered Badge", "Classic Collar Design", "100% Polyester"],
    dataAiHint: "retro jersey"
  },
  {
    id: "4",
    name: "Manchester United Away Kit 24/25",
    description: "The bold new away kit for the Red Devils. Stand out from the crowd and show your support on the road.",
    price: 1800,
    images: ["https://placehold.co/600x600.png"],
    category: "Club",
    features: ["Official Licensed Product", "Ribbed Crewneck", "Vibrant Colors"],
    dataAiHint: "football jersey"
  },
  {
    id: "5",
    name: "Brazil 1998 World Cup Jersey",
    description: "A timeless classic worn by Ronaldo and the Seleção legends. The iconic yellow and green, a symbol of Joga Bonito.",
    price: 1300,
    images: ["https://placehold.co/600x600.png"],
    category: "Retro",
    features: ["Vintage Design", "Comfortable Fit", "Iconic Colors"],
    dataAiHint: "retro jersey"
  },
  {
    id: "6",
    name: "Liverpool FC 24/25 Home Kit",
    description: "You'll Never Walk Alone in this classic Liverpool red home kit. Engineered for the Anfield faithful.",
    price: 1750,
    images: ["https://placehold.co/600x600.png"],
    category: "Club",
    features: ["Dri-FIT Technology", "Standard fit for a relaxed feel", "Signature team details"],
    dataAiHint: "soccer uniform"
  },
  {
    id: "7",
    name: "Germany 2024 Away Jersey",
    description: "A modern, stylish away jersey for Die Mannschaft. Combining tradition with a fresh look for the new era.",
    price: 1400,
    images: ["https://placehold.co/600x600.png"],
    category: "National",
    features: ["Heat-applied crest", "Mesh inserts for ventilation", "Slim Fit"],
    dataAiHint: "football jersey"
  },
  {
    id: "8",
    name: "Barcelona 2010 Home Jersey",
    description: "Celebrate the era of tiki-taka with this legendary Barça home jersey. The colors of a team that changed football.",
    price: 1250,
    images: ["https://placehold.co/600x600.png"],
    category: "Retro",
    features: ["Authentic club details", "Breathable fabric", "Classic Blaugrana stripes"],
    dataAiHint: "retro jersey"
  },
];
