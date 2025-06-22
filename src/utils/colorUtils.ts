export const COLOR_SCHEMES = [
  'rose', 'pink', 'fuchsia', 'purple', 'violet', 'indigo', 'blue', 'sky', 'cyan', 
  'teal', 'emerald', 'green', 'lime', 'yellow', 'amber', 'orange', 'red', 'gray'
] as const;

export type ColorScheme = typeof COLOR_SCHEMES[number];

interface SchemeStyles {
  bg: string;
  text: string;
  shadow: string;
}

export const colorSchemeStyles: Record<ColorScheme, SchemeStyles> = {
    rose:    { bg: 'bg-rose-100',   text: 'text-rose-800',   shadow: 'shadow-rose-300/50'   },
    pink:    { bg: 'bg-pink-100',   text: 'text-pink-800',   shadow: 'shadow-pink-300/50'   },
    fuchsia: { bg: 'bg-fuchsia-100',text: 'text-fuchsia-800',shadow: 'shadow-fuchsia-300/50'},
    purple:  { bg: 'bg-purple-100', text: 'text-purple-800', shadow: 'shadow-purple-300/50'},
    violet:  { bg: 'bg-violet-100', text: 'text-violet-800', shadow: 'shadow-violet-300/50'},
    indigo:  { bg: 'bg-indigo-100', text: 'text-indigo-800', shadow: 'shadow-indigo-300/50'},
    blue:    { bg: 'bg-blue-100',   text: 'text-blue-800',   shadow: 'shadow-blue-300/50'   },
    sky:     { bg: 'bg-sky-100',    text: 'text-sky-800',    shadow: 'shadow-sky-300/50'    },
    cyan:    { bg: 'bg-cyan-100',   text: 'text-cyan-800',   shadow: 'shadow-cyan-300/50'   },
    teal:    { bg: 'bg-teal-100',   text: 'text-teal-800',   shadow: 'shadow-teal-300/50'   },
    emerald: { bg: 'bg-emerald-100',text: 'text-emerald-800',shadow: 'shadow-emerald-300/50'},
    green:   { bg: 'bg-green-100',  text: 'text-green-800',  shadow: 'shadow-green-300/50'  },
    lime:    { bg: 'bg-lime-100',   text: 'text-lime-800',   shadow: 'shadow-lime-300/50'   },
    yellow:  { bg: 'bg-yellow-100', text: 'text-yellow-800', shadow: 'shadow-yellow-300/50'},
    amber:   { bg: 'bg-amber-100',  text: 'text-amber-800',  shadow: 'shadow-amber-300/50'  },
    orange:  { bg: 'bg-orange-100', text: 'text-orange-800', shadow: 'shadow-orange-300/50'},
    red:     { bg: 'bg-red-100',    text: 'text-red-800',    shadow: 'shadow-red-300/50'    },
    gray:    { bg: 'bg-gray-100',   text: 'text-gray-800',   shadow: 'shadow-gray-300/50'   },
}; 