const DiscordWebhook = require("discord-webhooks");
const SlackWebhook = require('slack-webhook')

let Notify = {};

Notify.discord = function (webhook_url, url, brand, metadata, type, color) {

	let myWebhook = new DiscordWebhook(webhook_url);
	if (isNaN(metadata.stock)) {
		let stock; 'Unavailable'
	} else {
		let stock; metadata.stock
	}

	let price = metadata.price

	let links;
	if (Array.isArray(metadata.links)) {
		const set = [];
		for (let i = 0; i < metadata.links.length; i++) {
			const letiant = metadata.links[i];
			let baseUrl = letiant.baseUrl;
			set.push(`[${letiant.title}](${baseUrl}/cart/${letiant.id}:1)`);
		}
		links = set.join('\n');
	} else {
		links = 'Unavailable'
	}

	myWebhook.on("ready", () => {
		myWebhook.execute({
			embeds: [{
				"title": metadata.title,
				"url": url,
				"color": color,
				"timestamp": new Date().toISOString(),
				"footer": {
					"icon_url": "https://cdn.discordapp.com/icons/437322749145251841/2702ce171fc8d94f68cc7c9e1a595e6e.png",
					"text": "CACTUS JOE 🤠"
				},
				"thumbnail": {
					"url": metadata.img
				},
				"author": {
					"name": "",
					"url": "",
					"icon_url": ""
				},
				"fields": [{
					"name": "Notification",
					"value": type,
					"inline": true
		   		},
		//    {
		//			"name": "Stock",
		//			"value": stock,
		//			"inline": true
		//		},
				{
					"name": "Site",
					"value": brand,
					"inline": true
				}, {
					"name": "Prix",
					"value": price,
					"inline": true
				}, {
					"name": "Liens 🚪",
					"value": links
				}]
			}]
		});
	});
}

Notify.slack = function (webhook_url, url, brand, metadata, type, color) {

	let webhook = new SlackWebhook(webhook_url);

	if (isNaN(metadata.stock)) {
		let stock; 'Unavailable'
	} else {
		let stock; metadata.stock
	}

	let price = metadata.price

	let links;
	if (Array.isArray(metadata.links)) {
		const set = [];
		for (let i = 0; i < metadata.links.length; i++) {
			const letiant = metadata.links[i];
			let baseUrl = letiant.baseUrl;
			set.push(`[${letiant.title}](${baseUrl}/cart/${letiant.id}:1)`);
		}
		links = set.join('\n');
	} else {
		links = 'Unavailable'
	}

	webhook.send({
		attachments: [
			{
			  "fallback": metadata.title,
			  "title": metadata.title,
			  "title_link": url,
			  "color": color,
			  "fields": [
	//			{
	//			  "title": "Stock",
	//			  "value": stock,
	//			  "short": "false"
	//			},
	        {
				  "title": "Site",
				  "value": brand,
				  "short": "false"
				}, {
				  "title": "Notification",
				  "value": type,
				  "short": "false"
				}, {
				  "title": "Prix",
				  "value": price,
				  "short": "false"
				}, {
				  "title": "Liens 🚪",
				  "value": links,
				  "short": "false"
				}
			  ],
			  "thumb_url": metadata.img
			}
		  ]
	})
}

Notify.discordTest = function (webhook_url) {
	let myWebhook = new DiscordWebhook(webhook_url);
	myWebhook.on("ready", () => {
		myWebhook.execute({
			content: "Shopify Monitor Test"
		});
	});
}

Notify.slackTest = function (webhook_url) {
	let webhook = new SlackWebhook(webhook_url);
	webhook.send('Shopify Monitor Test');
}

Notify.ys = function (webhook_url, data) {
	let myWebhook = new DiscordWebhook(webhook_url);
	myWebhook.on("ready", () => {
		let exec = {
			embeds: [{
				"title": "Yeezy Supply Monitor",
				"description": data.title,
				"url": "https://yeezysupply.com/",
				"color": 15844367,
				"timestamp": new Date().toISOString(),
				"footer": {
					"icon_url": "https://cdn.discordapp.com/icons/437322749145251841/2702ce171fc8d94f68cc7c9e1a595e6e.png",
					"text": "CACTUS JOE 🤠"
				},
				"thumbnail": {
					"url": data.img
				},
				"author": {
					"name": "",
					"url": "",
					"icon_url": ""
				},
				"fields": [{
					"name": "Sizes",
					"value": (data.letiants == null) ? 'Unavailable' : data.letiants.map(x => x = x.options[0] + ` - ${x.id}`).join('\n'),
					"inline": true
				}]
			}]
		}
		myWebhook.execute(exec);
	});
}

module.exports = Notify;
