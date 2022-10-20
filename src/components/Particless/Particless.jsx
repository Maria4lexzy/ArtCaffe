// import "./styles.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './Particless.scss'
const Particless = () => {
	const particlesInit = async (main) => {
		console.log(main);

		// you can initialize the tsParticles instance (main) here, adding custom shapes or presets
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		await loadFull(main);
	};

	return (


		<Particles
			id="tsparticles"
			init={particlesInit}

			options={{
				enable: false,
				fullScreen: {
					enable: true
				},
				"particles": {
					"number": {
						"value": 60,
						"density": {
							"enable": true,
							"value_area": 800
						}
					},
					"color": {
						"value": "#f15b25"
					},
					"shape": {

						"type": ["circle", "image"],
						"stroke": {
							"width": 0,
							"color": "#000000"
						},
						"polygon": {
							"nb_sides": 5
						},
						"image": {
							src: "/ArtCaffe/static/media/bean.1d1e4b2048cd78bdd3bf48b68acf130c.svg",
							width: 200,
							height: 200
						}
					},
					"opacity": {
						"value": 0.5,
						"random": true,
						"anim": {
							"enable": false,
							"speed": 1,
							"opacity_min": 0.1,
							"sync": false
						}
					},
					"size": {
						"value": 5,
						"random": true,
						"anim": {
							"enable": false,
							"speed": 40,
							"size_min": 0.1,
							"sync": false
						}
					},
					"line_linked": {
						"enable": false,
						"distance": 500,
						"color": "#ffffff",
						"opacity": 0.4,
						"width": 2
					},
					"move": {
						"enable": true,
						"speed": 1,
						"direction": "none",
						"random": true,
						"straight": false,
						"out_mode": "out",
						"bounce": false,
						"attract": {
							"enable": false,
							"rotateX": 600,
							"rotateY": 1200
						}
					}
				},
				"interactivity": {
					"detect_on": "window",

					"events": {
						"onhover": {
							"enable": false,
							"mode": "bubble"
						},
						"onclick": {
							"enable": true,
							"mode": "repulse"
						},
						"resize": true
					},
					"modes": {
						"grab": {
							"distance": 400,
							"line_linked": {
								"opacity": 0.5
							}
						},
						"bubble": {
							"distance": 400,
							"size": 4,
							"duration": 0.3,
							"opacity": 1,
							"speed": 3
						},
						"repulse": {
							"distance": 259.6875634002842,
							"duration": 0.4
						},
						"push": {
							"particles_nb": 4
						},
						"remove": {
							"particles_nb": 2
						}
					}
				},
				"retina_detect": false
			}}
		/>

	);
}
export default Particless