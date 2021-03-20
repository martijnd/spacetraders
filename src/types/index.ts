export interface User {
    username: string;
    credits: number;
    ships: Ship[];
    loans: Loan[];
}

export interface Loan {
    id: string;
    due: Date;
    repaymentAmount: number;
    status: string;
    type: string;
}

export interface Cargo {
    good: string;
    quantity: number;
    totalVolume: number;
}

export interface Ship {
    id: string;
    flightPlanId?: string;
    location: string;
    x: number;
    y: number;
    cargo: Cargo[];
    spaceAvailable: number;
    type: string;
    class: string;
    maxCargo: number;
    speed: number;
    manufacturer: string;
    plating: number;
    weapons: number;
}

export interface System {
    symbol: string;
    name: string;
    locations: Location[];
}

export interface FlightPlan {
    id: string;
    shipId: string;
    createdAt: Date;
    arrivesAt: Date;
    from: string;
    to: string;
    username: string;
    shipType: string;
}