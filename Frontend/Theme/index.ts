import { Theme } from "react-native-paper";

type ThemeColors = Theme['colors']

export const dark_purple_theme_colors: ThemeColors = {
    primary: '#c900ff',
    background: '#000000',
    surface: '#8900ae',
    accent: '#5d0076',
    error: '#330040',
    text: '#FFFFFF',  // This is a placeholder; you might want to choose a suitable light color for text
    onSurface: '#FFFFFF',  // This is a placeholder; you might want to choose a suitable light color for text on surface
    disabled: '#888',
    placeholder: '#666666',
    backdrop: '#000000',  // Matching the background color
    notification: '#c900ff'
}

export const earth_tones_theme_colors: ThemeColors = {
    primary: '#605553',
    background: '#272323',
    surface: '#332f2f',
    accent: 'green',
    error: '#222121',
    text: '#FFFFFF',
    onSurface: '#FFFFFF',
    disabled: '#444141',
    placeholder: '#555151',
    backdrop: '#272323',
    notification: '#999595',
};

export const ocean_breeze_theme_colors: ThemeColors = {
    primary: '#4285F4',          // Blue
    background: '#E0F7FA',       // Light Cyan
    surface: '#B3E0E6',          // Powder Blue
    accent: '#039BE5',           // Light Blue
    error: '#FF5252',            // Red
    text: '#37474F',             // Dark Blue Grey
    onSurface: '#37474F',        // Dark Blue Grey
    disabled: '#B0BEC5',         // Blue Grey
    placeholder: '#90A4AE',      // Blue Grey
    backdrop: '#E0F7FA',         // Light Cyan
    notification: '#FFD54F',     // Amber
};

export const seren_frost_theme_colors = {
    primary: '#2196F3',           // Blue
    background: '#FFFFFF',        // White
    surface: '#F5F5F5',           // Light Grey
    accent: '#FF4081',            // Pink
    error: '#FF5252',             // Red
    text: '#333333',              // Dark Grey
    onSurface: '#333333',         // Dark Grey
    disabled: '#B0BEC5',          // Blue Grey
    placeholder: '#90A4AE',       // Blue Grey
    backdrop: '#F0F0F0',          // Light Grey
    notification: '#FFD54F'       // Amber
};

export const cool_sunshine_theme_colors = {
    primary: '#F2B418',        // Sunshine
    background: '#272838',     // Blackjack
    surface: '#AFCBD5',         // Fresh Blue
    accent: '#ECF8FD',          // Powder Blue
    error: '#605553',           // Primary color from the previous set
    text: '#FFFFFF',            // White for better readability on dark backgrounds
    onSurface: '#FFFFFF',       // White for good contrast on the surface
    disabled: '#444141',        // A desaturated version of the surface color
    placeholder: '#555151',     // A lighter shade of the surface color
    backdrop: '#272323',        // Matching the background color
    notification: '#999595'     // A contrasting color for notifications
  };
