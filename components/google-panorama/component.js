(() => { 

const currentDocument = document.currentScript.ownerDocument;

class GooglePanorama extends HTMLElement {
	createdCallback() {
		const shadowRoot = this.attachShadow({
			mode: 'open'
		});
		const template = currentDocument.querySelector('template');
		const instance = template.content.cloneNode(true);
		shadowRoot.appendChild(instance);

		this.load();
	}

	load() {
		const panorama = this.shadowRoot.querySelector('.google-panorama');

		this.panorama = new google.maps.StreetViewPanorama(panorama, {
			pano: this.getAttribute('title'),
			visible: true,
			scrollwheel: false,
			panoProvider: this.panoramaSettings.bind(this)
		});
	}

	panoramaSettings() {
		return {
			location: {
				pano: this.getAttribute('title'),
				description: this.getAttribute('description')
			},
			tiles: {
				tileSize: new google.maps.Size(5376, 2688),
				worldSize: new google.maps.Size(5376, 2688),
				centerHeading: 105,
				getTileUrl: () => this.getAttribute('src')
			}
		};
	}

	attributeChangedCallback(attrName, oldVal, newVal) {
		if (attrName === "src") this.load();
	}
}

document.registerElement('google-panorama', GooglePanorama);

})();