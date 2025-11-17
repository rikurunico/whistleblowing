import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const whistleblowTheme: CustomThemeConfig = {
	name: 'whistleblow-theme',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': 'Inter, system-ui, sans-serif',
		'--theme-font-family-heading': 'Inter, system-ui, sans-serif',
		'--theme-font-color-base': '0 0 0',
		'--theme-font-color-dark': '255 255 255',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '12px',
		'--theme-border-base': '1px',
		// =~= Theme On-X Colors =~=
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '0 0 0',
		// =~= Theme Colors =~=
		// primary | #2563eb
		'--color-primary-50': '222 232 252', // #dee8fc
		'--color-primary-100': '211 224 251', // #d3e0fb
		'--color-primary-200': '200 216 250', // #c8d8fa
		'--color-primary-300': '167 193 247', // #a7c1f7
		'--color-primary-400': '102 146 241', // #6692f1
		'--color-primary-500': '37 99 235', // #2563eb
		'--color-primary-600': '33 89 212', // #2159d4
		'--color-primary-700': '28 74 176', // #1c4ab0
		'--color-primary-800': '22 59 141', // #163b8d
		'--color-primary-900': '18 49 115', // #123173
		// secondary | #64748b
		'--color-secondary-50': '232 234 238', // #e8eaee
		'--color-secondary-100': '224 227 232', // #e0e3e8
		'--color-secondary-200': '216 220 226', // #d8dce2
		'--color-secondary-300': '193 199 209', // #c1c7d1
		'--color-secondary-400': '146 157 175', // #929daf
		'--color-secondary-500': '100 116 139', // #64748b
		'--color-secondary-600': '90 104 125', // #5a687d
		'--color-secondary-700': '75 87 104', // #4b5768
		'--color-secondary-800': '60 70 83', // #3c4653
		'--color-secondary-900': '49 57 68', // #313944
		// tertiary | #0EA5E9
		'--color-tertiary-50': '219 242 252', // #dbf2fc
		'--color-tertiary-100': '207 237 251', // #cfedfb
		'--color-tertiary-200': '195 233 250', // #c3e9fa
		'--color-tertiary-300': '158 219 246', // #9edbf6
		'--color-tertiary-400': '86 192 240', // #56c0f0
		'--color-tertiary-500': '14 165 233', // #0EA5E9
		'--color-tertiary-600': '13 149 210', // #0d95d2
		'--color-tertiary-700': '11 124 175', // #0b7caf
		'--color-tertiary-800': '8 99 140', // #08638c
		'--color-tertiary-900': '7 81 114', // #075172
		// success | #10b981
		'--color-success-50': '219 245 236', // #dbf5ec
		'--color-success-100': '207 241 230', // #cff1e6
		'--color-success-200': '195 238 224', // #c3eee0
		'--color-success-300': '159 227 205', // #9fe3cd
		'--color-success-400': '88 207 168', // #58cfa8
		'--color-success-500': '16 185 129', // #10b981
		'--color-success-600': '14 167 116', // #0ea774
		'--color-success-700': '12 139 97', // #0c8b61
		'--color-success-800': '10 111 77', // #0a6f4d
		'--color-success-900': '8 91 63', // #085b3f
		// warning | #f59e0b
		'--color-warning-50': '254 240 218', // #fef0da
		'--color-warning-100': '253 236 206', // #fdecce
		'--color-warning-200': '253 231 194', // #fde7c2
		'--color-warning-300': '251 216 157', // #fbd89d
		'--color-warning-400': '248 187 84', // #f8bb54
		'--color-warning-500': '245 158 11', // #f59e0b
		'--color-warning-600': '221 142 10', // #dd8e0a
		'--color-warning-700': '184 119 8', // #b87708
		'--color-warning-800': '147 95 7', // #935f07
		'--color-warning-900': '120 77 5', // #784d05
		// error | #ef4444
		'--color-error-50': '253 227 227', // #fde3e3
		'--color-error-100': '252 218 218', // #fcdada
		'--color-error-200': '251 208 208', // #fbd0d0
		'--color-error-300': '249 180 180', // #f9b4b4
		'--color-error-400': '244 124 124', // #f47c7c
		'--color-error-500': '239 68 68', // #ef4444
		'--color-error-600': '215 61 61', // #d73d3d
		'--color-error-700': '179 51 51', // #b33333
		'--color-error-800': '143 41 41', // #8f2929
		'--color-error-900': '117 33 33', // #752121
		// surface | #f8fafc
		'--color-surface-50': '254 254 255', // #fefeff
		'--color-surface-100': '254 254 254', // #fefefe
		'--color-surface-200': '253 254 254', // #fdfefe
		'--color-surface-300': '252 253 254', // #fcfdfe
		'--color-surface-400': '250 252 253', // #fafcfd
		'--color-surface-500': '248 250 252', // #f8fafc
		'--color-surface-600': '223 225 227', // #dfe1e3
		'--color-surface-700': '186 188 189', // #babc bd
		'--color-surface-800': '149 150 151', // #959697
		'--color-surface-900': '122 123 123' // #7a7b7b
	}
};
