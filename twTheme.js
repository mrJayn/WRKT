const spacing = { px: '1px' };
const spaces = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96];
spaces.forEach((n) => {
	spacing[n] = n * 4 + 'px';
});

module.exports = {
	twTheme: {
		spacing: spacing,
		fontFamily: {
			montserrat: ['Montserrat', 'sans-serif'],
			inconsolata: ['Inconsolata', 'monospace'],
			raleway: ['Raleway', 'sans-serif'],
			robotoMono: ['Roboto Mono', 'monospace'],
			//Merriweather
		},
		letterSpacing: {
			normal: '0px',
			md: '0.5px',
			lg: '1px',
			xl: '1.5px',
			'2xl': '2px',
			'3xl': '2.5px',
			'4xl': '3px',
		},
		zIndex: {
			0: '0',
			1: '1',
			2: '2',
			3: '3',
			4: '4',
			5: '5',
		},
		// data: { eg...  active: 'active~="true"' , inactive: 'active~="false"' },
		extend: {
			backgroundImage: {
				tempered: `linear-gradient(180deg,
                    rgb(0 0 0 / 0.8) 0%,
                    rgb(0 0 0 / 0.7) 10%,
                    rgb(0 0 0 / 0.65) 15%,
                    rgb(0 0 0 / 0.5) 30%,
                    rgb(0 0 0 / 0.45) 35%,
                    rgb(0 0 0 / 0.4) 40%,
                    rgb(0 0 0 / 0.35) 47.5%,
                    rgb(0 0 0 / 0.3) 52.5%,
                    rgb(0 0 0 / 0.2) 60%,
                    rgb(0 0 0 / 0.1) 70%,
                    rgb(0 0 0 / 0.05) 77.5%,
                    transparent 85%,
                    transparent 100%
                )`,
			},
		},
	},
};
