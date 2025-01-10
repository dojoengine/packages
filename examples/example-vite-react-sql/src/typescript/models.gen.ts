import type { SchemaType as ISchemaType } from "@dojoengine/sdk";

import { CairoOption, CairoOptionVariant, BigNumberish } from "starknet";

type WithFieldOrder<T> = T & { fieldOrder: string[] };

// Type definition for `dojo_starter::models::DirectionsAvailable` struct
export interface DirectionsAvailable {
    player: string;
    directions: Array<Direction>;
}

// Type definition for `dojo_starter::models::DirectionsAvailableValue` struct
export interface DirectionsAvailableValue {
    directions: Array<Direction>;
}

// Type definition for `dojo_starter::models::Moves` struct
export interface Moves {
    player: string;
    remaining: BigNumberish;
    last_direction: CairoOption<Direction>;
    can_move: boolean;
}

// Type definition for `dojo_starter::models::MovesValue` struct
export interface MovesValue {
    remaining: BigNumberish;
    last_direction: CairoOption<Direction>;
    can_move: boolean;
}

// Type definition for `dojo_starter::models::Position` struct
export interface Position {
    player: string;
    vec: Vec2;
}

// Type definition for `dojo_starter::models::PositionValue` struct
export interface PositionValue {
    vec: Vec2;
}

// Type definition for `dojo_starter::models::Vec2` struct
export interface Vec2 {
    x: BigNumberish;
    y: BigNumberish;
}

// Type definition for `dojo_starter::systems::actions::actions::Moved` struct
export interface Moved {
    player: string;
    direction: Direction;
}

// Type definition for `dojo_starter::systems::actions::actions::MovedValue` struct
export interface MovedValue {
    direction: Direction;
}

// Type definition for `dojo_starter::models::Direction` enum
export enum Direction {
    Left,
    Right,
    Up,
    Down,
}
export namespace Direction {
    export function toString(d: Direction): string {
        switch (d) {
            case Direction.Left:
                return "Left";
            case Direction.Right:
                return "Right";
            case Direction.Up:
                return "Up";
            case Direction.Down:
                return "Down";
        }
    }
    export function parse(d: string): Direction {
        switch (d) {
            case "Left":
                return Direction.Left;
            case "Right":
                return Direction.Right;
            case "Up":
                return Direction.Up;
            case "Down":
                return Direction.Down;
            default:
                throw new Error("Unsupported direction");
        }
    }
}

export interface SchemaType extends ISchemaType {
    dojo_starter: {
        DirectionsAvailable: WithFieldOrder<DirectionsAvailable>;
        DirectionsAvailableValue: WithFieldOrder<DirectionsAvailableValue>;
        Moves: WithFieldOrder<Moves>;
        MovesValue: WithFieldOrder<MovesValue>;
        Position: WithFieldOrder<Position>;
        PositionValue: WithFieldOrder<PositionValue>;
        Vec2: WithFieldOrder<Vec2>;
        Moved: WithFieldOrder<Moved>;
        MovedValue: WithFieldOrder<MovedValue>;
    };
}
export const schema: SchemaType = {
    dojo_starter: {
        DirectionsAvailable: {
            fieldOrder: ["player", "directions"],
            player: "",
            directions: [Direction.Left],
        },
        DirectionsAvailableValue: {
            fieldOrder: ["directions"],
            directions: [Direction.Left],
        },
        Moves: {
            fieldOrder: ["player", "remaining", "last_direction", "can_move"],
            player: "",
            remaining: 0,
            last_direction: new CairoOption(CairoOptionVariant.None),
            can_move: false,
        },
        MovesValue: {
            fieldOrder: ["remaining", "last_direction", "can_move"],
            remaining: 0,
            last_direction: new CairoOption(CairoOptionVariant.None),
            can_move: false,
        },
        Position: {
            fieldOrder: ["player", "vec"],
            player: "",
            vec: { x: 0, y: 0 },
        },
        PositionValue: {
            fieldOrder: ["vec"],
            vec: { x: 0, y: 0 },
        },
        Vec2: {
            fieldOrder: ["x", "y"],
            x: 0,
            y: 0,
        },
        Moved: {
            fieldOrder: ["player", "direction"],
            player: "",
            direction: Direction.Left,
        },
        MovedValue: {
            fieldOrder: ["direction"],
            direction: Direction.Left,
        },
    },
};
export enum ModelsMapping {
    Direction = "dojo_starter-Direction",
    DirectionsAvailable = "dojo_starter-DirectionsAvailable",
    DirectionsAvailableValue = "dojo_starter-DirectionsAvailableValue",
    Moves = "dojo_starter-Moves",
    MovesValue = "dojo_starter-MovesValue",
    Position = "dojo_starter-Position",
    PositionValue = "dojo_starter-PositionValue",
    Vec2 = "dojo_starter-Vec2",
    Moved = "dojo_starter-Moved",
    MovedValue = "dojo_starter-MovedValue",
}