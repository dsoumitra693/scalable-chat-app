import { Theme } from "react-native-paper";

export type ThemeColors = Theme['colors']
interface IThemes {
    [key: string]: ThemeColors;
}

const cosmic_elegance_theme_colors = {
    primary: '#40536F',        // Deep Blue
    background: '#101421',     // Midnight Navy
    surface: '#1E2741',        // Dark Indigo
    accent: '#7F5A83',         // Elegant Purple
    error: '#C23B22',          // Fiery Red
    text: '#FFFFFF',           // White
    onSurface: '#FFFFFF',      // White
    disabled: '#596373',       // Slate Gray
    placeholder: '#8C94A1',    // Silver
    backdrop: '#05060F',       // Dark Space
    notification: '#FFCC00'    // Solar Yellow
};

const mystic_meadow_theme_colors = {
    primary: '#4E7155',
    background: '#F4EAE1',
    surface: '#D9BFAD',
    accent: '#A18276',
    error: '#9B1B30',
    text: '#1F2937',
    onSurface: '#1F2937',
    disabled: '#B5B5B5',
    placeholder: '#8D8D8D',
    backdrop: '#E4DED0',
    notification: '#FFD700'
};

const ocean_breeze_theme_colors = {
    primary: '#007EA7',
    background: '#E6F1F5',
    surface: '#C5DDE8',
    accent: '#00A8E8',
    error: '#FF4747',
    text: '#343A40',
    onSurface: '#343A40',
    disabled: '#9FAFB9',
    placeholder: '#CED4DA',
    backdrop: '#0A192F',
    notification: '#14FFEC'
};

const royal_velvet_theme_colors = {
    primary: '#603F83',
    background: '#F4F1F4',
    surface: '#E2DCE2',
    accent: '#985AA6',
    error: '#E63946',
    text: '#2D2926',
    onSurface: '#2D2926',
    disabled: '#AFA9AA',
    placeholder: '#C5C3C6',
    backdrop: '#18171A',
    notification: '#FFD700'
};

const material_design_theme_colors = {
    primary: '#2196F3',        // Material Blue
    background: '#FFFFFF',      // White
    surface: '#F5F5F5',         // Light Gray
    accent: '#FF4081',          // Material Pink
    error: '#F44336',           // Material Red
    text: '#212121',            // Dark Gray
    onSurface: '#000000',       // Black
    disabled: '#BDBDBD',        // Silver Gray
    placeholder: '#757575',     // Medium Gray
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent Black
    notification: '#4CAF50'     // Material Green
};

const aurora_borealis_theme_colors = {
    primary: '#009688',        // Teal
    background: '#FFFFFF',     // White
    surface: '#E0F2F1',        // Mint Cream
    accent: '#FFC107',         // Amber
    error: '#FF3D00',          // Deep Orange
    text: '#263238',           // Dark Blue Gray
    onSurface: '#263238',      // Dark Blue Gray
    disabled: '#B0BEC5',       // Steel Blue
    placeholder: '#78909C',    // Blue Gray
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent Black
    notification: '#4CAF50'    // Green
};

const silk_road_theme_colors = {
    primary: '#8C7C67',        // Taupe
    background: '#F4F2ED',     // Light Goldenrod
    surface: '#D0C8B6',        // Tan
    accent: '#AA8C6A',         // Saddle Brown
    error: '#B03A2E',          // Rust Red
    text: '#3C3C3C',           // Dim Gray
    onSurface: '#3C3C3C',      // Dim Gray
    disabled: '#A7A29E',       // Dusty Gray
    placeholder: '#726E6D',    // Gray Taupe
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent Black
    notification: '#4CAF50'    // Green
};
const midnight_jazz_theme_colors = {
    primary: '#2C2C54',        // Dark Indigo
    background: '#353B48',     // Gunmetal
    surface: '#474787',        // Medium Purple
    accent: '#706FD3',         // Slate Blue
    error: '#EA2027',          // Red Ribbon
    text: '#D2D7DF',           // Ghost White
    onSurface: '#D2D7DF',      // Ghost White
    disabled: '#B2BABB',       // Silver Sand
    placeholder: '#808B96',    // Driftwood
    backdrop: 'rgba(0, 0, 0, 0.5)', // Semi-transparent Black
    notification: '#FFC312'    // Goldenrod
};



export const themes: IThemes[] = [
    {
        "Material Design": material_design_theme_colors
    },
    { "Cosmic Elegance": cosmic_elegance_theme_colors },
    { "Mystic Meadow": mystic_meadow_theme_colors },
    {
        "Ocean Breeze": ocean_breeze_theme_colors
    },
    {
        "Royal Velvet": royal_velvet_theme_colors
    },
    {
        "Aurora Borealis": aurora_borealis_theme_colors
    },
    {
        "Silk Road": silk_road_theme_colors
    },
    {
        "Midnight Jazz": midnight_jazz_theme_colors
    }
];

export function getThemeColors(themeName?: string): ThemeColors {
    const defaultTheme = themes[0]['Material Design']

    const foundTheme = themes.find(t => Object.keys(t)[0] === themeName);
    return foundTheme ? foundTheme[themeName] : defaultTheme;
}

export const themesName = themes.map(t => Object.keys(t)[0])