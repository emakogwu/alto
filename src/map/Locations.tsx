// locations.ts

export interface AltoLocation {
    name: string;
    state: string;
    address: string;
    lat: number;
    lng: number;
}

export const altoLocations: AltoLocation[] = [
    {
        name: "Los Angeles",
        state: "california",
        address: "5916 Bowcroft Street Los Angeles, CA 90016",
        lat: 34.018876,
        lng: -118.376485,
    },
    {
        name: "Irvine",
        state: "california",
        address: "20 Fairbanks Suite 187 Irvine, CA 92618",
        lat: 33.661377,
        lng: -117.706822,
    },
    {
        name: "San Diego",
        state: "california",
        address: "4240 Kearny Mesa Rd, Suite 107 San Diego, CA 92111",
        lat: 32.8216,
        lng: -117.1475,
    },
    {
        name: "Las Vegas",
        state: "nevada",
        address: "600 E Pilot Rd, Suite A Las Vegas, NV 89119",
        lat: 36.0845,
        lng: -115.1521,
    },
    {
        name: "Bellevue",
        state: "washington",
        address: "13010 NE 20th Street, Suite 200 Bellevue, WA 98005",
        lat: 47.6297,
        lng: -122.1661,
    },
    {
        name: "Denver",
        state: "colorado",
        address: "929 Broadway Denver, CO 80203",
        lat: 39.73,
        lng: -104.987,
    },
    {
        name: "New York City",
        state: "new york",
        address: "100 Park Avenue, FRNT E New York City, NY 10017",
        lat: 40.751,
        lng: -73.9787,
    },
    {
        name: "Plainview",
        state: "new york",
        address: "245 Newtown Road, Suite 300 Plainview, NY 11803",
        lat: 40.7856,
        lng: -73.4502,
    },
    {
        name: "Bellaire",
        state: "texas",
        address: "4950 Terminal Street, Suite 200 Bellaire, TX 77401-601",
        lat: 29.7056,
        lng: -95.4603,
    },
    {
        name: "Lewisville",
        state: "texas",
        address: "475 State Hwy 121, Suite 150 Lewisville, TX 75067",
        lat: 32.9923,
        lng: -96.9785,
    },
    {
        name: "Austin",
        state: "texas",
        address: "4175 Freidrich Lane, Suite 202 Austin, TX 78744",
        lat: 30.19,
        lng: -97.748,
    },
].map((loc) => ({
    ...loc,
    state: loc.state.trim().toLowerCase(),
}));
