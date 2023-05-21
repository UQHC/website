export const manifest = {
	appDir: "_app",
	appPath: "_app",
	assets: new Set([".DS_Store","assets/.DS_Store","assets/Oswald/.DS_Store","assets/Oswald/OFL.txt","assets/Oswald/Oswald-VariableFont_wght.ttf","assets/Oswald/README.txt","assets/Oswald/static/Oswald-Bold.ttf","assets/Oswald/static/Oswald-ExtraLight.ttf","assets/Oswald/static/Oswald-Light.ttf","assets/Oswald/static/Oswald-Medium.ttf","assets/Oswald/static/Oswald-Regular.ttf","assets/Oswald/static/Oswald-SemiBold.ttf","assets/Oswald.zip","assets/UtahQualityHeatingCooling_Logo_v4.ai","assets/UtahQualityHeatingCooling_Logo_v4.pdf","assets/_logo exports/.DS_Store","assets/_logo exports/black/.DS_Store","assets/_logo exports/black/jpg/UQHC_Logo_Horizontal_Black@2x.jpg","assets/_logo exports/black/jpg/UQHC_Logo_ImageOnly_Black@2x.jpg","assets/_logo exports/black/jpg/UQHC_Logo_Vertical_Black@2x.jpg","assets/_logo exports/black/png/UQHC_Logo_Horizontal_Black@2x.png","assets/_logo exports/black/png/UQHC_Logo_ImageOnly_Black@2x.png","assets/_logo exports/black/png/UQHC_Logo_Vertical_Black@2x.png","assets/_logo exports/black/svg/UQHC_Logo_Horizontal_Black.svg","assets/_logo exports/black/svg/UQHC_Logo_ImageOnly_Black.svg","assets/_logo exports/black/svg/UQHC_Logo_Vertical_Black.svg","assets/_logo exports/color/.DS_Store","assets/_logo exports/color/UQHC_Logo_ImageOnly_Color.svg","assets/_logo exports/color/UQHC_Logo_ImageOnly_Color@2x.jpg","assets/_logo exports/color/UQHC_Logo_ImageOnly_Color@2x.png","assets/_logo exports/color/dark background/.DS_Store","assets/_logo exports/color/dark background/png/UQHC_Logo_Horizontal_ColorWhite@2x.png","assets/_logo exports/color/dark background/png/UQHC_Logo_Vertical_ColorWhite@2x.png","assets/_logo exports/color/dark background/svg/UQHC_Logo_Horizontal_ColorWhite.svg","assets/_logo exports/color/dark background/svg/UQHC_Logo_Vertical_ColorWhite.svg","assets/_logo exports/color/light background/.DS_Store","assets/_logo exports/color/light background/jpg/UQHC_Logo_Horizontal_ColorBlack@2x.jpg","assets/_logo exports/color/light background/jpg/UQHC_Logo_Vertical_ColorBlack@2x.jpg","assets/_logo exports/color/light background/png/UQHC_Logo_Horizontal_ColorBlack@2x.png","assets/_logo exports/color/light background/png/UQHC_Logo_Vertical_ColorBlack@2x.png","assets/_logo exports/color/light background/svg/UQHC_Logo_Horizontal_ColorBlack.svg","assets/_logo exports/color/light background/svg/UQHC_Logo_Vertical_ColorBlack.svg","assets/_logo exports/white/.DS_Store","assets/_logo exports/white/png/UQHC_Logo_Horizontal_White@2x.png","assets/_logo exports/white/png/UQHC_Logo_ImageOnly_White@2x.png","assets/_logo exports/white/png/UQHC_Logo_Vertical_White@2x.png","assets/_logo exports/white/svg/UQHC_Logo_Horizontal_White.svg","assets/_logo exports/white/svg/UQHC_Logo_ImageOnly_White.svg","assets/_logo exports/white/svg/UQHC_Logo_Vertical_White.svg","assets/_support/Blank_Structured_Baseball_Hats_62c71deb492c4.webp","assets/_support/allec-gomes-gJ8VovObjRA-unsplash.jpg","assets/_support/images.jpeg","assets/_support/ro08swaqbatoyltgkgfz_50f989c3c31d5b1d8623b67a92726880.jpeg","assets/arches.jpg","assets/arches_sky_extended.jpg","assets/arches_sky_extended_wide.jpg","assets/photots/IMG_0163.heic","assets/photots/IMG_5139.heic","assets/photots/IMG_5140.heic","assets/photots/IMG_6287.heic","assets/photots/IMG_6288.heic","assets/photots/IMG_6531.heic","assets/photots/IMG_7100.heic","assets/photots/IMG_7101.heic","assets/photots/IMG_7754.heic","assets/photots/IMG_7755.heic","favicon.png","icons/icons8-automation (1).svg","icons/icons8-automation.svg","icons/icons8-fan (1).svg","icons/icons8-fan.svg","icons/icons8-gears (1).svg","icons/icons8-gears.svg","icons/icons8-services.svg","icons/icons8-temperature.svg","icons/icons8-tools (1).svg","icons/icons8-tools.svg"]),
	mimeTypes: {".txt":"text/plain",".ttf":"font/ttf",".zip":"application/zip",".ai":"application/postscript",".pdf":"application/pdf",".jpg":"image/jpeg",".png":"image/png",".svg":"image/svg+xml",".webp":"image/webp",".jpeg":"image/jpeg",".heic":"image/heic"},
	_: {
		client: {"start":{"file":"_app/immutable/entry/start.7fa16c01.js","imports":["_app/immutable/entry/start.7fa16c01.js","_app/immutable/chunks/index.42ffd0df.js","_app/immutable/chunks/singletons.60f2dc4c.js"],"stylesheets":[],"fonts":[]},"app":{"file":"_app/immutable/entry/app.13adeb4b.js","imports":["_app/immutable/entry/app.13adeb4b.js","_app/immutable/chunks/index.42ffd0df.js"],"stylesheets":[],"fonts":[]}},
		nodes: [
			() => import('./nodes/0.js'),
			() => import('./nodes/1.js'),
			() => import('./nodes/2.js'),
			() => import('./nodes/3.js')
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 2 },
				endpoint: null
			},
			{
				id: "/about",
				pattern: /^\/about\/?$/,
				params: [],
				page: { layouts: [0], errors: [1], leaf: 3 },
				endpoint: null
			},
			{
				id: "/api/random-number",
				pattern: /^\/api\/random-number\/?$/,
				params: [],
				page: null,
				endpoint: () => import('./entries/endpoints/api/random-number/_server.ts.js')
			}
		],
		matchers: async () => {
			
			return {  };
		}
	}
};

export const prerendered = new Set([]);
