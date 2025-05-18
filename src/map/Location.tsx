import { altoLocations } from "./Locations";

export interface AltoLocation {
    name: string;
    state: string;
    address: string;
    lat: number;
    lng: number;
}

interface LocationProps {
    selectedState: string | null;
    onSelect: (location: AltoLocation) => void;
}

export function Location({ selectedState, onSelect }: LocationProps) {
    const grouped = altoLocations.reduce<Record<string, AltoLocation[]>>((acc, loc) => {
        if (!acc[loc.state]) acc[loc.state] = [];
        acc[loc.state].push(loc);
        return acc;
    }, {});

    const filteredStates = selectedState ? [selectedState] : Object.keys(grouped);

    return (
        <div>
            {filteredStates.map((state) => (
                <div key={state} style={{ marginBottom: "1.5rem" }}>
                    <h5
                        onClick={() => onSelect(grouped[state][0])}
                        style={{
                            textTransform: "capitalize",
                            marginBottom: "0.5rem",
                            cursor: "pointer",
                            color: "#0B4A73",
                            fontSize: "1rem",
                        }}
                    >
                        {state}
                    </h5>
                    <ul style={{ listStyle: "none", paddingLeft: 0, margin: 0 }}>
                        {grouped[state].map((loc) => (
                            <li
                                key={loc.name}
                                onClick={() => onSelect(loc)}
                                style={{
                                    fontSize: "0.9rem",
                                    paddingLeft: "0.5rem",
                                    marginBottom: "0.6rem",
                                    cursor: "pointer",
                                }}
                            >
                                <strong>{loc.name}</strong>
                                <br />
                                <small style={{ color: "#555" }}>{loc.address}</small>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
