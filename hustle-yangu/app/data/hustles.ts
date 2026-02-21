export interface Review {
    id: string;
    user: string;
    comment: string;
    rating: number; // 1-5
    timestamp: number;
}

export interface Hustle {
    id: string;
    name: string;
    cost: number;
    risk: number;
    profit: number;
    description: string;
    category?: "Grind" | "Gamble" | "Unique";
    challenges?: string[];
    vibe?: string;
    reviews?: Review[];
    isAi?: boolean; // Tag to identify AI generated content
}

// 1. Central Registry of all possible hustles (Base Stats)
const HUSTLE_REGISTRY: Record<string, Hustle> = {
    mtumba: {
        id: 'mtumba',
        name: 'Kununua Mtumba',
        cost: 5000,
        risk: 15,
        profit: 800,
        description: "Flip second-hand clothes."
    },
    samosa: {
        id: 'samosa',
        name: 'Kuuza Samosa',
        cost: 2000,
        risk: 5,
        profit: 300,
        description: "Morning roadside biting."
    },
    water: {
        id: 'water',
        name: 'Kuuza Maji',
        cost: 1000,
        risk: 2,
        profit: 200, // Base profit, higher in dry areas
        description: "Essential life saving commodity."
    },
    watermelon: {
        id: 'watermelon',
        name: 'Kuuza Watermelon',
        cost: 3000,
        risk: 8,
        profit: 600,
        description: "Sweet red slices on a hot day."
    },
    icepop: {
        id: 'icepop',
        name: 'Selling Ice-Pop',
        cost: 500,
        risk: 2,
        profit: 300,
        description: "For the school kids and heat."
    },
    pineapples: {
        id: 'pineapples',
        name: 'Kuuza Pineapples',
        cost: 2500,
        risk: 5,
        profit: 500,
        description: "Fresh juicy pineapples."
    },
    omena: {
        id: 'omena',
        name: 'Kuuza Omena',
        cost: 1500,
        risk: 5,
        profit: 400,
        description: "Iron-rich delicacy usually fried."
    },
    matatu: {
        id: 'matatu',
        name: 'Matatu Driver',
        cost: 50000,
        risk: 40,
        profit: 5000,
        description: "High risk high reward transport."
    },
    mnazi: {
        id: 'mnazi',
        name: 'Kuuza Mnazi',
        cost: 1500,
        risk: 10,
        profit: 400,
        description: "Refreshing palm wine."
    },
    tuk_tuk: {
        id: 'tuk-tuk',
        name: 'Tuk-Tuk Rider',
        cost: 30000,
        risk: 20,
        profit: 2500,
        description: "Weaving through traffic."
    },
    samaki: {
        id: 'samaki',
        name: 'Kuuza Samaki',
        cost: 3000,
        risk: 10,
        profit: 600,
        description: "Fresh fish from the source."
    },
    flamingo: {
        id: 'flamingo',
        name: 'Tour Guide',
        cost: 0,
        risk: 5,
        profit: 1000,
        description: "Showing tourists the sights."
    },
    farming: {
        id: 'farming',
        name: 'General Farming',
        cost: 3000,
        risk: 10,
        profit: 1000,
        description: "Small scale farming."
    },
    bananas: {
        id: 'bananas',
        name: 'Kuuza Ndizi',
        cost: 1000,
        risk: 5,
        profit: 400,
        description: "Fresh bananas."
    },
    coffee: {
        id: 'coffee',
        name: 'Coffee Farming',
        cost: 8000,
        risk: 15,
        profit: 4000,
        description: "Cash crop farming."
    },
    dairy: {
        id: 'dairy',
        name: 'Dairy Farming',
        cost: 10000,
        risk: 8,
        profit: 1500,
        description: "Selling fresh milk."
    },
    khat: {
        id: 'khat',
        name: 'Kuuza Miraa',
        cost: 2000,
        risk: 15,
        profit: 2500,
        description: "Trading green gold."
    }
};

// 2. Helper to generate a hustle with modifiers
// SAFE GETTER: Does not throw if ID missing in modifiers, but throws if Base ID is bad.
const getHustle = (id: string, modifiers?: Partial<Hustle>): Hustle => {
    const base = HUSTLE_REGISTRY[id];
    if (!base) {
        console.error(`Hustle Registry Missing: ${id}`);
        // Fallback to avoid crash
        return {
            id: id,
            name: `Unknown Hustle (${id})`,
            cost: 0,
            risk: 0,
            profit: 0,
            description: "Data missing."
        };
    }
    return { ...base, ...modifiers };
};

// 3. Define Availability per Region (Specific overrides)
const REGION_SPECIFIC_HUSTLES: Record<string, Hustle[]> = {
    nairobi: [
        getHustle('mtumba', { risk: 25, description: "Gikomba fires and City council raids." }), // Higher risk
        getHustle('matatu', { description: "Waiyaki Way madness." }),
        getHustle('samosa'),
        getHustle('icepop'),
        getHustle('watermelon')
    ],
    kiambu: [
        getHustle('mtumba'), // Standard risk
        getHustle('samosa'),
        getHustle('pineapples', { profit: 700, description: "Fresh from Thika farms." }),
        getHustle('matatu', { risk: 30 }),
        getHustle('dairy')
    ],
    machakos: [
        getHustle('water', { profit: 500, description: "Water is gold here. High demand!" }), // High profit
        getHustle('mtumba'),
        getHustle('watermelon', { profit: 800, description: "Grows well in the heat." }),
        getHustle('icepop')
    ],
    makueni: [
        getHustle('water', { profit: 600, risk: 0, description: "Critical supply. Everyone buys." }),
        getHustle('mtumba'),
        getHustle('omena', { profit: 500, description: "Market day favorite." })
    ],
    mombasa: [
        getHustle('mnazi'),
        getHustle('tuk_tuk'),
        getHustle('water', { profit: 400, description: "Hot coastal sun makes people thirsty." }),
        getHustle('samaki', { id: 'pweza', name: 'Kuuza Pweza', profit: 700 }), // Custom variant
        getHustle('mtumba', { risk: 10 }) // Lower risk
    ],
    kisumu: [
        getHustle('samaki'),
        getHustle('omena'),
        getHustle('mtumba'),
        getHustle('matatu')
    ],
    nakuru: [
        getHustle('flamingo'),
        getHustle('samosa'),
        getHustle('mtumba'),
        getHustle('farming', { name: 'Potato Farming', description: "Njoro potato harvest." })
    ],
    embu: [
        getHustle('bananas'),
        getHustle('mtumba'),
        getHustle('samosa'),
        getHustle('coffee')
    ],
    meru: [
        getHustle('khat'),
        getHustle('mtumba'),
        getHustle('matatu', { name: 'Miraa Probox', risk: 80, profit: 10000, description: "Flying at Mach 2." })
    ],
    nyeri: [
        getHustle('coffee'),
        getHustle('dairy'),
        getHustle('mtumba')
    ]
};

// 4. Fallback for any county not explicitly defined
const DEFAULT_HUSTLES = [
    getHustle('mtumba'),
    getHustle('samosa'),
    getHustle('farming'),
    getHustle('water')
];

// 5. Export Proxy to handle access to any county ID safely
export const HUSTLES = new Proxy(REGION_SPECIFIC_HUSTLES, {
    get: (target, prop: string) => {
        if (prop in target) {
            return target[prop];
        }
        // If the county ID exists but has no specific hustles defined, return default
        return DEFAULT_HUSTLES;
    }
});
